"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Instagram, MessageCircle, Mail, Youtube, Facebook, Twitter, Globe, Linkedin } from "lucide-react"

export function Hero() {
  // ============= 여기만 수정하세요! =============
  const heroInfo = {
    // 기본 정보
    greeting: "안녕하세요,",
    name: "홍길동입니다",
    title: "마케터",
    description: "창의적인 아이디어로 브랜드를 성장시킵니다",
    
    // 프로필 사진 (public 폴더에 넣기)
    profileImage: "/profile.jpg",
    
    // 배경 이미지 설정
    backgroundImage: "/background.jpg",
    backgroundOpacity: 0.5, // 0~1 사이 값 (0=투명, 1=불투명)
    
    // 버튼 텍스트 (빈 문자열이면 버튼 숨김)
    projectButton: "프로젝트 보기",
    contactButton: "", // 사용 안하면 빈 문자열
    
    // 소셜 링크 (빈 문자열이면 아이콘 자동 숨김)
    instagram: "https://instagram.com/username",
    youtube: "https://youtube.com/@channel",
    facebook: "https://facebook.com/username",
    twitter: "", // 사용 안함
    linkedin: "", // 사용 안함
    website: "", // 사용 안함
    kakao: "https://open.kakao.com/...",
    email: "hello@example.com",
  }
  // ============= 여기까지 =============

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* 배경 이미지 - heroInfo.backgroundImage 수정 */}
      {heroInfo.backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${heroInfo.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: heroInfo.backgroundOpacity
          }}
        />
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          {/* 프로필 사진 - heroInfo.profileImage 수정 */}
          {heroInfo.profileImage && (
            <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-border overflow-hidden bg-muted">
              <img
                src={heroInfo.profileImage}
                alt="프로필"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  const sibling = target.nextElementSibling;
                  target.style.display = 'none';
                  if (sibling instanceof HTMLElement) {
                    sibling.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-muted flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-4xl sm:text-5xl">👤</span>
              </div>
            </div>
          )}

          {/* 메인 텍스트 - heroInfo에서 수정 */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              {heroInfo.greeting}
              <span className="block mt-2">
                {heroInfo.name}
              </span>
            </h1>
            {heroInfo.title && (
              <p className="text-xl sm:text-2xl text-foreground/80 font-medium">
                {heroInfo.title}
              </p>
            )}
            {heroInfo.description && (
              <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
                {heroInfo.description}
              </p>
            )}
          </div>

          {/* 버튼들 - heroInfo에서 텍스트 수정 */}
          <div className="flex items-center justify-center gap-4 pt-8">
            {heroInfo.projectButton && (
              <Button 
                size="lg"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                {heroInfo.projectButton}
              </Button>
            )}
            {heroInfo.contactButton && (
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {heroInfo.contactButton}
              </Button>
            )}
          </div>

          {/* 소셜 링크 - heroInfo에서 수정, 빈 문자열이면 자동 숨김 */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            {heroInfo.instagram && (
              <a 
                href={heroInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="인스타그램"
              >
                <Instagram className="h-6 w-6 text-foreground/80" />
              </a>
            )}
            
            {heroInfo.youtube && (
              <a 
                href={heroInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="유튜브"
              >
                <Youtube className="h-6 w-6 text-foreground/80" />
              </a>
            )}
            
            {heroInfo.facebook && (
              <a 
                href={heroInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="페이스북"
              >
                <Facebook className="h-6 w-6 text-foreground/80" />
              </a>
            )}

            {heroInfo.twitter && (
              <a 
                href={heroInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="트위터"
              >
                <Twitter className="h-6 w-6 text-foreground/80" />
              </a>
            )}

            {heroInfo.linkedin && (
              <a 
                href={heroInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="링크드인"
              >
                <Linkedin className="h-6 w-6 text-foreground/80" />
              </a>
            )}

            {heroInfo.website && (
              <a 
                href={heroInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="웹사이트"
              >
                <Globe className="h-6 w-6 text-foreground/80" />
              </a>
            )}
            
            {heroInfo.kakao && (
              <a 
                href={heroInfo.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="카카오톡"
              >
                <MessageCircle className="h-6 w-6 text-foreground/80" />
              </a>
            )}
            
            {heroInfo.email && (
              <a 
                href={`mailto:${heroInfo.email}`}
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="이메일"
              >
                <Mail className="h-6 w-6 text-foreground/80" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 스크롤 표시 */}
      <button 
        onClick={scrollToAbout} 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="아래로 스크롤"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </button>
    </section>
  )
}