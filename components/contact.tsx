"use client"

import { Phone, Mail, MessageCircle, Instagram, Youtube, Facebook, MapPin, Clock, Briefcase, Globe, Twitter, Send } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Contact() {
  // 연락처 정보 - 직접 수정 (수정하면 QR코드 자동 업데이트!)
  const contactInfo = {
    name: "홍길동",
    title: "마케팅 전문가",
    company: "", // 회사명 (선택사항)
    experience: "10년 경력",
    phone: "010-1234-5678",
    email: "hello@example.com",
    location: "서울 강남구",
    workTime: "평일 09:00 - 18:00",
    responseTime: "24시간 내 답변",
    // 소셜 링크들 - 빈 문자열("")로 두면 아이콘 자동으로 숨김
    kakao: "https://open.kakao.com/...",      // 카카오톡 오픈채팅
    instagram: "https://instagram.com/username", // 인스타그램
    youtube: "https://youtube.com/@channel",    // 유튜브
    facebook: "https://facebook.com/username",  // 페이스북
    twitter: "https://twitter.com/username",    // 트위터(X)
    website: "https://mywebsite.com",          // 개인 웹사이트
    telegram: "",  // 텔레그램 (없으면 "" 유지)
    linkedin: "",  // 링크드인 (없으면 "" 유지)
  }

  // vCard 형식으로 연락처 데이터 생성 (한글 완벽 지원!)
  const vCardString = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}${contactInfo.company ? `[${contactInfo.company}]` : ''}
${contactInfo.company ? `ORG:${contactInfo.company}` : ''}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
${contactInfo.location ? `ADR:;;${contactInfo.location};;;;` : ''}
${contactInfo.title ? `TITLE:${contactInfo.title}` : ''}
${contactInfo.website ? `URL:${contactInfo.website}` : ''}
END:VCARD`

  // URL 인코딩 (한글 깨짐 방지)
  const encodedVCard = encodeURIComponent(vCardString.trim())
  
  // QR 코드 이미지 URL (외부 API 사용 - businessCard 프로젝트처럼)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodedVCard}`

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 제목 - 직접 수정 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            연락처
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            프로젝트 문의나 협업 제안을 기다리고 있습니다. 
            편하신 방법으로 연락주세요!
          </p>
        </div>

        {/* 메인 좌우 분할 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 왼쪽: 연락처 정보 */}
          <div className="space-y-6">
            {/* 프로필 카드 */}
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-card to-muted/20">
              <div className="flex items-start gap-6">
                {/* 프로필 이미지 자리 - 필요없으면 삭제 */}
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">👤</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {contactInfo.name}
                  </h3>
                  <p className="text-lg text-primary mb-2">
                    {contactInfo.title}
                  </p>
                  <p className="text-muted-foreground">
                    {contactInfo.experience} | {contactInfo.responseTime}
                  </p>
                </div>
              </div>
            </Card>

            {/* 주요 연락 수단 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              {/* 전화 카드 */}
              <a 
                href={`tel:${contactInfo.phone}`}
                className="group"
              >
                <Card className="p-5 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">전화</p>
                      <p className="text-sm font-medium text-foreground">{contactInfo.phone}</p>
                    </div>
                  </div>
                </Card>
              </a>

              {/* 이메일 카드 */}
              <a 
                href={`mailto:${contactInfo.email}`}
                className="group"
              >
                <Card className="p-5 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">이메일</p>
                      <p className="text-sm font-medium text-foreground truncate">{contactInfo.email}</p>
                    </div>
                  </div>
                </Card>
              </a>

              {/* 위치 카드 */}
              <Card className="p-5 border-0 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">위치</p>
                    <p className="text-sm font-medium text-foreground">{contactInfo.location}</p>
                  </div>
                </div>
              </Card>

              {/* 업무시간 카드 */}
              <Card className="p-5 border-0 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">업무시간</p>
                    <p className="text-sm font-medium text-foreground">{contactInfo.workTime}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* 소셜 미디어 섹션 */}
            <Card className="p-6 border-0 shadow-lg">
              <h4 className="font-semibold text-foreground mb-4">소셜 미디어</h4>
              <div className="flex flex-wrap gap-3">
                {/* 카카오톡 - 빈 문자열이면 자동 숨김 */}
                {contactInfo.kakao && (
                  <a 
                    href={contactInfo.kakao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-full transition-colors"
                    aria-label="카카오톡"
                  >
                    <MessageCircle className="h-5 w-5 text-yellow-600" />
                  </a>
                )}
                
                {/* 인스타그램 - 없으면 삭제 */}
                {contactInfo.instagram && (
                  <a 
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-500/10 hover:bg-pink-500/20 rounded-full transition-colors"
                    aria-label="인스타그램"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </a>
                )}
                
                {/* 유튜브 - 없으면 삭제 */}
                {contactInfo.youtube && (
                  <a 
                    href={contactInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors"
                    aria-label="유튜브"
                  >
                    <Youtube className="h-5 w-5 text-red-600" />
                  </a>
                )}
                
                {/* 페이스북 - 없으면 삭제 */}
                {contactInfo.facebook && (
                  <a 
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600/10 hover:bg-blue-600/20 rounded-full transition-colors"
                    aria-label="페이스북"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                )}
                
                {/* 트위터 - 없으면 삭제 */}
                {contactInfo.twitter && (
                  <a 
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-sky-500/10 hover:bg-sky-500/20 rounded-full transition-colors"
                    aria-label="트위터"
                  >
                    <Twitter className="h-5 w-5 text-sky-600" />
                  </a>
                )}
                
                {/* 웹사이트 - 없으면 삭제 */}
                {contactInfo.website && (
                  <a 
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                    aria-label="웹사이트"
                  >
                    <Globe className="h-5 w-5 text-primary" />
                  </a>
                )}
                
                {/* 텔레그램 - 없으면 삭제 */}
                {contactInfo.telegram && (
                  <a 
                    href={contactInfo.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition-colors"
                    aria-label="텔레그램"
                  >
                    <Send className="h-5 w-5 text-blue-500" />
                  </a>
                )}
                
                {/* 링크드인 - 없으면 삭제 */}
                {contactInfo.linkedin && (
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-700/10 hover:bg-blue-700/20 rounded-full transition-colors"
                    aria-label="링크드인"
                  >
                    <Briefcase className="h-5 w-5 text-blue-700" />
                  </a>
                )}
              </div>
              
              {/* 안내 메시지 - 필요없으면 삭제 */}
              <p className="text-xs text-muted-foreground mt-4">
                * 클릭하면 해당 채널로 이동합니다
              </p>
            </Card>
          </div>

          {/* 오른쪽: QR 코드 & 추가 정보 */}
          <div className="space-y-6">
            {/* QR 코드 카드 */}
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-card to-muted/20">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  QR 코드로 빠른 연결
                </h4>
                <p className="text-sm text-muted-foreground">
                  스캔하면 바로 전화 연결이 가능합니다
                </p>
              </div>
              
              {/* QR 코드 이미지 - 자동 업데이트! */}
              <div className="flex justify-center mb-6">
                <img 
                  src={qrCodeUrl}
                  alt="연락처 QR 코드"
                  className="w-[280px] h-[280px]"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
              
              {/* QR 설명 */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground text-center">
                  📱 스캔하면 연락처가 자동 저장됩니다
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  이름: {contactInfo.name} | 전화: {contactInfo.phone}
                </p>
              </div>
            </Card>

          </div>
        </div>

        {/* 하단 메시지 - 필요없으면 삭제 */}
        <div className="mt-16 text-center p-8 bg-primary/5 rounded-2xl">
          <p className="text-lg font-medium text-foreground mb-2">
            🚀 언제든 편하게 연락주세요!
          </p>
          <p className="text-muted-foreground">
            고객님의 성공적인 프로젝트를 위해 최선을 다하겠습니다
          </p>
        </div>
      </div>
    </section>
  )
}