import Header from "@/components/Header";
import ACPSubmissionForm from "@/components/ACPSubmissionForm";
import { CheckCircle, Zap, Crown, Users, TrendingUp } from "lucide-react";

export default function SubmitAcpPage() {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "10,000+ ACPs Indexed",
      description: "Join the largest directory of Agentic Commerce Protocol servers"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Trusted by Developers",
      description: "Used by thousands of developers building the future of commerce"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: "Growing Ecosystem",
      description: "Be part of the fastest-growing AI commerce ecosystem"
    }
  ];

  const stats = [
    { label: "ACP Servers Listed", value: "10,000+" },
    { label: "Monthly Active Users", value: "50,000+" },
    { label: "Developer Integrations", value: "25,000+" },
    { label: "Countries Served", value: "150+" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Submit Your ACP Server
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Join the largest directory of Agentic Commerce Protocol servers. 
              Get discovered by thousands of developers building the future of AI commerce.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Submit to ACP Market?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your ACP server in front of the right audience and accelerate adoption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Listing Tier
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free or upgrade for premium features and better visibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Free Tier */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Free</h3>
                <div className="text-3xl font-bold text-gray-900 mt-2">$0</div>
                <div className="text-gray-600">forever</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Standard directory listing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Appears in search results
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Community ratings
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Email support
                </li>
              </ul>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-lg border-2 border-blue-500 p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
                <div className="text-3xl font-bold text-gray-900 mt-2">$49</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Everything in Free
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Featured placement
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Analytics dashboard
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Verified badge
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Custom profile page
                </li>
              </ul>
            </div>

            {/* Featured Tier */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Featured</h3>
                <div className="text-3xl font-bold text-gray-900 mt-2">$99</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Top category placement
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Custom banner & screenshots
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Video demo integration
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  API showcase embed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ACPSubmissionForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does the review process take?
              </h3>
              <p className="text-gray-600">
                Free listings are reviewed within 24-48 hours. Premium listings get priority review and are typically approved within 12-24 hours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if my submission is rejected?
              </h3>
              <p className="text-gray-600">
                We'll provide detailed feedback on why your submission was rejected and suggestions for improvement. You can resubmit after making the necessary changes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my tier later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your subscription at any time. Changes take effect at your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I need help with my submission?
              </h3>
              <p className="text-gray-600">
                Our support team is here to help! Email us at support@acp-market.com or use the live chat for premium users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


