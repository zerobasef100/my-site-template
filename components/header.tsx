"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Home, User, Briefcase, Mail, Settings, Heart, Star, Camera, Music, Book, Coffee, Rocket, Plus, X, type LucideIcon } from "lucide-react"
import { NavBar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useInlineEditor } from "@/contexts/inline-editor-context"

// 아이콘 매핑 객체
const ICON_MAP = {
  Home,
  User,
  Briefcase,
  Mail,
  Settings,
  Heart,
  Star,
  Camera,
  Music,
  Book,
  Coffee,
  Rocket
}

export function Header() {
  const { getData, saveData, isEditMode } = useInlineEditor()
  // 기본 데이터
  const defaultConfig = {
    // 🏷️ 로고 설정
    logo: "나의 포트폴리오",  // 네비바 로고 텍스트 (빈 문자열이면 로고 숨김)
    logoImage: "",       // 로고 이미지 경로 (예: "/logo.png") - 사용 안하면 빈 문자열
    
    // 🎨 네비게이션 스타일
    showNavBar: true,    // false면 네비게이션 바 전체 숨김
    showThemeToggle: true, // false면 다크모드 토글 버튼 숨김
    
    // 📱 메뉴 항목들 (필요한 것만 사용, 최대 6개 권장)
    // 
    // 🎯 사용 가능한 아이콘들:
    // Home, User, Briefcase, Mail, Settings, Heart, Star, 
    // Camera, Music, Book, Coffee, Rocket
    // 
    // ⚠️ 주의: url은 반드시 #으로 시작 (섹션 이동용)
    items: [
      {
        name: "홈",           // 메뉴 이름
        url: "#hero",         // 히어로 섹션으로 이동
        icon: Home,          // 아이콘 (위 목록에서 선택)
        show: true           // false면 이 메뉴 숨김
      },
      {
        name: "소개",
        url: "#about",
        icon: User,
        show: true
      },
      {
        name: "프로젝트",
        url: "#projects",
        icon: Briefcase,
        show: true
      },
      {
        name: "연락처",
        url: "#contact",
        icon: Mail,
        show: true
      },
      // ===== 추가 메뉴 예시 (필요시 show를 true로) =====
      {
        name: "갤러리",
        url: "#gallery",
        icon: Camera,
        show: false  // 사용하려면 true로 변경
      },
      {
        name: "블로그",
        url: "#blog",
        icon: Book,
        show: false  // 사용하려면 true로 변경
      }
    ]
  }
  
  const [navConfig, setNavConfig] = useState(defaultConfig)
  const [showEditModal, setShowEditModal] = useState(false)
  const [siteTitle, setSiteTitle] = useState('나의 포트폴리오')
  
  // localStorage에서 데이터 로드
  useEffect(() => {
    // 사이트 제목 복원
    const savedTitle = getData('site-title') as string | null
    if (savedTitle) {
      setSiteTitle(savedTitle)
      document.title = savedTitle
    } else {
      // 현재 document.title을 기본값으로 사용
      setSiteTitle(document.title)
    }
    
    const savedData = getData('nav-config') as { 
      logo?: string; 
      logoImage?: string; 
      showNavBar?: boolean; 
      showThemeToggle?: boolean; 
      items?: Array<{ name: string; url: string; icon: string; show: boolean }> 
    } | null
    if (savedData && savedData.items) {
      // 아이콘 복원
      const restoredItems = savedData.items.map((item) => {
        let iconComponent = Home // 기본값
        
        // 문자열로 저장된 아이콘 이름을 컴포넌트로 변환
        if (typeof item.icon === 'string' && ICON_MAP[item.icon as keyof typeof ICON_MAP]) {
          iconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP]
        }
        
        return {
          ...item,
          icon: iconComponent
        }
      })
      
      setNavConfig({ 
        ...defaultConfig, 
        ...savedData,
        items: restoredItems
      })
    }
  }, [])
  
  const updateNavConfig = (key: string, value: string | boolean | typeof navConfig.items) => {
    const newConfig = { ...navConfig, [key]: value }
    setNavConfig(newConfig)
    
    // 사이트 제목도 함께 업데이트
    if (key === 'siteTitle' && typeof value === 'string') {
      setSiteTitle(value)
      document.title = value
      saveData('site-title', value)
    }
    
    // 저장할 때 아이콘을 문자열로 변환
    const configToSave: { 
      logo?: string; 
      logoImage?: string; 
      showNavBar?: boolean; 
      showThemeToggle?: boolean; 
      items?: Array<{ name: string; url: string; icon: string | LucideIcon; show: boolean }> 
    } = { ...newConfig }
    if (configToSave.items) {
      configToSave.items = newConfig.items.map((item) => ({
        ...item,
        icon: Object.keys(ICON_MAP).find(key => ICON_MAP[key as keyof typeof ICON_MAP] === item.icon) || 'Home'
      }))
    }
    saveData('nav-config', configToSave)
  }
  
  const updateMenuItem = (index: number, field: string, value: string | boolean | LucideIcon) => {
    const newItems = [...navConfig.items]
    newItems[index] = { ...newItems[index], [field]: value }
    updateNavConfig('items', newItems)
  }
  
  const addMenuItem = () => {
    const newItems = [...navConfig.items]
    newItems.push({
      name: "새 메뉴",
      url: "#new",
      icon: Home,
      show: true
    })
    updateNavConfig('items', newItems)
  }
  
  const removeMenuItem = (index: number) => {
    const newItems = navConfig.items.filter((_, i) => i !== index)
    updateNavConfig('items', newItems)
  }
  
  // 실제로 표시할 메뉴만 필터링
  const activeItems = navConfig.items.filter(item => item.show)
  
  // 네비게이션 바를 표시하지 않음
  if (!navConfig.showNavBar) {
    return navConfig.showThemeToggle ? (
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
    ) : null
  }
  
  return (
    <>
      {/* Navigation Bar */}
      <NavBar 
        items={activeItems} 
        logo={navConfig.logo}
        logoImage={navConfig.logoImage}
        isEditMode={isEditMode}
        onEditMenu={() => setShowEditModal(true)}
      />
      
      {/* Theme Toggle - Fixed Position */}
      {navConfig.showThemeToggle && (
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">사이트 설정</h3>
            
            {/* Site Title */}
            <div className="mb-6 p-4 border rounded-lg">
              <h4 className="font-medium mb-3">사이트 제목 설정</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">브라우저 탭 제목</label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => updateNavConfig('siteTitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="나의 포트폴리오"
                  />
                </div>
              </div>
            </div>
            
            {/* Logo Settings */}
            <div className="mb-6 p-4 border rounded-lg">
              <h4 className="font-medium mb-3">네비바 로고 설정</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">로고 텍스트</label>
                  <input
                    type="text"
                    value={navConfig.logo}
                    onChange={(e) => updateNavConfig('logo', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="나의 포트폴리오"
                  />
                </div>
              </div>
            </div>
            
            {/* Menu Items - 홈, 소개, 프로젝트, 연락처만 이름 변경 가능 */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">메뉴 이름 변경</h4>
              <div className="space-y-3">
                {navConfig.items.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground w-20">
                      {index === 0 ? '홈' : index === 1 ? '소개' : index === 2 ? '프로젝트' : '연락처'}
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded bg-background"
                      placeholder="메뉴 이름"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setShowEditModal(false)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              완료
            </button>
          </div>
        </div>
      )}
    </>
  )
}
