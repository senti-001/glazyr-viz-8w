"use client"

import { useState } from "react"
import { X, Mic, Send } from "lucide-react"
import Image from "next/image"

export function AiOrb() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Orb Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-background border border-primary/30 animate-orb-glow transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? (
          <X className="h-6 w-6 text-primary" />
        ) : (
          <Image
            src="/images/glazyr-emblem.png"
            alt="Senti AI"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-panel rounded-2xl border border-primary/20 overflow-hidden glow-cyan-subtle">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
            <div className="relative">
              <Image
                src="/images/glazyr-emblem.png"
                alt="Senti AI"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Senti</div>
              <div className="text-[10px] text-muted-foreground">
                Glazyr AI Concierge
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-5 py-6 min-h-[200px] max-h-[320px] overflow-y-auto flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="rounded-xl rounded-tl-sm bg-secondary/50 px-4 py-2.5 text-sm text-foreground max-w-[85%] leading-relaxed">
                Welcome to Glazyr. I am Senti, your agentic intelligence
                interface. How can I assist you today?
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="rounded-xl rounded-tr-sm bg-primary/15 px-4 py-2.5 text-sm text-foreground max-w-[85%] leading-relaxed">
                Tell me about the Agentic Link.
              </div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-xl rounded-tl-sm bg-secondary/50 px-4 py-2.5 text-sm text-foreground max-w-[85%] leading-relaxed">
                The Agentic Link is our high-intent onboarding protocol. Once
                initiated, it triggers a proactive AI callback via SMS or Voice
                within 60 seconds. Would you like to begin?
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border/50 px-4 py-3 flex items-center gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Voice input"
            >
              <Mic className="h-4 w-4" />
            </button>
            <input
              type="text"
              placeholder="Ask Senti..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              aria-label="Chat message input"
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
