"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";


export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl"
    >
      {/* Badge */}

      <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          The Future is Built Today
        </span>
      </div>

      {/* Title */}

      <h1 className="hero-title mt-8 leading-[0.95]">
                <span className="block text-4xl font-black text-white md:text-5xl xl:text-6xl">
          INTERNATIONAL
        </span>

        <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-4xl font-black text-transparent md:text-5xl xl:text-6xl">
          ROBOT DESIGN
        </span>

        <span className="mt-2 block text-4xl font-black text-white md:text-5xl xl:text-6xl">
          OLYMPIAD 2026
        </span>
      </h1>

      {/* Motto */}

      <div className="mt-8 flex flex-wrap gap-8 text-lg font-semibold">
        <span className="text-cyan-300">LEARN.</span>
        <span className="text-cyan-300">BUILD.</span>
        <span className="text-purple-300">INNOVATE.</span>
      </div>

      {/* Description */}

      <p className="mt-8 max-w-xl text-lg leading-9 text-slate-300">
        Join the biggest international robotics competition where innovators
        from around the world design, build, and compete to shape the future
        through technology and creativity.
      </p>

      {/* Button */}

      <div className="mt-12 flex flex-wrap gap-5">
        <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,168,255,.45)]">
          Register Now
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </button>

        <button className="group flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/10">
          Download Guidebook
          <Download
            size={18}
            className="transition group-hover:-translate-y-1"
          />
        </button>
      </div>



    
    </motion.div>
  );
}