"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { icons } from '@/utils/image.exporter';

const AnimPage: React.FC = () => {
  return (
    <div className="container w-screen bg-white h-screen grid items-center place-content-center ">
      <motion.div
        className="triangle absolute -left-[20rem] rotate-90"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 5, ease: "easeInOut", loop: Infinity }}
      />
      <motion.div
        className="triangle absolute -rotate-90 -right-[15rem]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 5, ease: "easeInOut", loop: Infinity }}
      />
      <motion.div
        className="content z-100 relative w-[50rem] mx-auto h-[80vh] "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >

        <div>
          {/* Dock Icons */}
          <div className="dock">
            {[icons.icon1, icons.icon2, icons.icon3, icons.icon4, icons.icon5].map((icon, index) => (
              <motion.img
                key={index}
                src={icon.src}
                alt={`Ícone ${index + 1}`}
                className="dock-icon"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 1000, duration: .1 }}
              />
            ))}
          </div>
        </div>
        <h1>Every hero needs a sidekick. We have two.</h1>
        <p>Enjoy our award-winning macOS app, share all of your projects in the browser, and take Sketch with you.</p>


      </motion.div>


    </div>
  );
};

export default AnimPage;
