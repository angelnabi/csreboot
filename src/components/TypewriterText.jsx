import { useEffect, useState } from 'react'

// Reveals `text` character by character. Resets whenever `text` changes.
export default function TypewriterText({ text, speed = 22 }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return <>{shown}</>
}
