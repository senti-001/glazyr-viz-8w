"use client"

import { useState, useEffect, useRef } from "react"
import { Monitor, Terminal as TerminalIcon, Wifi, WifiOff, RefreshCcw } from "lucide-react"

export function VisionInspector() {
    const [wsUrl, setWsUrl] = useState("wss://node.glazyr.com/vision/feed")
    const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")
    const [logs, setLogs] = useState<{ id: string; time: string; msg: string; isError?: boolean }[]>([])
    const wsRef = useRef<WebSocket | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const logsEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [logs])

    const addLog = (msg: string, isError = false) => {
        setLogs(prev => [...prev, {
            id: Math.random().toString(36).substring(7),
            time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            msg,
            isError
        }].slice(-50)) // Keep last 50 logs
    }

    const drawFrame = (base64Data: string) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.onload = () => {
            // Draw image scaled to fit canvas while maintaining aspect ratio
            const hRatio = canvas.width / img.width
            const vRatio = canvas.height / img.height
            const ratio = Math.min(hRatio, vRatio)
            const centerShift_x = (canvas.width - img.width * ratio) / 2
            const centerShift_y = (canvas.height - img.height * ratio) / 2
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
        }
        img.src = base64Data
    }

    const connect = () => {
        if (wsRef.current) {
            wsRef.current.close()
        }

        setStatus("connecting")
        addLog(`Attempting to connect to ${wsUrl}...`)

        try {
            const ws = new WebSocket(wsUrl)
            
            ws.onopen = () => {
                setStatus("connected")
                addLog("Connected to Glazyr Vision Node.")
            }

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    if (data.type === "frame" && data.data) {
                        drawFrame(data.data)
                    } else if (data.type === "log" && data.message) {
                        addLog(data.message)
                    }
                } catch (e) {
                    // If it's not JSON, just log it
                    addLog(event.data)
                }
            }

            ws.onclose = () => {
                setStatus("disconnected")
                addLog("Connection closed.", true)
            }

            ws.onerror = (err) => {
                setStatus("disconnected")
                addLog("WebSocket connection error. Is the remote Glazyr node reachable?", true)
            }

            wsRef.current = ws
        } catch (error: any) {
            setStatus("disconnected")
            addLog(`Error: ${error.message}`, true)
        }
    }

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }
    }

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (wsRef.current) {
                wsRef.current.close()
            }
        }
    }, [])

    return (
        <div className="space-y-6">
            {/* Connection Bar */}
            <div className="slb-panel p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 w-full flex items-center gap-3">
                    <div className="flex-1 max-w-sm relative">
                        <input 
                            type="text" 
                            value={wsUrl}
                            onChange={(e) => setWsUrl(e.target.value)}
                            disabled={status === "connected"}
                            className="slb-input w-full pl-3 pr-4 py-2 font-mono text-sm"
                            placeholder="wss://node.glazyr.com/vision/feed"
                        />
                    </div>
                    {status === "disconnected" ? (
                        <button onClick={connect} className="slb-btn slb-btn-primary flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            Connect Node
                        </button>
                    ) : (
                        <button onClick={disconnect} className="slb-btn slb-btn-outline border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center gap-2">
                            <WifiOff className="h-4 w-4" />
                            Disconnect
                        </button>
                    )}
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-background text-sm font-medium">
                    {status === "connected" && <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>}
                    {status === "connecting" && <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>}
                    {status === "disconnected" && <span className="flex h-2 w-2 rounded-full bg-red-500"></span>}
                    <span className="capitalize">{status}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vision Canvas Feed */}
                <div className="lg:col-span-2 space-y-3">
                    <h3 className="slb-header text-lg flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-primary" />
                        Live Vision Feed
                    </h3>
                    <div className="slb-inset aspect-video bg-zinc-950 relative overflow-hidden rounded-xl border border-zinc-800 flex items-center justify-center">
                        <canvas 
                            ref={canvasRef}
                            width={1280}
                            height={720}
                            className="w-full h-full object-contain"
                        />
                        {status !== "connected" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm text-zinc-500 gap-3">
                                <Monitor className="h-12 w-12 opacity-50" />
                                <p className="font-mono text-sm">Awaiting connection to zero-copy memory buffer...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Agent Logs */}
                <div className="space-y-3 flex flex-col h-full">
                    <h3 className="slb-header text-lg flex items-center gap-2">
                        <TerminalIcon className="h-5 w-5 text-primary" />
                        Agent Execution Log
                    </h3>
                    <div className="slb-inset flex-1 min-h-[300px] bg-zinc-950 rounded-xl border border-zinc-800 p-4 font-mono text-xs overflow-y-auto flex flex-col">
                        {logs.length === 0 ? (
                            <div className="text-zinc-600 m-auto text-center italic">No events received.</div>
                        ) : (
                            <div className="space-y-2">
                                {logs.map(log => (
                                    <div key={log.id} className="flex items-start gap-2">
                                        <span className="text-zinc-500 shrink-0">[{log.time}]</span>
                                        <span className={log.isError ? "text-red-400" : "text-emerald-400"}>
                                            {log.msg}
                                        </span>
                                    </div>
                                ))}
                                <div ref={logsEndRef} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
