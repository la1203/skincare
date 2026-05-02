import React from 'react';

function About() {
  return (
    
    <div className="bg-background text-on-surface font-manrope pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-stone-100">
          <h1 className="font-noto-serif text-4xl text-on-surface mb-6 tracking-tight">About Project</h1>
          <hr className="border-stone-200 mb-6" />
          
          <div className="space-y-4 text-stone-700 text-lg">
            <p><strong className="text-stone-900">Course:</strong> Web Applications Programming and Engineering</p>
            <p><strong className="text-stone-900">Project:</strong> Component-Based Front-End Data Display</p>
            <p><strong className="text-stone-900">Technology:</strong> MERN Stack (Frontend Part)</p>
            <p><strong className="text-stone-900">Description:</strong> This is a skincare products showcase application built with React.js. It features client-side routing, responsive design, and product filtering.</p>
         </div>
         </div>
      </div>
    </div>
  );
}

export default About;