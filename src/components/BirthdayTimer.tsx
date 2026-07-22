import { useEffect, useState } from "react";
import { motion } from "motion/react";

const TARGET_DATE = new Date("2026-07-24T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  arrived: boolean;
}

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const distance = target - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    arrived: false,
  };
}

function TimerCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-2xl bg-primary/90 px-4 py-5 md:px-7 md:py-8 text-primary-foreground shadow-lg">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif-d text-4xl md:text-6xl font-bold tabular-nums"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/20" />
      </div>
      <span className="mt-3 font-display text-lg md:text-xl text-rose">{label}</span>
    </div>
  );
}

export function BirthdayTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex items-center justify-center px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-4xl rounded-[2.5rem] border border-rose/30 bg-cream/70 p-8 md:p-14 text-center backdrop-blur-xl shadow-[0_20px_60px_-20px_oklch(0.72_0.16_15/0.35)]"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="mb-4 text-4xl"
        >
          ⏰🎂✨
        </motion.div>

        <p className="font-display text-3xl md:text-4xl text-rose">
          the countdown to the magic
        </p>
        <p className="mt-2 font-serif-d italic text-xl md:text-2xl text-foreground/80">
          24 · 07 · 2026
        </p>

        {timeLeft.arrived ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-10"
          >
            <p className="font-serif-d text-4xl md:text-6xl font-bold text-primary text-shadow-soft">
              it’s finally here 🎉
            </p>
            <p className="mt-4 font-display text-2xl text-rose">
              Happy Birthday, Jyothsna! 🎂
            </p>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <TimerCard value={timeLeft.days} label="days" />
            <TimerCard value={timeLeft.hours} label="hours" />
            <TimerCard value={timeLeft.minutes} label="minutes" />
            <TimerCard value={timeLeft.seconds} label="seconds" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
