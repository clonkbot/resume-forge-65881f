import { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentGateProps {
  targetRole: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentGate({ targetRole, onComplete, onBack }: PaymentGateProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate x402 payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        disabled={isProcessing}
        className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-6 md:mb-8 text-sm py-2 disabled:opacity-30"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-3 md:mb-4 block">Step 03</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            One-Time<br />
            <span className="text-amber-500">Payment</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
            Unlock your AI-optimized resume for <span className="text-white">{targetRole}</span>.
            Pay once, download forever. No subscriptions, no hidden fees.
          </p>

          <div className="space-y-3 md:space-y-4">
            {[
              'AI-powered keyword optimization',
              'ATS-friendly formatting',
              'Role-specific language enhancement',
              'Instant PDF download',
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm md:text-base">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Payment Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border border-amber-500/20" />

          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6 md:p-8">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 md:py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="font-display text-xl md:text-2xl text-white mb-2">Payment Complete</h3>
                <p className="text-white/50 text-sm">Generating your optimized resume...</p>
              </motion.div>
            ) : (
              <>
                {/* x402 Badge */}
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    x
                  </div>
                  <span className="text-xs uppercase tracking-wider text-white/40">x402 Protocol</span>
                </div>

                <div className="mb-6 md:mb-8">
                  <span className="text-white/40 text-xs uppercase tracking-wider">One-time payment</span>
                  <div className="flex items-baseline gap-1 md:gap-2 mt-2">
                    <span className="font-display text-4xl md:text-5xl text-white">$2.99</span>
                    <span className="text-white/40 text-sm">USD</span>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 py-4 md:py-6 border-y border-white/10">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-white/50">Resume optimization</span>
                    <span className="text-white">$2.99</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-white/50">Target role</span>
                    <span className="text-white truncate ml-4 max-w-[150px]">{targetRole}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-white/50">Network fee</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full group relative px-8 py-4 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium text-sm uppercase tracking-wider overflow-hidden disabled:opacity-80 min-h-[52px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay with x402
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <p className="text-center text-[10px] md:text-xs text-white/30 mt-4">
                  Secure payment via x402 Protocol. No crypto required.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
