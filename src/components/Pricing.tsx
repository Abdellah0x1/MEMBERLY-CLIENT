import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <section id="access" className="py-32 px-6 md:px-12 lg:px-24 bg-smoke/30 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-sans font-bold text-3xl md:text-5xl mb-4">Access Levels</h2>
          <p className="text-slate font-mono text-sm uppercase tracking-widest">Select your operational capacity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-void border border-white/10 rounded-[2rem] p-8 flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-slate mb-4">Scout</div>
            <div className="font-sans font-bold text-4xl mb-2">$299<span className="text-lg text-slate font-normal">/mo</span></div>
            <p className="text-slate text-sm mb-8 pb-8 border-b border-white/10">For single-location facilities under 500 members.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Core Billing Agent', 'Basic Access Control', 'Standard Telemetry', 'Email Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-ghost">
                  <span className="text-neon">↳</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full border border-white/20 text-ghost font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">Initialize</button>
          </motion.div>

          {/* Tier 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-neon text-void rounded-[2rem] p-8 flex flex-col scale-100 md:scale-105 box-glow z-10 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-void text-neon border border-neon px-4 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest">Recommended</div>
            <div className="font-mono text-xs uppercase tracking-widest text-void/70 mb-4">Operator</div>
            <div className="font-sans font-bold text-4xl mb-2">$799<span className="text-lg text-void/70 font-normal">/mo</span></div>
            <p className="text-void/80 text-sm mb-8 pb-8 border-b border-void/10">For growing facilities requiring full automation.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Advanced Billing & Dunning', 'Biometric Access Integration', 'Predictive Scheduling', 'Retention Agent', '24/7 Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-void/50">↳</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full bg-void text-neon font-mono text-xs uppercase tracking-widest hover:bg-smoke transition-colors">Deploy Fleet</button>
          </motion.div>

          {/* Tier 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-void border border-white/10 rounded-[2rem] p-8 flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-slate mb-4">Command</div>
            <div className="font-sans font-bold text-4xl mb-2">Custom</div>
            <p className="text-slate text-sm mb-8 pb-8 border-b border-white/10">For enterprise franchises and multi-location networks.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Multi-Facility Orchestration', 'Custom Agent Training', 'Dedicated Infrastructure', 'White-glove Onboarding'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-ghost">
                  <span className="text-neon">↳</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full border border-white/20 text-ghost font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">Contact Ops</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}