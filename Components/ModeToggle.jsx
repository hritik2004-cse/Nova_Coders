"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/Components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <div className="h-10 w-10" />;
    }

    const isDarkMode = theme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            aria-label="Toggle theme"
            className="text-slate-600 dark:text-[#8892b0] hover:bg-blue-50 dark:hover:bg-[#112240] hover:text-blue-600 dark:hover:text-[#64ffda]"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
