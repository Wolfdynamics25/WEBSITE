import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Narrative from "@/components/site/Narrative";
import Capabilities from "@/components/site/Capabilities";
import Applications from "@/components/site/Applications";
import Impact from "@/components/site/Impact";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Home = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div data-testid="home-page" className="relative">
      <Nav />
      <main>
        <Hero />
        <Narrative />
        <Capabilities />
        <Applications />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
