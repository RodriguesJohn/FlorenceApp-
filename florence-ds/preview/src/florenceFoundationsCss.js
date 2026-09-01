import colorPrimitives from '../../02-foundations/colors/primitives.css?raw'
import colorSemantics from '../../02-foundations/colors/semantics.css?raw'
import typePrimitives from '../../02-foundations/typography/primitives.css?raw'
import typeSemantics from '../../02-foundations/typography/semantics.css?raw'
import spacePrimitives from '../../02-foundations/spacing/primitives.css?raw'
import spaceSemantics from '../../02-foundations/spacing/semantics.css?raw'
import gridPrimitives from '../../02-foundations/grid/primitives.css?raw'
import gridSemantics from '../../02-foundations/grid/semantics.css?raw'
import radiusPrimitives from '../../02-foundations/radius/primitives.css?raw'
import radiusSemantics from '../../02-foundations/radius/semantics.css?raw'
import borderPrimitives from '../../02-foundations/border/primitives.css?raw'
import borderSemantics from '../../02-foundations/border/semantics.css?raw'
import shadowPrimitives from '../../02-foundations/shadow/primitives.css?raw'
import shadowSemantics from '../../02-foundations/shadow/semantics.css?raw'
import motionPrimitives from '../../02-foundations/motion/primitives.css?raw'
import motionSemantics from '../../02-foundations/motion/semantics.css?raw'
import opacityPrimitives from '../../02-foundations/opacity/primitives.css?raw'
import opacitySemantics from '../../02-foundations/opacity/semantics.css?raw'

const FILES = [
  ['colors/primitives.css', colorPrimitives],
  ['colors/semantics.css', colorSemantics],
  ['typography/primitives.css', typePrimitives],
  ['typography/semantics.css', typeSemantics],
  ['spacing/primitives.css', spacePrimitives],
  ['spacing/semantics.css', spaceSemantics],
  ['grid/primitives.css', gridPrimitives],
  ['grid/semantics.css', gridSemantics],
  ['radius/primitives.css', radiusPrimitives],
  ['radius/semantics.css', radiusSemantics],
  ['border/primitives.css', borderPrimitives],
  ['border/semantics.css', borderSemantics],
  ['shadow/primitives.css', shadowPrimitives],
  ['shadow/semantics.css', shadowSemantics],
  ['motion/primitives.css', motionPrimitives],
  ['motion/semantics.css', motionSemantics],
  ['opacity/primitives.css', opacityPrimitives],
  ['opacity/semantics.css', opacitySemantics],
]

export const FLORENCE_FOUNDATIONS_CSS = FILES.map(
  ([name, css]) => `/* ${name} */\n${String(css).trim()}`,
).join('\n\n')
