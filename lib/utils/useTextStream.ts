import { useEffect, useState } from 'react'

export function useTextStream(text: string, speed = 25) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    setDisplayedText('')
    if (!text) {
      return undefined
    }

    let index = 0
    const interval = window.setInterval(() => {
      setDisplayedText((current) => current + text[index])
      index += 1
      if (index >= text.length) {
        window.clearInterval(interval)
      }
    }, speed)

    return () => {
      window.clearInterval(interval)
    }
  }, [text, speed])

  return displayedText
}
