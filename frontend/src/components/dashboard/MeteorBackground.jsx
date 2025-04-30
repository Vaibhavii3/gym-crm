import { useEffect, useState } from 'react'

const MeteorBackground = () => {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    const createMeteor = () => {
      const delay = Math.random() * 3
      const top = Math.random() * 100
      const left = Math.random() * 100
      return { id: Math.random(), delay, top, left }
    }

    const initialMeteors = Array.from({ length: 20 }, createMeteor)
    setMeteors(initialMeteors)

    const interval = setInterval(() => {
      setMeteors(prev => [...prev.slice(1), createMeteor()])
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="meteor-container">
      {meteors.map(meteor => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default MeteorBackground