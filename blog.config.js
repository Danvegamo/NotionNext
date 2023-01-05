// Note: process.env.XX is the environment variable of Vercel, see the configuration method: https://docs.tangly1024.com/zh/features/personality
const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '3dc5c6078733447f9aec582c9975a33c',
  PSEUDO_STATIC: false, // Pseudo-static path, when enabled, all article URLs end with .html.
  NEXT_REVALIDATE_SECOND: 5, // Update content cache interval unit (seconds); that is, each page has a purely static period of 5 seconds, during which no notion data will be fetched no matter how many visits are made; increasing this value will help save Vercel Resources, while increasing the access rate, but it will also delay the update of articles.
  THEME: process.env.NEXT_PUBLIC_THEME || 'hexo', // Theme, support ['next','hexo',"fukasawa','medium','example'] @see https://preview.tangly1024.com
  THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || false, // whether to display switch theme button
  LANG: 'en-US', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
  SINCE: 2023, // e.g if leave this empty, current year will be used.
  APPEARANCE: 'auto', // ['light', 'dark', 'auto'], // light day mode, dark night mode, auto automatic night mode according to time and theme

  AUTHOR: 'Danvegamo', // Author
  BIO: 'Lead & Product designer', // About of the author
  LINK: 'https://lmny.art', // website address
  KEYWORDS: 'Notion, Blog, metaverse, VR, social impact, David Vega, David Andres Vega Monsalve', // website keywords separated by commas
   // Social link, do not need to leave blank, for example CONTACT_WEIBO:''
  CONTACT_EMAIL: 'd_vega@lmny.art', // Email
  CONTACT_YOUTUBE: 'https://www.youtube.com/channel/UCyMmbzWgp46YO0dSLM5yNTg', // personal website in Weibo
  CONTACT_TWITTER: '', // Your Twitter profile
  CONTACT_GITHUB: 'https://github.com/Danvegamo', // Your Github profile
  CONTACT_TELEGRAM: '', // Your telegram profile https://t.me/tangly_1024
  CONTACT_LINKEDIN: 'https://www.linkedin.com/in/danvegamo/', // Your linkedIn profile

 // The website uses PingFangSC and NotoSansSC by default,
   // If you need to customize the font, please change CUSTOM_FONT to true, and change CUSTOM_FONT_URL to your font CSS address, and specify your font-family in CUSTOM_FONT_SANS and CUSTOM_FONT_SERIF
  CUSTOM_FONT: process.env.NEXT_PUBLIC_CUSTOM_FONT || true, // Whether to use a custom font
   // Custom font example: Please change CUSTOM_FONT to true first, and change CUSTOM_FONT_URL to your font CSS address, and specify your fontfamily in CUSTOM_FONT_SANS and CUSTOM_FONT_SERIF
  CUSTOM_FONT_URL: ['https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'], // CSS for custom fonts
  CUSTOM_FONT_SANS: ['Open Sans'], // custom sans serif font
  CUSTOM_FONT_SERIF: ['Open Sans'], // custom serif font

 // Whether the sidebar layout is reversed (left to right, right to left) Supported theme: hexo next medium fukasawa example
  LAYOUT_SIDEBAR_REVERSE: false,

  // A small plugin to display your facebook fan page~ @see https://tw.andys.pro/article/add-facebook-fanpage-notionnext
  FACEBOOK_PAGE_TITLE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_TITLE || null, // The title bar of the Facebook Page widget in the sidebar, if you fill in '', there is no title bar e.g Facebook Fan Group'
  FACEBOOK_PAGE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || null, // Link to Facebook Page e.g https://www.facebook.com/tw.andys.pro
  FACEBOOK_PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '', // Facebook Page ID to enable messenger chat
  FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '', // Facebook App ID to enable messenger chat function Get: https://developers.facebook.com/

  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '', // record number Min ICP XXXXXXX

  // PrismJs CDN
  PRISM_JS_PATH: 'https://npm.elemecdn.com/prismjs@1.29.0/components/',

  BACKGROUND_LIGHT: '#eeeeee', // use hex value, don't forget '#' e.g #fffefc
  BACKGROUND_DARK: '#000000', // use hex value, don't forget '#'
  SUB_PATH: '', // leave this empty unless you want to deploy in a folder

  POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX || 'article', // The default path prefix of the POST type article, for example, the default path of the POST type is /article/[slug]
   // If this item is configured as '' and empty, the article will not have a prefix path. Usage scenario: When the article prefix path is expected to be /post, it supports multi-level

  POST_LIST_STYLE: 'page', // ['page','scroll] Article list style: page number paging, single page scrolling loading
  POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false', // Whether to load article preview in the list
  POST_PREVIEW_LINES: 12, // Preview blog lines
  POST_RECOMMEND_COUNT: 6, // Number of recommended articles
  POSTS_PER_PAGE: 12, // post counts per page
  POSTS_SORT_BY: 'notion', // sorting method 'date' by time, 'notion' controlled by notion

  PREVIEW_CATEGORY_COUNT: 16, // The maximum number of categories displayed on the home page, 0 means unlimited
  PREVIEW_TAG_COUNT: 16, // The maximum number of tags displayed on the homepage, 0 means no limit

  // mouse click firework effect
  FIREWORKS: process.env.NEXT_PUBLIC_FIREWORKS || false, // switch
  // Firework colors, thanks to https://github.com/Vixcity for color submissions
  FIREWORKS_COLOR: ['255, 20, 97', '24, 255, 146', '90, 135, 255', '251, 243, 140'],

  // suspended widget
  WIDGET_PET: process.env.NEXT_PUBLIC_WIDGET_PET || false, // wheter to display the pet widget
  WIDGET_PET_LINK: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json', // Widget model address@see https://github.com /xiazeyu/live2d-widget-models
  WIDGET_PET_SWITCH_THEME: false, // Click on the pet widget to switch blog theme

  // Music player plugin
  MUSIC_PLAYER: process.env.NEXT_PUBLIC_MUSIC_PLAYER || false, // Whether to use the music player plugin
  MUSIC_PLAYER_VISIBLE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_VISIBLE || true, // Whether to display playback and switching in the lower left corner. If you use the player, turn on autoplay and then hide it, it will play in a way similar to background music, and cannot be canceled or paused
  MUSIC_PLAYER_AUTO_PLAY: process.env.NEXT_PUBLIC_MUSIC_PLAYER_AUTO_PLAY || true, // Whether to autoplay, but autoplay often does not take effect (mobile devices do not support autoplay)
  MUSIC_PLAYER_SHOW_LRC: process.env.NEXT_PUBLIC_MUSIC_PLAYER_SHOW_LRC || false, // Whether to display lyrics (provided that there is a configured lyrics path, which is invalid for meting)
  MUSIC_PLAYER_ORDER: 'list', // default playback mode, order list, random 
  MUSIC_PLAYER_AUDIO_LIST: [ // Sample music list. In addition to the following configurations, lyrics can also be configured, see this document for specific configuration items https://aplayer.js.org/#/zh-Hans/
    {
      name: '风を共に舞う気持ち',
      artist: 'Falcom Sound Team jdk',
      url: 'https://music.163.com/song/media/outer/url?id=731419.mp3',
      cover: 'https://p2.music.126.net/kn6ugISTonvqJh3LHLaPtQ==/599233837187278.jpg'
    },
    {
      name: '王都グランセル',
      artist: 'Falcom Sound Team jdk',
      url: 'https://music.163.com/song/media/outer/url?id=731355.mp3',
      cover: 'https://p1.music.126.net/kn6ugISTonvqJh3LHLaPtQ==/599233837187278.jpg'
    }
  ],
  MUSIC_PLAYER_METING: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING || false, // Whether to open MetingJS to get the playlist from the platform. Will override the custom MUSIC_PLAYER_AUDIO_LIST, more configuration information: https://github.com/metowolf/MetingJS
  MUSIC_PLAYER_METING_SERVER: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_SERVER || 'netease', // music platform, [netease, tencent, kugou, xiami, baidu]
  MUSIC_PLAYER_METING_ID: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_ID || '60198', // corresponding to the id of the playlist

  // ----> Comment interaction can enable multiple supports at the same time WALINE VALINE GISCUS CUSDIS UTTERRANCES GITALK

  // twikoo
  COMMENT_TWIKOO_ENV_ID: process.env.NEXT_PUBLIC_COMMENT_ENV_ID || '', // TWIKOO地址 腾讯云环境填 envId；Vercel 环境域名地址（https://xxx.vercel.app)

  // utterance
  COMMENT_UTTERRANCES_REPO: process.env.NEXT_PUBLIC_COMMENT_UTTERRANCES_REPO || '', // 你的代码仓库名， 例如我是 'tangly1024/NotionNext'； 更多文档参考 https://utteranc.es/

  // giscus @see https://giscus.app/
  COMMENT_GISCUS_REPO: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO || '', // 你的Github仓库名 e.g 'tangly1024/NotionNext'
  COMMENT_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID || '', // 你的Github Repo ID e.g ( 設定完 giscus 即可看到 )
  COMMENT_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID || '', // 你的Github Discussions 內的 Category ID ( 設定完 giscus 即可看到 )
  COMMENT_GISCUS_MAPPING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_MAPPING || 'pathname', // 你的Github Discussions 使用哪種方式來標定文章, 預設 'pathname'
  COMMENT_GISCUS_REACTIONS_ENABLED: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REACTIONS_ENABLED || '1', // 你的 Giscus 是否開啟文章表情符號 '1' 開啟 "0" 關閉 預設開啟
  COMMENT_GISCUS_EMIT_METADATA: process.env.NEXT_PUBLIC_COMMENT_GISCUS_EMIT_METADATA || '0', // 你的 Giscus 是否提取 Metadata '1' 開啟 '0' 關閉 預設關閉
  COMMENT_GISCUS_INPUT_POSITION: process.env.NEXT_PUBLIC_COMMENT_GISCUS_INPUT_POSITION || 'bottom', // 你的 Giscus 發表留言位置 'bottom' 尾部 'top' 頂部, 預設 'bottom'
  COMMENT_GISCUS_LANG: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LANG || 'zh-CN', // 你的 Giscus 語言 e.g 'en', 'zh-TW', 'zh-CN', 預設 'en'
  COMMENT_GISCUS_LOADING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LOADING || 'lazy', // 你的 Giscus 載入是否漸進式載入, 預設 'lazy'
  COMMENT_GISCUS_CROSSORIGIN: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CROSSORIGIN || 'anonymous', // 你的 Giscus 可以跨網域, 預設 'anonymous'

  COMMENT_CUSDIS_APP_ID: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID || '', // data-app-id 36位 see https://cusdis.com/
  COMMENT_CUSDIS_HOST: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_HOST || 'https://cusdis.com', // data-host, change this if you're using self-hosted version
  COMMENT_CUSDIS_SCRIPT_SRC: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_SCRIPT_SRC || 'https://cusdis.com/js/cusdis.es.js', // change this if you're using self-hosted version

  // gitalk comment plugin More references https://gitalk.github.io/
  COMMENT_GITALK_REPO: process.env.NEXT_PUBLIC_COMMENT_GITALK_REPO || '', // the name of your Github repository, e.g. 'NotionNext'
  COMMENT_GITALK_OWNER: process.env.NEXT_PUBLIC_COMMENT_GITALK_OWNER || '', // your username e.g tangly1024
  COMMENT_GITALK_ADMIN: process.env.NEXT_PUBLIC_COMMENT_GITALK_ADMIN || '', // administrator username, usually yourself e.g 'tangly1024'
  COMMENT_GITALK_CLIENT_ID: process.env.NEXT_PUBLIC_COMMENT_GITALK_CLIENT_ID || '', // e.g 20-digit ID, obtained in the gitalk backend
  COMMENT_GITALK_CLIENT_SECRET: process.env.NEXT_PUBLIC_COMMENT_GITALK_CLIENT_SECRET || '', // e.g 40-bit ID, obtained in the gitalk backend
  COMMENT_GITALK_DISTRACTION_FREE_MODE: false, // similar to facebook's no interference mode

  COMMENT_GITTER_ROOM: process.env.NEXT_PUBLIC_COMMENT_GITTER_ROOM || '', // gitter chat room see https://gitter.im/ leave blank if not needed
  COMMENT_DAO_VOICE_ID: process.env.NEXT_PUBLIC_COMMENT_DAO_VOICE_ID || '', // DaoVoice http://dashboard.daovoice.io/get-started
  COMMENT_TIDIO_ID: process.env.NEXT_PUBLIC_COMMENT_TIDIO_ID || '', // [tidio_id] -> //code.tidio.co/[tidio_id].js

  COMMENT_VALINE_APP_ID: process.env.NEXT_PUBLIC_VALINE_ID || '', // Valine @see https://valine.js.org/quickstart.html 或 https://github.com/stonehank/react-valine#%E8%8E%B7%E5%8F%96app-id-%E5%92%8C-app-key
  COMMENT_VALINE_APP_KEY: process.env.NEXT_PUBLIC_VALINE_KEY || '',
  COMMENT_VALINE_SERVER_URLS: process.env.NEXT_PUBLIC_VALINE_SERVER_URLS || '', // This configuration is applicable to domestic custom domain users, overseas versions will be automatically detected (no need to fill in manually) @see https://valine.js.org/configuration.html#serverURLs
  COMMENT_VALINE_PLACEHOLDER: process.env.NEXT_PUBLIC_VALINE_PLACEHOLDER || '抢个沙发吧~', // 可以搭配后台管理评论 https://github.com/DesertsP/Valine-Admin  便于查看评论，以及邮件通知，垃圾评论过滤等功能

  COMMENT_WALINE_SERVER_URL: process.env.NEXT_PUBLIC_WALINE_SERVER_URL || '', // 请配置完整的Waline评论地址 例如 hhttps://preview-waline.tangly1024.com @see https://waline.js.org/guide/get-started.html
  COMMENT_WALINE_RECENT: process.env.NEXT_PUBLIC_WALINE_RECENT || false, // 最新评论

  // <---- 评论插件

  // ----> 站点统计
  ANALYTICS_BUSUANZI_ENABLE: true, // 展示网站阅读量、访问数 see http://busuanzi.ibruce.info/
  ANALYTICS_BAIDU_ID: process.env.NEXT_PUBLIC_ANALYTICS_BAIDU_ID || '', // e.g 只需要填写百度统计的id，[baidu_id] -> https://hm.baidu.com/hm.js?[baidu_id]
  ANALYTICS_CNZZ_ID: process.env.NEXT_PUBLIC_ANALYTICS_CNZZ_ID || '', // 只需要填写站长统计的id, [cnzz_id] -> https://s9.cnzz.com/z_stat.php?id=[cnzz_id]&web_id=[cnzz_id]
  ANALYTICS_GOOGLE_ID: process.env.NEXT_PUBLIC_ANALYTICS_GOOGLE_ID || '', // 谷歌Analytics的id e.g: G-XXXXXXXXXX

  ANALYTICS_ACKEE_TRACKER: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_TRACKER || '', // e.g 'https://ackee.tangly1024.net/tracker.js'
  ANALYTICS_ACKEE_DATA_SERVER: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DATA_SERVER || '', // e.g https://ackee.tangly1024.net , don't end with a slash
  ANALYTICS_ACKEE_DOMAIN_ID: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DOMAIN_ID || '', // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'

  SEO_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION || '', // Remove the value or replace it with your own google site verification code

  // <---- 站点统计

  // 谷歌广告
  ADSENSE_GOOGLE_ID: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_ID || '', // 谷歌广告ID e.g ca-pub-xxxxxxxxxxxxxxxx

  // 自定义配置notion数据库字段名
  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password',
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type',
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title',
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags',
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon'
  },

 // nullify the configuration
 AVATAR: '/avatar.png', // Author avatar, overridden by ICON in notion. If there is no ICON, then avatar.png in the public directory is taken.
 TITLE: process.env.NEXT_PUBLIC_TITLE || 'NotionNext BLOG', // site title, overridden by the page title in notion
 HOME_BANNER_IMAGE: '. /bg_image.webp', // home page background image, will be overwritten by the cover image in the notion, if there is no cover image then the /public/bg_image.jpg file in the code will be used
 DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION || 'This is a site generated by NotionNext', // site description, overridden by the page description in notion

 // Development related
 NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '', // Useful if you prefer not to make your database public
 DEBUG: process.env.NEXT_PUBLIC_DEBUG || false, // Whether to show the debug button
 ENABLE_CACHE: process.env.ENABLE_CACHE || false, // Enabling caching will cache Notion data in memory, usually used in development and debugging, but not significant in formal deployments.
 isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables) isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
 VERSION: process.env.NEXT_PUBLIC_VERSION // version number

}

module.exports = BLOG
