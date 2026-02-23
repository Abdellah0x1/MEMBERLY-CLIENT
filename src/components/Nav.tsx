import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/requests';
import { toast } from 'react-toastify';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const {user,reload} = useAuth()

  async function Signout(){
    await logout();
    toast.success('Signed Out Sucessfully ')
    reload();
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[90%] max-w-5xl ${
        scrolled ? 'bg-smoke/70 backdrop-blur-xl border border-neon/10' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-neon" />
        <span className="font-sans font-bold tracking-tight text-ghost">MEMBER<span className="text-neon">LY</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Home', 'Features', 'Protocol', 'Access'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-xs uppercase tracking-widest text-slate hover:text-neon transition-colors">
            {item}
          </a>
        ))}
      </div>
      <div className='flex gap-3 items-center'>
        <Link to={user ? "dashboard" :"login"} className="bg-neon btn text-void px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform box-glow">
        {user ? 'Dashboard' : 'Initialize'}
        </Link>
        {user && <button onClick={()=> Signout()} className='border border-neon px-5 py-2 text-xs font-bold transitiona-all hover:scale-105 hover:text-neon rounded-full uppercase' >Sign Out</button>}
      </div>
    </motion.nav>
  );
}