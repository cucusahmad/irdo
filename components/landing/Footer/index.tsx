import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-cyan-500/20 bg-[#020617]"
    >
      {/* Glow Background */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* CTA */}

        <div className="mb-20 rounded-3xl border border-cyan-500/20 bg-white/5 p-10 text-center backdrop-blur-xl">
          <h2 className="text-4xl font-black text-white">
            Ready to Join
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              IRDO 2026?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400">
            Register now and become part of the International Robot Design
            Olympiad 2026. Show your innovation, creativity, and engineering
            skills on the international stage.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="/auth/register"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Register Now
            </Link>

            <Link
              href="#guidebook"
              className="rounded-full border border-cyan-400/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400"
            >
              Download Guidebook
            </Link>
          </div>
        </div>

        {/* Footer Grid */}

        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo */}

          <div>
            <h2 className="text-3xl font-black text-white">
              IRDO<span className="text-cyan-400">.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              International Robot Design Olympiad is an international robotics
              competition to inspire innovation, creativity, and engineering
              excellence.
            </p>
          </div>

          {/* Navigation */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Navigation
            </h3>

            <div className="space-y-3">
              <Link
                href="#home"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                href="#competition"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Competition
              </Link>

              <Link
                href="#timeline"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Timeline
              </Link>

              <Link
                href="#gallery"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Gallery
              </Link>
            </div>
          </div>

          {/* Information */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Information
            </h3>

            <div className="space-y-3">
              <Link
                href="#guidebook"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Guidebook
              </Link>

              <Link
                href="#faq"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                FAQ
              </Link>

              <Link
                href="/auth/register"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Registration
              </Link>

              <Link
                href="#contact"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-1 text-cyan-400" size={20} />

                <p className="text-slate-400">
                  Universitas Bandar Lampung
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 text-cyan-400" size={20} />

                <p className="text-slate-400">
                  info@irdo2026.com
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 text-cyan-400" size={20} />

                <p className="text-slate-400">
                  +62 812 3456 7890
                </p>
              </div>

              {/* Social */}

              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 text-white transition hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/20"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 text-white transition hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/20"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 text-white transition hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/20"
                >
                  <FaYoutube />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 text-white transition hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/20"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2026 International Robot Design Olympiad. All Rights Reserved.
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Powered by{" "}
            <span className="font-semibold text-cyan-400">
              Universitas Bandar Lampung
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}