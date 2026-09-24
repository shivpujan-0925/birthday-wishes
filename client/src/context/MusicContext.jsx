import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAfterUnlock, setHasPlayedAfterUnlock] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio('/happy-birthday-music.mpeg');
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => {
      stopMusic();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const playMusicForDuration = (seconds = 15) => {
    if (!audioRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    audioRef.current.currentTime = 0;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setTimeLeft(seconds);

        countdownIntervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdownIntervalRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        timerRef.current = setTimeout(() => {
          stopMusic();
        }, seconds * 1000);
      })
      .catch((err) => {
        console.warn('Audio auto-play prevented or error:', err);
        setIsPlaying(false);
      });
  };

  const stopMusic = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setTimeLeft(0);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      playMusicForDuration(15);
    }
  };

  const triggerUnlockMusic = () => {
    setHasPlayedAfterUnlock(true);
    playMusicForDuration(15);
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        timeLeft,
        playMusicForDuration,
        stopMusic,
        toggleMusic,
        triggerUnlockMusic,
        hasPlayedAfterUnlock,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
