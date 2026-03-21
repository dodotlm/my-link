import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffdf00] selection:bg-[#ff90e8] selection:text-black font-sans text-black">
      {/* Navigation / Header */}
      <header className="border-b-4 border-black bg-white p-6 sticky top-0 z-50 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Hong Gildong</h1>
          <nav className="space-x-4 hidden sm:block">
            <a href="#about" className="text-xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">About</a>
            <a href="#skills" className="text-xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">Skills</a>
            <a href="#projects" className="text-xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">Projects</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 lg:p-12 space-y-16 lg:space-y-24">
        {/* Hero Section */}
        <section id="about" className="flex flex-col items-start justify-center pt-12 pb-8">
          <div className="inline-block bg-[#ff90e8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-6 py-2 mb-6 transform -rotate-2">
            <span className="text-xl font-bold">Hello, World!</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-8 text-black">
            FULL STACK<br/>ALCHEMIST
          </h1>
          <p className="text-2xl md:text-3xl font-bold max-w-3xl leading-snug border-l-8 border-black pl-6 bg-white py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Bridging the gap between messy reality and perfectly structured code. I turn coffee into production-ready software.
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-8 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 lg:p-12">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 inline-block">Tech Stack</h2>
          <div className="flex flex-wrap gap-4 pt-4">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vibe Coding', 'Node.js', 'PostgreSQL', 'Magical Thinking'].map((skill, index) => (
              <span key={index} className="px-6 py-3 bg-[#90f4ff] border-4 border-black font-bold text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff90e8] transition-all cursor-crosshair">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="inline-block bg-black text-white p-4 shadow-[8px_8px_0px_0px_rgba(255,144,232,1)] mb-4 transform rotate-1">
             <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* Project 1 */}
            <div className="bg-[#90ffa8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform flex flex-col">
              <h3 className="text-3xl font-black uppercase">Project Alpha</h3>
              <p className="font-bold text-lg border-t-4 border-black pt-4 flex-grow">A revolutionary platform that failed, but taught me a lot about distributed systems.</p>
              <button className="w-full bg-white border-4 border-black py-2 font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all">View Source</button>
            </div>
            {/* Project 2 */}
            <div className="bg-[#ff90e8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform flex flex-col">
              <h3 className="text-3xl font-black uppercase">Project Beta</h3>
              <p className="font-bold text-lg border-t-4 border-black pt-4 flex-grow">It works perfectly on my machine. Still debugging the CI/CD pipeline though.</p>
              <button className="w-full bg-white border-4 border-black py-2 font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all">View Source</button>
            </div>
            {/* Project 3 */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform flex flex-col">
              <h3 className="text-3xl font-black uppercase">Project Gamma</h3>
              <p className="font-bold text-lg border-t-4 border-black pt-4 flex-grow">A completely over-engineered to-do list application built with microservices.</p>
              <button className="w-full bg-black text-white border-4 border-black py-2 font-bold text-lg shadow-[4px_4px_0px_0px_rgba(255,223,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all">View Source</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / CTA */}
      <footer className="border-t-4 border-black bg-white p-6 lg:p-12 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-black uppercase">Let's Work Together</h2>
            <p className="text-xl font-bold bg-[#ffdf00] inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">fake.alchemist@email.com</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-16 h-16 bg-[#90f4ff] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white hover:translate-y-1 hover:shadow-none transition-all">GH</a>
            <a href="#" className="w-16 h-16 bg-[#ff90e8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white hover:translate-y-1 hover:shadow-none transition-all">IN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
