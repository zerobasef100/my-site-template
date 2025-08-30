"use client"

import { useState, useRef, useEffect } from 'react'
import { useInlineEditor } from '@/contexts/inline-editor-context'
import { Upload, Image, Video, Palette, Settings } from 'lucide-react'

interface EditableBackgroundProps {
  image?: string
  video?: string
  color?: string
  opacity?: number
  onChange: (data: {
    image?: string
    video?: string
    color?: string
    opacity?: number
  }) => void
  storageKey?: string
  className?: string
  children?: React.ReactNode
}

export function EditableBackground({ 
  image = '',
  video = '',
  color = '',
  opacity = 0.5,
  onChange,
  storageKey,
  className = '',
  children
}: EditableBackgroundProps) {
  const { isEditMode, saveData, getData } = useInlineEditor()
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundType, setBackgroundType] = useState<'image' | 'video' | 'color'>(
    video ? 'video' : 'image'  // 기본값을 항상 'image'로 설정
  )
  const [tempImage, setTempImage] = useState(image)
  const [tempVideo, setTempVideo] = useState(video)
  const [tempColor, setTempColor] = useState(color || '#000000')
  const [tempOpacity, setTempOpacity] = useState(opacity)

  // 초기값 로드
  useEffect(() => {
    if (storageKey) {
      const saved = getData(storageKey) as { image?: string; video?: string; color?: string; opacity?: number } | null
      if (saved) {
        if (saved.video) {
          setBackgroundType('video')
          setTempVideo(saved.video)
        } else if (saved.image) {
          setBackgroundType('image')
          setTempImage(saved.image)
        } else if (saved.color) {
          setBackgroundType('color')
          setTempColor(saved.color)
        }
        setTempOpacity(saved.opacity || 0.5)
        onChange(saved as { image: string; video: string; color: string; opacity: number })
      }
    }
  }, [storageKey])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (file.type.includes('video')) {
          setTempVideo(result)
          setBackgroundType('video')
          handleSave('video', result)
        } else {
          setTempImage(result)
          setBackgroundType('image')
          handleSave('image', result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (type?: string, value?: string) => {
    const data = {
      image: backgroundType === 'image' ? (value || tempImage) : '',
      video: backgroundType === 'video' ? (value || tempVideo) : '',
      color: backgroundType === 'color' ? tempColor : '',
      opacity: tempOpacity
    }
    
    onChange(data)
    if (storageKey) {
      saveData(storageKey, data)
    }
  }

  const renderBackground = () => {
    if (backgroundType === 'video' && tempVideo) {
      return (
        <video
          src={tempVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: tempOpacity }}
        />
      )
    } else if (backgroundType === 'image' && tempImage) {
      return (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tempImage})`,
            opacity: tempOpacity
          }}
        />
      )
    } else if (backgroundType === 'color' && tempColor) {
      return (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: tempColor,
            opacity: tempOpacity
          }}
        />
      )
    }
    return null
  }

  return (
    <div className={`relative ${className}`}>
      {renderBackground()}
      
      {/* 컨텐츠 */}
      <div className="relative z-10">
        {children}
      </div>

      {/* 편집 버튼 */}
      {isEditMode && (
        <button
          onClick={() => {
            // 현재 배경에 따라 타입 자동 설정, 기본은 이미지
            if (tempVideo) {
              setBackgroundType('video')
            } else {
              setBackgroundType('image')  // 기본값을 이미지로 설정
            }
            setShowSettings(true)
          }}
          className="absolute top-4 left-4 z-20 p-2 bg-background/90 rounded-lg border shadow-lg hover:bg-background transition-colors"
        >
          <Settings className="h-5 w-5" />
        </button>
      )}

      {/* 설정 모달 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">배경 설정</h3>

            {/* 배경 타입 선택 */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setBackgroundType('image')}
                className={`py-2 px-3 rounded-lg border flex flex-col items-center gap-1 ${
                  backgroundType === 'image' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <Image className="h-5 w-5" />
                <span className="text-xs">이미지</span>
              </button>
              <button
                onClick={() => setBackgroundType('video')}
                className={`py-2 px-3 rounded-lg border flex flex-col items-center gap-1 ${
                  backgroundType === 'video' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <Video className="h-5 w-5" />
                <span className="text-xs">비디오</span>
              </button>
              <button
                onClick={() => setBackgroundType('color')}
                className={`py-2 px-3 rounded-lg border flex flex-col items-center gap-1 ${
                  backgroundType === 'color' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <Palette className="h-5 w-5" />
                <span className="text-xs">색상</span>
              </button>
            </div>

            {/* 타입별 설정 */}
            {backgroundType === 'image' && (
              <div>
                <div className="mb-3 p-3 bg-muted rounded-lg">
                  <p className="text-xs font-medium mb-1">📁 컴퓨터에서 이미지 선택:</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    JPG, PNG, GIF, WebP 지원 (최대 5MB)
                  </p>
                  {tempImage && (
                    <p className="text-xs text-amber-600 dark:text-amber-500">
                      ⚠️ 새 이미지 업로드시 기존 이미지가 교체됩니다 (서버에서 자동 삭제)
                    </p>
                  )}
                </div>
                <input
                  id="bg-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    
                    // 파일 크기 체크
                    if (file.size > 5 * 1024 * 1024) {
                      alert('파일 크기는 5MB 이하여야 합니다')
                      return
                    }
                    
                    // 파일 업로드
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('purpose', 'hero-background')
                    formData.append('oldPath', tempImage || '')
                    
                    try {
                      const response = await fetch('/api/upload-image', {
                        method: 'POST',
                        body: formData
                      })
                      
                      const result = await response.json()
                      
                      if (result.success) {
                        setTempImage(result.path)
                        handleSave('image', result.path)
                        alert('✅ 배경 이미지가 업로드되었습니다!')
                      } else {
                        alert(`❌ ${result.error}`)
                      }
                    } catch {
                      alert('업로드 중 오류가 발생했습니다')
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="bg-file-upload"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer flex items-center justify-center mb-3"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  파일 선택
                </label>
                
                <div className="relative">
                  <input
                    type="text"
                    value={tempImage}
                    onChange={(e) => setTempImage(e.target.value)}
                    placeholder="또는 URL 직접 입력 (https://...)"
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
              </div>
            )}

            {backgroundType === 'video' && (
              <div>
                <div className="mb-3 p-3 bg-muted rounded-lg">
                  <p className="text-xs font-medium mb-1">📁 컴퓨터에서 비디오 선택:</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    MP4, WebM 지원 (최대 20MB)
                  </p>
                  {tempVideo && (
                    <p className="text-xs text-amber-600 dark:text-amber-500">
                      ⚠️ 새 비디오 업로드시 기존 비디오가 교체됩니다 (서버에서 자동 삭제)
                    </p>
                  )}
                </div>
                <input
                  id="bg-video-upload"
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    
                    // 파일 크기 체크 (비디오는 20MB까지)
                    if (file.size > 20 * 1024 * 1024) {
                      alert('비디오 파일 크기는 20MB 이하여야 합니다')
                      return
                    }
                    
                    // 파일 업로드
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('purpose', 'hero-background-video')
                    formData.append('oldPath', tempVideo || '')
                    
                    try {
                      const response = await fetch('/api/upload-video', {
                        method: 'POST',
                        body: formData
                      })
                      
                      const result = await response.json()
                      
                      if (result.success) {
                        setTempVideo(result.path)
                        handleSave('video', result.path)
                        alert('✅ 배경 비디오가 업로드되었습니다!')
                      } else {
                        alert(`❌ ${result.error}`)
                      }
                    } catch {
                      alert('업로드 중 오류가 발생했습니다')
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="bg-video-upload"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer flex items-center justify-center mb-3"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  비디오 선택
                </label>
                
                <div className="relative">
                  <input
                    type="text"
                    value={tempVideo}
                    onChange={(e) => setTempVideo(e.target.value)}
                    placeholder="또는 URL 직접 입력 (YouTube, Vimeo 등)"
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
              </div>
            )}

            {backgroundType === 'color' && (
              <div>
                <input
                  type="color"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="w-full h-20 border rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* 투명도 설정 */}
            <div className="mt-4">
              <label className="text-sm text-muted-foreground">
                투명도: {Math.round(tempOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={tempOpacity}
                onChange={(e) => setTempOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* 버튼들 */}
            <div className="space-y-2 mt-6">
              {/* 기본으로 설정 버튼 */}
              <button
                onClick={() => {
                  // 모든 값을 초기화
                  setTempImage('')
                  setTempVideo('')
                  setTempColor('')
                  setTempOpacity(0.1)
                  setBackgroundType('image')
                  
                  // 바로 적용
                  const resetData = {
                    image: '',
                    video: '',
                    color: '',
                    opacity: 0.1
                  }
                  onChange(resetData)
                  if (storageKey) {
                    saveData(storageKey, resetData)
                  }
                  setShowSettings(false)
                }}
                className="w-full py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 border border-border"
              >
                🔄 기본으로 설정
              </button>
              
              {/* 적용/취소 버튼 */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSave()
                    setShowSettings(false)
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  적용
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-2 border rounded-lg hover:bg-muted"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}