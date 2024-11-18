import { motion, useAnimation } from "framer-motion";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

function App() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the div is in view
  });
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (inView && secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    } else {
      controls.start({ opacity: 0, y: 100 });
    }
  }, [controls, inView]);


  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar when scrolling down, show when at the top
      if (window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="no-scrollbar overflow-y-scroll flex flex-col">
      <div className="relative h-screen flex justify-center items-center overflow-hidden ">
        <img
          src="/screenshot-death-stranding-4k-e3-2018-wallpaper-b8a6ad188090ac38401c21eef822047a.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover filter"
        ></img>

        {/* <Navbar /> */}

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full z-50"
        >
          <Navbar />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground bg-black bg-opacity-30 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ z: -40, opacity: 1 }}
            transition={{ delay: 1, duration: 1, type: "tween" }}
          >
            <img
              src="/Death-Stranding-PNG-Image-Transparent-Background.png"
              className=""
              style={{ height: "200px" }}
            ></img>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={(node) => {
          ref(node);
          secondSectionRef.current = node;
        }}
        animate={controls}
        initial={{ opacity: 0, y: 100 }}
        className="h-screen bg-red-300 flex items-center justify-center"
      ></motion.div>
    </div>
  );
}

export default App;
