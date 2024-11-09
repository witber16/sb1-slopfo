import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Shield 
} from 'lucide-react';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-500 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Ironic JD</h1>
        
        <div className="space-y-12">
          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Welcome to Ironic JD, where we flip the script on job descriptions! We often see endless advice on 
                crafting the perfect resume to grab a recruiter's attention or bypass an ATS filter. But let's be 
                honest—resumes seem to get all the scrutiny, while job descriptions get a free pass.
              </p>

              <p className="text-gray-700 leading-relaxed">
                You've probably heard the myth that <span className="font-medium">"recruiters spend 6 seconds scanning your CV."</span> But 
                what about candidates? How much time do you spend scanning a job description? Sometimes, even an 
                AI-polished resume gets rejected for not reflecting the person behind it. But how often do we ask, <span       className="italic">"Does this job description really reflect the role?"</span>
              </p>

              <p className="text-gray-700 leading-relaxed">
                If you've stumbled onto this site by accident, take a moment to chuckle and enjoy the 
                sarcasm—because that's what we're all about here. Ironic JD is a lighthearted space poking 
                fun at the irony in job descriptions.
              </p>

              <p className="text-gray-700 leading-relaxed">
                So, tell us, what makes a good job description in your view? Are you someone who applies based 
                on the shiny employer branding, even if it's a 10,000-word essay? Or do you read every line 
                before hitting that apply button?
              </p>

              <p className="text-gray-700 leading-relaxed">
                Dive in and enjoy the irony—hope it'll be a refreshing change from the usual corporate speak!
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Error Categories</h3>
                  <p className="text-gray-600 text-sm">
                    Identify and categorize common mistakes in job descriptions, from typos to 
                    misleading requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Community Ratings</h3>
                  <p className="text-gray-600 text-sm">
                    Vote on submissions to highlight the most ironic examples.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">User Submissions</h3>
                  <p className="text-gray-600 text-sm">
                    Share the findings with the community.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Privacy Protection</h3>
                  <p className="text-gray-600 text-sm">
                    Maintain anonymity of sources while sharing sarcastic moment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Community Guidelines */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Guidelines</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Focus on constructive criticism rather than mockery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Respect privacy by not revealing company or individual names</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Submit authentic content without manipulation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Engage in respectful discussion and debate (outside this website)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions, concerns, or suggestions? We'd love to hear from you. Contact our 
              team at{' '}
              <a 
                href="mailto:support@innoday.info" 
                className="text-red-500 hover:text-red-600"
              >
                support@innoday.info
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}