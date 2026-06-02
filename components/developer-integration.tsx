"use client";
import React, { useState } from 'react';
import { Terminal, Code, CheckCircle, Copy, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeveloperIntegration() {
    const [activeTab, setActiveTab] = useState<'install' | 'config'>('install');
    const [osTab, setOsTab] = useState<'linux' | 'windows'>('linux');
    const [copied, setCopied] = useState(false);

    const getInstallSnippet = () => {
        if (osTab === 'linux') {
            return `export GLAZYR_SHM_SIZE=2048\ncurl -sL https://raw.githubusercontent.com/senti-001/glazyr-viz/main/scripts/glazyr-init.sh | bash\n\n# Starts the MCP server on localhost:4545\nnpx glazyrviz@0.3.2`;
        }
        return `$env:GLAZYR_SHM_SIZE=2048\nIRM https://raw.githubusercontent.com/senti-001/glazyr-viz/main/scripts/glazyr-init.ps1 | IEX\n\n# Starts the MCP server on localhost:4545\nnpx glazyrviz@0.3.2`;
    };

    const configSnippet = `# agent.yaml - Open Claw / Moltbook Integration
vision_provider: 
  type: "shared_memory"
  path: "/dev/shm/glazyr_vision"
  fallback: "http_mcp"

# The agent now has zero-copy spatial reasoning.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(activeTab === 'install' ? getInstallSnippet() : configSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="docs" className="w-full max-w-6xl mx-auto px-8 py-16 scroll-mt-24">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-[#F8FAFC] flex items-center">
                        <Terminal className="w-6 h-6 mr-3 text-[#00F0FF]" /> 
                        Developer Integration
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">Plug into the raw visual frame buffer in two steps.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Side: Instructions */}
                <div className="lg:col-span-2 space-y-6">
                    <div 
                        className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${activeTab === 'install' ? 'bg-[#161922] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'bg-[#090A0F] border-[#2E3440] hover:border-slate-500'}`}
                        onClick={() => setActiveTab('install')}
                    >
                        <h3 className="text-[#00F0FF] font-bold uppercase tracking-widest text-xs mb-2 flex items-center">
                            <span className="w-5 h-5 rounded bg-[#00F0FF]/20 flex items-center justify-center mr-2">1</span>
                            Zero-Config Init
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Run the initialization script on your edge node. This automatically provisions the 2GB shared memory segment and boots the MCP connector.
                        </p>
                        
                        {/* OS Toggle (Only show if Install tab is active) */}
                        {activeTab === 'install' && (
                            <div className="flex space-x-2 bg-[#090A0F] p-1 rounded-md border border-[#2E3440]">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOsTab('linux'); }}
                                    className={`flex-1 text-xs py-1.5 rounded uppercase tracking-widest font-bold transition-colors ${osTab === 'linux' ? 'bg-[#2E3440] text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Linux / macOS
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOsTab('windows'); }}
                                    className={`flex-1 text-xs py-1.5 rounded uppercase tracking-widest font-bold transition-colors ${osTab === 'windows' ? 'bg-[#2E3440] text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Windows
                                </button>
                            </div>
                        )}
                    </div>

                    <div 
                        className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${activeTab === 'config' ? 'bg-[#161922] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'bg-[#090A0F] border-[#2E3440] hover:border-slate-500'}`}
                        onClick={() => setActiveTab('config')}
                    >
                        <h3 className="text-[#00F0FF] font-bold uppercase tracking-widest text-xs mb-2 flex items-center">
                            <span className="w-5 h-5 rounded bg-[#00F0FF]/20 flex items-center justify-center mr-2">2</span>
                            Agent Handshake
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Point your agent framework to the POSIX shared memory path. The agent bypasses base64 encoding and reads DOM structure instantly.
                        </p>
                    </div>
                </div>

                {/* Right Side: Code Window */}
                <div className="lg:col-span-3 rounded-xl border border-[#2E3440] bg-[#161922] overflow-hidden flex flex-col shadow-2xl">
                    <div className="h-10 bg-[#090A0F] border-b border-[#2E3440] flex items-center px-4 justify-between">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => setActiveTab('install')}
                                className={`text-xs uppercase tracking-widest font-bold ${activeTab === 'install' ? 'text-[#00F0FF]' : 'text-slate-600 hover:text-slate-400'}`}
                            >
                                terminal.sh
                            </button>
                            <button 
                                onClick={() => setActiveTab('config')}
                                className={`text-xs uppercase tracking-widest font-bold ${activeTab === 'config' ? 'text-[#00F0FF]' : 'text-slate-600 hover:text-slate-400'}`}
                            >
                                agent.yaml
                            </button>
                        </div>
                        <button onClick={handleCopy} className="text-slate-500 hover:text-[#00F0FF] transition-colors">
                            {copied ? <CheckCircle className="w-4 h-4 text-[#00F0FF]" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="p-6 overflow-x-auto relative flex-1">
                        <AnimatePresence mode="wait">
                            <motion.pre
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="font-mono text-sm text-slate-300 leading-relaxed"
                            >
                                <code>
                                    {activeTab === 'install' ? (
                                        osTab === 'linux' ? (
                                            <>
                                                <span className="text-pink-400">export</span> GLAZYR_SHM_SIZE<span className="text-slate-500">=</span><span className="text-emerald-400">2048</span>{'\n'}
                                                <span className="text-pink-400">curl</span> -sL https://raw.githubusercontent.com/senti-001/glazyr-viz/main/scripts/glazyr-init.sh | <span className="text-blue-400">bash</span>{'\n\n'}
                                                <span className="text-slate-500"># [IN DEV] Starts the MCP server on localhost:4545</span>{'\n'}
                                                <span className="text-pink-400">npx</span> glazyrviz@0.3.2 <span className="text-slate-500 ml-4"># (Coming Soon to public NPM)</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-pink-400">$env:GLAZYR_SHM_SIZE</span><span className="text-slate-500">=</span><span className="text-emerald-400">2048</span>{'\n'}
                                                <span className="text-pink-400">IRM</span> https://raw.githubusercontent.com/senti-001/glazyr-viz/main/scripts/glazyr-init.ps1 | <span className="text-blue-400">IEX</span>{'\n\n'}
                                                <span className="text-slate-500"># [IN DEV] Starts the MCP server on localhost:4545</span>{'\n'}
                                                <span className="text-pink-400">npx</span> glazyrviz@0.3.2 <span className="text-slate-500 ml-4"># (Coming Soon to public NPM)</span>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <span className="text-slate-500"># agent.yaml - Open Claw / Moltbook Integration</span>{'\n'}
                                            <span className="text-blue-400">vision_provider</span>:{'\n'}
                                            <span className="text-blue-400">  type</span>: <span className="text-emerald-400">"shared_memory"</span>{'\n'}
                                            <span className="text-blue-400">  path</span>: <span className="text-emerald-400">"/dev/shm/glazyr_vision"</span>{'\n'}
                                            <span className="text-blue-400">  fallback</span>: <span className="text-emerald-400">"http_mcp"</span>{'\n\n'}
                                            <span className="text-slate-500"># The agent now has zero-copy spatial reasoning.</span>
                                        </>
                                    )}
                                </code>
                            </motion.pre>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
