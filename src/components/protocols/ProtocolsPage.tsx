import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Lock, Globe, Cpu, Zap, Activity, 
  Terminal, ShieldCheck, Database, Server,
  BarChart3, RefreshCw, Layers, CheckCircle2,
  LucideIcon
} from 'lucide-react';

interface ProtocolStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const PROTOCOL_STATS: ProtocolStat[] = [
  { label: 'Network Uptime', value: '99.999%', icon: Activity, color: 'text-[#c4ff00]' },
  { label: 'Throughput', value: '1.2M TPS', icon: Zap, color: 'text-blue-400' },
  { label: 'Finality', value: '< 200ms', icon: RefreshCw, color: 'text-purple-400' },
  { label: 'Nodes Active', value: '4,096', icon: Globe, color: 'text-emerald-400' },
];

interface Protocol {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  specs: { key: string; value: string }[];
  features: string[];
  color: string;
}

const PROTOCOLS: Protocol[] = [
  {
    id: 'ledger',
    title: 'Nexus Distributed Ledger',
    subtitle: 'L1 Settlement Infrastructure',
    icon: Globe,
    description: 'A high-performance L1 designed specifically for the instant settlement of global financial assets.',
    specs: [
      { key: 'Latency', value: 'Sub-millisecond' },
      { key: 'Consensus', value: 'Proof-of-Stake + VDF' },
      { key: 'Security', value: 'DDoS-Resistant Mesh' }
    ],
    features: ['Instant Finality', 'Atomic Swaps', 'Smart Contracts v4'],
    color: 'from-blue-500/20 to-transparent'
  },
  {
    id: 'wallet',
    title: 'Nexus Wallet Protocol',
    subtitle: 'MPC Custody Solution',
    icon: Lock,
    description: 'Utilizing Multi-Party Computation to eliminate single points of failure in asset management.',
    specs: [
      { key: 'Architecture', value: 'MPC-Based Threshold' },
      { key: 'Hardware', value: 'Industrial HSM' },
      { key: 'Compliance', value: 'Institutional Ready' }
    ],
    features: ['3-of-5 Governance', 'Air-Gapped Signing', 'Biometric Authorization'],
    color: 'from-[#c4ff00]/20 to-transparent'
  },
  {
    id: 'analysis',
    title: 'Alpha-V4 Analysis',
    subtitle: 'On-Chain Intelligence Core',
    icon: Cpu,
    description: 'Deep ingestion engine processing over 5TB of data every cycle for predictive market modeling.',
    specs: [
      { key: 'Data Rate', value: '5TB / 24h' },
      { key: 'Model', value: 'Neural Sentiment' },
      { key: 'Integration', value: 'Cross-Chain API' }
    ],
    features: ['Whale Tracking', 'Liquidation Risk', 'Sentiment Mapping'],
    color: 'from-purple-500/20 to-transparent'
  },
  {
    id: 'security',
    title: 'Nexus Security Matrix',
    subtitle: 'Compliance & Audit Layer',
    icon: ShieldCheck,
    description: 'Military-grade encryption and real-time red-team probing to ensure maximum asset safety.',
    specs: [
      { key: 'Audit', value: 'Monthly External' },
      { key: 'Standard', value: 'ISO 27001 / SOC 2' },
      { key: 'Monitoring', value: '24/7 Red-Team' }
    ],
    features: ['ZKP Privacy', 'AES-256-GCM Encryption', 'Automated Bug Bounty'],
    color: 'from-emerald-500/20 to-transparent'
  }
];

export const ProtocolsPage = () => {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-[#c4ff00] p-1.5 rounded-lg shadow-[0_0_20px_rgba(196,255,0,0.3)]">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <span className="text-[9px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.4em] text-[#c4ff00] uppercase underline underline-offset-8 decoration-2 decoration-[#c4ff00]/50">
              Institutional Protocol v4.2.0
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8"
          >
            CORE<br/>INFRASTRUCTURE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-base md:text-xl max-w-xl font-medium leading-relaxed"
          >
            NEXUS operates as a distributed financial operating system, combining ultra-low latency settlement with military-grade security protocols.
          </motion.p>
        </div>

        {/* Global Reality Dashboard - matching Screenshot 2 mobile grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-16 md:mb-24">
          {PROTOCOL_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/[0.03] p-5 md:p-8 rounded-3xl backdrop-blur-md relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-12 h-12 md:w-16 md:h-16" />
                </div>
                <div className="flex items-center gap-2 mb-3 text-white/40 uppercase tracking-widest text-[8px] md:text-[10px] font-black">
                  <Icon className="w-4 h-4" />
                  {stat.label}
                </div>
                <div className={`text-xl md:text-4xl font-black ${stat.color} tracking-tight leading-none`}>
                  {stat.value}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Protocol Grid - Replacing Tabs with Realistic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {PROTOCOLS.map((protocol, i) => {
            const Icon = protocol.icon;
            return (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-gradient-to-br ${protocol.color} bg-zinc-900/20 border border-white/10 rounded-[2rem] p-6 md:p-8 relative overflow-hidden h-full flex flex-col`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/[0.05] transition-all" />
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between mb-6 md:mb-8">
                    <div className="text-white/20 group-hover:text-white group-hover:scale-105 transition-all duration-500">
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(dot => (
                        <div key={dot} className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-[#c4ff00]/40 transition-colors" />
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <p className="text-[#c4ff00] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1.5">{protocol.subtitle}</p>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">{protocol.title}</h3>
                    <p className="text-white/50 text-[11px] md:text-xs leading-relaxed max-w-md">{protocol.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5 mb-6 md:mb-8">
                    {protocol.specs.map(spec => (
                      <div key={spec.key}>
                        <p className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">{spec.key}</p>
                        <p className="text-[10px] md:text-xs font-bold text-white tracking-wide">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {protocol.features.map(feature => (
                      <div key={feature} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[7px] md:text-[8px] font-black text-white/50 uppercase tracking-widest">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#c4ff00]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Validation Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/60 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                DYNAMIC<br/>VALIDATION ENGINE
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-8">
                Every technical specification listed here is subject to real-time verification via our distributed node network. We utilize Zero-Knowledge Proofs to verify uptime without exposing underlying telemetry.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#c4ff00] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-lg shadow-[#c4ff00]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  Validate Status
                </button>
                <button className="px-8 py-4 bg-white/5 text-white/80 font-black uppercase text-xs tracking-[0.2em] rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  Technical Whitepaper
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-black border border-white/5 rounded-3xl p-6 font-mono text-xs overflow-hidden relative group">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-white/20 uppercase tracking-widest text-[9px]">live_trace.sh</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[#c4ff00]">$ nexus-check --matrix security-v4</p>
                  <p className="text-white/40">{`> Initializing handshake with 4,096 validators...`}</p>
                  <p className="text-white/40">{`> Verifying MPC threshold shards [3/5] OK`}</p>
                  <p className="text-[#c4ff00]">{`> Consensus reached in 192ms`}</p>
                  <p className="text-white/40">{`> AES-256-GCM Integrity: VERIFIED`}</p>
                  <p className="text-white/40 animate-pulse">{`> Subscribing to telemetry stream...`}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
