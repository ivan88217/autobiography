"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { BiographySections } from "@/components/biography-sections"
import { PasswordProtection } from "@/components/password-protection"
import biographyData from "@/data/biography.json"

type ProjectStatus = 'active' | 'deprecated' | 'abandoned'

interface Project {
  name: string
  period: string
  status: ProjectStatus
  description: string
  technologies: string[]
  highlights: string[]
  pictures: string[]
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
  link: string | null
  pictures: string[]
}

export default function Home() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 檢查是否已經通過驗證
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const authenticated = localStorage.getItem("biography-authenticated")
        setIsAuthenticated(authenticated === "true")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleCorrectPassword = () => {
    setIsAuthenticated(true)
  }

  const currentData = {
    personal: biographyData.personal[language],
    experience: biographyData.experience[language],
    projects: biographyData.projects[language] as Project[],
    education: biographyData.education[language],
    skills: biographyData.skills[language],
    certifications: biographyData.certifications[language] as Certification[],
  }

  // 顯示載入狀態
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    )
  }

  // 如果未通過驗證，顯示密碼輸入頁面
  if (!isAuthenticated && false) {
    return <PasswordProtection onCorrectPassword={handleCorrectPassword} />
  }

  // 通過驗證後顯示原有內容
  return (
    <div className="min-h-screen bg-background">
      {/* Header with controls */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/portfolio">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                {language === 'zh' ? '作品集 PDF 版本' : 'Portfolio PDF Version'}
              </Button>
            </Link>
            <Link href="/resume">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                {language === 'zh' ? '簡歷版本' : 'Resume Version'}
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            <ThemeToggle />
          </div>
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
            {language === 'zh' ? '© 2025 施易男' : '© 2025 Ivan Shih'}
          </p>
        </div>
      </footer>
    </div>
  )
}
