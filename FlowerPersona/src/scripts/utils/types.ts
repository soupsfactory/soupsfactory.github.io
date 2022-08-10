import { activityDatatype, flowerPetal } from '../classes/types'
// import * as d3 from 'd3'

export type forceDatatype = {
  name: string
  children: activityDatatype[]
  id: number
  flower: flowerPetal[]
  exp: number
}

// export interface INodeDataset extends d3.SimulationNodeDatum {

// }
