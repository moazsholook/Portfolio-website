import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="home-container">
        <section className="hero-section">
          <h1>Hi, I'm Moaz</h1>
          <h2>Software Developer</h2>
          <p className="intro-text">
            I create beautiful, functional websites with modern technologies.
            Passionate about building user-friendly digital experiences.
          </p>
          <div className="cta-buttons">
            <a href="#projects" className="primary-button">View My Work</a>
            <a href="#contact" className="secondary-button">Contact Me</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
