"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  const youtubeVideoId = "i60Vsd9i508";

  useEffect(() => {
    // Function to initialize YouTube player instance
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-hero-player", {
          videoId: youtubeVideoId,
          playerVars: {
            autoplay: 0,
            mute: 1,
            loop: 1,
            playlist: youtubeVideoId,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              event.target.mute();
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load YouTube IFrame API script dynamically
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const scrollToMission = () => {
    const section = document.getElementById("mission-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.videoHeroContainer}>
      {/* Background YouTube Video Player Container */}
      <div className={styles.videoWrapper}>
        <div id="youtube-hero-player" className={styles.youtubeIframe} />
      </div>

      {/* Dark Overlay Gradient Mask (Fades to bright when video is playing) */}
      <div
        className={`${styles.videoOverlay} ${
          isPlaying ? styles.overlayBright : styles.overlayDark
        }`}
      />

      {/* Hero Content Box (Fades out when video is playing, fades in on pause or hover) */}
      <div
        className={`${styles.videoContent} container ${
          isPlaying ? styles.contentFaded : styles.contentVisible
        }`}
      >
        <h1 className={styles.storyTitle}>
          Every Girl Deserves to <br />
          <span className={styles.highlightText}>Write Her Own Story</span>
        </h1>

        <p className={styles.storyTagline}>
          Watch how community action, safe shelters, and legal defense are rescuing young girls from child marriage and opening doors to education.
        </p>

        {/* Floating Scroll Cue to Mission */}
        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToMission}
          aria-label="Scroll to discover our mission"
        >
          <span className={styles.scrollText}>Discover Our Mission</span>
          <span className={styles.scrollArrow}>↓</span>
        </button>
      </div>

      {/* Waves For Water Inspired Floating Media Controls */}
      <div className={styles.heroControlsFloating}>
        {/* Play/Pause Control */}
        <button
          type="button"
          className={styles.floatingControlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Story Video" : "Play Story Video"}
        >
          <span className={styles.controlIcon}>{isPlaying ? "⏸" : "▶"}</span>
          <span className={styles.controlLabel}>{isPlaying ? "Pause" : "Play Story"}</span>
        </button>

        {/* Mute/Unmute Control */}
        <button
          type="button"
          className={styles.floatingControlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          <span className={styles.controlIcon}>{isMuted ? "🔇" : "🔊"}</span>
          <span className={styles.controlLabel}>{isMuted ? "Unmute" : "Sound On"}</span>
        </button>
      </div>
    </section>
  );
}
