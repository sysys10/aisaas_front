import { useEffect, useState } from 'react'

export default function AnimatedText({
  text,
  setIsTypingComplete
}: {
  text: string
  setIsTypingComplete: (value: boolean) => void
}) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let currentText = ''
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex]
        setDisplayedText(currentText)
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 10)

    return () => clearInterval(typingInterval)
  }, [text])

  return (
    <div className='text-black'>
      {displayedText.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </div>
  )
}
