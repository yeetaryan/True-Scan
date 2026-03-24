import React, { useState, useEffect, useRef } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Activity, ArrowRight, Menu, X, Terminal, FileText, BarChart3, Lock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
type ScanStatus = 'IDLE' | 'SCANNING' | 'RESULT';
type Verdict = 'MISINFORMATION' | 'CREDIBLE' | 'UNVERIFIED';

interface ScanResult {
  verdict: Verdict;
  score: number;
  signals: {
    label: string;
    value: number;
    status: string;
  }[];
}

// --- Mock Data ---
const MOCK_RESULTS: ScanResult[] = [
  {
    verdict: 'MISINFORMATION',
    score: 87,
    signals: [
      { label: 'Sensational Language', value: 8, status: 'HIGH' },
      { label: 'Source Verification', value: 2, status: 'FAILED' },
      { label: 'Emotional Manipulation', value: 9, status: 'SEVERE' },
    ]
  },
  {
    verdict: 'CREDIBLE',
    score: 94,
    signals: [
      { label: 'Sensational Language', value: 1, status: 'LOW' },
      { label: 'Source Verification', value: 9, status: 'VERIFIED' },
      { label: 'Emotional Manipulation', value: 2, status: 'MINIMAL' },
    ]
  },
  {
    verdict: 'UNVERIFIED',
    score: 52,
    signals: [
      { label: 'Sensational Language', value: 5, status: 'MODERATE' },
      { label: 'Source Verification', value: 4, status: 'UNCERTAIN' },
      { label: 'Emotional Manipulation', value: 6, status: 'MODERATE' },
    ]
  }
];

const EVIDENCE_ITEMS = [
  "Bias Fingerprint: CONFIRMATION BIAS",
  "Emotional Index: 7.4 / 10",
  "Citation Depth: NONE DETECTED",
  "Source Age: UNVERIFIED DOMAIN",
  "Sentiment Polarity: EXTREME NEGATIVE"
];

const LIVE_MESSAGES = [
  "> [14:32:01] Article flagged — Clickbait structure detected",
  "> [14:32:04] Source domain age: 3 weeks — SUSPICIOUS",
  "> [14:32:07] Cross-reference complete — 0 credible citations found",
  "> [14:32:11] Verdict: HIGH PROBABILITY OF MISINFORMATION",
  "> [14:35:22] New scan initiated from IP: 192.168.1.42",
  "> [14:35:45] Linguistic pattern match: 88% similarity to known bot-farm output",
  "> [14:36:10] Metadata scrubbed — Anonymity protocols active"
];

// --- Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl transition-all duration-500">
      <div className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${scrolled ? 'glass-pill' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 font-mono font-bold text-xl tracking-tighter">
          <div className="w-2 h-2 rounded-full bg-press-green animate-pulse" />
          <span>TRUTH//SCAN</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm uppercase tracking-widest">
          <a href="#scanner" className="hover:text-press-green transition-colors">Scanner</a>
          <a href="#how-it-works" className="hover:text-press-green transition-colors">Protocol</a>
          <a href="#pricing" className="hover:text-press-green transition-colors">Access</a>
        </div>

        <button className="group relative overflow-hidden bg-ink-black text-white px-6 py-2 rounded-full font-sans font-bold text-sm uppercase tracking-wider transition-transform hover:scale-105 active:scale-95">
          <span className="relative z-10">Run Scan</span>
          <div className="absolute inset-0 bg-fog translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="absolute inset-0 flex items-center justify-center text-ink-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-bold">Run Scan</span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });
      
      gsap.from(".hero-badge", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.8,
        ease: "back.out(1.7)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-dvh w-full overflow-hidden bg-ink-black">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504711434969-e33886168f5c")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink-black via-ink-black/80 to-transparent" />
      
      <div className="relative h-full flex flex-col justify-end p-8 md:p-24 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <p className="hero-text font-sans font-bold text-fog/60 uppercase tracking-[0.3em] mb-4">The information war</p>
          <h1 className="hero-text text-6xl md:text-9xl text-white leading-[0.85] mb-8">
            is <span className="italic font-light">real.</span>
          </h1>
          <p className="hero-text font-sans text-xl text-fog/80 max-w-xl mb-12">
            TruthScan analyzes any article, headline, or claim in seconds using investigative intelligence protocols.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="hero-badge flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full font-mono text-xs text-fog/60">
              <Activity size={14} className="text-press-green" />
              <span>12,847 SCANS TODAY</span>
            </div>
            <div className="hero-badge flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full font-mono text-xs text-fog/60">
              <Shield size={14} className="text-press-green" />
              <span>94.2% ACCURACY</span>
            </div>
            <div className="hero-badge flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full font-mono text-xs text-fog/60">
              <Terminal size={14} className="text-press-green" />
              <span>3MS AVG RESPONSE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Scanner = () => {
  const [status, setStatus] = useState<ScanStatus>('IDLE');
  const [inputText, setInputText] = useState('');
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const sectionRef = useRef(null);

  const scanMessages = [
    "> Parsing linguistic patterns...",
    "> Cross-referencing 1,200+ verified sources...",
    "> Running bias fingerprint analysis...",
    "> Calculating emotional manipulation index..."
  ];

  const handleScan = () => {
    if (!inputText.trim()) return;
    setStatus('SCANNING');
    setProgress(0);
    setResult(null);

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStatus('RESULT');
            setResult(MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]);
          }, 500);
          return 100;
        }
        return prev + 2;
      });

      if (currentStep < scanMessages.length && progress > (currentStep + 1) * 25) {
        setScanMessage(scanMessages[currentStep]);
        currentStep++;
      }
    }, 50);
  };

  useEffect(() => {
    if (status === 'RESULT') {
      gsap.from(".result-card", {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "back.out(1.2)"
      });
      gsap.from(".signal-bar", {
        width: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, [status]);

  return (
    <section id="scanner" ref={sectionRef} className="relative py-32 bg-ink-black overflow-hidden">
      <div className="absolute inset-0 scanline opacity-20" />
      
      <div className="relative max-w-5xl mx-auto px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl text-white mb-4">Intelligence <span className="italic font-light">Terminal</span></h2>
          <p className="text-fog/60 font-mono text-sm uppercase tracking-widest">Protocol v4.0.2 // Active</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm">
          {status === 'IDLE' && (
            <div className="space-y-8">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste any headline, article, or claim..."
                className="w-full h-64 bg-transparent border-2 border-white/10 rounded-3xl p-8 text-white font-sans text-xl focus:border-press-green focus:outline-none transition-all placeholder:text-white/20 resize-none"
              />
              <button 
                onClick={handleScan}
                className="w-full group relative overflow-hidden bg-press-green text-white py-6 rounded-2xl font-sans font-black text-xl uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">Initiate Scan</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-press-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-black">Initiate Scan</span>
              </button>
            </div>
          )}

          {status === 'SCANNING' && (
            <div className="h-80 flex flex-col items-center justify-center space-y-12">
              <div className="w-full max-w-md bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-press-green transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="font-mono text-press-green text-shadow-glow animate-pulse">
                {scanMessage || "> Initializing scan sequence..."}
              </div>
            </div>
          )}

          {status === 'RESULT' && result && (
            <div className="result-card space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="relative">
                  <div className="absolute -inset-4 border-4 border-alert-red/20 rounded-full animate-spin-slow" />
                  <svg className="w-48 h-48 -rotate-90">
                    <circle
                      cx="96" cy="96" r="88"
                      fill="none" stroke="currentColor" strokeWidth="8"
                      className="text-white/10"
                    />
                    <circle
                      cx="96" cy="96" r="88"
                      fill="none" stroke="currentColor" strokeWidth="8"
                      strokeDasharray={552.92}
                      strokeDashoffset={552.92 - (552.92 * result.score) / 100}
                      className="text-press-green transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-mono font-bold text-white">{result.score}%</span>
                    <span className="text-[10px] font-mono text-fog/40 uppercase tracking-tighter">Confidence</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="relative inline-block mb-4">
                    <h3 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter ${
                      result.verdict === 'MISINFORMATION' ? 'text-alert-red' : 
                      result.verdict === 'CREDIBLE' ? 'text-press-green' : 'text-amber'
                    }`}>
                      {result.verdict}
                    </h3>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1 bg-current opacity-20 -rotate-12" />
                  </div>
                  <p className="text-fog/60 font-sans text-lg">
                    Analysis complete. Cross-referencing suggests this content exhibits patterns consistent with {result.verdict.toLowerCase()}.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {result.signals.map((signal, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center font-mono text-[10px] text-fog/40 uppercase tracking-widest">
                      <span>{signal.label}</span>
                      <span className={signal.status === 'HIGH' || signal.status === 'SEVERE' || signal.status === 'FAILED' ? 'text-alert-red' : 'text-press-green'}>
                        {signal.status}
                      </span>
                    </div>
                    <div className="font-mono text-white flex gap-1">
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <div 
                          key={idx}
                          className={`signal-bar h-4 flex-1 rounded-sm ${idx < signal.value ? (signal.status === 'HIGH' || signal.status === 'SEVERE' || signal.status === 'FAILED' ? 'bg-alert-red' : 'bg-press-green') : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setStatus('IDLE')}
                className="text-fog/40 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors"
              >
                <ArrowRight size={14} className="rotate-180" />
                Reset Terminal
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const EvidenceStack = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % EVIDENCE_ITEMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-fog overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-24">
        <div>
          <h2 className="text-5xl md:text-7xl mb-8">The Evidence <span className="italic font-light">Stack</span></h2>
          <p className="text-ink-black/60 text-xl max-w-md">
            Our diagnostic engine shuffles through thousands of linguistic and metadata markers to find the truth.
          </p>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          {EVIDENCE_ITEMS.map((item, i) => {
            const isActive = i === index;
            const offset = (i - index + EVIDENCE_ITEMS.length) % EVIDENCE_ITEMS.length;
            
            return (
              <div 
                key={i}
                className="absolute w-full max-w-md bg-white border border-ink-black/10 p-8 rounded-[2rem] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  transform: `translateY(${offset * 20}px) scale(${1 - offset * 0.05})`,
                  opacity: 1 - offset * 0.3,
                  zIndex: EVIDENCE_ITEMS.length - offset,
                  visibility: offset > 2 ? 'hidden' : 'visible'
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-ink-black flex items-center justify-center text-white">
                    <FileText size={20} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-black/40">Diagnostic Marker // 00{i + 1}</div>
                </div>
                <div className="font-mono text-xl font-bold text-ink-black uppercase tracking-tighter">
                  {item}
                </div>
                <div className="mt-8 flex gap-2">
                  <div className="h-1 flex-1 bg-press-green" />
                  <div className="h-1 flex-1 bg-press-green" />
                  <div className="h-1 flex-1 bg-ink-black/10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const LiveTerminal = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages(prev => [...prev, LIVE_MESSAGES[currentIndex]].slice(-4));
      setCurrentIndex(prev => (prev + 1) % LIVE_MESSAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="bg-ink-black py-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-alert-red animate-pulse" />
            <span className="font-mono text-white text-sm uppercase tracking-[0.3em]">Live Analysis Feed</span>
          </div>
          <div className="font-mono text-fog/20 text-xs">Uptime: 99.99% // Region: Global</div>
        </div>
        
        <div className="bg-black/50 rounded-3xl p-8 font-mono text-press-green min-h-[240px] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 scanline opacity-10" />
          <div className="space-y-4 relative z-10">
            {messages.map((msg, i) => (
              <div key={i} className="opacity-0 animate-fade-in">
                {msg}
              </div>
            ))}
            <div className="w-3 h-6 bg-press-green animate-pulse inline-block align-middle ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".split-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-64 bg-ink-black overflow-hidden">
      <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585829365234-781fcd50c819')] bg-cover bg-fixed" />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-8 text-center">
        <h2 className="split-text text-4xl md:text-6xl text-white mb-12 font-sans font-bold">
          Bad journalism asks: <span className="text-fog/40">What happened?</span>
        </h2>
        <div className="split-text h-px w-24 bg-alert-red mx-auto mb-12" />
        <h2 className="split-text text-6xl md:text-9xl text-alert-red italic font-light leading-tight">
          We ask: <span className="text-white">What is true?</span>
        </h2>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            gsap.to(card, {
              scale: 1 - self.progress * 0.1,
              filter: `blur(${self.progress * 8}px)`,
              opacity: 1 - self.progress * 0.5,
              duration: 0.1
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={containerRef} className="bg-ink-black">
      {/* Card 1: INPUT */}
      <div className="stack-card h-screen w-full flex items-center justify-center bg-newsprint p-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="font-mono text-press-green text-sm uppercase tracking-[0.4em]">Phase 01 // Input</div>
            <h2 className="text-6xl md:text-8xl">The <span className="italic font-light">Submission</span></h2>
            <p className="text-xl text-ink-black/60">Every scan begins with a claim. Our engine accepts raw text, URLs, or social media snippets for deep-layer analysis.</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-ink-black/5">
            <div className="font-mono text-[10px] text-ink-black/20 mb-4 uppercase tracking-widest">Awaiting Input...</div>
            <div className="h-48 font-mono text-ink-black/80 text-lg leading-relaxed">
              <span className="animate-typewriter">"New study claims that coffee causes immediate memory loss in 99% of adults..."</span>
              <span className="w-2 h-5 bg-ink-black inline-block animate-pulse ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: ANALYSIS */}
      <div className="stack-card h-screen w-full flex items-center justify-center bg-fog p-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="font-mono text-alert-red text-sm uppercase tracking-[0.4em]">Phase 02 // Analysis</div>
            <h2 className="text-6xl md:text-8xl">The <span className="italic font-light">Dissection</span></h2>
            <p className="text-xl text-ink-black/60">Our AI laser-scans linguistic markers, cross-references against 1.2M verified records, and calculates emotional bias.</p>
          </div>
          <div className="relative bg-ink-black p-8 rounded-[2rem] shadow-2xl overflow-hidden h-80 flex items-center justify-center">
            <div className="absolute inset-0 scanline opacity-20" />
            <div className="absolute top-0 left-0 w-full h-1 bg-press-green/50 animate-scan-line" />
            <div className="grid grid-cols-4 gap-4 w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: VERDICT */}
      <div className="stack-card h-screen w-full flex items-center justify-center bg-ink-black p-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="font-mono text-press-green text-sm uppercase tracking-[0.4em]">Phase 03 // Verdict</div>
            <h2 className="text-6xl md:text-8xl text-white">The <span className="italic font-light">Judgment</span></h2>
            <p className="text-xl text-fog/60">A final verdict is stamped. We don't just tell you it's fake; we show you the evidence stack that proved it.</p>
          </div>
          <div className="relative group">
            <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-sm">
              <div className="space-y-6">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg] scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="border-8 border-alert-red text-alert-red px-8 py-4 font-black text-4xl uppercase tracking-tighter">MISINFORMATION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-newsprint">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl mb-4">Access <span className="italic font-light">Levels</span></h2>
          <p className="text-ink-black/40 font-mono text-sm uppercase tracking-widest">Choose your investigative depth</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="bg-white border border-ink-black/5 p-12 rounded-[2rem] hover:shadow-xl transition-all duration-500">
            <div className="font-mono text-xs text-ink-black/40 uppercase tracking-widest mb-8">Free Tier</div>
            <h3 className="text-4xl mb-2">Public</h3>
            <div className="text-3xl font-bold mb-8">$0<span className="text-sm font-normal text-ink-black/40">/mo</span></div>
            <ul className="space-y-4 mb-12 text-ink-black/60">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> 5 Scans per day</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Basic Verdict</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Community Feed</li>
            </ul>
            <button className="w-full py-4 border border-ink-black rounded-full font-bold hover:bg-ink-black hover:text-white transition-all">Get Started</button>
          </div>

          {/* Tier 2 */}
          <div className="bg-ink-black text-white p-12 rounded-[2rem] shadow-2xl transform scale-105 relative overflow-hidden group">
            <div className="absolute top-6 right-6 bg-press-green text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Popular</div>
            <div className="font-mono text-xs text-fog/40 uppercase tracking-widest mb-8">Professional</div>
            <h3 className="text-4xl mb-2">Investigator</h3>
            <div className="text-3xl font-bold mb-8">$29<span className="text-sm font-normal text-fog/40">/mo</span></div>
            <ul className="space-y-4 mb-12 text-fog/60">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Unlimited Scans</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Full Evidence Stack</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> API Access</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Priority Terminal</li>
            </ul>
            <button className="w-full py-4 bg-press-green text-white rounded-full font-bold hover:scale-105 transition-all">Unlock Access</button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border border-ink-black/5 p-12 rounded-[2rem] hover:shadow-xl transition-all duration-500">
            <div className="font-mono text-xs text-ink-black/40 uppercase tracking-widest mb-8">Enterprise</div>
            <h3 className="text-4xl mb-2">Newsroom</h3>
            <div className="text-3xl font-bold mb-8">$199<span className="text-sm font-normal text-ink-black/40">/mo</span></div>
            <ul className="space-y-4 mb-12 text-ink-black/60">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Team Collaboration</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> Custom Training</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-press-green" /> White-label Reports</li>
            </ul>
            <button className="w-full py-4 border border-ink-black rounded-full font-bold hover:bg-ink-black hover:text-white transition-all">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-newsprint pt-32 pb-12 rounded-t-[3rem] border-t border-ink-black/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-2 font-mono font-bold text-2xl tracking-tighter">
              <div className="w-3 h-3 rounded-full bg-press-green" />
              <span>TRUTH//SCAN</span>
            </div>
            <p className="text-2xl font-serif italic text-ink-black/60 max-w-sm">"Truth is not subjective. It is the baseline of a functioning society."</p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-black/40">Navigation</h4>
            <ul className="space-y-4 font-sans font-medium">
              <li><a href="#" className="hover:text-press-green transition-colors">Scanner</a></li>
              <li><a href="#" className="hover:text-press-green transition-colors">Protocol</a></li>
              <li><a href="#" className="hover:text-press-green transition-colors">Archive</a></li>
              <li><a href="#" className="hover:text-press-green transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-black/40">Status</h4>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-press-green animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest">System Operational</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock size={14} className="text-ink-black/20" />
              <span className="font-mono text-xs uppercase tracking-widest text-ink-black/40">Encrypted Session</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-ink-black/5 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] text-ink-black/40 uppercase tracking-widest">
          <div>© 2026 TRUTHSCAN INTELLIGENCE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ink-black transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-ink-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="relative">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Scanner />
      <EvidenceStack />
      <LiveTerminal />
      <Philosophy />
      <HowItWorks />
      <Pricing />
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
      `}} />
    </main>
  );
}
