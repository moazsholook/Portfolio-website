import React from 'react';
import './App.css';
import websitePhoto from './webphoto.png';
import insulinPumpPhoto from './Screenshot 2025-05-18 at 6.58.38 PM.png'

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-content">
          <a href="#home" className="nav-logo">Moaz Sholook</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Welcome to my portfolio!</h2>
              <h1>Hi, I'm Moaz Sholook</h1>
              <h2>Software Development Intern @ ISED</h2>
              <div className="cta-buttons">
                <a href="#projects" className="primary-button">My Resume</a>
                <a href="#contact" className="secondary-button">Contact Me</a>
              </div>
            </div>
            <div className="hero-image">
              <img src={websitePhoto} alt="Moaz Sholook"/>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                👋 Hi! I'm Moaz - A third-year student at Computer Science student at Carleton University, where I combine
                knowledge of operating systems, data structures, and circuits to build all types of solutions, from predictive 
                AI models to prosthetic limbs 🦾. 
              </p>
              <p>
                Currently, I am working as a full-stack intern at ISED, where I'm working on all kinds of tasks, from debugging 
                front-end errors to reducing our company's code smells 👃.
              </p>
              <p>
                I do a lot of self-learning when it comes to technology. My current research interests include Quantum Computing, 
                neural networks and Embedded Systems (FPGAs specifically).
              </p>
              <p>
                When I'm away from my computer, you can find me on hikes, at the gym, or playing one of the many sports I enjoy. 
              </p>
            </div>
          </div>
          <div className="experience-grid">
            <div className="experience-category">
              <h3>Work Experience</h3>
              <ul>
                <li>ISED - Software Development Intern</li>
                <li>BioCare - Electrical System Design & Software Development Team Member</li>
              </ul>
            </div>
            <div className="experience-category">
              <h3>Education</h3>
              <ul>
                <li>Carleton University</li>
                <li>Bachelor of Computer Science</li>
                <li>SWE & ML Stream</li>
                <li>GPA: 3.3/4.0</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <ul>
                <li>Python</li>
                <li>Java</li>
                <li>C/C++</li>
                <li>JavaScript/HTML/CSS</li>
                <li>TypeScript</li>
                <li>SQL</li>
                <li>Swift</li>
                <li>Go</li>
                <li>Rust</li>
                <li>Ruby</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Frameworks</h3>
              <ul>
                <li>React.js</li>
                <li>Node.js</li>
                <li>Spring Boot</li>
                <li>Tailwind</li>
                <li>PyTorch</li>
                <li>TensorFlow</li>
                <li>Python Flask</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Developer Tools</h3>
              <ul>
                <li>Git/Git Lab</li>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>Linux</li>
                <li>AWS</li>
                <li>Splunk</li>
                <li>MacOS</li>
                <li>Windows</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Insulin Pump Simulator</h3>
              <div className="project-image">
                <img src={insulinPumpPhoto} alt="Pump Photo"/>
              </div>
              <p>Developed in Qt C++, I created an interface, entirely using Qt Widgets, that replicated the logic and functionality of the t:slim Insulin pump </p>
              <div className="project-links">
                <a href="https://github.com/moazsholook/COMP3004_Proj" className="project-link">GitHub</a>
                <a href="https://www.youtube.com/watch?v=2lVR6Kb2LBk" className="project-link">Live Demo</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Premier League Database CLI</h3>
              <p>A python CLI that allowed users to access a database of Premier League champions and top scorers from 1992 to 2024</p>
            </div>
            {/* Add more project cards as needed */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-content">
            <p>Feel free to reach out! I'm always open to discussing new projects and opportunities.</p>
            <div className="contact-links">
              <a href="mailto:sholookmoaz@gmail.com" className="contact-link">Email</a>
              <a href="https://linkedin.com/in/moazsholook" className="contact-link">LinkedIn</a>
              <a href="https://github.com/moazsholook" className="contact-link">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Moaz Sholook. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
