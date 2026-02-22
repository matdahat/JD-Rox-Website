import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic2, Activity, Disc3, Radio, PlayCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* --- Micro UIs --- */

const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, text: "UK DNA", desc: "Soulshaker Heritage" },
        { id: 2, text: "2026", desc: "Digital Era Native" },
        { id: 3, text: "Vocal", desc: "Emotion First" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
            {cards.map((card, i) => {
                return (
                    <div
                        key={card.id}
                        className="absolute w-full max-w-[200px] aspect-[4/3] bg-background text-textDark border border-primary/10 rounded-[2rem] p-5 shadow-xl flex flex-col justify-end transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                            transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
                            zIndex: 10 - i,
                            opacity: 1 - i * 0.2
                        }}
                    >
                        <div className="text-accent text-[10px] font-mono mb-2">0{card.id}</div>
                        <h4 className="font-sans font-bold text-sm leading-tight">{card.text}</h4>
                        <p className="text-textDark/60 text-[10px] mt-1 font-mono uppercase tracking-tight">{card.desc}</p>
                    </div>
                );
            })}
        </div>
    )
}

const TelemetryTypewriter = () => {
    const msg = "Melodic house production that bridges the gap between radio-ready hooks and peak-time dancefloors.";
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < msg.length) {
            const timeout = setTimeout(() => {
                setDisplayed(prev => prev + msg[index]);
                setIndex(index + 1);
            }, Math.random() * 40 + 30);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayed("");
                setIndex(0);
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [index, msg]);

    return (
        <div className="h-64 flex flex-col p-6 bg-background rounded-[2rem] border border-primary/5 relative shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="font-mono text-xs text-accent uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="font-mono text-sm leading-relaxed text-textDark/80">
                {displayed}
                <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
            </div>
            <Mic2 className="absolute bottom-6 right-6 w-16 h-16 text-primary/5" />
        </div>
    )
}

const CursorProtocolScheduler = () => {
    const containerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: false, delay: 1 });
        tl.fromTo('.anim-cursor', { x: -20, y: 150, opacity: 0 }, { x: 170, y: 55, opacity: 1, duration: 1, ease: 'power2.out' })
            .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
            .to('.day-fri', { backgroundColor: '#FF1A1A', color: '#fff', scale: 1.05, duration: 0.2 }, "-=0.1")
            .to('.anim-cursor', { x: 120, y: 140, duration: 0.8, ease: 'power2.inOut' }, "+=0.5")
            .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
            .to('.btn-save', { backgroundColor: '#FF1A1A', color: '#fff', duration: 0.2 }, "-=0.1")
            .to('.anim-cursor', { opacity: 0, y: 150, duration: 0.5, ease: 'power2.in' }, "+=0.5")
            .to('.day-fri, .btn-save', { backgroundColor: 'transparent', color: 'inherit', scale: 1, duration: 0.5 }, "+=0.5");
    }, { scope: containerRef });

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div ref={containerRef} className="h-64 flex flex-col p-6 relative bg-background rounded-[2rem] border border-primary/5 shadow-xl">
            <div className="grid grid-cols-7 gap-1 mb-auto relative z-0">
                {days.map((d, i) => (
                    <div key={i} className={`flex items-center justify-center aspect-square rounded-lg font-mono text-xs text-textDark/40 border border-primary/5 ${i === 5 ? 'day-fri transition-colors' : ''}`}>
                        {d}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-end mt-4 relative z-0">
                <div className="font-mono text-xs text-textDark/50">System Target</div>
                <div className="btn-save px-4 py-1.5 rounded-full border border-primary/10 text-xs font-mono text-textDark/60 transition-colors">Deploy</div>
            </div>

            {/* SVG Cursor */}
            <svg className="anim-cursor absolute top-0 left-0 w-6 h-6 z-10 drop-shadow-md" style={{ opacity: 0 }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" className="fill-accent stroke-white" />
            </svg>
        </div>
    )
}


/* --- Main Sections --- */

const Navbar = () => {
    const navRef = useRef(null);

    useGSAP(() => {
        ScrollTrigger.create({
            start: '100px top',
            end: '+=99999',
            onEnter: () => {
                gsap.to(navRef.current, { backgroundColor: 'rgba(240, 239, 244, 0.6)', backdropFilter: 'blur(24px)', border: '1px solid rgba(240, 239, 244, 0.2)', color: '#0A0A14', duration: 0.4 });
            },
            onLeaveBack: () => {
                gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', border: '1px solid transparent', color: '#F0EFF4', duration: 0.4 });
            }
        });
    });

    return (
        <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full flex items-center gap-8 transition-colors text-background w-[90%] md:w-auto justify-between md:justify-center border border-transparent">
            <a href="#" className="font-sans font-bold tracking-tight text-lg hover-lift">JD Rox</a>
            <div className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest opacity-80">
                <a href="#features" className="hover-lift">Features</a>
                <a href="#about" className="hover-lift">About</a>
                <a href="#gallery" className="hover-lift">Gallery</a>
                <a href="#music" className="hover-lift">Music</a>
                <a href="#protocol" className="hover-lift">Protocol</a>
            </div>
            <a href="https://open.spotify.com/artist/6mCxbULJQ2WfUm33gUTTW8?si=2nSqDTErTK-jDLquz9gEQw" target="_blank" rel="noopener noreferrer" className="magnetic-btn bg-accent text-white px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold">
                <span className="relative z-10">Stream</span>
            </a>
        </nav>
    );
};

const HeroSequence = ({ onLoaded, children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Frame Range: 00000000 to 00000192 (Total 193 frames)
    const frameCount = 193;
    const imagesRef = useRef([]);

    // Path Pattern: /assets/hero-seq/JD Rox - Move 1_000000##.webp
    const currentFrame = (index) =>
        `/assets/hero-seq/JD Rox - Move 1_${index.toString().padStart(8, '0')}.webp`;

    useEffect(() => {
        let loadedCount = 0;
        const images = [];

        // Preload all images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    onLoaded(); // Signal parent that loading is done
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame: ${currentFrame(i)}`);
                // Simple error fallback to allow progression
                loadedCount++;
                if (loadedCount === frameCount) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                    onLoaded();
                }
            };
            images.push(img);
        }
    }, [onLoaded]);

    useGSAP(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Initial drawing size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (img) => {
            if (!img || !img.complete || img.naturalWidth === 0) return;
            // Draw image covering the canvas (object-fit: cover equivalent)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };

        // Render first frame immediately
        render(imagesRef.current[0]);

        // Setup ScrollTrigger for 400vh pin
        const frameData = { frame: 0 };

        gsap.to(frameData, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 0.5,
                pin: true,
                start: "top top",
                end: "+=400%", // Pin for 400vh
                onUpdate: () => {
                    requestAnimationFrame(() => {
                        render(imagesRef.current[frameData.frame]);
                    });
                }
            }
        });

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(imagesRef.current[frameData.frame]);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, { dependencies: [imagesLoaded], scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] bg-primary z-10">
            {!imagesLoaded && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black backdrop-blur-md">
                    <div className="font-mono text-accent text-sm tracking-widest uppercase mb-4 animate-pulse">Mastering Visuals...</div>
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="font-mono text-white/50 text-xs mt-2">{progress}%</div>
                </div>
            )}

            {/* Canvas Background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent pointer-events-none"></div>
            </div>

            {/* Content OVER the canvas */}
            <div className="relative z-20 w-full h-full pointer-events-none flex flex-col justify-end items-start p-6 md:p-16 pb-24 md:pb-32">
                <div className="w-full max-w-5xl pointer-events-auto">
                    {children}
                </div>
            </div>
        </section>
    );
};

const Hero = () => {
    const titleText = "JD ROX".split("");

    const [isVisible, setIsVisible] = useState(false);
    const [imagesReady, setImagesReady] = useState(false);

    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        // Wait for both the component to enter viewport and images to finish preloading
        if (!isVisible || !imagesReady) return;

        // Reset elements before animating
        gsap.set(['.hero-text-1', '.hero-char', '.hero-cta'], { clearProps: 'all' });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.hero-text-1', { y: 30, opacity: 0, duration: 1, filter: 'blur(10px)', delay: 0.2 })
            .from('.hero-char', {
                y: 120,
                opacity: 0,
                scale: 0.3,
                rotateZ: "random(-25, 25)",
                rotateX: 90,
                filter: 'blur(20px)',
                stagger: {
                    amount: 0.6,
                    from: "random"
                },
                duration: 1.5,
                ease: 'elastic.out(1, 0.4)'
            }, "-=0.8")
            .to('.hero-char', {
                textShadow: "0px 0px 25px rgba(255, 26, 26, 0.9)",
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                stagger: 0.05
            }, "-=1")
            .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, filter: 'blur(10px)' }, "-=0.5");

    }, { scope: textRef, dependencies: [isVisible, imagesReady] });

    return (
        <HeroSequence onLoaded={() => setImagesReady(true)}>
            <div ref={textRef}>
                <h1 className="flex flex-col mb-8 text-background" style={{ perspective: '1000px' }}>
                    <span className="hero-text-1 block font-sans font-bold text-3xl md:text-5xl lg:text-5xl tracking-tight mb-2 uppercase max-w-lg shadow-black drop-shadow-lg">MASTER OF RENEGADE</span>
                    <span className="font-impact uppercase tracking-wide text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-accent pr-10 md:pr-0 flex flex-wrap">
                        {titleText.map((char, index) => (
                            <span key={index} className="hero-char inline-block cursor-crosshair hover:text-white transition-colors duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                                {char}
                            </span>
                        ))}
                    </span>
                </h1>
                <a href="https://open.spotify.com/track/7yeeEIXcInrF9mJHih8Y9i?si=1924c99decb8436b" target="_blank" rel="noopener noreferrer" className="hero-cta magnetic-btn bg-accent text-white px-8 py-4 rounded-[2rem] font-sans font-semibold text-sm md:text-base flex items-center gap-2 w-fit">
                    <PlayCircle className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Stream Latest Release</span>
                </a>
            </div>
        </HeroSequence>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-32 px-6 md:px-12 bg-primary">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-background rounded-[3rem] p-8 border border-white/5 flex flex-col">
                    <div className="mb-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-textDark">Heritage Meets Future</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-textDark/50">30+ Years UK Dance DNA</p>
                    </div>
                    <div className="mt-auto">
                        <DiagnosticShuffler />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-background rounded-[3rem] p-8 border border-white/5 flex flex-col">
                    <div className="mb-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-textDark">Vocal-Led Club Drive</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-textDark/50">Radio Hooks / Dancefloors</p>
                    </div>
                    <div className="mt-auto">
                        <TelemetryTypewriter />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-background rounded-[3rem] p-8 border border-white/5 flex flex-col">
                    <div className="mb-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-textDark">Atmospheric Sonic</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-textDark/50">High-Fidelity Soundscapes</p>
                    </div>
                    <div className="mt-auto">
                        <CursorProtocolScheduler />
                    </div>
                </div>

            </div>
        </section>
    );
};

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const lines = document.querySelectorAll('.about-line');
        lines.forEach((line) => {
            gsap.from(line, {
                scrollTrigger: {
                    trigger: line,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="relative py-40 px-6 md:px-16 overflow-hidden bg-primary flex items-center min-h-[80dvh]">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=2000" alt="Organic neon texture" className="w-full h-full object-cover opacity-10" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                <div className="md:w-1/3">
                    <h2 className="about-line font-impact uppercase tracking-wide text-4xl md:text-7xl lg:text-8xl text-background leading-[1]">
                        ABOUT
                    </h2>
                    <div className="about-line w-20 h-1 bg-accent mt-6"></div>
                </div>

                <div className="md:w-2/3 flex flex-col gap-6">
                    <p className="about-line font-sans font-medium text-lg leading-relaxed text-background/80">
                        London-based artist JD Rox is currently riding a massive wave of global momentum, carving out a unique space where underground grit meets commercial appeal. Known for his signature "rappy" vocal delivery and sharp lyricism, he has hit the industry sweet spot, becoming one of the most sought-after voices in the electronic scene.
                    </p>
                    <p className="about-line font-sans font-medium text-lg leading-relaxed text-background/80">
                        2025 was a landmark year for JD Rox, yielding dozens of high-profile collaborations with world-class DJs and producers. As we move through 2026, that demand has only intensified, with his calendar filling up as the "go-to" vocal talent for dancefloor anthems.
                    </p>
                    <p className="about-line font-sans font-medium text-lg leading-relaxed text-background/80">
                        His sound is a masterclass in evolution, drawing a direct line from the foundational energy of early Hip House to the heavy-hitting attitude of classics like Renegade Master. Always pushing boundaries, JD Rox remains a true studio devotee, spending his days refining his craft and developing a style that is as nostalgic as it is futuristic.
                    </p>
                    <p className="about-line font-sans font-medium text-lg md:text-xl font-bold text-accent mt-4">
                        With the world's biggest DJs already in his corner, JD Rox is no longer just a name to watch - he is the voice defining the next era of dance music.
                    </p>
                </div>
            </div>
        </section>
    );
};

const ProtocolCard = ({ step, title, desc, animType }) => {
    return (
        <div className="w-full h-[100dvh] flex items-center justify-center sticky top-0 protocol-card p-6">
            <div className="w-full max-w-5xl bg-background rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 aspect-[4/3] md:aspect-[21/9] flex flex-col md:flex-row shadow-[0px_30px_100px_rgba(0,0,0,0.5)]">

                {/* Visualizer Half */}
                <div className="w-full md:w-1/2 bg-primary/5 flex items-center justify-center relative overflow-hidden p-8 border-b md:border-b-0 md:border-r border-primary/10">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/50 to-transparent"></div>
                    {animType === 1 && (
                        <Disc3 className="w-32 h-32 md:w-48 md:h-48 text-accent animate-[spin_10s_linear_infinite]" strokeWidth={1} />
                    )}
                    {animType === 2 && (
                        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-3/4 h-1 bg-primary/20 rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-accent rounded-full animate-[ping_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} ></div>
                                </div>
                            ))}
                        </div>
                    )}
                    {animType === 3 && (
                        <Activity className="w-32 h-32 md:w-48 md:h-48 text-accent" strokeWidth={1} />
                    )}
                </div>

                {/* Content Half */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div className="font-mono text-accent text-sm md:text-base tracking-widest uppercase mb-4">Step {step}</div>
                    <h3 className="font-sans font-bold text-3xl md:text-5xl text-textDark mb-4">{title}</h3>
                    <p className="font-mono text-sm uppercase tracking-tight text-textDark/60 leading-relaxed max-w-md">{desc}</p>
                </div>

            </div>
        </div>
    )
}

const Protocol = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.protocol-card');
        cards.forEach((card, i) => {
            if (i === cards.length - 1) return;

            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                filter: 'blur(20px)',
                scrollTrigger: {
                    trigger: cards[i + 1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section id="protocol" ref={containerRef} className="bg-primary relative pb-32">
            <ProtocolCard
                step="01"
                title="Genesis"
                desc="Heritage soul-driven vocals mapped and recorded with absolute precision."
                animType={1}
            />
            <ProtocolCard
                step="02"
                title="Synthesis"
                desc="Underground club precision engineered into massive low-end structures."
                animType={2}
            />
            <ProtocolCard
                step="03"
                title="Resonance"
                desc="Atmospheric high-fidelity soundscapes deployed to global high-end systems."
                animType={3}
            />
        </section>
    );
};

const Gallery = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const images = gsap.utils.toArray('.gallery-img');

        images.forEach((img) => {
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
                scale: 0.9,
                rotateX: 10,
                duration: 1
            });
        });

        // Parallax effect on scroll
        gsap.to('.gallery-col-1', {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "#gallery",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.gallery-col-2', {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: "#gallery",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <section id="gallery" ref={containerRef} className="py-32 px-6 md:px-12 bg-primary relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background/5 to-transparent pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="font-impact uppercase tracking-wide text-5xl md:text-7xl lg:text-8xl text-background leading-[1]">
                            <span className="text-background/20 block text-2xl md:text-4xl">STUDIO SPACE</span>
                            THE VISION
                        </h2>
                        <div className="w-24 h-1 bg-accent mt-6 mx-auto md:mx-0"></div>
                    </div>
                    <p className="font-mono text-sm uppercase tracking-wider text-background/50 max-w-sm text-center md:text-right">
                        Capturing the raw energy of the creative process. Where ideas become immersive soundscapes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min h-auto max-w-5xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6 gallery-col-1 mt-0 md:mt-16">
                        <div className="relative group overflow-hidden rounded-[2rem] bg-background/5 shadow-2xl aspect-[4/5] gallery-img">
                            <img src="/jd-gallery-5.jpg" alt="JD Rox performing" className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                            <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(255,26,26,0.6)]"></div>
                        </div>
                        <div className="relative group overflow-hidden rounded-[2rem] bg-background/5 shadow-2xl aspect-square gallery-img">
                            <img src="/jd-gallery-2.jpg" alt="JD Rox portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6 gallery-col-2">
                        <div className="relative group overflow-hidden rounded-[2rem] bg-background/5 shadow-2xl aspect-square gallery-img">
                            <img src="/jd-gallery-3.jpg" alt="JD Rox creative" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-top" />
                            <div className="absolute inset-0 border border-accent/20 rounded-[2rem] m-4 pointer-events-none"></div>
                        </div>
                        <div className="relative group overflow-hidden rounded-[2rem] bg-background/5 shadow-2xl aspect-[3/4] gallery-img">
                            <img src="/jd-gallery-4.jpg" alt="JD Rox recording" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Music = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.music-content', {
            scrollTrigger: {
                trigger: '.music-content',
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="music" ref={containerRef} className="py-32 px-6 md:px-16 bg-primary border-t border-white/5 relative overflow-hidden">
            {/* Subtle neon glow behind the player */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="music-content relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center mb-12">
                    <Disc3 className="w-12 h-12 text-accent mb-4 animate-[spin_10s_linear_infinite]" strokeWidth={1} />
                    <h2 className="font-impact uppercase tracking-wide text-4xl md:text-6xl text-background leading-[1] text-center">
                        DISCOGRAPHY
                    </h2>
                    <div className="w-12 h-1 bg-accent mt-6"></div>
                </div>

                <div className="w-full max-w-4xl bg-background/5 p-4 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                    <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/artist/6mCxbULJQ2WfUm33gUTTW8?utm_source=generator&theme=0"
                        width="100%"
                        height="552"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

const EventScene = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to('.event-bg', {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "#event-scene",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <section id="event-scene" ref={containerRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                {/* Direct HTML5 Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover event-bg pointer-events-none opacity-80 scale-110"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-in-front-of-a-stage-at-a-concert-44062-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlays for blending into sections */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary opacity-90 pointer-events-none"></div>
                <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

                {/* Optional subtle vignette effect to draw focus to center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,20,0.8)_100%)] pointer-events-none"></div>
            </div>
        </section>
    );
};

const GetStarted = () => {
    return (
        <section className="py-32 px-6 bg-primary flex items-center justify-center">
            <div className="text-center max-w-2xl flex flex-col items-center">
                <Radio className="w-16 h-16 text-accent mb-8" strokeWidth={1} />
                <h2 className="font-impact uppercase tracking-wide text-5xl md:text-7xl text-background mb-8">Ready to dive in?</h2>
                <a href="https://open.spotify.com/track/7yeeEIXcInrF9mJHih8Y9i?si=1924c99decb8436b" target="_blank" rel="noopener noreferrer" className="magnetic-btn bg-accent text-white px-10 py-5 rounded-[3rem] font-sans font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(255,26,26,0.4)] w-fit">
                    <PlayCircle className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Stream Latest Release on Spotify</span>
                </a>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-textDark text-background pt-24 pb-8 px-8 md:px-16 rounded-t-[4rem] relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
                    <div>
                        <div className="font-sans font-bold text-3xl mb-4 text-white">JD Rox</div>
                        <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-xs leading-relaxed">High-energy melodic house and techno, merging soul-driven vocals with underground club precision.</p>
                    </div>
                    <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                        <a href="#" className="text-white/70 hover:text-accent transition-colors">Instagram</a>
                        <a href="#" className="text-white/70 hover:text-accent transition-colors">Spotify</a>
                        <a href="#" className="text-white/70 hover:text-accent transition-colors">Soundcloud</a>
                    </div>
                    <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                        <a href="#" className="text-white/70 hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/70 hover:text-accent transition-colors">Terms of Service</a>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">© 2026 JD Rox. All rights reserved.</div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/70">System Operational</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function App() {
    // Ensure the body background matches the primary color to blend with the hero
    useEffect(() => {
        document.body.classList.add('bg-primary');
        return () => document.body.classList.remove('bg-primary');
    }, []);

    return (
        <div className="bg-primary min-h-screen selection:bg-accent selection:text-white">
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Gallery />
            <Music />
            <Protocol />
            <EventScene />
            <GetStarted />
            <Footer />
        </div>
    );
}

export default App;
