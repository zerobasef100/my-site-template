"use client"

import { ArrowUp, Heart, Coffee, Youtube, Globe } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ==================== 🔧 수정 가이드 시작 🔧 ====================
  // 
  // 이 부분만 수정하시면 됩니다! 코드는 건드리지 마세요.
  // 
  // 📌 중요: 빈 문자열("")로 두면 해당 섹션이 자동으로 숨겨집니다
  // 📌 푸터 전체를 숨기려면 showFooter를 false로 설정
  // 
  // ==================================================================
  
  const footerInfo = {
    // 🎯 푸터 표시 여부
    showFooter: true,  // false로 하면 푸터 전체가 안 보임
    
    // 👤 왼쪽 섹션 - 이름과 소개
    name: "홍길동",  // 이름 (빈 문자열이면 섹션 숨김)
    description: "창의적인 아이디어로 브랜드를 성장시키는 마케팅 전문가입니다.",  // 짧은 소개
    
    // 🔗 빠른 링크 섹션
    showQuickLinks: true,  // false면 빠른 링크 섹션 숨김
    quickLinksTitle: "빠른 링크",
    
    // 📞 연락처 정보 (빈 문자열이면 해당 항목 숨김)
    showContactInfo: true,  // false면 연락처 섹션 전체 숨김
    contactTitle: "연락처",
    phone: "010-1234-5678",
    email: "hello@example.com",
    location: "서울 강남구",
    
    // ©️ 카피라이트 (빈 문자열이면 기본값 사용)
    copyright: "",  // 비우면 "© 2024 {name}. All rights reserved." 자동 생성
    
    // ❤️ Made with 메시지
    showMadeWith: true,  // false면 숨김
    madeWithLocation: "Seoul",  // 도시 이름
    
    // 🎨 템플릿 제작자 정보 (무료 템플릿이니 가능하면 남겨주세요 🙏)
    showTemplateCredit: true,  // false면 숨김 (하지만 남겨주시면 감사하겠습니다!)
    templateCreator: {
      name: "백상",
      youtube: "https://www.youtube.com/@Mrbaeksang95",
      website: "https://devcom.kr/"
    },
    
    // ⬆️ 맨 위로 버튼
    showScrollTop: true  // false면 맨 위로 버튼 숨김
  }
  
  // ==================== 🔧 수정 가이드 끝 🔧 ====================

  // 푸터 전체를 표시하지 않음
  if (!footerInfo.showFooter) {
    return null
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 상단 섹션 */}
        {(footerInfo.name || footerInfo.showQuickLinks || footerInfo.showContactInfo) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* 브랜드/이름 */}
            {footerInfo.name && (
              <div>
                <h3 className="font-bold text-foreground mb-3">{footerInfo.name}</h3>
                {footerInfo.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {footerInfo.description}
                  </p>
                )}
              </div>
            )}

            {/* 빠른 링크 */}
            {footerInfo.showQuickLinks && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">{footerInfo.quickLinksTitle}</h4>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    소개
                  </button>
                  <button
                    onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    프로젝트
                  </button>
                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    연락처
                  </button>
                </div>
              </div>
            )}

            {/* 연락처 정보 */}
            {footerInfo.showContactInfo && (footerInfo.phone || footerInfo.email || footerInfo.location) && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">{footerInfo.contactTitle}</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {footerInfo.phone && <p>{footerInfo.phone}</p>}
                  {footerInfo.email && <p>{footerInfo.email}</p>}
                  {footerInfo.location && <p>{footerInfo.location}</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 카피라이트 */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {footerInfo.copyright || `© ${currentYear} ${footerInfo.name || 'Portfolio'}. All rights reserved.`}
          </p>
          
          {/* Made with 메시지 & 템플릿 크레딧 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {footerInfo.showMadeWith && (
              <span className="flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" />
                {footerInfo.madeWithLocation && `in ${footerInfo.madeWithLocation}`}
              </span>
            )}
            
            {/* 템플릿 제작자 크레딧 (무료 템플릿이니 남겨주시면 감사하겠습니다 🙏) */}
            {footerInfo.showTemplateCredit && footerInfo.templateCreator && (
              <>
                {footerInfo.showMadeWith && <span className="text-muted-foreground/50">•</span>}
                <span className="text-xs text-muted-foreground/70">Template by Mrbaeksang</span>
                <div className="flex items-center gap-1">
                  <a 
                    href={footerInfo.templateCreator.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-3 w-3 text-muted-foreground/70 hover:text-muted-foreground" />
                  </a>
                  <a 
                    href={footerInfo.templateCreator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted transition-colors"
                    aria-label="DevCom"
                  >
                    <Globe className="h-3 w-3 text-muted-foreground/70 hover:text-muted-foreground" />
                  </a>
                </div>
              </>
            )}
          </div>

          {/* 맨 위로 버튼 */}
          {footerInfo.showScrollTop && (
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="맨 위로"
            >
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
