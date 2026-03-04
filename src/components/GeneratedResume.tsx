import { motion } from 'framer-motion';

interface GeneratedResumeProps {
  resume: string;
  targetRole: string;
  onReset: () => void;
}

export default function GeneratedResume({ resume, targetRole, onReset }: GeneratedResumeProps) {
  const handleDownload = () => {
    const blob = new Blob([resume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${targetRole.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resume);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-2 block"
          >
            Complete
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-4xl"
          >
            Your <span className="text-amber-500">Forged</span> Resume
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border border-white/20 text-white/80 text-xs md:text-sm uppercase tracking-wider hover:border-white/40 transition-colors min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs md:text-sm uppercase tracking-wider font-medium min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Paper effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent transform rotate-1 scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.03] to-transparent transform -rotate-1 scale-[1.01]" />

        {/* Corner decoration */}
        <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-amber-500" />
        <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-amber-500" />

        <div className="relative bg-[#141414] border border-white/10 p-4 md:p-8 lg:p-12">
          {/* Header badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-white/40">AI Optimized</span>
            </div>
            <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30">
              <span className="text-xs text-amber-500 uppercase tracking-wider">{targetRole}</span>
            </div>
          </div>

          {/* Resume content */}
          <pre className="whitespace-pre-wrap font-body text-white/80 text-xs md:text-sm leading-relaxed overflow-x-auto">
            {resume}
          </pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 md:mt-12 text-center"
      >
        <button
          onClick={onReset}
          className="text-white/40 hover:text-white/60 text-sm transition-colors py-2 min-h-[44px]"
        >
          Create another resume
        </button>
      </motion.div>
    </div>
  );
}
