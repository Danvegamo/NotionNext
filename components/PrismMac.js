import React from 'react'
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// Prismjs for all languages introduced using autoloader
import 'prismjs/plugins/autoloader/prism-autoloader'
// mermaid chart
import BLOG from '@/blog.config'

/**
 * @author https://github.com/txs/
 * @returns
 */
const PrismMac = () => {
  React.useEffect(() => {
    renderPrismMac()
    renderMermaid()

    // Collapse code line number bug
    const observer = new MutationObserver(mutationsList => {
      for (const m of mutationsList) {
        if (m.target.nodeName === 'DETAILS') {
          const preCodes = m.target.querySelectorAll('pre.notion-code')
          for (const preCode of preCodes) {
            Prism.plugins.lineNumbers.resize(preCode)
          }
        }
      }
    })
    observer.observe(document.querySelector('#container'), { attributes: true, subtree: true })
  }, [])
  return <></>
}

/**
 * Render mermaid language to image
 */
const renderMermaid = async() => {
  //   Support Mermaid
  const mermaidPres = document.querySelectorAll('pre.notion-code.language-mermaid')
  if (mermaidPres) {
    for (const e of mermaidPres) {
      const chart = e.querySelector('code').textContent
      if (chart && !e.querySelector('.mermaid')) {
        const m = document.createElement('div')
        m.className = 'mermaid'
        m.innerHTML = chart
        e.appendChild(m)
      }
    }
  }

  const mermaidsSvg = document.querySelectorAll('.mermaid')
  if (mermaidsSvg) {
    let needLoad = false
    for (const e of mermaidsSvg) {
      if (e?.firstChild?.nodeName !== 'svg') {
        needLoad = true
      }
    }
    if (needLoad) {
      const asyncMermaid = await import('mermaid')
      asyncMermaid.default.contentLoaded()
    }
  }
}

function renderPrismMac() {
  const container = document?.getElementById('container-inner')

  // Add line numbers
  const codeBlocks = container?.getElementsByTagName('pre')
  if (codeBlocks) {
    Array.from(codeBlocks).forEach(item => {
      if (!item.classList.contains('line-numbers')) {
        item.classList.add('line-numbers')
        item.style.whiteSpace = 'pre-wrap'
      }
    })
  }

  // Check all redundant text before re-rendering

  try {
    // setup autoloader
    Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH
    Prism.highlightAll()
  } catch (err) {
    console.log('Code rendering', err)
  }

  const codeToolBars = container?.getElementsByClassName('code-toolbar')
  // Add pre-mac element for Mac Style UI
  if (codeToolBars) {
    Array.from(codeToolBars).forEach(item => {
      const existPreMac = item.getElementsByClassName('pre-mac')
      if (existPreMac.length < codeToolBars.length) {
        const preMac = document.createElement('div')
        preMac.classList.add('pre-mac')
        preMac.innerHTML = '<span></span><span></span><span></span>'
        item?.appendChild(preMac, item)
      }
    })
  }
}

export default PrismMac
