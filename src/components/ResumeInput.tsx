import { useState } from 'react';
import { motion } from 'framer-motion';

interface ResumeInputProps {
  onSubmit: (text: string) => void;
}

export default function ResumeInput({ onSubmit }: ResumeInputProps) {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Left side - Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <span className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-3 md:mb-4">Step 01</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.9] mb-4 md:mb-6">
            Your<br />
            <span className="text-amber-500">Resume</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed">
            Paste your existing resume or start fresh. Our AI will analyze and optimize it for your target role.
          </p>

          <div className="hidden md:flex items-center gap-4 mt-8 md:mt-12">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-[#0a0a0a]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
            <span className="text-xs text-white/40">12,847 resumes forged</span>
          </div>
        </motion.div>

        {/* Right side - Input */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div
            className={`relative transition-all duration-300 ${
              isDragging ? 'scale-[1.02]' : ''
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {/* Decorative corner */}
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-amber-500/50" />
            <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-amber-500/50" />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your resume here, or drag & drop a .txt file..."
              className="w-full h-64 md:h-80 lg:h-96 bg-white/[0.03] border border-white/10 rounded-none p-4 md:p-6 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
            />

            {isDragging && (
              <div className="absolute inset-0 bg-amber-500/10 border-2 border-dashed border-amber-500/50 flex items-center justify-center">
                <span className="text-amber-500 font-medium">Drop your resume</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 md:mt-8">
            <span className="text-xs text-white/30 order-2 sm:order-1 text-center sm:text-left">
              {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : 'Or leave blank to create from scratch'}
            </span>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSubmit(text)}
              className="order-1 sm:order-2 group relative px-6 md:px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium text-sm uppercase tracking-wider overflow-hidden min-h-[52px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
