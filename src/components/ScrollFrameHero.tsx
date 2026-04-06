import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import CharSplit from "@/components/CharSplit";
import { scrollTo } from "@/lib/scrollTo";

const FRAME_COUNT = 192;
const FRAMES_CDN = "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1";
const getFrameSrc = (i: number) => `${FRAMES_CDN}/${String(i).padStart(5, "0")}.webp`;

/** Draw an image into a canvas — cover on desktop, blended fit on portrait mobile */
const drawFrame = (canvas: HTMLCanvasElement | null, img: HTMLImageElement) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: cw, height: ch } = canvas;
  const { naturalWidth: iw, naturalHeight: ih } = img;

  const coverScale = Math.max(cw / iw, ch / ih);
  const containScale = Math.min(cw / iw, ch / ih);
  const isPortrait = ch > cw * 1.2;

  // Portrait: blend 65% toward cover (show more of the scene)
  // Landscape/desktop: pure cover
  const scale = isPortrait
    ? containScale + (coverScale - containScale) * 0.65
    : coverScale;

  const x = (cw - iw * scale) / 2;
  const y = (ch - ih * scale) / 2;

  ctx.fillStyle = "#07070d";
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, x, y, iw * scale, ih * scale);
};

const ScrollFrameHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const techBarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const underwaterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const exitOverlayRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const progressRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  // ─── Find nearest loaded frame ───
  const findNearest = (target: number): number => {
    const loaded = loadedRef.current;
    if (loaded.has(target)) return target;
    let lo = target - 1, hi = target + 1;
    while (lo >= 0 || hi < FRAME_COUNT) {
      if (lo >= 0 && loaded.has(lo)) return lo;
      if (hi < FRAME_COUNT && loaded.has(hi)) return hi;
      lo--; hi++;
    }
    return 0;
  };

  // ─── Draw the correct frame based on scroll progress ───
  const drawCurrentFrame = (progress: number) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const canvas = canvasRef.current;
      const imgs = imagesRef.current;
      if (!canvas || imgs.length === 0 || loadedRef.current.size === 0) return;

      const target = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
      const best = findNearest(target);
      if (best === lastFrameRef.current) return;
      lastFrameRef.current = best;
      const img = imgs[best];
      if (img?.complete) drawFrame(canvas, img);
    });
  };

  // ─── GSAP SCROLL TIMELINE ───
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          drawCurrentFrame(self.progress);
        },
      },
    });

    // Canvas dolly-zoom
    if (canvasWrapperRef.current) {
      tl.fromTo(canvasWrapperRef.current, { scale: 1.08 }, { scale: 1.0, ease: "none" }, 0);
    }

    // Hero text — visible from start, fades out 0.30–0.45
    if (heroTextRef.current) {
      tl.fromTo(heroTextRef.current,
        { opacity: 1, y: 0, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1.0, ease: "none", duration: 0.30 },
        0
      );
      tl.to(heroTextRef.current,
        { opacity: 0, y: -120, scale: 0.95, ease: "none", duration: 0.15 },
        0.30
      );
    }

    // Tech stack bar — visible, fades out 0.28–0.40
    if (techBarRef.current) {
      tl.fromTo(techBarRef.current,
        { opacity: 1 },
        { opacity: 1, ease: "none", duration: 0.28 },
        0
      );
      tl.to(techBarRef.current,
        { opacity: 0, ease: "none", duration: 0.12 },
        0.28
      );
    }

    // Scroll indicator — fades out by 0.18
    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "none", duration: 0.18 },
        0
      );
    }

    // Underwater text — fades in 0.50–0.60, visible, fades out 0.80–0.88
    if (underwaterRef.current) {
      gsap.set(underwaterRef.current, { opacity: 0, y: 40, scale: 0.92 });
      tl.to(underwaterRef.current,
        { opacity: 1, y: 0, scale: 1.0, ease: "none", duration: 0.10 },
        0.50
      );
      tl.to(underwaterRef.current,
        { opacity: 1, ease: "none", duration: 0.20 },
        0.60
      );
      tl.to(underwaterRef.current,
        { opacity: 0, ease: "none", duration: 0.08 },
        0.80
      );
    }

    // Atmosphere overlay
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      tl.to(overlayRef.current, { opacity: 0, ease: "none", duration: 0.35 }, 0);
      tl.to(overlayRef.current, { opacity: 0.15, ease: "none", duration: 0.15 }, 0.35);
      tl.to(overlayRef.current, { opacity: 0.18, ease: "none", duration: 0.05 }, 0.50);
      tl.to(overlayRef.current, { opacity: 0.12, ease: "none", duration: 0.25 }, 0.55);
      tl.to(overlayRef.current, { opacity: 0.3, ease: "none", duration: 0.12 }, 0.80);
    }

    // Exit fade to dark
    if (exitOverlayRef.current) {
      gsap.set(exitOverlayRef.current, { opacity: 0 });
      tl.to(exitOverlayRef.current, { opacity: 0, ease: "none", duration: 0.85 }, 0);
      tl.to(exitOverlayRef.current, { opacity: 1, ease: "none", duration: 0.15 }, 0.85);
    }
  }, { scope: containerRef });

  // ─── Entrance animations (non-scroll) ───
  useGSAP(() => {
    if (badgeRef.current) {
      gsap.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
    }
    if (descRef.current) {
      gsap.from(descRef.current, { opacity: 0, y: 20, duration: 0.7, delay: 0.9 });
    }
    if (ctaRef.current) {
      gsap.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.7, delay: 1.2 });
    }
    // Chevron bounce
    if (chevronRef.current) {
      gsap.to(chevronRef.current, { y: 6, repeat: -1, yoyo: true, duration: 1, ease: "sine.inOut" });
    }
  });

  // ─── CANVAS SIZING ───
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Half resolution on mobile — 4x faster drawImage, CSS upscales
      const scale = window.innerWidth < 768 ? 0.5 : 1;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      // Re-draw current frame after resize
      const imgs = imagesRef.current;
      if (imgs.length > 0 && loadedRef.current.size > 0) {
        const progress = progressRef.current;
        const target = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        const best = findNearest(target);
        const img = imgs[best];
        if (img?.complete) drawFrame(canvas, img);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ─── PROGRESSIVE FRAME LOADING ───
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) imgs.push(new Image());
    imagesRef.current = imgs;

    const load = (index: number) => {
      const img = imgs[index];
      if (img.src) return; // already loading
      img.onload = () => {
        // Decode off main thread to avoid jank on first drawImage
        const markReady = () => {
          loadedRef.current.add(index);
          if (index === 0) {
            drawFrame(canvasRef.current, img);
            setReady(true);
          }
        };
        if (img.decode) {
          img.decode().then(markReady).catch(markReady);
        } else {
          markReady();
        }
      };
      img.src = getFrameSrc(index + 1); // files are 1-indexed (00001.png)
    };

    // Batch 1: key frames for instant scroll coverage (sparser on mobile)
    const step = window.innerWidth < 768 ? 16 : 8;
    const keyFrames = [0, ...Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i % step === 0)];
    keyFrames.forEach(load);

    // Batch 2: fill remaining frames after key frames have a head start
    // On mobile, skip odd frames to halve memory usage (~132MB vs ~264MB)
    const isMobile = window.innerWidth < 768;
    const timer = setTimeout(() => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (isMobile && i % 2 !== 0) continue;
        load(i);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 180vh on mobile, 400vh on desktop */}
      <div ref={containerRef} id="home" className="h-[180vh] md:h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Dark background shown while frames load */}
          <div className="absolute inset-0 bg-[#07070d]" />

          {/* ─── CANVAS (dolly-zoom) ─── */}
          <div ref={canvasWrapperRef} className="absolute inset-0">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
            />
          </div>

          {/* Atmosphere overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black pointer-events-none"
          />

          {/* Exit fade to dark */}
          <div
            ref={exitOverlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(7,7,13,0.3) 0%, rgba(7,7,13,1) 70%)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          {/* ════════════════════════════════════
              SCENE 1: HERO TEXT (cherry blossoms)
              ════════════════════════════════════ */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          >
            <div
              ref={badgeRef}
              className="liquid-glass rounded-2xl sm:rounded-full px-3 py-2 sm:px-1 sm:py-1 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-4"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
            >
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold font-body"
                style={{ background: "white", color: "black" }}
              >
                Open to Work
              </span>
              <span
                className="text-xs sm:text-sm text-white sm:pr-3 font-body font-medium"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              >
                Cloud Computing Graduate · DkIT 2025
              </span>
            </div>

            <div style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.6))" }}>
              <CharSplit
                text="Hi, I'm Chee Pheng"
                className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl tracking-[-2px] sm:tracking-[-4px]"
                trigger={false}
              />
            </div>

            <p
              ref={descRef}
              className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-xl font-body font-light leading-relaxed text-white/90"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            >
              A Cloud Computing graduate passionate about building modern web and mobile
              applications. Experienced in full-stack development with TypeScript, React,
              Java, and C#.
            </p>

            <div
              ref={ctaRef}
              className="flex items-center gap-4 sm:gap-6 mt-5 sm:mt-6"
            >
              <button
                onClick={() => scrollTo("about")}
                className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                View Projects
                <ArrowUpRight className="h-5 w-5" />
              </button>
              <a
                href="https://github.com/CheePheng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white font-body"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
              >
                GitHub
                <Github className="h-4 w-4" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
              </a>
            </div>
          </div>

          {/* ─── TECH STACK BAR ─── */}
          <div
            ref={techBarRef}
            className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-3"
          >
            <span
              className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              Tech Stack
            </span>
            <div className="flex items-center gap-3 sm:gap-6 md:gap-14 flex-wrap justify-center">
              {["TypeScript", "React", "Java", "C#", "Cloud"].map((name) => (
                <span
                  key={name}
                  className="text-base sm:text-xl md:text-2xl font-heading italic text-white tracking-tight"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* ─── SCROLL INDICATOR ─── */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          >
            <span
              className="text-[10px] font-body text-white/70 uppercase tracking-[0.2em] font-medium"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              Scroll to explore
            </span>
            <div ref={chevronRef}>
              <ChevronDown className="h-4 w-4 text-white/60" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }} />
            </div>
          </div>

          {/* ════════════════════════════════════
              SCENE 2: UNDERWATER TEXT (koi fish)
              ════════════════════════════════════ */}
          <div
            ref={underwaterRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading italic text-white mb-5"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
            >
              Dive into my work
            </h2>
            <p
              className="text-sm md:text-lg font-body font-light text-white/80 max-w-md leading-relaxed"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              Explore my projects, education, and transcripts below.
            </p>
            <div className="mt-8">
              <button
                onClick={() => scrollTo("about")}
                className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                Explore Below
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollFrameHero;
