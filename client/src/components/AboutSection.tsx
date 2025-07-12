import { useEffect, useRef } from 'react';
import { frontendSkills, backendSkills, skills } from '@/lib/data';

export default function AboutSection() {
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = skillBarsRef.current;
            skillBars.forEach((bar, index) => {
              if (bar) {
                const skill = skills[index];
                setTimeout(() => {
                  bar.style.width = `${skill.level}%`;
                }, index * 200);
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.querySelector('#about .space-y-4');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with 2.5+ years of experience creating digital experiences
            that are not only functional but also engaging and user-friendly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Content */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">My Journey</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Started my journey in web development during collage, where I discovered my passion for
                creating intuitive user interfaces and robust backend systems. I love the challenge of
                turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                projects, or mentoring aspiring developers in the community.
              </p>
            </div>

            {/* Education & Experience */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-violet-400">Background</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h4 className="font-semibold text-slate-200">Senior Frontend Developer</h4>
                  <p className="text-slate-400">TechCorp Inc. • 2025 - Present</p>
                </div>
                <div className="border-l-2 border-violet-400 pl-4">
                  <h4 className="font-semibold text-slate-200">Full Stack Developer</h4>
                  <p className="text-slate-400">StartupXYZ • 2023 - 2021</p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h4 className="font-semibold text-slate-200">Computer Science, B.S.</h4>
                  <p className="text-slate-400">University of Technology • 2020 - 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Technical Skills</h3>

              {/* Frontend Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-cyan-400">
                  <i className="fas fa-code mr-2"></i>Frontend
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {frontendSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center space-x-2 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                    >
                      <i className={`${skill.icon} ${skill.color} text-xl`}></i>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-violet-400">
                  <i className="fas fa-server mr-2"></i>Backend
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {backendSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center space-x-2 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                    >
                      <i className={`${skill.icon} ${skill.color} text-xl`}></i>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Progress Bars */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Proficiency Levels</h4>
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="skill-progress">
                      <div
                        ref={(el) => (skillBarsRef.current[index] = el)}
                        className="skill-progress-fill"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
