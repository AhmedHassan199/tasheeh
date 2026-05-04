import { useCallback, useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { InstructorsSection } from './components/InstructorsSection.jsx';
import { BeforeAfterSection } from './components/BeforeAfter.jsx';
import { RegistrationForm } from './components/RegistrationForm.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  const [presetTeacher, setPresetTeacher] = useState(null);

  const handleRegisterWithTeacher = useCallback((teacher) => {
    setPresetTeacher(teacher.id);
    requestAnimationFrame(() => {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  const consumePreset = useCallback(() => setPresetTeacher(null), []);

  return (
    <div dir="rtl" className="min-h-screen bg-paper-texture text-ink-900 dark:text-ink-100">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <InstructorsSection onRegisterWithTeacher={handleRegisterWithTeacher} />
        <BeforeAfterSection />
        <RegistrationForm
          presetTeacherId={presetTeacher}
          onPresetConsumed={consumePreset}
        />
      </main>
      <Footer />
    </div>
  );
}
