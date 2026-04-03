import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="access" className="py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto my-10 relative">
      {/* Background glow effect behind the cards */}
      <div className="absolute inset-0 bg-neon/5 blur-[120px] rounded-[100%] max-w-3xl mx-auto z-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Access Levels.<br />
            <span className="text-slate">Scale beautifully.</span>
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto font-medium">Select the operational capacity that fits your facility's requirements.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 flex flex-col hover:bg-white/[0.04] transition-colors h-full group"
          >
            <div className="font-semibold text-sm uppercase tracking-widest text-slate mb-4">Scout</div>
            <div className="font-sans font-bold text-5xl mb-2 tracking-tight">$299<span className="text-xl text-slate font-medium tracking-normal">/mo</span></div>
            <p className="text-slate text-base mb-8 pb-8 border-b border-white/5">For single-location facilities under 500 members.</p>
            <ul className="space-y-5 mb-10 flex-grow">
              {['Core Billing Agent', 'Basic Access Control', 'Standard Telemetry', 'Email Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-base text-slate">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-white">{f}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white text-base hover:text-void transition-all duration-300">Initialize</button>
          </motion.div>

          {/* Tier 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white/[0.04] border border-neon/30 text-white rounded-[2.5rem] p-10 md:p-12 flex flex-col scale-100 lg:scale-105 shadow-2xl shadow-neon/5 z-10 relative backdrop-blur-sm"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon text-void px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5 shadow-lg shadow-neon/20">
              <Zap size={14} className="fill-void" /> Recommended
            </div>
            <div className="font-semibold text-sm uppercase tracking-widest text-neon mb-4">Operator</div>
            <div className="font-sans font-bold text-5xl mb-2 tracking-tight">$799<span className="text-xl text-slate font-medium tracking-normal">/mo</span></div>
            <p className="text-slate text-base mb-8 pb-8 border-b border-white/10">For growing facilities requiring full automation.</p>
            <ul className="space-y-5 mb-10 flex-grow">
              {['Advanced Billing & Dunning', 'Biometric Access', 'Predictive Scheduling', 'Retention Agent', '24/7 Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-base font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon/10 flex items-center justify-center border border-neon/20">
                    <Check size={12} className="text-neon" />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full bg-neon text-void font-bold text-base hover:scale-[1.02] hover:shadow-xl hover:shadow-neon/20 transition-all duration-300">Deploy Fleet</button>
          </motion.div>

          {/* Tier 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 flex flex-col hover:bg-white/[0.04] transition-colors h-full group"
          >
            <div className="font-semibold text-sm uppercase tracking-widest text-slate mb-4">Command</div>
            <div className="font-sans font-bold text-5xl mb-2 tracking-tight">Custom</div>
            <p className="text-slate text-base mb-8 pb-8 border-b border-white/5">For enterprise franchises and multi-location networks.</p>
            <ul className="space-y-5 mb-10 flex-grow">
              {['Multi-Facility Orchestration', 'Custom Agent Training', 'Dedicated Infrastructure', 'White-glove Onboarding'].map(f => (
                <li key={f} className="flex items-center gap-3 text-base text-slate">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                     <Check size={12} className="text-white" />
                   </div>
                   <span className="text-white">{f}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white text-base hover:text-void transition-all duration-300">Contact Ops</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}