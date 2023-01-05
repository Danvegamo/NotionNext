import { useGlobal } from '@/lib/global'
import React from 'react'
import CONFIG_HEXO from '../config_hexo'

/**
 * Jump to the top of the page
 * This control appears when the screen is slipped 500 pixels
 * @param targetRef The target html tag for the associated height
 * @param showPercent Whether to show the percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = ({ showPercent = true, percent }) => {
  if (!CONFIG_HEXO.WIDGET_TO_TOP) {
    return <></>
  }
  const { locale } = useGlobal()
  return (<div className='space-x-1 items-center justify-center transform hover:scale-105 duration-200 w-7 h-auto pb-1 text-center' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >
        <div title={locale.POST.TOP} ><i className='fas fa-arrow-up text-xs' /></div>
        {showPercent && (<div className='text-xs hidden lg:block'>{percent}</div>)}
    </div>)
}

export default JumpToTopButton
