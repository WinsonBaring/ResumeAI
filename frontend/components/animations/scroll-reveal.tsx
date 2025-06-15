"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
    children: React.ReactNode
    direction?: "up" | "down" | "left" | "right" | "fade"
    delay?: number
    className?: string
}

export function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay)
                }
            },
            { threshold: 0.1 },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [delay])

    const getTransform = () => {
        if (isVisible) return "translate-x-0 translate-y-0 opacity-100 scale-100"

        switch (direction) {
            case "up":
                return "translate-y-16 opacity-0 scale-95"
            case "down":
                return "-translate-y-16 opacity-0 scale-95"
            case "left":
                return "translate-x-16 opacity-0 scale-95"
            case "right":
                return "-translate-x-16 opacity-0 scale-95"
            case "fade":
                return "opacity-0 scale-90"
            default:
                return "translate-y-16 opacity-0 scale-95"
        }
    }

    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out ${getTransform()} ${className}`}>
            {children}
        </div>
    )
}
