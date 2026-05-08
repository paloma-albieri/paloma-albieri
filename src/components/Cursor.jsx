import { useRef, useEffect } from 'react'

function Cursor({ enabled }) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!enabled) { 
      document.body.classList.add('no-cursor')
      return
    }
    document.body.classList.remove('no-cursor')
    
    const move = (e) => {
      if (!ref.current) return
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }
    
    const over = (e) => {
      const t = e.target
      if (t.closest('a, button, .video-frame, .stack-cell, input, textarea, select')) {
        ref.current?.classList.add('hot')
      } else {
        ref.current?.classList.remove('hot')
      }
    }
    
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [enabled])

  return <div ref={ref} className="cursor" />
}

export default Cursor
