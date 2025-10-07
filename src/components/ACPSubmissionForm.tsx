"use client";

import { useState, useEffect } from "react";
import { Check, Zap, Crown, Shield } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "Standard listing in directory",
      "Appears in search results",
      "Basic metadata (name, description, tags)",
      "Community rating system",
      "Email support"
    ],
    icon: <Check className="w-5 h-5" />,
    color: "bg-gray-100 text-gray-800"
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "month",
    features: [
      "Everything in Free",
      "Featured placement in searches",
      "Analytics dashboard",
      "Verified badge",
      "Custom profile page",
      "Lead generation forms",
      "Priority support"
    ],
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-800",
    popular: true
  },
  {
    id: "featured",
    name: "Featured",
    price: 99,
    period: "month",
    features: [
      "Everything in Pro",
      "Top placement in category",
      "Custom banner & screenshots",
      "Video demo integration",
      "API showcase embed",
      "Category sponsorship option",
      "Dedicated account manager"
    ],
    icon: <Crown className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-800"
  }
];

interface FormData {
  // Submitter Info
  submitterName: string;
  submitterEmail: string;
  submitterCompany: string;
  
  // ACP Info
  name: string;
  description: string;
  website: string;
  githubUrl: string;
  categoryId: string;
  tags: string;
  protocolSupport: string;
  apiEndpoint: string;
  apiKeyRequired: boolean;
  
  // Tier Selection
  selectedTier: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ACPSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState("free");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    submitterName: "",
    submitterEmail: "",
    submitterCompany: "",
    name: "",
    description: "",
    website: "",
    githubUrl: "",
    categoryId: "",
    tags: "",
    protocolSupport: "",
    apiEndpoint: "",
    apiKeyRequired: false,
    selectedTier: "free"
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.submitterName || !formData.submitterEmail || !formData.name || !formData.description || !formData.githubUrl || !formData.categoryId) {
      alert('Please fill in all required fields before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Debug: Log form data before submission
    console.log('Form data being submitted:', {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      protocolSupport: formData.protocolSupport.split(',').map(proto => proto.trim()).filter(proto => proto),
      selectedTier
    });
    
    try {
      const response = await fetch('/api/acp/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          protocolSupport: formData.protocolSupport.split(',').map(proto => proto.trim()).filter(proto => proto),
          selectedTier
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (selectedTier === "free") {
          // Free tier - show success message
          alert("Your ACP has been submitted successfully! We'll review it within 24-48 hours.");
        } else {
          // Premium tier - redirect to payment
          window.location.href = result.paymentUrl;
        }
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        
        // Show specific error message
        if (errorData.error) {
          alert(`Submission failed: ${errorData.error}`);
        } else {
          alert('Submission failed. Please try again.');
        }
        return;
      }
    } catch (error) {
      console.error('Error submitting ACP:', error);
      alert('There was an error submitting your ACP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.submitterName || !formData.submitterEmail) {
        alert('Please fill in your name and email address before proceeding.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.name || !formData.description || !formData.githubUrl || !formData.categoryId) {
        alert('Please fill in all required ACP server details before proceeding.');
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`flex items-center ${step <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              <span className="ml-2 text-sm font-medium">
                {step === 1 ? 'Basic Info' : step === 2 ? 'ACP Details' : 'Choose Plan'}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">We need some basic information to process your submission.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="submitterName"
                  name="submitterName"
                  required
                  value={formData.submitterName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="submitterEmail"
                  name="submitterEmail"
                  required
                  value={formData.submitterEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="submitterCompany" className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                id="submitterCompany"
                name="submitterCompany"
                value={formData.submitterCompany}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Acme Corp"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: ACP Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ACP Server Details</h2>
              <p className="text-gray-600">Tell us about your ACP server and its capabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  ACP Server Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome ACP Server"
                />
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what your ACP server does and how it helps users..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://myacp.com"
                />
              </div>

              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  required
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repository"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="payments, api, automation, ml"
                />
              </div>

              <div>
                <label htmlFor="protocolSupport" className="block text-sm font-medium text-gray-700 mb-2">
                  Protocol Support (comma-separated)
                </label>
                <input
                  type="text"
                  id="protocolSupport"
                  name="protocolSupport"
                  value={formData.protocolSupport}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ACP v0.3, MCP, LangGraph"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700 mb-2">
                  API Endpoint
                </label>
                <input
                  type="url"
                  id="apiEndpoint"
                  name="apiEndpoint"
                  value={formData.apiEndpoint}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://api.myacp.com"
                />
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="apiKeyRequired"
                  name="apiKeyRequired"
                  checked={formData.apiKeyRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="apiKeyRequired" className="ml-2 block text-sm text-gray-700">
                  API Key Required
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Plan */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the tier that best fits your needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedTier === tier.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setFormData(prev => ({ ...prev, selectedTier: tier.id }));
                  }}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tier.color} mb-3`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                      <span className="text-gray-600">/{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Trust & Quality Assurance</h4>
                  <p className="text-sm text-blue-700">
                    All ACP servers go through our verification process to ensure they meet quality standards 
                    and work as advertised. Free listings are manually reviewed, while premium listings get 
                    priority review and additional verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Submitting...' : selectedTier === 'free' ? 'Submit for Free' : `Subscribe & Submit - $${tiers.find(t => t.id === selectedTier)?.price}/month`}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
