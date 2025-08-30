import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { InlineEditorProvider } from "@/contexts/inline-editor-context"
import "./globals.css"

// ✏️ 여기를 수정하세요
export const metadata: Metadata = {
  title: "홍길동의 사이트", // 브라우저 탭에 표시될 이름
  description: "나의 포트폴리오 사이트", // 사이트 설명
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          as="style" 
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" 
        />
      </head>
      <body className="font-pretendard" suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <InlineEditorProvider>
            {children}
          </InlineEditorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
