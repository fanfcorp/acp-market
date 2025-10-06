import Header from '@/components/Header';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import { Check, Zap, Shield, Users, Rocket, Code } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-6">
            <Zap className="w-4 h-4" />
            Professional Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Integrate Your Business with the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ACP Ecosystem
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert integration, custom development, and consulting services to power your AI applications
            with ACP technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ACP Integration</h3>
            <p className="text-sm text-gray-600">
              Seamlessly integrate ACP servers into your existing applications and workflows
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Development</h3>
            <p className="text-sm text-gray-600">
              Build custom ACP servers and AI agents tailored to your specific business needs
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consulting</h3>
            <p className="text-sm text-gray-600">
              Strategic guidance on AI architecture, ACP best practices, and implementation
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration Services</h3>
            <p className="text-sm text-gray-600">
              Migrate your existing AI infrastructure to ACP with minimal downtime
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Training & Workshops</h3>
            <p className="text-sm text-gray-600">
              Hands-on training for your team on ACP development and best practices
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Support</h3>
            <p className="text-sm text-gray-600">
              Dedicated support and maintenance for your ACP implementations
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Deep ACP Expertise</h4>
                <p className="text-sm text-gray-600">
                  Our team has extensive experience building and deploying ACP solutions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast Turnaround</h4>
                <p className="text-sm text-gray-600">
                  Efficient delivery without compromising quality
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Production-Ready</h4>
                <p className="text-sm text-gray-600">
                  Enterprise-grade solutions tested and ready for scale
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Ongoing Support</h4>
                <p className="text-sm text-gray-600">
                  We&apos;re here for you after deployment with maintenance and updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Let&apos;s Build Together</h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </p>
            </div>
            <ServiceRequestForm />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by innovative companies building with AI</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-gray-400 text-sm font-medium">100+ Projects Delivered</div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-gray-400 text-sm font-medium">50+ Happy Clients</div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-gray-400 text-sm font-medium">24/7 Support</div>
          </div>
        </div>
      </main>
    </div>
  );
}

