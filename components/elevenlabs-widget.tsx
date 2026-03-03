"use client"

import { useEffect, useState, useRef } from "react"

export function ElevenLabsWidget() {
    const [position, setPosition] = useState({ x: 20, y: 20 }) // Distance from bottom-right by default
    const [isDragging, setIsDragging] = useState(false)
    const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null)

    useEffect(() => {
        // Load ElevenLabs Conversational AI Widget
        const script = document.createElement("script")
        script.src = "https://elevenlabs.io/convai-widget/index.js"
        script.async = true
        script.type = "text/javascript"
        document.body.appendChild(script)

        // Force the widget to be static so it follows our draggable container
        const style = document.createElement("style")
        style.innerHTML = `
            elevenlabs-convai {
                position: static !important;
                display: block !important;
            }
        `
        document.head.appendChild(style)

        return () => {
            try {
                document.body.removeChild(script)
                document.head.removeChild(style)
            } catch { }
        }
    }, [])

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true)
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            initialX: position.x,
            initialY: position.y
        }
            ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !dragRef.current) return

        const deltaX = dragRef.current.startX - e.clientX
        const deltaY = dragRef.current.startY - e.clientY

        setPosition({
            x: dragRef.current.initialX + deltaX,
            y: dragRef.current.initialY + deltaY
        })
    }

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false)
        dragRef.current = null
            ; (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: `${position.y}px`,
                right: `${position.x}px`,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                pointerEvents: 'none',
                touchAction: 'none'
            }}
        >
            {/* Draggable Handle */}
            <div
                style={{
                    padding: '4px 8px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '6px',
                    marginBottom: '4px',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s',
                    opacity: isDragging ? 1 : 0.7,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="hover:opacity-100 hover:scale-105"
            >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f2fe', boxShadow: '0 0 8px #00f2fe' }}></div>
                MOVE AGENT
            </div>

            {/* The Widget */}
            <div style={{ pointerEvents: 'auto' }}>
                <elevenlabs-convai agent-id="agent_6101khj3773zesqrh2pwcsenxy59" />
            </div>
        </div>
    )
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
        }
    }
}
