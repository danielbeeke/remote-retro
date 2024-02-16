import './scss/style.scss'
import '@fontsource/roboto'

import { render } from 'preact'

import { App } from './app.tsx'

render(<App />, document.getElementById('app')!)
