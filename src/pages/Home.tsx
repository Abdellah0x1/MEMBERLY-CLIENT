import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Pricing from '../components/Pricing';
import { Activity, Users, CreditCard, Bell, ChevronRight, Zap } from 'lucide-react';
import hero from "../assets/hero.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../hooks/useAuth';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Aarav Mehta',
        role: 'PulseFit Studio',
        quote: 'Everything is tracked in one place. My team saves hours every single week.'
    },
    {
        name: 'Neha Kapoor',
        role: 'IronCore Gym',
        quote: 'Members pay on time and follow-ups are almost zero. Incredible simplicity.'
    },
    {
        name: 'Rohit Singh',
        role: 'FitZone',
        quote: 'We moved from spreadsheets in a day. Clean, fast, and effortlessly modern.'
    }
];

const words = ["Beautifully.", "Effortlessly.", "Powerfully.", "Seamlessly."];

const Home = (): React.JSX.Element => {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const mainRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const {user} = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.features-heading',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    ease: "power3.out",
                    scrollTrigger: { trigger: "#features", start: "top 85%", end: "top 50%", scrub: 1 }
                }
            );

            const featureCards = gsap.utils.toArray('.feature-card');
            featureCards.forEach((card: any, index) => {
                gsap.fromTo(card,
                    { y: 120, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 70%",
                            scrub: 1
                        }
                    }
                );
            });

            gsap.fromTo('.reviews-heading',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    ease: "power3.out",
                    scrollTrigger: { trigger: "#reviews", start: "top 90%", end: "top 60%", scrub: 1 }
                }
            );

            const testimonialCards = gsap.utils.toArray('.testimonial-card');
            testimonialCards.forEach((card: any, index) => {
                gsap.fromTo(card,
                    { y: 100, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 75%",
                            scrub: 1
                        }
                    }
                );
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-void text-ghost min-h-screen selection:bg-neon selection:text-void font-sans">

            {/* Minimalist Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-void/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <Activity className="text-neon" size={24} />
                        <span className="font-bold text-xl tracking-tight text-white">MEMBERLY</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#access" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
                    </div>
                    {user ? 
                    <NavLink to="/dashboard" className="text-sm font-semibold bg-white text-void px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300">
                        Dashboard
                    </NavLink> :
                    <div className="flex items-center gap-4">
                        <NavLink to="/login" className="text-sm font-medium text-white hover:text-neon transition-colors hidden sm:block">
                            Sign In
                        </NavLink>
                        <NavLink to="/dashboard" className="text-sm font-semibold bg-white text-void px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300">
                            Get Started
                        </NavLink>
                    </div>  
                    }
                </div>
            </nav>

            {/* Apple-Style Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    {/* Using the hero image but desaturating and darkening it heavily for the premium stark look */}
                    <div className="absolute inset-0 bg-void/90 z-10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-void/50 to-void z-20" />
                    <img src={hero} alt="Gym Hero" className="w-full h-full object-cover scale-105 opacity-40 grayscale" />
                </motion.div>

                <div className="relative z-30 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neon mb-8"
                    >
                        <Zap size={14} /> Output Maximized.
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-8"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                            Run your gym.
                        </span> <br />
                        <span className="inline-grid w-full relative">
                            <AnimatePresence>
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: "40%", opacity: 0, filter: "blur(8px)" }}
                                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: "-40%", opacity: 0, filter: "blur(8px)" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 pb-4"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg sm:text-2xl text-slate max-w-2xl mx-auto font-medium leading-relaxed mb-12"
                    >
                        Subscriptions, payments, and renewals combined into a single, effortless dashboard. Experience the power of total simplicity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <NavLink to="/dashboard" className="group flex items-center justify-center gap-2 bg-white text-void text-lg font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300">
                            Start Operating
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </NavLink>
                    </motion.div>
                </div>
            </section>

            {/* Premium Features Grid (Apple-like "Bento Box" vibe) */}
            <section id="features" className="py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto bg-smoke/20 rounded-[3rem] my-10 border border-white/5">
                <div className="text-center mb-24">
                    <h2 className="features-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Everything you need.<br />
                        <span className="text-slate">Nothing you don't.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {[
                        { icon: Users, title: 'Member Intelligence', desc: 'Unified profiles wrapping every aspect of a member’s journey.' },
                        { icon: CreditCard, title: 'Frictionless Billing', desc: 'Automated, seamless subscription tiers and payment loops.' },
                        { icon: Activity, title: 'Historical Tracking', desc: 'A crystalline view of financial interactions and receipts.' },
                        { icon: Bell, title: 'Proactive Telemetry', desc: 'Automated alerts for renewals and lapsing accounts.' }
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="feature-card bg-white/[0.02] border border-white/[0.05] p-10 md:p-12 rounded-[2rem] hover:bg-white/[0.04] transition-colors group"
                        >
                            <div className="h-16 w-16 mb-8 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:text-neon group-hover:scale-110 transition-all duration-500">
                                <feature.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-slate text-lg leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Existing Pricing Component */}
            <Pricing />

            {/* Sleek Testimonials */}
            <section id="reviews" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto">
                <h2 className="reviews-heading text-4xl md:text-5xl font-bold tracking-tight text-center mb-20">
                    Trusted by the elite.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="testimonial-card p-10 border border-white/5 bg-void rounded-[2rem] flex flex-col justify-between"
                        >
                            <p className="text-xl leading-relaxed text-ghost mb-12">&ldquo;{testimonial.quote}&rdquo;</p>
                            <div>
                                <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                                <p className="text-slate text-sm font-medium">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Apple-esque Minimal Footer */}
            <footer className="border-t border-white/5 py-12 px-6 text-center text-slate">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Activity className="text-slate" size={20} />
                        <span className="font-bold text-lg tracking-tight">MEMBERLY</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="mailto:support@memberly.com" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <div className="text-sm">
                        © {new Date().getFullYear()} Memberly Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
