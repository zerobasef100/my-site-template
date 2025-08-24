"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

export function Projects() {
  // ==================== 🎨 수정 가이드 시작 🎨 ====================
  // 
  // 이 부분만 수정하시면 됩니다! 코드는 건드리지 마세요.
  // 
  // 📌 이미지 추가한 만큼 자동으로 섹션이 늘어납니다
  // 📌 이미지 파일은 반드시 public 폴더에 넣으세요
  // 📌 모바일: 1열, 태블릿: 2열, PC: 3열 자동 배치
  // 
  // ==================================================================

  const projectsInfo = {
    // 📝 섹션 제목과 설명
    title: "프로젝트",
    subtitle: "다양한 프로젝트들을 소개합니다",
    
    // 🖼️ 프로젝트 목록 - 최대 20개까지 추가 가능!
    // 
    // 📌 사용법:
    // 1. public 폴더에 이미지 파일 넣기 (project1.jpg, project2.jpg...)
    // 2. 아래 정보 입력 (이미지 없으면 자동으로 숨김)
    // 3. 빈 문자열("") 남겨두면 해당 프로젝트 표시 안 됨
    // 
    // ⚠️ 이미지 경로는 반드시 "/" 시작!
    projects: [
      {
        image: "/project1.jpg",  // 이미지 파일 경로
        title: "브랜드 리뉴얼 프로젝트",  // 프로젝트 제목
        description: "스타트업 A사의 전체 브랜딩 리뉴얼"  // 설명
      },
      {
        image: "/project2.jpg",
        title: "SNS 캠페인",
        description: "바이럴 마케팅 캠페인 기획 및 실행"
      },
      {
        image: "/project3.jpg",
        title: "제품 런칭",
        description: "글로벌 시장 진출을 위한 제품 런칭"
      },
      {
        image: "/project4.jpg",
        title: "콘텐츠 마케팅",
        description: "유튜브 & 인스타그램 콘텐츠 제작"
      },
      {
        image: "/project5.jpg",
        title: "이벤트 기획",
        description: "오프라인 팝업스토어 기획 및 운영"
      },
      {
        image: "/project6.jpg",
        title: "디지털 광고",
        description: "퍼포먼스 마케팅 캠페인 운영"
      },
      // ===== 7번부터는 필요한 것만 채우세요 =====
      {
        image: "",  // 비우면 표시 안 됨
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",  // 10번
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",  // 15번
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",
        title: "",
        description: ""
      },
      {
        image: "",  // 20번
        title: "",
        description: ""
      }
    ]
  }

  // ==================== 🎨 수정 가이드 끝 🎨 ====================

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageAspects, setImageAspects] = useState<{ [key: string]: string }>({})
  
  // 실제로 표시할 프로젝트만 필터링 (이미지가 있는 것만)
  const validProjects = projectsInfo.projects.filter(project => 
    project.image && project.image.trim() !== ""
  )
  
  // 이미지 비율 감지 함수
  const detectImageAspect = (src: string) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      let aspectClass: string
      
      // 일반적인 이미지 비율들 감지
      if (ratio >= 1.7 && ratio <= 1.8) {
        aspectClass = 'aspect-video' // 16:9 (1.777...)
      } else if (ratio >= 1.3 && ratio <= 1.35) {
        aspectClass = 'aspect-[4/3]' // 4:3 (1.333...)
      } else if (ratio >= 0.95 && ratio <= 1.05) {
        aspectClass = 'aspect-square' // 1:1 (1.0)
      } else if (ratio >= 0.74 && ratio <= 0.76) {
        aspectClass = 'aspect-[3/4]' // 3:4 (0.75)
      } else if (ratio >= 0.55 && ratio <= 0.57) {
        aspectClass = 'aspect-[9/16]' // 9:16 (0.5625)
      } else if (ratio >= 1.4 && ratio <= 1.45) {
        aspectClass = 'aspect-[3/2]' // 3:2 (1.5)
      } else if (ratio >= 0.65 && ratio <= 0.67) {
        aspectClass = 'aspect-[2/3]' // 2:3 (0.666...)
      } else if (ratio > 1.8) {
        aspectClass = 'aspect-[21/9]' // 초광각
      } else if (ratio < 0.55) {
        aspectClass = 'aspect-[1/2]' // 매우 세로
      } else {
        // 기타 비율은 가장 가까운 것으로
        if (ratio > 1) {
          aspectClass = 'aspect-video' // 기본 가로
        } else {
          aspectClass = 'aspect-[3/4]' // 기본 세로
        }
      }
      
      setImageAspects(prev => ({ ...prev, [src]: aspectClass }))
    }
    img.src = src
  }
  
  // 모든 이미지 비율 감지
  useEffect(() => {
    validProjects.forEach(project => {
      detectImageAspect(project.image)
    })
  }, [validProjects.length]) // 유효한 projects 개수가 변경되면 다시 실행

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 제목 - projectsInfo에서 수정 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {projectsInfo.title}
            </h2>
            {projectsInfo.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {projectsInfo.subtitle}
              </p>
            )}
          </div>

          {/* 프로젝트가 없을 때 */}
          {validProjects.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🚀</span>
              <p className="text-xl text-muted-foreground">준비 중입니다</p>
            </div>
          ) : (
            /* 프로젝트 그리드 - 모바일 1열, 태블릿 2열, PC 3열 고정 */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {validProjects.map((project, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setSelectedImage(project.image)}
                >
                  {/* 이미지 영역 - 고정 높이 컨테이너 */}
                  <div className="h-64 overflow-hidden rounded-lg bg-muted mb-3">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const placeholder = document.createElement('div')
                            placeholder.className = 'w-full h-full bg-muted flex items-center justify-center'
                            placeholder.innerHTML = '<span class="text-5xl">📁</span>'
                            parent.appendChild(placeholder)
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* 텍스트 영역 - 짧고 간단하게 */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* 모달 컨테이너 */}
          <div 
            className="relative bg-background rounded-lg shadow-2xl max-w-4xl max-h-[85vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* 확대된 이미지 */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt="확대된 프로젝트 이미지"
                className="max-w-full max-h-[75vh] object-contain rounded"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const placeholder = document.createElement('div')
                    placeholder.className = 'text-muted-foreground text-center py-20'
                    placeholder.innerHTML = '<span class="text-6xl">📁</span><p class="mt-4">이미지를 불러올 수 없습니다</p>'
                    parent.appendChild(placeholder)
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}