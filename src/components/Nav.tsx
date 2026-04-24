import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/requests';
import { toast } from 'react-toastify';

export default function Nav() {
  const { user, reload } = useAuth();
  const { scrollY } = useScroll();

  // Explicitly shrink the physical height to guarantee layout reduction
  const navHeight = useTransform(scrollY, [0, 150], [96, 64]);
  
  const backgroundColor = useTransform(scrollY, [0, 150], [
    "rgba(10, 10, 10, 0)", 
    "rgba(10, 10, 10, 0.75)"
  ]);
  
  const borderBottomColor = useTransform(scrollY, [0, 150], [
    "rgba(255, 255, 255, 0)", 
    "rgba(255, 255, 255, 0.15)"
  ]);
  
  const blurValue = useTransform(scrollY, [0, 150], [0, 24]);
  const backdropFilter = useMotionTemplate`blur(${blurValue}px) saturate(200%)`;

  const contentScale = useTransform(scrollY, [0, 150], [1, 0.85]);

  async function Signout() {
    await logout();
    toast.success('Signed Out Sucessfully ')
    reload();
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        height: navHeight,
        backgroundColor,
        borderBottom: "1px solid",
        borderBottomColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
      className="fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-6 md:px-12"
    >
      <motion.div 
        style={{ scale: contentScale, originX: 0 }} 
        className="flex items-center gap-2"
      >
        <Activity className="w-5 h-5 text-neon" />
        <span className="font-sans font-bold tracking-tight text-ghost">MEMBER<span className="text-neon">LY</span></span>
      </motion.div>
      
      <motion.div 
        style={{ scale: contentScale, originX: 0.5 }} 
        className="hidden md:flex items-center gap-8"
      >
        {['Home', 'Features', 'Protocol', 'Access'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-xs uppercase tracking-widest text-slate hover:text-neon transition-colors">
            {item}
          </a>
        ))}
      </motion.div>
      
      <motion.div 
        style={{ scale: contentScale, originX: 1 }} 
        className='flex gap-3 items-center'
      >
        <Link to={user ? "dashboard" :"login"} className="bg-neon btn text-void px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform box-glow">
        {user ? 'Dashboard' : 'Initialize'}
        </Link>
        {user && <button onClick={()=> Signout()} className='border border-neon px-5 py-2 text-xs font-bold transitiona-all hover:scale-105 hover:text-neon rounded-full uppercase' >Sign Out</button>}
      </motion.div>
    </motion.nav>
  );
}