"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { BiographySections } from "@/components/biography-sections"
import biographyData from "@/data/biography.json"

type ProjectStatus = 'active' | 'deprecated' | 'abandoned'

interface Project {
  name: string
  period: string
  status: ProjectStatus
  description: string
  technologies: string[]
  highlights: string[]
  link: string | null
  demo: string | null
}

interface Certification {
  name: string
  issuer: string
  date: string
  expiryDate: string | null
  credentialId: string
  description: string
  link: string
}

export default function Home() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage)
  }

  const currentData = {
    personal: biographyData.personal[language],
    experience: biographyData.experience[language],
    projects: biographyData.projects[language] as Project[],
    education: biographyData.education[language],
    skills: biographyData.skills[language],
    certifications: biographyData.certifications[language] as Certification[],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with controls */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-end gap-2 px-4">
          <LanguageToggle 
            currentLanguage={language} 
            onLanguageChange={handleLanguageChange} 
          />
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <BiographySections
          personal={currentData.personal}
          experience={currentData.experience}
          projects={currentData.projects}
          education={currentData.education}
          skills={currentData.skills}
          certifications={currentData.certifications}
          language={language}
          allPersonalData={biographyData.personal}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            {language === 'zh' 
              ? '© 2024 個人自傳網站。使用 Next.js 和 Tailwind CSS 建立。'
              : '© 2024 Personal Biography Website. Built with Next.js and Tailwind CSS.'
            }
          </p>
        </div>
      </footer>
    </div>
  )
}
