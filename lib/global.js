import { generateLocaleDict, initLocale } from './lang'
import { createContext, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import BLOG from '@/blog.config'
import { initDarkMode, initTheme, saveThemeToCookies } from '@/lib/theme'
import { ALL_THEME } from '@/themes'

const GlobalContext = createContext()

/**
 * Global variable Provider, including language localization, style theme, search terms

 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function GlobalContextProvider({ children }) {
  const [locale, updateLocale] = useState(generateLocaleDict('en-US'))
  const [isDarkMode, updateDarkMode] = useState(false)
  const [onLoading, changeLoadingState] = useState(false)
  const [theme, setTheme] = useState(BLOG.THEME)
  Router.events.on('routeChangeStart', (...args) => {
    changeLoadingState(true)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    changeLoadingState(false)
  })

  function switchTheme() {
    const currentIndex = ALL_THEME.indexOf(theme)
    const newIndex = currentIndex < ALL_THEME.length - 1 ? currentIndex + 1 : 0
    changeTheme(ALL_THEME[newIndex])
  }

  function changeTheme(theme) {
    Router.query.theme = ''
    if (ALL_THEME.indexOf(theme) > -1) {
      setTheme(theme)
    } else {
      setTheme(BLOG.THEME)
    }
    saveThemeToCookies(theme)
  }

  useEffect(() => {
    initLocale(locale, updateLocale)
    initDarkMode(isDarkMode, updateDarkMode)
    initTheme(theme, changeTheme)
  }, [])

  return (
    <GlobalContext.Provider value={{ onLoading, changeLoadingState, locale, updateLocale, isDarkMode, updateDarkMode, theme, setTheme, switchTheme, changeTheme }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
