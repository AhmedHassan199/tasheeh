import { useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { InstructorsSection } from './components/InstructorsSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { StudyMechanism } from './components/StudyMechanism.jsx';
import { BeforeAfterSection } from './components/BeforeAfter.jsx';
import { StudentReviews } from './components/StudentReviews.jsx';
import { RegistrationForm } from './components/RegistrationForm.jsx';
import { Footer } from './components/Footer.jsx';
import { useDirection } from './hooks/useDirection.js';

export default function App() {
  useDirection();
  const formRef = useRef(null);

  const scrollToRegister = () =>
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });

  const handleRegisterWithTeacher = useCallback((teacher) => {
    formRef.current?.presetTeacher(teacher.id);
    requestAnimationFrame(scrollToRegister);
  }, []);

  const handlePickService = useCallback((serviceId) => {
    formRef.current?.presetService(serviceId);
    requestAnimationFrame(scrollToRegister);
  }, []);

  return (
    <div className="min-h-screen bg-paper-texture text-ink-900 dark:text-ink-100">
      <Navbar />
      <main>
        <HeroSection />
        <InstructorsSection onRegisterWithTeacher={handleRegisterWithTeacher} />
        <AboutSection />
        <StudyMechanism onPickService={handlePickService} />
        <BeforeAfterSection />
        <StudentReviews />
        <RegistrationForm ref={formRef} />
      </main>
      <Footer />
    </div>
  );
}
