"use client"

import biographyData from '@/data/biography.json';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function PortfolioPage() {
  const projects = biographyData.projects.zh;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 print:bg-white print:shadow-none">
      {/* 列印用的CSS */}
      <style jsx global>{`
        @media print {
          body { 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          .print-avoid-break { page-break-inside: avoid; }
          .shadow-lg { box-shadow: none !important; }
          .bg-gradient-to-r { background: white !important; }
        }
        @page {
          margin: 1cm;
          size: A4;
        }
      `}</style>

      <div className="max-w-4xl mx-auto p-6 print:p-4">
        {/* 封面頭部 */}
        <div className="text-center mb-8 print:mb-6 print-avoid-break">
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
            <Image
              src={biographyData.personal.zh.image}
              alt={biographyData.personal.zh.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl print:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {biographyData.personal.zh.name}
          </h1>
          <p className="text-xl print:text-lg text-gray-600 dark:text-gray-300 mb-4">
            {biographyData.personal.zh.title}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>📧 {biographyData.personal.zh.email}</p>
            <p>📱 {biographyData.personal.zh.phone}</p>
            <p>📍 {biographyData.personal.zh.location}</p>
          </div>
        </div>

        {/* 專案作品集 */}
        <div className="space-y-8 print:space-y-6">
          <h2 className="text-3xl print:text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6">
            專案作品集
          </h2>

          {projects.map((project, index) => (
            <Card key={index} className="print-avoid-break shadow-lg print:shadow-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 print:border-gray-300 print:bg-white">
              <CardContent className="p-6 print:p-4">
                {/* 專案標題和基本資訊 */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl print:text-xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium print:border print:px-2 print:py-0.5 ${
                      project.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 print:bg-white print:text-green-800' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 print:bg-white print:text-blue-800'
                    }`}>
                      {project.status === 'active' ? '進行中' : '已完成'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm print:text-xs mb-1">
                    開發期間：{project.period}
                  </p>
                  {project.demo && (
                    <p className="text-blue-600 dark:text-blue-400 text-sm print:text-xs">
                      示範網址：{project.demo}
                    </p>
                  )}
                </div>

                {/* 專案描述 */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 print:mb-3 text-sm print:text-xs leading-relaxed">
                  {project.description}
                </p>

                {/* 專案圖片 */}
                {project.pictures && project.pictures.length > 0 && (
                  <div className="mb-4 print:mb-3">
                    <h4 className="text-lg print:text-base font-semibold text-gray-900 dark:text-white mb-3 print:mb-2">
                      專案截圖
                    </h4>
                    <div className={`grid gap-4 print:gap-2 ${
                      project.pictures.length === 1 
                        ? 'grid-cols-1' 
                        : 'grid-cols-2' 
                    }`}>
                      {project.pictures.map((picture, picIndex) => (
                        <div 
                          key={picIndex} 
                          className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden print:rounded border border-gray-200 dark:border-gray-600 print:border-gray-300"
                        >
                          <Image
                            src={picture}
                            alt={`${project.name} 截圖 ${picIndex + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform print:hover:scale-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 主要特色 */}
                <div className="mb-4 print:mb-3">
                  <h4 className="text-lg print:text-base font-semibold text-gray-900 dark:text-white mb-2">
                    主要特色
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
                    {project.highlights.map((highlight, hlIndex) => (
                      <div key={hlIndex} className="flex items-start space-x-2">
                        <span className="text-blue-500 dark:text-blue-400 mt-1 text-xs">▪</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm print:text-xs">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 技術棧 */}
                <div>
                  <h4 className="text-lg print:text-base font-semibold text-gray-900 dark:text-white mb-2">
                    使用技術
                  </h4>
                  <div className="flex flex-wrap gap-2 print:gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded print:border print:bg-white print:px-1 print:py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 技能總覽 */}
        <div className="mt-12 print:mt-8 print-break">
          <h2 className="text-3xl print:text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6">
            技能總覽
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
            {biographyData.skills.zh.map((skillCategory, index) => (
              <Card key={index} className="print-avoid-break shadow-lg print:shadow-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 print:border-gray-300 print:bg-white">
                <CardContent className="p-4 print:p-3">
                  <h3 className="text-xl print:text-lg font-bold text-gray-900 dark:text-white mb-3 print:mb-2">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2 print:gap-1">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm print:text-xs rounded print:border print:bg-white print:px-1 print:py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 列印用說明 */}
        <div className="mt-8 print:hidden no-print text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>💡 建議使用 Ctrl+P (Windows) 或 Cmd+P (Mac) 列印成PDF</p>
          <p>📄 列印設定建議：A4大小、包含背景圖片、邊距選擇「最小」</p>
        </div>
      </div>
    </div>
  );
} 
