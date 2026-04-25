import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Shield, Cpu, Globe, Lock, BookOpen, FileText, Share2, Zap, Activity } from 'lucide-react';

interface DocsNode {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  tags: string[];
}

const docsData: Record<string, DocsNode> = {
  'exchange-api': {
    id: 'exchange-api',
    title: 'Institutional Exchange API',
    icon: <TerminalIcon className="w-6 h-6" />,
    tags: ['REST', 'WebSocket', 'Latency < 1ms'],
    content: `
## Connectivity Ecosystem
Our RESTful and WebSocket APIs are designed for ultra-low latency execution. Built with the same architecture as top-tier global equity exchanges.

### Endpoints
- **REST v2**: \`https://api.nexus.io/v2\`
- **WebSocket Feed**: \`wss://stream.nexus.io/v2/market\`

### Features
- **Latency**: Sub-millisecond order routing through our London and NY server clusters.
- **Rate Limits**: 50,000 requests/second for institutional endpoints.
- **Precision**: Support for 18 decimal places on all settlement operations.
    `
  },
  'wallet-protocol': {
    id: 'wallet-protocol',
    title: 'Nexus Wallet Protocol',
    icon: <Lock className="w-6 h-6" />,
    tags: ['MPC', 'HSM', 'Cold Storage'],
    content: `
## Cold Storage Architecture
The Nexus Wallet Protocol utilizes Multi-Party Computation (MPC) to eliminate single points of failure. No whole private key ever exists on a single machine or memory space.

### Security Layers
- **Military-Grade HSM**: Hardware modules resistant to brute-force and side-channel attacks.
- **Multi-Sig Governance**: 3-of-5 threshold required for any large-asset movement.
- **Air-Gapped Signing**: Critical operations are handled in physically separate, shielded facilities.
    `
  },
  'nexus-ledger': {
    id: 'nexus-ledger',
    title: 'Nexus Distributed Ledger',
    icon: <Globe className="w-6 h-6" />,
    tags: ['L1', 'Settlement', 'DDoS-Resistant'],
    content: `
## Settlement Layer
A high-performance L1 designed specifically for the instant settlement of financial assets. 

### Specifications
- **Throughput**: 1.2M Transactions Per Second (TPS).
- **Finality**: Deterministic finality in less than 200ms.
- **Consensus**: Nexus Proof-of-Stake with verifiable delay functions (VDF) for fairness.
    `
  },
  'deep-analysis': {
    id: 'deep-analysis',
    title: 'Advanced Market Analysis',
    icon: <Cpu className="w-6 h-6" />,
    tags: ['On-chain Data', 'Market Analytics'],
    content: `
## Analytics Core
Powered by the Nexus Alpha-V4 data engine, our analysis tools ingest over 5TB of on-chain and off-chain data every 24 hours.

### Analysis Pillars
- **Sentiment Engine**: Real-time NLP across global social media and financial news.
- **Whale Tracking**: Automated tracking of large-scale wallet movements across 40+ blockchains.
- **Risk Assessment**: Probability models for liquidation cascades and market shocks.
    `
  },
  'security-audit': {
    id: 'security-audit',
    title: 'Security Compliance',
    icon: <Shield className="w-6 h-6" />,
    tags: ['ISO 27001', 'SOC 2', 'Audited'],
    content: `
## Trust Framework
Nexus undergoes rigorous monthly audits by top-tier global cybersecurity firms. Our infrastructure is built to the same standards as critical national defense systems.

### Certifications
- **ISO/IEC 27001**: Information security management systems.
- **SOC 2 Type II**: Security, Availability, and Confidentiality compliance.
- **Real-time Monitoring**: 24/7 Red-team probing and automated vulnerability scanning.
    `
  },
  'privacy-policy': {
    id: 'privacy-policy',
    title: 'Data Privacy Policy',
    icon: <Lock className="w-6 h-6" />,
    tags: ['ZKP', 'Compliance', 'Anonymity'],
    content: `
## Identity Preservation
At Nexus, your privacy is not a feature; it's the foundation. We utilize Zero-Knowledge Proofs (ZKP) to verify compliance without revealing underlying sensitive data.

### Principles
- **Minimal Data Collection**: We only retain data strictly required by global regulatory frameworks.
- **Encryption**: All data is encrypted using AES-256-GCM at rest and TLS 1.3 in transit.
- **Ownership**: You remain the sole owner of your keys and data identity.
    `
  },
  'terms-of-service': {
    id: 'terms-of-service',
    title: 'Institutional Terms',
    icon: <FileText className="w-6 h-6" />,
    tags: ['SLA', 'Uptime', 'Liability'],
    content: `
## Service Agreement
Standard institutional terms for use of the Nexus Core infrastructure.

### Service Level Agreement (SLA)
- **Uptime**: 99.999% guaranteed for API and core settlement layers.
- **Execution**: Guaranteed execution within 2ms for all market orders under normal conditions.
- **Support**: 24/7/365 priority access for institutional partners.
    `
  },
  'press-kit': {
    id: 'press-kit',
    title: 'Global Press Kit',
    icon: <Share2 className="w-6 h-6" />,
    tags: ['Assets', 'Branding', 'Media'],
    content: `
## Branding Assets
Resources for media partners and ecosystem developers.

### Assets Include:
- Vector Logos (Light/Dark/Orange)
- Brand Guidelines (Typography & Color Specs)
- High-resolution Interface Renders
- Official Founder Bios and Headshots

*For media inquiries, please reach out to press@nexus.io*
    `
  }
};

export const DocsPortal = ({ isOpen, onClose, initialSlug }: { isOpen: boolean; onClose: () => void; initialSlug?: string }) => {
  const [selectedDoc, setSelectedDoc] = useState<DocsNode | null>(null);

  useEffect(() => {
    if (initialSlug && docsData[initialSlug]) {
      setSelectedDoc(docsData[initialSlug]);
    } else if (!selectedDoc) {
      setSelectedDoc(docsData['exchange-api']);
    }
  }, [initialSlug, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none sm:p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="relative w-full max-w-6xl h-full sm:h-[85vh] bg-black border border-white/10 sm:rounded-[2rem] shadow-[0_0_100px_rgba(196,255,0,0.1)] overflow-hidden flex flex-col md:flex-row pointer-events-auto"
      >
        {/* Sidebar */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/5 bg-black flex flex-col h-auto md:h-full overflow-hidden shrink-0">
          <div className="p-4 md:p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#c4ff00] p-1.5 rounded-lg shadow-lg shadow-[#c4ff00]/20">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-black tracking-[0.2em] text-white">NEXUS CORE</span>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex flex-row md:flex-col gap-1 custom-scrollbar">
            <p className="px-4 py-2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hidden md:block">Documentation</p>
            {Object.values(docsData).map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`flex items-center gap-4 p-3 md:p-4 rounded-xl transition-all text-left group relative shrink-0 md:shrink ${
                  selectedDoc?.id === doc.id 
                    ? 'bg-white/5 text-white' 
                    : 'text-white/40 hover:bg-white/[0.02] hover:text-white/80'
                }`}
              >
                {selectedDoc?.id === doc.id && (
                  <motion.div 
                    layoutId="doc-active"
                    className="absolute left-0 right-0 md:right-auto md:top-2 md:bottom-2 bottom-0 md:w-1 h-1 md:h-auto bg-[#c4ff00] rounded-t-full md:rounded-r-full shadow-[0_0_10px_#c4ff00]" 
                  />
                )}
                <div className={`${selectedDoc?.id === doc.id ? 'text-[#c4ff00]' : 'text-white/20'} group-hover:text-[#c4ff00] transition-colors shrink-0`}>
                  {doc.icon}
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-wide truncate max-w-[120px] md:max-w-none">{doc.title}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 hidden md:block mt-auto">
            <div className="flex items-center gap-3 text-white/40">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Network Peak</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-transparent to-[#c4ff00]/[0.02] overflow-hidden">
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-black/20 shrink-0">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#c4ff00]" />
              <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em]">Institutional Protocol v4.2.0</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-white hover:rotate-90"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-16 custom-scrollbar scroll-smooth overscroll-contain">
            {selectedDoc && (
              <motion.div
                key={selectedDoc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedDoc.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-white/60 text-[9px] font-black uppercase tracking-widest rounded-md border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
                  {selectedDoc.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? '' : 'text-[#c4ff00]'}>{word} </span>
                  ))}
                </h1>

                <div className="prose prose-invert max-w-none prose-h2:text-white prose-h2:text-2xl prose-h2:font-black prose-h2:tracking-tight prose-h2:uppercase prose-h2:mt-16 prose-p:text-white/60 prose-p:text-lg prose-p:leading-relaxed prose-li:text-white/60 prose-strong:text-white prose-code:text-[#c4ff00] prose-code:bg-[#c4ff00]/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  {selectedDoc.content.split('\n').map((line, i) => {
                    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-white tracking-tight mt-12 mb-6 uppercase border-b border-white/5 pb-4">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-black text-white/80 mt-10 mb-4 uppercase tracking-wide">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="text-white/60 text-lg mb-3 ml-4 list-disc marker:text-[#c4ff00]">{line.replace('- ', '')}</li>;
                    if (line.startsWith('`')) return (
                      <div key={i} className="my-6 p-6 bg-black border border-white/5 rounded-2xl font-mono text-sm overflow-x-auto">
                        <code className="text-[#c4ff00]">{line.replace(/`/g, '')}</code>
                      </div>
                    );
                    if (line.trim() === '') return <div key={i} className="h-4" />;
                    return <p key={i} className="text-white/60 text-lg leading-relaxed mb-6 font-medium">{line}</p>;
                  })}
                </div>

                {/* Technical Footnote */}
                <div className="mt-24 p-8 bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-32 h-32 text-[#c4ff00]" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#c4ff00] rounded-full animate-pulse" />
                      <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.4em]">Integrated security protocol</p>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xl">
                      This documentation is dynamically served from the Nexus Ledger. All technical specifications are subject to real-time verification via our distributed node network.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-[#c4ff00] text-black font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg shadow-[#c4ff00]/20 hover:scale-105 active:scale-95 transition-all">
                        Validate Hashes
                      </button>
                      <button className="px-6 py-3 bg-white/5 text-white/60 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all border border-white/5">
                        Download SDK
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
