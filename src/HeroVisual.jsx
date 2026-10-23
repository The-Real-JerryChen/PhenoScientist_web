import React, {useState, useEffect, useRef} from 'react';

const HERO_ASSETS = `${import.meta.env.BASE_URL}assets/hero/`;
export default function HeroVisual() {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || failed || !videoRef.current) return;
    let cancelled = false;
    videoRef.current.play().catch(() => {
      if (cancelled) return;
      setFailed(true);
    });
    return () => { cancelled = true; };
  }, [reducedMotion, failed]);

  const still = reducedMotion || failed;
  const description = 'Scientific concept illustration: Cell Painting imagery, an AI Scientist network ring, and a laboratory well plate connected by an experimental feedback loop. Not experimental imagery or results.';
  return <figure className="hero-visual" id="hero-visual">
    <div className="hero-media-frame">
      {still ? <img className="hero-poster" src={`${HERO_ASSETS}poster.jpg`} width="1440" height="810" alt={description}/> :
        <video id="hero-discovery-video" className="hero-video" ref={videoRef} width="1440" height="810"
          autoPlay muted loop playsInline preload="metadata" poster={`${HERO_ASSETS}poster.jpg`}
          aria-label={description} onError={() => setFailed(true)}>
          <source src={`${HERO_ASSETS}phenoagent-hero.webm`} type="video/webm"/>
          <source src={`${HERO_ASSETS}phenoagent-hero.mp4`} type="video/mp4"/>
          <img src={`${HERO_ASSETS}poster.jpg`} width="1440" height="810" alt={description}/>
        </video>}
    </div>
  </figure>;
}
