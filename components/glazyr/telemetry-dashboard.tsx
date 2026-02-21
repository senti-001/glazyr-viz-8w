"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  TrendingUp,
  Shield,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function generateTelemetryData() {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    cpu: Math.floor(Math.random() * 30 + 20),
    memory: Math.floor(Math.random() * 20 + 55),
    network: Math.floor(Math.random() * 40 + 10),
  }))
}

const systemModules = [
  { name: "Senti Core", status: "nominal", uptime: "99.99%", icon: Shield },
  { name: "Big Iron", status: "nominal", uptime: "99.97%", icon: Server },
  { name: "Cascade Engine", status: "nominal", uptime: "99.95%", icon: Cpu },
  { name: "Sovereign Relay", status: "degraded", uptime: "98.82%", icon: Wifi },
]

function StatusDot({ status }: { status: string }) {
  const color =
    status === "nominal"
      ? "bg-emerald-500"
      : status === "degraded"
        ? "bg-amber-500"
        : "bg-red-500"

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: string
  trend?: string
}) {
  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <Icon className="h-5 w-5 text-primary" />
        {trend && (
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground font-mono mb-1">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  )
}

export function TelemetryDashboard() {
  const [data, setData] = useState(generateTelemetryData)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateTelemetryData())
    }, 8000)

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    }, 1000)

    setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }))

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <section id="pulse" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-widest">
            Real-Time Telemetry
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
          Glazyr Pulse
        </h2>
        <p className="text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Live monitoring of build cycles, server health, and the intelligence
          cascade. All systems reporting.
        </p>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard icon={Cpu} label="CPU Load" value="24.3%" trend="+2.1%" />
          <MetricCard icon={HardDrive} label="Memory" value="62.7%" trend="-1.8%" />
          <MetricCard icon={Wifi} label="Network I/O" value="847 Mb/s" trend="+12.4%" />
          <MetricCard icon={Clock} label="Clock" value={currentTime || "--:--:--"} />
        </div>

        {/* Chart + Status Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                System Performance (24h)
              </h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  CPU
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-2" />
                  Memory
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-3" />
                  Network
                </span>
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.78 0.15 195)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.78 0.15 195)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.12 195)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.65 0.12 195)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    stroke="oklch(0.60 0.01 250)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(0.60 0.01 250)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(18, 22, 30, 0.9)",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stroke="oklch(0.78 0.15 195)"
                    fill="url(#cpuGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stroke="oklch(0.65 0.12 195)"
                    fill="url(#memGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="network"
                    stroke="oklch(0.50 0.08 250)"
                    fill="none"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* System Status */}
          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">
              Module Status
            </h3>
            <div className="flex flex-col gap-4">
              {systemModules.map((mod) => (
                <div
                  key={mod.name}
                  className="flex items-center gap-4 rounded-lg bg-secondary/30 p-4 transition-all hover:bg-secondary/50"
                >
                  <mod.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {mod.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {mod.uptime} uptime
                    </div>
                  </div>
                  <StatusDot status={mod.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
