"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award, Heart, Coffee, Book } from "lucide-react"

export function About() {
  // ==================== 🚀 수정 가이드 시작 🚀 ====================
  // 
  // 이 부분만 수정하시면 됩니다! 코드는 건드리지 마세요.
  // 
  // 📌 중요: 따옴표(" "), 쉼표(,), 대괄호([ ]) 위치 주의!
  // 📌 이미지 파일은 public 폴더에 넣으세요 (예: public/about-bg.jpg)
  // 
  // ==================================================================
  
  const aboutInfo = {
    // 📝 섹션 제목과 부제목
    title: "소개",  // 섹션 맨 위에 큰 글씨로 표시
    subtitle: "10년 경력의 마케팅 전문가로, 브랜드 스토리텔링과 디지털 마케팅을 통해 고객과 브랜드를 연결하는 일을 하고 있습니다.",  // 제목 아래 설명
    
    // 🎨 배경 이미지 설정
    backgroundImage: "",  // 사용법: "/about-bg.jpg" (public 폴더에 about-bg.jpg 파일 넣기)
                         // 사용 안 함: "" (빈 따옴표 유지)
    backgroundOpacity: 0.1,  // 투명도: 0(완전투명) ~ 0.5(반투명) ~ 1(불투명)
                            // 추천: 0.1 ~ 0.3 (살짝 보이게)
    
    // 💼 경력 정보 (여러 개 추가 가능)
    // 사용 안 함: careers: [],  (대괄호 안을 비우기)
    // 추가 방법: 쉼표(,) 뒤에 똑같은 형식으로 { } 블록 추가
    careers: [
      {
        company: "ABC 마케팅 에이전시",  // 회사명
        period: "2020 - 현재",           // 근무 기간
        position: "시니어 마케팅 매니저"   // 직책
      },
      {
        company: "XYZ 테크 스타트업",
        period: "2018 - 2020", 
        position: "마케팅 팀 리드"
      }
      // 더 추가하려면 여기에 쉼표(,) 찍고 위와 같은 형식으로 추가
    ],
    
    // 🎓 학력 정보 (여러 개 추가 가능)
    // 사용 안 함: education: [],  (대괄호 안을 비우기)
    education: [
      {
        school: "서울대학교",      // 학교명
        period: "2014 - 2018",    // 재학 기간
        major: "경영학 학사"       // 전공/학위
      }
      // 더 추가하려면 여기에 쉼표(,) 찍고 위와 같은 형식으로 추가
    ],
    
    // 🌟 핵심 역량 (최대 3개 추천)
    // 사용 안 함: skills: [],  (대괄호 안을 비우기)
    // 아이콘: 이모지 사용 (윈도우: Win+. / 맥: Cmd+Ctrl+Space)
    skills: [
      {
        icon: "🏆",  // 이모지 아이콘
        title: "브랜드 전략",  // 역량 제목
        description: "브랜드 아이덴티티 구축 및 포지셔닝 전략 수립"  // 설명
      },
      {
        icon: "❤️",
        title: "콘텐츠 마케팅",
        description: "SNS 콘텐츠 기획 및 바이럴 마케팅 캠페인 운영"
      },
      {
        icon: "☕",
        title: "퍼포먼스 마케팅",
        description: "데이터 분석 기반 광고 최적화 및 ROI 개선"
      }
    ],
    
    // 📖 자기소개 스토리
    // 사용 안 함: story: [],  (대괄호 안을 비우기)
    storyTitle: "나의 이야기",  // 자기소개 제목
    story: [
      "마케팅은 단순히 제품을 파는 것이 아니라, 사람들의 마음을 움직이는 이야기를 전달하는 일이라고 믿습니다. 지난 10년간 다양한 브랜드와 함께하며, 각 브랜드만의 고유한 스토리를 찾아 고객에게 전달하는 일에 열정을 쏟아왔습니다.",  // 첫 번째 문단
      "특히 디지털 환경에서의 고객 여정을 설계하고, 데이터를 기반으로 지속적으로 개선해나가는 과정을 즐깁니다. 창의적인 아이디어와 분석적 사고의 균형을 통해 측정 가능한 성과를 만들어내는 것이 저의 강점입니다.",  // 두 번째 문단
      "일하지 않을 때는 새로운 트렌드를 연구하거나, 좋은 커피를 마시며 영감을 얻고, 독서를 통해 시야를 넓히는 시간을 가집니다."  // 세 번째 문단
      // 더 추가하려면 쉼표(,) 찍고 "문단 내용" 추가
    ],
    storyImage: "/about-image.jpg",  // 사용법: public 폴더에 about-image.jpg 파일 넣기
                                     // 사용 안 함: "" (빈 따옴표)
    
    // 🎯 취미 & 관심사
    // 사용 안 함: hobbies: [],  (대괄호 안을 비우기)
    // 추가 방법: 쉼표(,) 뒤에 "이모지 텍스트" 형식으로 추가
    hobbies: [
      "📚 독서",
      "☕ 카페 투어",
      "🎨 전시회 관람",
      "✈️ 여행",
      "🏃 러닝",
      "📸 사진"
      // 더 추가하려면 쉼표(,) 찍고 "🎮 게임" 같은 형식으로 추가
    ]
  }
  
  // ==================== 🚀 수정 가이드 끝 🚀 ====================
  return (
    <section id="about" className="py-20 bg-muted/30 relative">
      {/* 배경 이미지 - aboutInfo.backgroundImage 수정 */}
      {aboutInfo.backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${aboutInfo.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: aboutInfo.backgroundOpacity
          }}
        />
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 섹션 제목 - aboutInfo에서 수정 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {aboutInfo.title}
          </h2>
          {aboutInfo.subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {aboutInfo.subtitle}
            </p>
          )}
        </div>

        {/* 경력 및 학력 카드 - aboutInfo에서 수정 */}
        {(aboutInfo.careers.length > 0 || aboutInfo.education.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* 경력 카드들 */}
            {aboutInfo.careers.map((career, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {career.company}
                      </h3>
                      <p className="text-sm text-primary mb-2">
                        {career.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {career.position}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* 학력 카드들 */}
            {aboutInfo.education.map((edu, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {edu.school}
                      </h3>
                      <p className="text-sm text-primary mb-2">
                        {edu.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.major}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 핵심 역량 - aboutInfo.skills에서 수정 */}
        {aboutInfo.skills.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              핵심 역량
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutInfo.skills.map((skill, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 자기소개 상세 - aboutInfo.story에서 수정 */}
        {aboutInfo.story.length > 0 && (
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {aboutInfo.storyTitle}
                </h3>
                {aboutInfo.story.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* 이미지 영역 - aboutInfo.storyImage에서 수정 */}
              {aboutInfo.storyImage && (
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                    <img
                      src={aboutInfo.storyImage}
                      alt="소개 이미지"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const parent = target.parentElement;
                        target.style.display = 'none';
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'w-full h-full bg-muted flex items-center justify-center';
                          placeholder.innerHTML = '<span class="text-6xl">📸</span>';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 취미 & 관심사 - aboutInfo.hobbies에서 수정 */}
        {aboutInfo.hobbies.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              취미 & 관심사
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {aboutInfo.hobbies.map((hobby, index) => (
                <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}