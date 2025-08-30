import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  // 🔒 개발 환경에서만 작동 (배포 시 자동 비활성화)
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: '개발 모드에서만 사용 가능합니다' },
      { status: 403 }
    )
  }

  try {
    const { component, section, data } = await request.json()
    
    // 📁 수정 가능한 컴포넌트 파일들
    const componentFiles: Record<string, string> = {
      'hero': 'components/hero.tsx',
      'about': 'components/about.tsx',
      'projects': 'components/projects.tsx',
      'contact': 'components/contact.tsx',
      'footer': 'components/footer.tsx',
      'navbar': 'components/navbar.tsx'
    }
    
    const fileName = componentFiles[component]
    if (!fileName) {
      return NextResponse.json(
        { error: '허용되지 않은 컴포넌트입니다' },
        { status: 400 }
      )
    }
    
    // 파일 읽기
    const filePath = path.join(process.cwd(), fileName)
    let content = await fs.readFile(filePath, 'utf-8')
    
    // 🎯 defaultInfo 객체 찾아서 교체
    // 정규식으로 const defaultInfo = { ... } 부분 찾기
    const defaultInfoRegex = new RegExp(
      `(const default${section || 'Info'} = \\{)[^}]*(\\})`,
      's'
    )
    
    // 새로운 defaultInfo 객체 생성
    const newDefaultInfo = `$1\n${Object.entries(data).map(([key, value]) => {
      if (typeof value === 'string') {
        // 문자열 값 이스케이프 처리
        const escaped = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
        return `    ${key}: "${escaped}"`
      } else if (Array.isArray(value)) {
        return `    ${key}: ${JSON.stringify(value)}`
      } else {
        return `    ${key}: ${JSON.stringify(value)}`
      }
    }).join(',\n')}\n  $2`
    
    // 파일 내용 교체
    content = content.replace(defaultInfoRegex, newDefaultInfo)
    
    // 파일 저장
    await fs.writeFile(filePath, content, 'utf-8')
    
    console.log(`✅ ${fileName} 파일이 업데이트되었습니다`)
    
    return NextResponse.json({ 
      success: true,
      message: '파일이 성공적으로 저장되었습니다'
    })
    
  } catch (error) {
    console.error('파일 저장 오류:', error)
    return NextResponse.json(
      { error: '파일 저장 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}