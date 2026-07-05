"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const menus = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Competition",
    href: "#competition",
  },
  {
    title: "Gallery",
    href: "#gallery",
  },
  {
    title: "Guidebook",
    href: "#guidebook",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: .6,
        }}
        className="fixed left-0 top-0 z-50 w-full flex justify-center"
      >
        <div
          className={`
            transition-all
            duration-500
            mt-6
            w-[95%]
            max-w-7xl

            ${
              scroll
                ? "rounded-2xl border border-cyan-400/20 bg-slate-950/65 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,168,255,.15)]"
                : "bg-transparent"
            }
          `}
        >
          <div className="flex h-20 items-center justify-between px-8">

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-4"
            >

              <div
                className="
                h-12
                w-12
                rounded-full

                bg-gradient-to-br
                from-cyan-400
                to-purple-600

                flex
                items-center
                justify-center

                font-bold
                text-white

                shadow-[0_0_20px_rgba(0,168,255,.45)]
                "
              >
                IR
              </div>

              <div>

                <h1 className="font-black text-white text-xl tracking-wider">
                  IRDO
                </h1>

                <p className="text-xs text-cyan-300">
                  International Robot Design Olympiad
                </p>

              </div>

            </Link>

            {/* Desktop */}

            <nav className="hidden lg:flex gap-10">

              {menus.map((item) => (

                <Link
                  key={item.title}
                  href={item.href}
                  className="
                  relative
                  text-white
                  font-medium
                  group
                  "
                >

                  {item.title}

                  <span
                    className="
                    absolute

                    -bottom-2

                    left-0

                    h-[2px]

                    w-0

                    bg-cyan-400

                    transition-all

                    duration-300

                    group-hover:w-full
                    "
                  />

                </Link>

              ))}

            </nav>

            {/* Register */}

            <div className="hidden lg:block">

              <motion.a
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: .95,
                }}
                href="/auth/register"
                className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-purple-600

                px-7
                py-3

                text-white
                font-semibold

                shadow-[0_0_25px_rgba(0,168,255,.35)]
                "
              >

                Register Now

                <ArrowRight
                  size={18}
                />

              </motion.a>

            </div>

            {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white"
            >

              {open ? (
                <X />
              ) : (
                <Menu />
              )}

            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="
            fixed

            top-24

            left-1/2

            -translate-x-1/2

            z-40

            w-[92%]

            rounded-3xl

            border

            border-cyan-500/20

            bg-slate-950/90

            backdrop-blur-2xl

            p-6

            lg:hidden
            "
          >

            <div className="flex flex-col gap-5">

              {menus.map((item) => (

                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  {item.title}
                </Link>

              ))}

              <Link
                href="/auth/register"
                className="
                mt-4

                rounded-full

                bg-gradient-to-r

                from-cyan-500

                to-purple-600

                py-3

                text-center

                text-white

                font-semibold
                "
              >
                Register Now
              </Link>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}