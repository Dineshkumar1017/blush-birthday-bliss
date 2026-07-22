import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MusicToggle } from "@/components/MusicToggle";
import { BirthdayTimer } from "@/components/BirthdayTimer";

import eyes from "@/assets/eyes.jpeg";
import heart from "@/assets/heart.jpeg";
import selfie1 from "@/assets/selfie1.jpeg";
import booth from "@/assets/booth.jpeg";
import saree from "@/assets/saree.jpeg";
import green1 from "@/assets/green1.jpeg";
import green2 from "@/assets/green2.jpeg";
import jyo1 from "@/assets/jyo1.jpeg";
import jyo2 from "@/assets/jyo2.jpeg";

const getAssetUrl = (asset: any): string => (typeof asset === "string" ? asset : asset?.url || asset);

export const Route = createFileRoute("/")({
  component: BirthdayPage,
});

const EMOJIS = ["🌸", "💕", "🎀", "✨", "🦋", "🌷", "💗", "🧁", "🎂", "🩷"];

function FloatingBits() {
  const bits = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bits.map((_, i) => {
        const left = (i * 3.7) % 100;
        const duration = 12 + ((i * 7) % 18);
        const delay = -((i * 2.3) % 30);
        const size = 14 + ((i * 5) % 22);
        return (
          <span
            key={i}
            className="animate-float absolute"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </span>
        );
      })}
    </div>
  );
}

function Sparkles() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="animate-sparkle absolute text-2xl"
          style={{
            top: `${10 + i * 13}%`,
            left: `${(i * 17) % 100}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          ✨
        </span>
      ))}
    </>
  );
}

function HeroEyes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-12 md:py-16">
      <motion.div style={{ scale, opacity, y }} className="relative flex flex-col items-center gap-4 md:gap-6 text-center max-w-4xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-display text-xl md:text-3xl text-rose"
        >
          look who's watching...
        </motion.p>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative my-2"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-primary/30 blur-3xl animate-pulse-soft" />
          <img
            src={getAssetUrl(eyes)}
            alt="Her mesmerizing eyes"
            className="animate-blink relative w-[80vw] max-w-lg md:max-w-xl h-52 sm:h-64 md:h-76 rounded-2xl shadow-[0_20px_60px_-15px_oklch(0.72_0.16_15/0.55)] object-cover"
          />
          <span className="absolute -top-5 -right-5 text-4xl md:text-5xl animate-wobble">🩷</span>
          <span className="absolute -bottom-3 -left-3 text-3xl md:text-4xl animate-wobble" style={{ animationDelay: "0.5s" }}>✨</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif-d text-4xl md:text-6xl text-shadow-soft italic text-foreground leading-tight"
        >
          Happy Birthday, <span className="font-display not-italic text-primary text-5xl md:text-7xl block md:inline mt-1 md:mt-0">Jyothsna</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-4"
        >
          scroll to unwrap your surprise ↓
        </motion.p>
      </motion.div>
    </section>
  );
}

function DateReveal() {
  return (
    <section className="relative flex items-center justify-center px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-3xl rounded-[2.5rem] border border-rose/30 bg-cream/70 p-10 md:p-16 text-center backdrop-blur-xl shadow-[0_20px_60px_-20px_oklch(0.72_0.16_15/0.35)]"
      >
        <Sparkles />
        <p className="font-display text-3xl text-rose">save the date</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:gap-8">
          {["24", "07", "26"].map((n, i) => (
            <motion.div
              key={i}
              initial={{ rotateY: 90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
              className="rounded-2xl bg-primary/90 px-5 md:px-8 py-6 md:py-10 text-primary-foreground shadow-lg"
            >
              <span className="font-serif-d text-5xl md:text-7xl font-bold">{n}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 font-serif-d italic text-xl md:text-2xl text-foreground/80">
          the day the world got a little brighter 🌸
        </p>
      </motion.div>
    </section>
  );
}

function Gallery() {
  const photos = [
    { src: getAssetUrl(heart), cap: "the girl with the biggest heart 💗", rot: -4 },
    { src: getAssetUrl(booth), cap: "main character energy 📸", rot: 3 },
    { src: getAssetUrl(saree), cap: "elegance walks in a saree ✨", rot: -2 },
    { src: getAssetUrl(green1), cap: "twinkle lights & twinkle smile 🌿", rot: 4 },
    { src: getAssetUrl(green2), cap: "pookie mode: activated 🩷", rot: -3 },
    { src: getAssetUrl(jyo2), cap: "unbothered. iconic. 💫", rot: 2 },
    { src: getAssetUrl(jyo1), cap: "soft girl summer ☀️", rot: -2 },
    { src: getAssetUrl(selfie1), cap: "my forever favourite 💕", rot: 3 },
  ];

  return (
    <section className="relative px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-10 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        a <span className="font-display not-italic text-primary text-5xl md:text-7xl">scrapbook</span> of you
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {photos.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 80, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
            whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
            className="group relative rounded-2xl bg-cream p-3 pb-6 shadow-[0_15px_40px_-15px_oklch(0.72_0.16_15/0.4)]"
          >
            <div className="overflow-hidden rounded-xl">
              <img src={p.src} alt={p.cap} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <figcaption className="mt-4 text-center font-display text-xl text-rose">{p.cap}</figcaption>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-rose/40 px-8 py-1 text-xs backdrop-blur-sm">📌</span>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function PopBalloons() {
  const [popped, setPopped] = useState<number[]>([]);
  const balloons = [
    { c: "oklch(0.85 0.14 15)", msg: "kindest soul 🌸" },
    { c: "oklch(0.82 0.12 355)", msg: "funniest human 😹" },
    { c: "oklch(0.88 0.10 60)", msg: "prettiest smile ✨" },
    { c: "oklch(0.80 0.14 340)", msg: "biggest heart 💗" },
    { c: "oklch(0.85 0.11 20)", msg: "coolest bestie 🩷" },
    { c: "oklch(0.82 0.13 5)", msg: "forever iconic 👑" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        pop a <span className="font-display not-italic text-primary text-5xl md:text-7xl">balloon</span>
      </motion.h2>
      <p className="mb-8 text-center text-muted-foreground">tap each one to reveal a reason you're loved</p>

      <div className="grid w-full max-w-4xl grid-cols-3 gap-4 md:gap-8">
        {balloons.map((b, i) => {
          const isPopped = popped.includes(i);
          return (
            <motion.button
              key={i}
              onClick={() => !isPopped && setPopped((p) => [...p, i])}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" } }}
              className="relative flex aspect-[3/4] items-center justify-center rounded-[50%_50%_50%_50%/60%_60%_40%_40%] p-4 text-center shadow-lg transition-all"
              style={{
                backgroundColor: isPopped ? "transparent" : b.c,
                border: isPopped ? "2px dashed oklch(0.72 0.16 15 / 0.4)" : "none",
              }}
            >
              {isPopped ? (
                <motion.span
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="font-display text-2xl md:text-3xl text-primary"
                >
                  {b.msg}
                </motion.span>
              ) : (
                <span className="font-display text-2xl md:text-3xl text-white/95">pop me!</span>
              )}
              {!isPopped && (
                <span className="absolute -bottom-3 left-1/2 h-6 w-[1px] -translate-x-1/2 bg-foreground/30" />
              )}
            </motion.button>
          );
        })}
      </div>
      {popped.length === balloons.length && (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 font-display text-3xl text-rose"
        >
          and a million more reasons 🎀
        </motion.p>
      )}
    </section>
  );
}

function Cake() {
  const [blown, setBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBlow = () => {
    setBlown(true);
    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 20);
  };

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        make a <span className="font-display not-italic text-primary text-5xl md:text-7xl">wish</span>
      </motion.h2>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="flex justify-center gap-6 pb-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              {!blown && (
                <motion.div
                  animate={{ scaleY: [1, 1.2, 1], scaleX: [1, 0.9, 1] }}
                  transition={{ duration: 0.6 + i * 0.1, repeat: Infinity }}
                  className="mb-1 h-6 w-3 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-white shadow-[0_0_20px_oklch(0.85_0.18_60)]"
                />
              )}
              <div className="h-12 w-2 rounded-sm bg-rose" />
            </div>
          ))}
        </div>
        <div className="w-72 md:w-96">
          <div className="h-16 rounded-t-3xl bg-gradient-to-b from-white to-blush border-4 border-b-0 border-rose/40 flex items-end justify-around px-4 pb-1">
            {Array.from({ length: 6 }).map((_, i) => <span key={i} className="text-lg">🩷</span>)}
          </div>
          <div className="h-20 bg-primary/90 flex items-center justify-center">
            <span className="font-display text-3xl md:text-4xl text-primary-foreground">Jyothsna 💕</span>
          </div>
          <div className="h-6 bg-rose/70 rounded-b-lg" />
        </div>

        <motion.button
          onClick={handleBlow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto mt-10 block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg cursor-pointer"
        >
          {blown ? "wish granted ✨" : "blow the candles"}
        </motion.button>
      </motion.div>

      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * (360 / 48) + ((i * 17) % 15)) * (Math.PI / 180);
            const distance = 140 + ((i * 29) % 360);
            const deltaX = Math.cos(angle) * distance;
            const deltaY = Math.sin(angle) * distance - 40;
            const scalePeak = 1.1 + (i % 4) * 0.25;
            const duration = 2.2 + (i % 5) * 0.15;
            const delay = (i % 8) * 0.03;

            return (
              <motion.span
                key={i}
                initial={{ left: "50%", top: "50%", scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                animate={{
                  x: `calc(-50% + ${deltaX}px)`,
                  y: `calc(-50% + ${deltaY}px)`,
                  scale: [0, scalePeak, scalePeak * 0.9, scalePeak * 0.5, 0],
                  opacity: [0, 1, 1, 0.7, 0],
                  rotate: [0, (i % 2 === 0 ? 1 : -1) * 360],
                }}
                transition={{ duration, ease: "easeOut", delay }}
                className="absolute text-3xl md:text-5xl select-none"
              >
                {EMOJIS[i % EMOJIS.length]}
              </motion.span>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ScratchCards() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const coupons = [
    { title: "Unlimited Laughs 😂", desc: "Valid anytime you need a good laugh, funny memes, or silly jokes!", code: "LAUGH-FOREVER" },
    { title: "Coffee & Dessert Treat ☕️🧁", desc: "One free café date on me — any dessert you want!", code: "SWEET-TREAT" },
    { title: "Movie & Snack Pass 🍿🎬", desc: "Late night binge session with all your favourite snacks!", code: "BINGE-NIGHT" },
    { title: "Roadtrip / Shopping Day 🚗🛍️", desc: "A fun day out exploring new spots together!", code: "BESTIE-DAY" },
  ];

  const toggleReveal = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed((prev) => [...prev, index]);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        scratch & <span className="font-display not-italic text-primary text-5xl md:text-7xl">reveal</span>
      </motion.h2>
      <p className="mb-8 text-center text-muted-foreground">tap each scratch card to unlock your birthday coupons 🎟️</p>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {coupons.map((c, i) => {
          const isRevealed = revealed.includes(i);

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleReveal(i)}
              className="relative min-h-[160px] cursor-pointer overflow-hidden rounded-3xl border border-rose/30 bg-cream/90 p-6 shadow-lg backdrop-blur-xl transition-all"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="rounded-full bg-rose/20 px-3 py-1 text-xs font-bold text-rose">
                    COUPON #{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-rose">{c.title}</h3>
                  <p className="mt-1 font-serif-d italic text-sm text-foreground/80">{c.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-rose/20 pt-2 text-xs font-mono text-muted-foreground">
                  <span>Pass: {c.code}</span>
                  <span className="text-rose font-semibold">REDEEMABLE ANYTIME ✨</span>
                </div>
              </div>

              {!isRevealed && (
                <motion.div
                  initial={false}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-rose via-primary to-rose/90 p-6 text-center text-primary-foreground shadow-inner"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl mb-2"
                  >
                    ✨🪙
                  </motion.div>
                  <p className="font-display text-2xl font-bold tracking-wide">Scratch Card #{i + 1}</p>
                  <p className="mt-1 text-xs opacity-90 uppercase tracking-widest">Tap to Scratch & Reveal 🌸</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function SurpriseGift() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        unwrap your <span className="font-display not-italic text-primary text-5xl md:text-7xl">surprise</span>
      </motion.h2>
      <p className="mb-8 text-center text-muted-foreground">tap the gift box to open your special birthday award 🎁</p>

      <div className="flex flex-col items-center">
        {!opened ? (
          <motion.div
            whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(true)}
            className="group relative cursor-pointer flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="z-10 -mb-4 text-6xl drop-shadow-md"
            >
              🎀
            </motion.div>

            <div className="h-10 w-44 rounded-t-2xl bg-gradient-to-r from-rose via-primary to-rose shadow-md border-b-2 border-white/40 flex items-center justify-center">
              <div className="h-full w-6 bg-amber-300/80" />
            </div>

            <div className="relative h-36 w-40 rounded-b-2xl bg-gradient-to-b from-primary via-rose to-primary shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="h-full w-6 bg-amber-300/80" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <span className="mt-4 rounded-full bg-cream/90 px-4 py-1.5 font-display text-sm text-rose shadow-md border border-rose/30">
              Tap to open gift 🎁
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative max-w-md w-full rounded-[2.5rem] border border-rose/40 bg-cream/95 p-8 text-center backdrop-blur-xl shadow-2xl"
          >
            <Sparkles />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl mb-4"
            >
              👑🏆
            </motion.div>

            <span className="rounded-full bg-primary/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Official Award Certificate
            </span>

            <h3 className="mt-4 font-display text-3xl md:text-4xl text-rose">
              Best Friend Of The Universe
            </h3>

            <p className="mt-3 font-serif-d italic text-lg md:text-xl text-foreground/80 leading-relaxed">
              "Awarded to Jyothsna for being certified iconic, having the kindest heart, and spreading infinite sunshine everywhere."
            </p>

            <div className="mt-6 flex justify-center gap-1 text-2xl">
              {"⭐️⭐️⭐️⭐️⭐️".split("").map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            <button
              onClick={() => setOpened(false)}
              className="mt-6 rounded-full bg-primary/10 hover:bg-primary/20 px-5 py-2 text-xs font-semibold text-rose transition-colors cursor-pointer"
            >
              Wrap back in box 🎁
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function LoveNotes() {
  const notes = [
    { t: "for your laugh", b: "the one that turns a bad day into a bearable one, and a good day into a memory." },
    { t: "for your loyalty", b: "you show up. always. that's the rarest thing a person can be." },
    { t: "for your dreams", b: "keep chasing them. i'll be the loudest voice cheering in the back." },
  ];
  return (
    <section className="relative px-6 py-10 md:py-14">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-10 text-center font-serif-d italic text-4xl md:text-6xl"
      >
        little <span className="font-display not-italic text-primary text-5xl md:text-7xl">love notes</span>
      </motion.h2>

      <div className="mx-auto max-w-4xl space-y-8">
        {notes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
            className={`relative rounded-3xl bg-cream/80 p-8 md:p-10 shadow-lg backdrop-blur ${i % 2 === 0 ? "md:mr-24" : "md:ml-24"}`}
          >
            <p className="font-display text-3xl md:text-4xl text-rose">{n.t}</p>
            <p className="mt-3 font-serif-d italic text-lg md:text-xl leading-relaxed text-foreground/80">{n.b}</p>
            <span className="absolute -top-4 right-6 text-3xl">💌</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalWish() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-14 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4 }}
        className="relative max-w-3xl text-center"
      >
        <div className="mb-8 inline-block rounded-full border border-rose/40 bg-cream/70 px-6 py-2 font-display text-2xl text-rose backdrop-blur">
          24 · 07 · a whole day for you
        </div>

        <blockquote className="font-serif-d italic text-3xl md:text-5xl leading-tight text-foreground text-shadow-soft">
          "and suddenly, all the songs were about her —
          <br />
          <span className="text-primary">the girl the sun woke up for."</span>
        </blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 font-display text-4xl md:text-6xl text-rose"
        >
          Happy Birthday, Jyothsna 💕
        </motion.p>

        <p className="mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed text-foreground/70">
          may your year be soft and shimmery, full of small joys, big laughs,
          quiet mornings, chaotic nights, and every dream you've been whispering to yourself.
        </p>

        <p className="mt-10 font-display text-2xl text-muted-foreground">
          with all my love,
          <br />
          <span className="text-rose text-3xl">your bestie 🩷</span>
        </p>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 text-5xl"
        >
          🎂🎀🌸
        </motion.div>
      </motion.div>
    </section>
  );
}

function BirthdayPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <main className="relative overflow-x-hidden">
      {ready && <FloatingBits />}
      <div className="relative z-10">
        <HeroEyes />
        <BirthdayTimer />
        <DateReveal />
        <Gallery />
        <PopBalloons />
        <Cake />
        <ScratchCards />
        <SurpriseGift />
        <LoveNotes />
        <FinalWish />
      </div>
      <MusicToggle />
    </main>
  );
}
