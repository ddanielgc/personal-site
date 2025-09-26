import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Image Column */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-slate-800 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="/daniel-campos.webp"
              alt="A black and white headshot of Daniel Gusmão Campos"
              className="relative rounded-lg shadow-xl w-64 h-64 object-cover object-top border-4 border-slate-800"
              width="256"
              height="256"
            />
          </div>
        </div>

        {/* Text and Skills Column */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-50 mb-6">About Me</h2>
          <div className="text-slate-400 leading-relaxed space-y-4">
            <p>
              With 16 years in technology, my career has evolved from a hands-on developer to a strategic leader and founder. I thrive on transforming complex challenges into elegant, scalable software solutions. My journey includes founding the <strong>Tubly App</strong>, an AI-powered tool to summarize video content, and leading critical modernization projects at companies like <strong>Yampi</strong> and <strong>Mobly</strong>, where I've replaced legacy systems with modern, microservices-based architectures.
            </p>
            <p>
              My approach is deeply rooted in agile principles and a product-focused mindset. I believe in building not just features, but value. This means architecting robust systems, fostering a culture of technical excellence, and ensuring every line of code serves a clear business purpose. I am passionate about leveraging technologies like Serverless, AI, and event-driven architectures to build resilient and impactful products.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">Core Competencies</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 font-mono text-sm text-slate-400">
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>System Architecture</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>Product Strategy</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>Team Leadership</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>AWS & Serverless</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>Node.js & TypeScript</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>React & Next.js</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>Microservices</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>CI/CD & DevOps</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">▹</span>Agile Methodologies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
