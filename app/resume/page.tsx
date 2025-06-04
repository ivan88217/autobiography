"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import biographyData from "@/data/biography.json"

export default function Resume() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage)
  }

  const handlePrint = () => {
    window.print()
  }

  const currentData = {
    personal: biographyData.personal[language],
    experience: biographyData.experience[language],
    projects: biographyData.projects[language],
    education: biographyData.education[language],
    skills: biographyData.skills[language],
    certifications: biographyData.certifications[language],
  }

  // 核心技能概要
  const coreSkills = currentData.skills.flatMap(category => category.items).slice(0, 12)

  return (
    <div className="min-h-screen bg-background">
      {/* Header with controls - hidden when printing */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {language === 'zh' ? '返回首頁' : 'Back to Home'}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {language === 'zh' ? '列印/下載' : 'Print/Download'}
            </Button>
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Resume Content - optimized for A4 printing */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg print:shadow-none print:rounded-none p-8 print:p-6">
          
          {/* Header Section with Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 print:mb-6">
            {/* Personal Photo */}
            <div className="flex-shrink-0">
              <img 
                src={currentData.personal.image} 
                alt={currentData.personal.name}
                className="w-32 h-32 print:w-24 print:h-24 rounded-full object-cover border-4 border-blue-500"
              />
            </div>
            
            {/* Name and Contact Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl print:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentData.personal.name}
              </h1>
              <h2 className="text-xl print:text-lg text-gray-600 dark:text-gray-300 mb-4">
                {currentData.personal.title}
              </h2>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 print:gap-3 text-sm print:text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 print:h-3 print:w-3" />
                  <span>{currentData.personal.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 print:h-3 print:w-3" />
                  <span>{currentData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 print:h-3 print:w-3" />
                  <span>{currentData.personal.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4 print:h-3 print:w-3" />
                  <span className="break-all">{currentData.personal.github.replace('https://github.com/', '')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4 print:h-3 print:w-3" />
                  <span className="break-all">{currentData.personal.linkedin.replace('https://www.linkedin.com/in/', '')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Summary */}
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
              {language === 'zh' ? '個人簡介' : 'Personal Summary'}
            </h3>
            <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="mb-3">
                {currentData.personal.summary}
              </p>
            </div>
          </section>

          {/* Professional Summary */}
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
              {language === 'zh' ? '專業概要' : 'Professional Summary'}
            </h3>
            <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {language === 'zh' ? (
                <div className="space-y-2">
                  <p>• <strong>6年以上全端開發經驗</strong>，目前擔任敦謙國際智能後端工程師主任，具備完整專案開發管理能力</p>
                  <p>• <strong>系統架構專家</strong>，主導系統核心開發，成功將單體架構遷移至微服務架構，並且在不影響到營運的情況下，實現零停機升級</p>
                  <p>• <strong>技術團隊領導者</strong>，負責團隊成員管理、技術培訓、代碼審查，以及跨部門協作與衝突處理</p>
                  <p>• <strong>高併發系統設計師</strong>，熟悉分散式系統、Redis快取、資料庫優化，瞭解DevOps流程及雲端部署(GCP/K8S)</p>
                  <p>• <strong>AI技術先驅者</strong>，積極運用GitHub Copilot、Cursor等AI工具，帶來不同以往的開發效率提升</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>• <strong>6+ years full-stack development experience</strong>, currently Backend Engineer Supervisor at DUNQIAN Smart Co., Ltd. with complete project development management capabilities</p>
                  <p>• <strong>System Architecture Expert</strong>, lead core system development, successfully migrated monolithic to microservices with zero downtime</p>
                  <p>• <strong>Technical Team Leader</strong>, manage 14 team members, responsible for training, code review, cross-department collaboration and conflict resolution</p>
                  <p>• <strong>High-Concurrency System Designer</strong>, proficient in distributed systems, Redis caching, database optimization. Understand DevOps processes and cloud deployment (GCP/K8S)</p>
                  <p>• <strong>AI Technology Pioneer</strong>, actively utilize GitHub Copilot, Cursor and other AI tools, bring different development efficiency</p>
                </div>
              )}
            </div>
          </section>

          {/* Key Achievements */}
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
              {language === 'zh' ? '關鍵成就' : 'Key Achievements'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-3">
              {language === 'zh' ? (
                <>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-blue-600 dark:text-blue-400">6+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">年開發經驗</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-green-600 dark:text-green-400">12+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">團隊成員管理</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-purple-600 dark:text-purple-400">零停機</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">架構升級</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-orange-600 dark:text-orange-400">10+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">核心專案</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-red-600 dark:text-red-400">24x7</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">系統維運</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-indigo-600 dark:text-indigo-400">AI先驅</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">技術革新</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-blue-600 dark:text-blue-400">6+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">Years Experience</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-green-600 dark:text-green-400">12+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">Team Members</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-purple-600 dark:text-purple-400">Zero</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">Downtime Migration</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-orange-600 dark:text-orange-400">10+</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">Core Projects</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-red-600 dark:text-red-400">24x7</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">System Operations</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 print:p-2 rounded-lg">
                    <div className="text-2xl print:text-lg font-bold text-indigo-600 dark:text-indigo-400">AI Pioneer</div>
                    <div className="text-sm print:text-xs text-gray-700 dark:text-gray-300">Innovation</div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:gap-4 mb-6 print:mb-4">
            <section>
              <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
                {language === 'zh' ? '學歷' : 'Education'}
              </h3>
              {currentData.education.map((edu, index) => (
                <div key={index} className="mb-3 print:mb-2">
                  <h4 className="text-sm print:text-xs font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-sm print:text-xs text-blue-600 dark:text-blue-400">
                    {edu.school}
                  </p>
                  <p className="text-xs print:text-[10px] text-gray-500 dark:text-gray-400">
                    {edu.period}
                  </p>
                </div>
              ))}
            </section>

            <section>
              <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
                {language === 'zh' ? '專業證照' : 'Certifications'}
              </h3>
              {currentData.certifications.map((cert, index) => (
                <div key={index} className="mb-3 print:mb-2">
                  <h4 className="text-sm print:text-xs font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <p className="text-sm print:text-xs text-blue-600 dark:text-blue-400">
                    {cert.issuer}
                  </p>
                  <p className="text-xs print:text-[10px] text-gray-500 dark:text-gray-400">
                    {cert.date} • {cert.credentialId}
                  </p>
                </div>
              ))}
            </section>
          </div>

          {/* Key Experience */}
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
              {language === 'zh' ? '關鍵工作經歷' : 'Key Work Experience'}
            </h3>
            <div className="space-y-4 print:space-y-3">
              {currentData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-base print:text-sm font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h4>
                      <p className="text-sm print:text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm print:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm print:text-xs text-gray-700 dark:text-gray-300 mb-2">
                    {exp.description}
                  </p>
                  <ul className="text-xs print:text-[10px] text-gray-600 dark:text-gray-400 space-y-1">
                    {exp.responsibilities.slice(0, 3).map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{resp.title}: {resp.details}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Core Skills */}
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-900 dark:text-white mb-3 print:mb-2 border-b-2 border-blue-500 pb-1">
              {language === 'zh' ? '核心技能' : 'Core Skills'}
            </h3>
            <div className="grid grid-cols-3 print:grid-cols-4 gap-2 print:gap-1">
              {coreSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs print:text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 
