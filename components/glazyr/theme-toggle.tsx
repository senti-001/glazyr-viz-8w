"use client"

import { useCallback, useSyncExternalStore } from "react"
import { Sun, Moon } from "lucide-react"

function subscribe(callback: () => void) {
    // Listen for class changes on <html> (MutationObserver)
    const observer = new MutationObserver(callback)
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    })
    // Also listen for storage event (cross-tab sync)
    window.addEventListener("storage", callback)
    return () => {
        observer.disconnect()
        window.removeEventListener("storage", callback)
    }
}

function getSnapshot() {
    return document.documentElement.classList.contains("dark")
}

function getServerSnapshot() {
    return true // Default to dark on server
}

export function ThemeToggle() {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    const toggle = useCallback(() => {
        const next = !isDark
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem("glazyr-theme", next ? "dark" : "light")
    }, [isDark])

    return (
        <button
            onClick={toggle}
            className="slb-btn slb-btn-sm"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    )
}
