import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-mode')

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('energygym_theme')
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    setTheme(newTheme)
    localStorage.setItem('energygym_theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}