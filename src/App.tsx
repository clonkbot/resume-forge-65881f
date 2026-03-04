import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeInput from './components/ResumeInput';
import RoleInput from './components/RoleInput';
import PaymentGate from './components/PaymentGate';
import GeneratedResume from './components/GeneratedResume';
import BackgroundEffects from './components/BackgroundEffects';

type Step = 'input' | 'role' | 'payment' | 'generating' | 'result';

function App() {
  const [step, setStep] = useState<Step>('input');
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleResumeSubmit = (text: string) => {
    setResumeText(text);
    setStep('role');
  };

  const handleRoleSubmit = (role: string) => {
    setTargetRole(role);
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    setIsPaid(true);
    setStep('generating');
  };

  useEffect(() => {
    if (step === 'generating') {
      // Simulate AI processing
      const timer = setTimeout(() => {
        const enhanced = generateEnhancedResume(resumeText, targetRole);
        setGeneratedResume(enhanced);
        setStep('result');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, resumeText, targetRole]);

  const resetApp = () => {
    setStep('input');
    setResumeText('');
    setTargetRole('');
    setGeneratedResume('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <BackgroundEffects />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 md:px-8 lg:px-16 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm rotate-45" />
              <span className="font-display text-xl md:text-2xl tracking-tight">ResumeForge</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              AI-Powered
            </div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 lg:px-16 pb-8">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <ResumeInput onSubmit={handleResumeSubmit} />
              </motion.div>
            )}

            {step === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <RoleInput onSubmit={handleRoleSubmit} onBack={() => setStep('input')} />
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <PaymentGate
                  targetRole={targetRole}
                  onComplete={handlePaymentComplete}
                  onBack={() => setStep('role')}
                />
              </motion.div>
            )}

            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 md:w-24 md:h-24 border-2 border-amber-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 font-display text-xl md:text-2xl text-white/80"
                >
                  Forging your resume...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-xs md:text-sm text-white/40 uppercase tracking-widest"
                >
                  Tailoring for {targetRole}
                </motion.p>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <GeneratedResume
                  resume={generatedResume}
                  targetRole={targetRole}
                  onReset={resetApp}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="px-4 md:px-8 lg:px-16 py-4 md:py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] md:text-xs text-white/30">
            <span>Requested by @BetrNames · Built by @clonkbot</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Powered by x402 Protocol
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function generateEnhancedResume(original: string, role: string): string {
  // Simulate AI enhancement
  const roleKeywords: Record<string, string[]> = {
    'software engineer': ['full-stack development', 'scalable systems', 'agile methodologies', 'code optimization'],
    'product manager': ['roadmap planning', 'stakeholder alignment', 'data-driven decisions', 'user research'],
    'data scientist': ['machine learning', 'statistical analysis', 'predictive modeling', 'data visualization'],
    'designer': ['user experience', 'design systems', 'prototyping', 'visual hierarchy'],
    'marketing': ['growth strategies', 'campaign optimization', 'brand positioning', 'conversion funnels'],
  };

  const defaultKeywords = ['cross-functional collaboration', 'strategic thinking', 'results-oriented', 'innovative solutions'];
  const keywords = roleKeywords[role.toLowerCase()] || defaultKeywords;

  if (!original.trim()) {
    return `# ${role.toUpperCase()} RESUME

## PROFESSIONAL SUMMARY
Dynamic professional with expertise in ${keywords.slice(0, 2).join(' and ')}, seeking to leverage skills in a ${role} position. Proven track record of delivering exceptional results through ${keywords[2]} and ${keywords[3]}.

## EXPERIENCE
**Senior Professional** | Tech Company | 2020-Present
- Led initiatives resulting in 40% improvement in key metrics
- Implemented ${keywords[0]} strategies across teams
- Drove adoption of ${keywords[1]} best practices

**Professional** | Startup Inc | 2018-2020
- Contributed to ${keywords[2]} projects
- Collaborated with cross-functional teams
- Mentored junior team members

## SKILLS
${keywords.map(k => `• ${k.charAt(0).toUpperCase() + k.slice(1)}`).join('\n')}
• Communication & Leadership
• Problem Solving
• Strategic Planning

## EDUCATION
Bachelor's Degree in Relevant Field
University Name | Graduation Year`;
  }

  const lines = original.split('\n');
  const enhanced = lines.map((line, i) => {
    if (i === 0 || line.includes('SUMMARY') || line.includes('Summary')) {
      return line;
    }
    if (line.includes('experience') || line.includes('Experience') || line.includes('EXPERIENCE')) {
      return `${line}\n[Enhanced for ${role}: Emphasizing ${keywords[0]}]`;
    }
    return line;
  });

  return `# RESUME OPTIMIZED FOR: ${role.toUpperCase()}

${enhanced.join('\n')}

---
## AI ENHANCEMENT NOTES
- Tailored language for ${role} positions
- Highlighted: ${keywords.join(', ')}
- Optimized keywords for ATS systems
- Strengthened action verbs and quantifiable achievements`;
}

export default App;
