import { ResumeData } from '@shared/schema';

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Syed Murtaza Ali',
    title: 'Full Stack Developer',
    email: ' syedmurtazaali756@gmail.com',
    phone: '03293038177'
  },
  summary: 'Passionate Full Stack Developer with expertise in modern web technologies including React, Node.js, and cloud platforms. Experienced in building scalable applications with clean architecture and user-centric design. Strong background in both frontend and backend development with a focus on delivering high-quality, performant solutions.',
  education: [
    {
      institution: 'University of Karachi',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-09',
      endDate: '2022-06',
      gpa: '3.7/4.0'
    }
  ],
  experience: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: 'Present',
      location: 'Karachi, Pakistan',
      achievements: [
        'Led development of enterprise-level web applications using React and Node.js',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Optimized database queries improving application performance by 40%'
      ]
    },
    {
      company: 'Digital Innovations Ltd.',
      position: 'Frontend Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      location: 'karachi, Pakistan',
      achievements: [
        'Developed responsive web applications using React and TypeScript',
        'Collaborated with design team to implement pixel-perfect UI components',
        'Integrated RESTful APIs and GraphQL endpoints',
        'Improved website performance and SEO rankings'
      ]
    }
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Django', 'Spring Boot'],
    tools: ['Git', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis'],
    languages: ['English', 'Urdu', ]
  },
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Built with React, Node.js, and PostgreSQL.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      url: 'https://ecommerce.example.com',
      github: 'https://github.com/user/ecommerce'
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, file sharing, and team collaboration features.',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'AWS S3'],
      url: 'https://taskapp.example.com',
      github: 'https://github.com/user/taskapp'
    },
    {
      name: 'Portfolio Website',
      description: 'Personal portfolio website with modern design, responsive layout, and dynamic content management.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      url: 'https://portfolio.example.com',
      github: 'https://github.com/user/portfolio'
    }
  ]
};