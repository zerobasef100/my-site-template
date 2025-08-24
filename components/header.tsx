"use client"

import { useState, useEffect } from "react"
import { Home, User, Briefcase, Mail, Settings, Heart, Star, Camera, Music, Book, Coffee, Rocket } from "lucide-react"
import { NavBar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  // ==================== 🎯 네비게이션 수정 가이드 시작 🎯 ====================
  // 
  // 이 부분만 수정하시면 됩니다! 코드는 건드리지 마세요.
  // 
  // 📌 로고 텍스트나 이미지 변경 가능
  // 📌 메뉴 항목 추가/삭제/순서 변경 가능
  // 📌 아이콘 종류 변경 가능
  // 📌 빈 문자열("")로 두면 해당 항목 숨김
  // 
  // ==================================================================
  
  const navConfig = {
    // 🏷️ 로고 설정
    logo: "Portfolio",  // 로고 텍스트 (빈 문자열이면 로고 숨김)
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
        url: "#hero",        // 이동할 섹션 (#hero, #about, #projects, #contact)
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
  
  // ==================== 🎯 네비게이션 수정 가이드 끝 🎯 ====================
  
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
      />
      
      {/* Theme Toggle - Fixed Position */}
      {navConfig.showThemeToggle && (
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
      )}
    </>
  )
}
