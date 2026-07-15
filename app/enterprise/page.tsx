import DeveloperIntegration from "@/components/developer-integration";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Glazyr Viz | Enterprise Dashboard",
  description: "Live zero-copy vision telemetry for B2B infrastructure.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090A0F] flex flex-col relative overflow-hidden font-mono">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Top Navigation / B2B Banner */}
      <header className="w-full border-b border-[#2E3440] bg-[#090A0F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-[#00F0FF] font-bold text-xl tracking-tighter">GLAZYR</span>
            <nav className="hidden md:flex space-x-6 text-sm text-slate-400">
              <a href="https://form.typeform.com/to/xumIGJOz" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Technology</a>
              <a href="https://form.typeform.com/to/xumIGJOz" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Enterprise Pricing</a>
              <a href="#docs" className="hover:text-slate-200 transition-colors">Documentation</a>
            </nav>
          </div>
          <a href="https://form.typeform.com/to/xumIGJOz" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#00F0FF] text-[#090A0F] px-4 py-2 rounded font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <span>Schedule Sales Preview</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative z-10 pt-10">
        <div className="max-w-6xl mx-auto px-8 mb-4">
          <div className="inline-block border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] px-3 py-1 rounded-full text-xs tracking-widest font-bold mb-4">
            B2B NODE REOPENING - LIVE DEMO
          </div>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Witness the agentic optic nerve in real-time. The dashboard below is currently connected to a live GCP Perception Node. You are seeing the actual memory buffer latency and frame processing speed of our headless Chromium engine.
          </p>
        </div>
        
        <div className="border-t border-[#2E3440] mt-8 bg-[#040508]/50">
          <DeveloperIntegration />
        </div>
      </div>
      
      <footer className="w-full border-t border-[#2E3440] py-8 text-center text-xs text-slate-600 tracking-widest uppercase">
        © 2026 GLAZYR VIZ. MAGNETAR SENTIENT L.L.C.
      </footer>
    </main>
  );
}
