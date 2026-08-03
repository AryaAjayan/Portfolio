import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { ProjectStack } from '@/components/ProjectStack';
import { Achievements } from '@/components/Achievements';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectStack />
        <Achievements />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
