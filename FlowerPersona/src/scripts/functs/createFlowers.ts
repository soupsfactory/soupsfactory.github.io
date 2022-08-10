import { Petals } from '../classes/Petals'
import * as d3 from 'd3'
import { drag } from '../functs/force'
import { datasetType, petalDataset } from '../classes/types'
import { forceDatatype } from '../utils/types'

const arrangeFlowerData = (dataset: datasetType[]) => {
  const petalList: petalDataset[] = []

  for (const p of dataset) {
    const flowerI = new Petals(p.exp, p.domain, p.activities, p.books, p.id)
    petalList.push({
      id: flowerI.id,
      exp: flowerI.petalNums,
      domain: flowerI.domainSet(),
      flower: flowerI.flower(),
      activities: flowerI.Activity,
      books: flowerI.getBookGenre(),
      information: flowerI.getInformation(),
    })
  }

  return petalList
}

// draws flowers
const createFlowersSvg = (
  svgShapeArea: d3.Selection<SVGGElement, petalDataset, SVGSVGElement, unknown>,
) => {
  // experience of persona

  svgShapeArea
    .selectAll('.path')
    .data((d) => d.flower)
    .enter()
    .append('path')
    .attr('d', (d) => d.pathP)
    .attr('class', 'shape')
    .attr('transform', (d) => `scale(1) rotate(${d.angle})`)

  // working domain of persona
  svgShapeArea
    .selectAll('.circle')
    .data((d) => d.domain)
    .enter()
    .append('path')
    .attr('d', (d) => d.path)
    .attr('transform', (d) => `scale(0.5) rotate(${d.angle})`)
    .style('fill', (d) => {
      return '' + d.col
    })
    .attr('stroke', (d) => d.col)
    .style('fill-opacity', 0.8)
    .append('title')
    .text((d) => `${d.domainName}`)

  // books liked by persona
  svgShapeArea
    .selectAll('.path')
    .data((d) => d.books)
    .enter()
    .append('path')
    .attr('d', (d) => d.path)
    .attr('stroke-width', (d) => d.size)
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .style('stroke-dasharray', (d) => d.pattern)
    .style('stroke-linecap', 'round')
    .attr('transform', (d) => `scale(0.5) rotate(${d.angle})`)
    .append('title')
    .text((d) => `${d.bookDetails.genre} <br> ${d.bookDetails.detail}`)

  // svgShapeArea
}

// draws links between flowers
const createBranches = (
  petalList: petalDataset[],
  divSvgMain: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>,
  width: number,
  height: number,
) => {
  // force layout
  const forcedata: forceDatatype[] = []
  //   let i = 0
  for (const p of petalList) {
    const f = {
      name: 'user',
      children: p.activities,
      id: p.id,
      flower: p.flower,
      exp: p.exp,
    }
    forcedata.push(f)
  }

  const Forcedata = {
    name: 'dataF',
    children: forcedata,
  }
  // //console.log(forcedata);
  // //console.log(Forcedata);

  const root = d3.hierarchy(Forcedata)
  const links = root.links() as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[]
  const nodes = root.descendants() as d3.SimulationNodeDatum[]

  console.log(nodes)
  console.log(links)

  const simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(links)
        .id((d: any) => d.id)
        .strength((d: any) => Number(2 / d.source.height)),
    )
    .force('charge', d3.forceManyBody().strength(-30))
    .force('center', d3.forceCenter(0, 0))
    .force('collision', d3.forceCollide().radius(10))
    .force('x', (d: any) => d3.forceX(d.fx))
    .force('y', (d: any) => d3.forceY(Number(d.fy)))
  // @ts-ignore
  root.fixed = true
  // @ts-ignore
  root.fx = 0
  // @ts-ignore
  root.fy = height / 2 - 30

  const curve = d3.line().curve(d3.curveNatural)

  const link = divSvgMain
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.7)
    .selectAll('path')
    .data(links)
    .join('path')
    .style('fill', 'none')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

  // indoor / outdoor activities by persona
  const node = createInOutActivity(nodes, simulation, divSvgMain, width, height)

  // links - connecting all flowers
  simulation.on('tick', () => {
    link.attr('d', (d: any) => {
      // //console.log("here");
      if (d.target.children) {
        return curve([
          [d.source.x, d.source.y],
          [(d.source.x + d.target.x) / 2, d.target.y / 1.5],
          [d.target.x, d.target.y],
        ])
      } else {
        return curve([
          [d.source.x, d.source.y],
          [d.target.x, d.target.y],
        ])
      }
    })

    node
      .attr('cx', (d: any) => Number(d.x))
      .attr('cy', (d: any) => {
        if (d.data.id) {
          d3.select(`#id_${d.data.id}`).attr(
            'transform',
            `translate(${width / 2 + d.x}, ${height / 2 + d.y})`,
          )
        }
        return d.y
      })
  })
}
// draws pollens
const createInOutActivity = (
  nodes: d3.SimulationNodeDatum[],
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>,
  divSvgMain: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>,
  width: number,
  height: number,
) => {
  const node = divSvgMain
    .append('g')
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('fill', (d: any) =>
      d.children
        ? d.data.name === 'indoor'
          ? '#957DAD'
          : '#FEC8D8'
        : '#856CBB',
    )
    .attr('stroke-width', 0)
    .attr('r', (d: any) =>
      d.children ? (d.height === 1 ? d.children.length * 4 : 0) : 4,
    )
    .attr('class', (d: any) =>
      d.children ? (d.height < 2 ? 'blurred' : null) : null,
    )
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .call(drag(simulation) as any)

  // links - pollens of each flowers
  node
    .append('title')
    .text((d: any) => (d.data.flower ? d.data.flower[0].pathP : d.data.name))

  return node
}

export {
  createBranches,
  createFlowersSvg,
  createInOutActivity,
  arrangeFlowerData,
}
