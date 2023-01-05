import { useGlobal } from '@/lib/global'
import React from 'react'
import CONFIG_HEXO from '../config_hexo'

/**
 * Click to summon the catalog drawer
 * The control will appear when the screen slides 500 pixels
 * @param props parent component pass in props
 * @returns {JSX.Element}
 * @constructor
 */
const TocDrawerButton = (props) => {
  if (!CONFIG_HEXO.WIDGET_TOC) {
    return <></>
  }
  const { locale } = useGlobal()
  return (<div onClick={props.onClick} className='py-2 px-3 cursor-pointer transform duration-200 flex justify-center items-center w-7 h-7 text-center' title={locale.POST.TOP} >
    <i className='fas fa-list-ol text-xs'/>
  </div>)
}

export default TocDrawerButton
