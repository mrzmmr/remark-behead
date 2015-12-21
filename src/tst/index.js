import * as fs from 'fs'
import * as mdast from 'mdast'
import {default as behead} from '../lib/index'

console.log(
  mdast.use(behead, {depth: -2}).process('#### Hello')
)
