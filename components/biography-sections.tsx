"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  GraduationCap,
  Code,
  FolderOpen,
  ExternalLink,
  Github,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  Calendar,
  Shield,
  Image,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NextImage from "next/image";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  summary: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  responsibilities: {
    title: string;
    details: string;
  }[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

interface Project {
  name: string;
  period: string;
  status: "active" | "deprecated" | "abandoned";
  description: string;
  technologies: string[];
  highlights: string[];
  pictures: string[];
  link: string | null;
  demo: string | null;
}

interface Skill {
  category: string;
  items: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate: string | null;
  credentialId: string;
  description: string;
  link: string | null;
  pictures: string[];
}

interface BiographySectionsProps {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  language: "zh" | "en";
  allPersonalData: {
    zh: PersonalInfo;
    en: PersonalInfo;
  };
}

export function BiographySections({
  personal,
  experience,
  education,
  projects,
  skills,
  certifications,
  language,
  allPersonalData,
}: BiographySectionsProps) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const sectionTitles = {
    zh: {
      experience: "工作經歷",
      projects: "經手專案",
      education: "教育背景",
      skills: "技能專長",
      certifications: "專業證照",
      techStack: "技術棧",
      highlights: "專案亮點",
      pictures: "專案圖片",
      noPictures: "暫無圖片",
      viewCode: "查看程式碼",
      viewDemo: "查看展示",
      viewCertificate: "查看證照",
      issuer: "發證機構",
      issued: "取得日期",
      expires: "到期日期",
      credentialId: "證照編號",
      noExpiry: "永久有效",
    },
    en: {
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      skills: "Skills",
      certifications: "Certifications",
      techStack: "Tech Stack",
      highlights: "Highlights",
      pictures: "Project Images",
      noPictures: "No Images Available",
      viewCode: "View Code",
      viewDemo: "View Demo",
      viewCertificate: "View Certificate",
      issuer: "Issuer",
      issued: "Issued",
      expires: "Expires",
      credentialId: "Credential ID",
      noExpiry: "No Expiry",
    },
  };

  const statusConfig = {
    active: {
      icon: CheckCircle,
      label: { zh: "維護中", en: "Active" },
      variant: "default" as const,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    deprecated: {
      icon: AlertTriangle,
      label: { zh: "停止維護", en: "Deprecated" },
      variant: "secondary" as const,
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    abandoned: {
      icon: XCircle,
      label: { zh: "已棄用", en: "Abandoned" },
      variant: "destructive" as const,
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const getStatusBadge = (status: Project["status"]) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge
        variant={config.variant}
        className={`${config.className} flex items-center gap-1`}
      >
        <Icon className="h-3 w-3" />
        {config.label[language]}
      </Badge>
    );
  };

  return (
    <>
      <div className="space-y-12">
        {/* Personal Info Section */}
        <section className="text-center space-y-4 section-bg">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text">
              {allPersonalData[language].name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {allPersonalData[language === "zh" ? "en" : "zh"].name}
            </p>
          </div>
          <h2 className="text-xl text-primary font-medium">{personal.title}</h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personal.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub/ivan88217
              </a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic">
            {language === "zh"
              ? "請優先使用 Email 聯繫"
              : "Please contact via Email preferably"}
          </p>

          <p className="text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {personal.summary}
          </p>
        </section>

        {/* Experience Section */}
        <section className="space-y-6 section-bg">
          <h3 className="text-2xl font-semibold flex items-center gap-2 gradient-text">
            <Building className="h-6 w-6 text-primary" />
            {sectionTitles[language].experience}
          </h3>
          <div className="space-y-6">
            {experience.map((exp, index) => {
              // 判斷是否為當前職位（包含"現在"、"Present"等關鍵字）
              const isCurrent =
                exp.period.includes("現在") ||
                exp.period.includes("Present") ||
                exp.period.includes("至今");

              return (
                <div
                  key={index}
                  className={`border-l-4 border-primary pl-6 space-y-2 p-4 rounded-r-lg bg-card card-hover ${
                    !isCurrent ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-lg font-medium">{exp.position}</h4>
                    <span className="text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-medium text-primary">{exp.company}</p>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>

                  {/* 主要職責分項 */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h5 className="text-sm font-medium text-foreground">
                        {language === "zh"
                          ? "主要職責"
                          : "Key Responsibilities"}
                      </h5>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="space-y-1">
                            <h6 className="text-sm font-medium text-primary">
                              • {resp.title}
                            </h6>
                            <p className="text-sm text-muted-foreground leading-relaxed ml-3 whitespace-pre-line">
                              {resp.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-6 section-bg">
          <h3 className="text-2xl font-semibold flex items-center gap-2 gradient-text">
            <GraduationCap className="h-6 w-6 text-primary" />
            {sectionTitles[language].education}
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 border-primary pl-6 space-y-2 p-4 rounded-r-lg bg-card card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg font-medium">{edu.degree}</h4>
                  <span className="text-sm text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                <p className="font-medium text-primary">{edu.school}</p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-6 section-bg">
          <h3 className="text-2xl font-semibold flex items-center gap-2 gradient-text">
            <Code className="h-6 w-6 text-primary" />
            {sectionTitles[language].skills}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="space-y-3 p-4 bg-card rounded-lg card-hover border border-border/50"
              >
                <h4 className="text-lg font-medium text-primary">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="space-y-6 section-bg">
          <h3 className="text-2xl font-semibold flex items-center gap-2 gradient-text">
            <Award className="h-6 w-6 text-primary" />
            {sectionTitles[language].certifications}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="h-full card-hover border-2 border-border/50"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {cert.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {cert.description}
                  </p>

                  {/* 證照詳細資訊 */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {sectionTitles[language].issued}:
                      </span>
                      <span>{cert.date}</span>
                    </div>

                    {cert.expiryDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {sectionTitles[language].expires}:
                        </span>
                        <span>{cert.expiryDate}</span>
                      </div>
                    )}

                    {!cert.expiryDate && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">
                          {sectionTitles[language].noExpiry}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {sectionTitles[language].credentialId}:
                      </span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {cert.credentialId}
                      </code>
                    </div>
                  </div>

                  {/* 查看證照連結 */}
                  {cert.link && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {sectionTitles[language].viewCertificate}
                      </a>
                      </Button>
                    </div>
                  )}
                  {cert.pictures && cert.pictures.length > 0 && cert.pictures.map((picture, pictureIndex) => (
                    <div key={pictureIndex} className="overflow-hidden rounded-lg border border-border/50">
                      <NextImage
                        src={picture}
                        alt={`${cert.name} - 圖片 ${pictureIndex + 1}`}
                        width={200}
                        height={128}
                        className="w-full h-20 sm:h-24 md:h-32 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                        onClick={() =>
                          setSelectedImage({
                            src: picture,
                            alt: `${cert.name} - 圖片 ${pictureIndex + 1}`,
                          })
                        }
                        />
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-6 section-bg">
          <h3 className="text-2xl font-semibold flex items-center gap-2 gradient-text">
            <FolderOpen className="h-6 w-6 text-primary" />
            {sectionTitles[language].projects}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="h-full card-hover border-2 border-border/50"
              >
                <CardHeader>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {project.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed whitespace-pre-line">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">
                      {sectionTitles[language].techStack}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Images */}
                  {project.pictures && project.pictures.length > 0 ? (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        {sectionTitles[language].pictures}
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {project.pictures.map((picture, pictureIndex) => (
                          <div
                            key={pictureIndex}
                            className="overflow-hidden rounded-lg border border-border/50"
                          >
                            <NextImage
                              src={picture}
                              alt={`${project.name} - 圖片 ${pictureIndex + 1}`}
                              width={200}
                              height={128}
                              className="w-full h-20 sm:h-24 md:h-32 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                              onClick={() =>
                                setSelectedImage({
                                  src: picture,
                                  alt: `${project.name} - 圖片 ${
                                    pictureIndex + 1
                                  }`,
                                })
                              }
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                        <Image className="h-4 w-4" />
                        {sectionTitles[language].pictures}
                      </h5>
                      <p className="text-xs text-muted-foreground italic">
                        {sectionTitles[language].noPictures}
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">
                      {sectionTitles[language].highlights}
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="whitespace-pre-line">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-2">
                    {project.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          {sectionTitles[language].viewCode}
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          {sectionTitles[language].viewDemo}
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedImage?.alt}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            {selectedImage && (
              <div className="relative">
                <NextImage
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  priority
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
