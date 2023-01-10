import cookie from 'react-cookies'
import BLOG from '@/blog.config'
import { ALL_THEME } from '@/themes'
import { getQueryVariable } from './utils'

/**
 * Initialize theme, priority query > cookies > systemPrefer
 * @param isDarkMode
 * @param updateDarkMode Change theme ChangeState function
 * @description Read the user theme stored in the cookie
 */
export const initDarkMode = (isDarkMode, updateDarkMode) => {
  const queryMode = getQueryVariable('mode')
  if (queryMode) {
    isDarkMode = queryMode === 'dark'
  } else if (!isDarkMode) {
    isDarkMode = isPreferDark()
  }
  updateDarkMode(isDarkMode)
  saveDarkModeToCookies(isDarkMode)
  document.getElementsByTagName('html')[0].setAttribute('class', isDarkMode ? 'dark' : 'light')
}

/**
* Initialize theme, priority query > cookies > blog.config.js
 * @param {*} theme
 * @param {*} changeTheme
 */
export const initTheme = (theme, changeTheme) => {
  const queryTheme = getQueryVariable('theme')
  if (queryTheme && ALL_THEME.indexOf(queryTheme) > -1) {
    changeTheme(queryTheme)
  } else {
    const userTheme = loadThemeFromCookies()
    if (userTheme !== theme) {
      changeTheme(userTheme)
    }
  }
}

/**
* Whether to give priority to the dark mode, judged according to the system dark mode and the current time
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  if (BLOG.APPEARANCE === 'auto') {
    // When the system is dark mode or the time is night, force it to night mode
    const date = new Date()
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDarkMode || (date.getHours() >= 18 || date.getHours() < 6)
  }
  return false
}

/**
 * read dark mode
 * @returns {*}
 */
export const loadDarkModeFromCookies = () => {
  return cookie.load('darkMode')
}

/**
   * save dark mode
   * @param newTheme
   */
export const saveDarkModeToCookies = (newTheme) => {
  cookie.save('darkMode', newTheme, { path: '/' })
}

/**
 * read default theme
 * @returns {*}
 */
export const loadThemeFromCookies = () => {
  return cookie.load('theme')
}

/**
   * save default theme
   * @param newTheme
   */
export const saveThemeToCookies = (newTheme) => {
  cookie.save('theme', newTheme, { path: '/' })
}
