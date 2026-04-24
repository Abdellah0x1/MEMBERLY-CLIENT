import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Pricing from '../components/Pricing';
import { Activity, Users, CreditCard, Bell, ChevronRight, Zap, Smartphone, CheckCircle2, Lock, MessageCircle, ChevronDown } from 'lucide-react';
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

const FeatureBentoCard = ({ title, desc, icon: Icon, className, children }: { title: string, desc: string, icon: any, className?: string, children?: React.ReactNode }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[#050505] p-8 md:p-10 transition-colors group ${className || ''}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,255,83,0.1), transparent 40%)`,
                }}
            />
            {/* The actual content */}
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <div className="h-16 w-16 mb-8 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white group-hover:text-neon shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] transition-all duration-500">
                    <Icon size={28} strokeWidth={1.5} />
                </div>
                
                {children && (
                    <div className="flex-1 flex items-center justify-center w-full py-4 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                        {children}
                    </div>
                )}
                
                <div className="mt-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-neon transition-colors duration-500">{title}</h3>
                    <p className="text-slate text-lg font-medium leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    );
};

const LogoCloud = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden whitespace-nowrap relative flex">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
            <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                className="inline-flex gap-24 items-center px-12"
            >
                {['PULSEFIT', 'IRONCORE', 'ELEVATE', 'OXYGEN', 'TITAN', 'VELOCITY', 'PULSEFIT', 'IRONCORE', 'ELEVATE', 'OXYGEN', 'TITAN', 'VELOCITY'].map((logo, i) => (
                    <span key={i} className="text-2xl font-black tracking-widest text-white/20">{logo}</span>
                ))}
            </motion.div>
        </section>
    );
};

const ROIData = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            {[
                { value: "30%", label: "Fewer failed payments" },
                { value: "15h", label: "Admin hours saved weekly" },
                { value: "2.4x", label: "Faster onboarding" }
            ].map((stat, i) => (
                <div key={i} className="text-center flex-1">
                    <h3 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 mb-4">{stat.value}</h3>
                    <p className="text-slate font-medium text-lg uppercase tracking-widest">{stat.label}</p>
                </div>
            ))}
        </section>
    );
};

const DashboardShowcase = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">See your empire at a glance.</h2>
                <p className="text-xl text-slate">A command center designed for absolute clarity.</p>
            </div>
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-2xl p-6 md:p-10"
            >
                <div className="flex justify-between items-center border-b border-white/5 pb-6 mb-8">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10" />
                        <div className="flex flex-col gap-2 justify-center">
                            <div className="w-32 h-3 bg-white/20 rounded-full" />
                            <div className="w-20 h-2 bg-white/10 rounded-full" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-24 h-10 rounded-full bg-neon/20 border border-neon/30" />
                        <div className="w-10 h-10 rounded-full bg-white/5" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                        <div className="h-48 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/5 p-6 flex flex-col justify-end">
                            <div className="w-full h-1/2 border-b border-dashed border-white/10 relative">
                                <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0,100 L20,80 L40,90 L60,40 L80,50 L100,10" fill="none" stroke="rgba(168, 255, 83, 0.8)" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                                    <path d="M0,100 L20,80 L40,90 L60,40 L80,50 L100,10 L100,100 Z" fill="rgba(168, 255, 83, 0.1)" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5">
                                <div className="w-8 h-8 rounded-full bg-white/10 mb-4"/>
                                <div className="w-24 h-6 bg-white/20 rounded-md mb-2"/>
                                <div className="w-16 h-3 bg-white/10 rounded-md"/>
                            </div>
                            <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5">
                                <div className="w-8 h-8 rounded-full bg-neon/20 mb-4"/>
                                <div className="w-20 h-6 bg-white/20 rounded-md mb-2"/>
                                <div className="w-16 h-3 bg-neon/50 rounded-md"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-white/10"/>
                                <div className="flex-1">
                                    <div className="w-20 h-3 bg-white/20 rounded-full mb-2"/>
                                    <div className="w-12 h-2 bg-white/10 rounded-full"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const MemberExperience = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neon">
                    <Smartphone size={14} /> The Client App
                </div>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Give your members an <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-white">Apple-like</span> experience.
                </h2>
                <p className="text-xl text-slate leading-relaxed">
                    Say goodbye to plastic cards. Members access the gym, book classes, and upgrade plans seamlessly from their own devices.
                </p>
                <div className="space-y-4 pt-4">
                    {[
                        "Dynamic QR Access Control",
                        "One-Tap Class Booking",
                        "Automated Billing Management"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 text-white">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-neon/20 text-neon">
                                <CheckCircle2 size={14} />
                            </div>
                            <span className="font-medium text-lg">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex justify-center relative" style={{ perspective: 1000 }}>
                <motion.div 
                    initial={{ rotateY: 20, rotateX: 10, y: 50, opacity: 0 }}
                    whileInView={{ rotateY: -10, rotateX: 5, y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-72 h-[600px] border-[12px] border-slate-900 bg-black rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-full z-20" />
                    <div className="pt-16 px-6 relative z-10 flex flex-col h-full bg-void">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-slate text-xs uppercase tracking-widest mb-1">Welcome back</p>
                                <h3 className="text-xl font-bold">Aarav M.</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-white/5" />
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="w-48 h-48 bg-white rounded-3xl p-4 flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 bg-neon blur-2xl opacity-20" />
                                <div className="w-full h-full bg-black relative rounded-xl flex items-center justify-center">
                                    <Zap className="text-neon w-12 h-12" />
                                </div>
                            </div>
                            <p className="text-sm text-slate animate-pulse">Scanning...</p>
                        </div>
                        <div className="mt-auto mb-8 bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate">Status</p>
                                <p className="text-sm font-bold text-neon">Pro Active</p>
                            </div>
                            <ChevronRight size={16} className="text-slate" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Integrations = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto text-center border-t border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Plug into reality.</h2>
            <p className="text-xl text-slate max-w-2xl mx-auto mb-20">
                MEMBERLY bridges your physical space with your digital tools. From smart doors to payment processors.
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-20 items-center">
                {[
                    { icon: CreditCard, label: "Payments" },
                    { icon: Lock, label: "Access Control" },
                    { icon: MessageCircle, label: "WhatsApp Bots" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 text-slate hover:text-white transition-colors duration-300">
                        <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-lg hover:bg-white/10 transition-colors">
                            <item.icon size={32} />
                        </div>
                        <span className="font-medium tracking-wide">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = [
        { q: "How hard is it to migrate my data from my old software?", a: "Effortless. Our dedicated onboarding team handles complete data imports from Mindbody, Zen Planner, and others within 24 hours. Zero downtime." },
        { q: "Are there any hidden transaction fees?", a: "Absolutely not. Transparency is our core aesthetic. We charge a flat monthly fee, and standard Stripe processing fees apply natively—we don't skim off the top." },
        { q: "Does MEMBERLY integrate with my physical turnstiles?", a: "Yes. Our Access Control module pairs flawlessly with leading RFID readers, barcode scanners, and Bluetooth door relays." },
        { q: "What if my internet goes down?", a: "For physical access, we support edge-caching hardware that keeps your doors operating independently of active internet connections." }
    ];

    return (
        <section className="py-32 px-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Frequently asked.</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                        <div 
                            className="p-6 flex items-center justify-between cursor-pointer group"
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        >
                            <h3 className="font-medium text-lg text-white group-hover:text-neon transition-colors">{faq.q}</h3>
                            <ChevronDown className={`text-slate transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-neon' : ''}`} />
                        </div>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 text-slate leading-relaxed border-t border-white/5 pt-4"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Home = (): React.JSX.Element => {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const mainRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.features-heading',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    ease: "power3.out",
                    scrollTrigger: { trigger: "#features", start: "top 85%", end: "top 50%", scrub: 1 }
                }
            );

            const featureCards = gsap.utils.toArray('.feature-card');
            featureCards.forEach((card: any, index: number) => {
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
            <nav className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out will-change-transform overflow-hidden ${
                isScrolled 
                    ? "top-4 w-[90%] max-w-4xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full h-16 shadow-[0_12px_40px_rgba(0,0,0,0.5)]" 
                    : "top-6 w-[95%] max-w-7xl bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl h-20 shadow-2xl"
            }`}>
                {/* Premium Inner Light Leak */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-24 bg-neon/20 blur-[40px] pointer-events-none" />
                
                <div className="relative z-10 px-6 sm:px-8 w-full h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className={`text-neon transition-all duration-500 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
                        <span className={`font-bold tracking-tight text-white transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-xl'}`}>MEMBERLY</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#access" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
                    </div>
                    {user ?
                        <NavLink to={user.role == "owner" ? "/dashboard" : user.role == "member" ? "/customer" : "/coach"} className={`text-sm font-semibold bg-white text-void rounded-full hover:scale-105 transition-all duration-300 ${isScrolled ? 'px-4 py-2' : 'px-5 py-2.5'}`}>
                            Dashboard
                        </NavLink> :
                        <div className="flex items-center gap-4">
                            <NavLink to="/login" className="text-sm font-medium text-white hover:text-neon transition-colors hidden sm:block">
                                Sign In
                            </NavLink>
                            <NavLink to="/dashboard" className={`text-sm font-semibold bg-white text-void rounded-full hover:scale-105 transition-all duration-300 ${isScrolled ? 'px-4 py-2' : 'px-5 py-2.5'}`}>
                                Get Started
                            </NavLink>
                        </div>
                    }
                </div>
            </nav>

            {/* Apple-Style Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                >
                    {/* Image layer at absolute bottom */}
                    <img src={hero} alt="Gym Hero" className="absolute inset-0 w-full h-full object-cover scale-105 opacity-20 grayscale" />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-void/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-void/50 to-void" />

                    {/* Liquid Aurora Fluid Mesh Behind Text */}
                    <motion.div 
                        animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1],
                            x: ['-50%', '-45%', '-55%', '-50%'],
                            y: ['-60%', '-55%', '-65%', '-60%'],
                            borderRadius: ["45% 55% 70% 30%", "30% 70% 40% 60%", "60% 40% 30% 70%", "45% 55% 70% 30%"]
                        }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-[70vw] max-w-[900px] h-[40vh] max-h-[400px] bg-neon/20 filter blur-[130px] opacity-70 mix-blend-screen pointer-events-none" 
                    />
                    
                    <motion.div 
                        animate={{
                            rotate: [360, 180, 0],
                            scale: [1, 1.3, 0.9, 1],
                            x: ['-50%', '-60%', '-40%', '-50%'],
                            y: ['-50%', '-60%', '-40%', '-50%'],
                            borderRadius: ["60% 40% 30% 70%", "45% 55% 70% 30%", "30% 70% 40% 60%", "60% 40% 30% 70%"]
                        }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-[50vw] max-w-[700px] h-[35vh] max-h-[350px] bg-[#8eff00]/20 filter blur-[100px] opacity-60 mix-blend-plus-lighter pointer-events-none" 
                    />
                    
                    <motion.div 
                        animate={{
                            rotate: [0, 90, 270, 360],
                            scale: [0.8, 1.1, 0.9, 0.8],
                            x: ['-50%', '-50%', '-50%', '-50%'],
                            y: ['-55%', '-55%', '-55%', '-55%'],
                            borderRadius: ["30% 70% 70% 30%", "50% 50% 20% 80%", "70% 30% 40% 60%", "30% 70% 70% 30%"]
                        }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-[30vw] max-w-[400px] h-[25vh] max-h-[250px] bg-emerald-400/15 filter blur-[90px] opacity-50 mix-blend-screen pointer-events-none" 
                    />
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

            {/* Logo Cloud - NEW */}
            <LogoCloud />

            {/* Premium Interactive Bento Grid */}
            <section id="features" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto my-10">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="features-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
                        Everything you need.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10">Nothing you don't.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureBentoCard 
                        icon={Users} 
                        title="Member Intelligence." 
                        desc="Unified profiles wrapping every aspect of a member's journey, from entry to exit."
                        className="md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[450px]"
                    >
                        {/* Mock UI Profile abstract for "Intelligence" */}
                        <div className="w-full max-w-sm rounded-[2rem] bg-white/[0.01] border border-white/5 p-6 flex flex-col gap-6 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/10 blur-[50px] rounded-full" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="w-32 h-4 bg-white/20 rounded-full mb-3" />
                                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-2 relative z-10">
                                 <div className="h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05]" />
                                 <div className="h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05]" />
                            </div>
                        </div>
                    </FeatureBentoCard>
                    <FeatureBentoCard 
                        icon={CreditCard} 
                        title="Frictionless Billing." 
                        desc="Automated, seamless subscription tiers and payment loops."
                        className="md:col-span-1 md:row-span-1 min-h-[250px]"
                    />
                    <FeatureBentoCard 
                        icon={Activity} 
                        title="Historical Tracking." 
                        desc="A zero-latency, crystalline view of all financial interactions."
                        className="md:col-span-1 md:row-span-1 min-h-[250px]"
                    />
                    <FeatureBentoCard 
                        icon={Bell} 
                        title="Proactive Telemetry." 
                        desc="Intelligent, automated alerts for renewals and lapsing accounts before they drop off."
                        className="md:col-span-3 min-h-[220px]"
                    >
                        {/* Abstract Notification Pulse */}
                        <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-64 h-32 bg-gradient-to-r from-transparent to-white/[0.02] rounded-[2.5rem] items-center justify-end pr-8 border-y border-r border-white/5 group-hover:border-neon/20 transition-colors duration-700">
                            <div className="relative">
                                <Bell size={40} className="text-white/20 group-hover:text-neon transition-colors duration-700" />
                                <div className="absolute top-0 right-0 w-3 h-3 bg-neon rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_10px_#a8ff53]" />
                            </div>
                        </div>
                    </FeatureBentoCard>
                </div>
            </section>

            <DashboardShowcase />
            <MemberExperience />
            <Integrations />
            <ROIData />

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

            <FAQ />

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
