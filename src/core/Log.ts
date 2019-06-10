import { globals } from './globals'
import { isDev } from './utils'

const loggingEnabled = () => isDev() && globals.loggingEnabled

const eventTitleStyle = `
  background: #417688; 
  color: white; 
  font-size: 13px; 
  padding: 6px 8px;
`

const eventDividerStyle = `
  background: #417688; 
  color: white; 
  font-size: 11px; 
  padding: 2px 8px;
`

const infoStyle = `
  background: #a9e1f5; 
  color: black; 
  font-size: 12px; 
  padding: 2px 6px;
`

const eventHeaderLine = '+'.repeat(60)
const eventEndLine = '^'.repeat(60)

const Log = {
  info(txt: string | string[], prefix: string = '', style = infoStyle) {
    if (!loggingEnabled()) {
      return
    }

    if (!Array.isArray(txt)) {
      txt = [txt]
    }
    txt.forEach(str => console.info(`%c${prefix}${str}`, style))
  },

  event(title: string, txt: string | string[]) {
    if (!loggingEnabled()) {
      return
    }

    console.info(`%c${eventHeaderLine}`, eventDividerStyle)
    console.info(`%c${title}`, eventTitleStyle)
    this.info(txt, '  -> ', infoStyle)
    console.info(`%c${eventEndLine}`, eventDividerStyle)
  },
}

export default Log
