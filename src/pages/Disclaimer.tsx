import React from 'react';

export default function Disclaimer() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
        <div className="prose prose-red max-w-none">
          <p className="text-gray-600 mb-4">
            Ironic JD is a website designed for humor, critique, and educational purposes. 
            Its mission is to highlight common errors, oversights, and ironies in job descriptions 
            to encourage transparency and clarity in recruitment practices.
          </p>
          
          <p className="text-gray-600 mb-4">
            The content shared on Ironic JD reflects examples submitted by the community and 
            does not represent the views, practices, or standards of any specific organization, 
            company, or individual.
          </p>
          
          <p className="text-gray-600 mb-4">
            By using this site, visitors acknowledge that all materials, comments, and opinions 
            are intended for general informational and entertainment purposes only. Ironic JD 
            assumes no responsibility or liability for any actions taken or decisions made based 
            on content shared on this platform.
          </p>
          
          <p className="text-gray-600 mb-4">
            Additionally, Ironic JD does not guarantee the accuracy, completeness, or reliability 
            of any submissions.
          </p>
          
          <p className="text-gray-600">
            Should any content appear that is believed to be inaccurate or infringe on rights, 
            please contact us to address the concern.
          </p>
        </div>
      </div>
    </main>
  );
}