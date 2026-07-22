import { useEffect, useRef, useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_SONGS = [
  { title: "Your Birthday Song 💕", src: "/birthday-song.mp3" },
  { title: "Birthday Vibes 🎂", src: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc7a09a.mp3?filename=happy-birthday-121490.mp3" },
  { title: "Soft & Dreamy 🌸", src: "https://cdn.pixabay.com/download/audio/2023/06/19/audio_50f4ee2e4d.mp3?filename=cute-and-happy-149203.mp3" },
];

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState(INITIAL_SONGS);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.5;
    if (playing) {
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }, [playing, index]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newSong = { title: `🎵 ${file.name.replace(/\.[^/.]+$/, "")}`, src: url };
      setSongs((prev) => [newSong, ...prev]);
      setIndex(0);
      setPlaying(true);
      setOpen(false);
    }
  };

  const pick = (i: number) => {
    setIndex(i);
    setPlaying(true);
    setOpen(false);
  };

  const current = songs[index];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      <audio
        ref={audioRef}
        src={current?.src}
        loop
        onEnded={() => setPlaying(false)}
      />

      {/* Song Selection Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            className="min-w-[250px] max-w-xs rounded-3xl border border-rose/30 bg-cream/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <p className="mb-3 font-display text-lg text-rose flex items-center justify-between">
              <span>Choose your tune 🎀</span>
            </p>
            <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {songs.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => pick(i)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                      i === index && playing
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-rose/20 text-foreground"
                    }`}
                  >
                    {i === index && playing ? "♪ " : ""}{s.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-rose/20 pt-3">
              <label className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 hover:bg-primary/20 px-3.5 py-2 text-xs font-semibold text-rose cursor-pointer transition-colors">
                <span>📁 Choose Local Audio File</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="flex items-center gap-3">
        {!open && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="rounded-full border border-rose/30 bg-cream/95 px-4 py-2 shadow-lg backdrop-blur text-xs font-display text-rose flex items-center gap-1.5 cursor-pointer"
          >
            <span>{playing ? "Playing: " + current?.title : "Play music 🎵"}</span>
          </motion.button>
        )}

        {/* Larger Music Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause music" : "Play music"}
          className={`relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-rose to-primary text-3xl md:text-4xl text-primary-foreground shadow-[0_10px_30px_-5px_oklch(0.72_0.16_15/0.6)] cursor-pointer transition-all ${
            playing ? "animate-pulse" : ""
          }`}
        >
          {playing ? (
            <span className="text-2xl md:text-3xl">❚❚</span>
          ) : (
            <span className="translate-x-[2px] text-3xl md:text-4xl">▶</span>
          )}

          {/* Glowing music aura ring */}
          {!playing && (
            <span className="absolute -inset-1.5 rounded-full border-2 border-primary/40 animate-ping pointer-events-none" />
          )}
        </motion.button>

        {/* Playlist Song Picker Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((o) => !o)}
          title="Choose song"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-cream/90 border border-rose/30 text-rose shadow-md backdrop-blur text-lg font-bold cursor-pointer"
        >
          🎵
        </motion.button>
      </div>
    </div>
  );
}
