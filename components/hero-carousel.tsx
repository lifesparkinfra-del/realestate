"use client";

import * as React from "react";
import { useReducedMotion, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

interface HeroCarouselProps {
  title?: string;
  subtitle?: string;
  images?: string[];
}

export function HeroCarousel({ title, subtitle, images }: HeroCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false })
  );

  const displaySlides = images && images.length > 0
    ? images.map(src => ({ src, alt: "Hero image" }))
    : [
      { src: "/07.jpg", alt: "Modern residential development render" },
      { src: "/23.jpg", alt: "Premium shopping mall exterior" },
      { src: "/36.jpg", alt: "Coastal mixed-use towers" },
    ];

  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: prefersReducedMotion ? 10 : 20 },
    prefersReducedMotion ? [] : [autoplay.current]
  );

  return (
    <section className="relative isolate overflow-hidden bg-slate-900 text-white">
      <div
        className="h-[68vh] w-full"
        ref={emblaRef}
        aria-label="Featured project visuals"
      >
        <div className="flex h-full">
          {displaySlides.map((s, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <Image
                src={s.src || "/placeholder.svg"}
                alt={s.alt}
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
              {/* Brand-blue left accent glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <div className="pointer-events-auto max-w-2xl flex flex-col items-center">
            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-pretty text-3xl font-serif font-semibold md:text-5xl lg:text-6xl tracking-tight drop-shadow-md"
            >
              {title || "Shaping skylines with\nprecision, quality & trust."}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base"
            >
              {subtitle || "Premium residential and mixed-use developments delivered on time with rigorous quality standards."}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-none border border-primary bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/30"
              >
                View Projects
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-none border border-white/40 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-white/10"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Thin accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
    </section>
  );
}

export default HeroCarousel;
