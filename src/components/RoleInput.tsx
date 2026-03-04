import { useState } from 'react';
import { motion } from 'framer-motion';

interface RoleInputProps {
  onSubmit: (role: string) => void;
  onBack: () => void;
}

const popularRoles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Executive',
];

export default function RoleInput({ onSubmit, onBack }: RoleInputProps) {
  const [role, setRole] = useState('');

  const handleSubmit = () => {
    if (role.trim()) {
      onSubmit(role.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-6 md:mb-8 text-sm py-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back
      </motion.button>

      <div className="text-center mb-8 md:mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-3 md:mb-4 block"
        >
          Step 02
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
        >
          Target <span className="text-amber-500">Role</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-sm md:text-base max-w-md mx-auto px-4"
        >
          What position are you applying for? We&apos;ll optimize your resume with relevant keywords and framing.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative max-w-2xl mx-auto px-4 md:px-0"
      >
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g. Senior Software Engineer"
          className="w-full bg-white/[0.03] border border-white/10 px-4 md:px-6 py-4 md:py-5 text-white text-base md:text-lg placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
        />

        {/* Decorative element */}
        <div className="absolute -right-1 -top-1 md:-right-2 md:-top-2 w-3 h-3 md:w-4 md:h-4 bg-amber-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3 px-4"
      >
        {popularRoles.map((r, i) => (
          <motion.button
            key={r}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRole(r)}
            className={`px-3 md:px-4 py-2 text-xs md:text-sm border transition-all min-h-[44px] flex items-center ${
              role === r
                ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
            }`}
          >
            {r}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-10 md:mt-12 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!role.trim()}
          className="group relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium text-sm uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
        >
          <span className="relative z-10 flex items-center gap-3">
            Continue to Payment
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </motion.div>
    </div>
  );
}
