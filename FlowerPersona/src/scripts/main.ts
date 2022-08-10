import '../assets/styles/style.scss'
import { dataset } from '../../public/dataset/dataset'
// import { activatePan } from './functs/activatepan'
import * as d3 from 'd3'
// import Panzoom from '@panzoom/panzoom'
import {
  createBranches,
  arrangeFlowerData,
  createFlowersSvg,
} from './functs/createFlowers'

const svgDraw = document.querySelector<HTMLDivElement>('#svg-start')!

const margin = {
  hori_margin: 100,
  ver_margin: 50,
}
const tWidth: number = svgDraw.clientWidth

const width: number = tWidth - margin.hori_margin
const tHeight: number = svgDraw.clientHeight
const height: number = tHeight - margin.ver_margin

console.log(width, height)

const viewboxString = `0 0 ${width} ${height}`
// svg creation
const divSvgMain = d3
  .select('#svg-start')
  .append('svg')
  .attr('id', 'svg_full_image')
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', viewboxString)

const petalList = arrangeFlowerData(dataset)

const svgShapeArea = divSvgMain
  .selectAll('g')
  .data(petalList)
  .enter()
  .append('g')
  .attr('id', (d: any) => {
    return `id_${d.id}`
  })
  .on('mouseover', function (this, event, d) {
    const experienceLocal = d.information.exp
    console.log(experienceLocal)
    console.log(d.exp)
    console.log(d.books[0].bookDetails)
    console.log(d.activities[0].children)
    // console.log(d.activities[1].children)

    const toolTipText = {
      experience: `${experienceLocal} years`,
      domainOfExpertise: d.information.domainName.join(', '),
      indoorActivities: d.activities[0].children
        .map((activity) => activity.name)
        .join(', '),
      outdoorActivities: d.activities[1].children
        .map((activity) => activity.name)
        .join(', '),
      books: d.books.map((books) => {
        return books.bookDetails.name
      }),
    }
    console.log(toolTipText)

    // d3.select('#tooltip').remove()

    d3.select(this)
      .append('rect')
      .attr('x', event.X)
      .attr('y', event.Y)
      .attr('height', 140 + 20 * toolTipText.books.length)
      .attr('width', toolTipText.domainOfExpertise.length * 7)
      .attr('class', 'tooltip-rectangle')
      .attr('id', 'tooltip-rectangle')

    const tooltip = d3
      .select(this)
      .append('text')
      .attr('class', 'tooltip-text')
      .attr('x', event.X)
      .attr('y', event.Y)
      .attr('transform', 'translate(10,20)')
      .attr('id', 'tooltip')

    tooltip.append('tspan').text('I have a total of ')

    tooltip
      .append('tspan')
      .text(toolTipText.experience)
      .attr('class', 'tooltip-labels')

    tooltip.append('tspan').text(' of experience')

    tooltip
      .append('tspan')
      .text('My expertise is in ')
      .attr('x', 0)
      .attr('dy', 20)

    tooltip
      .append('tspan')
      .text(toolTipText.domainOfExpertise)
      .attr('class', 'tooltip-labels')

    tooltip.append('tspan').text('I love doing ').attr('x', 0).attr('dy', 30)
    tooltip
      .append('tspan')
      .text(toolTipText.indoorActivities)
      .attr('class', 'tooltip-labels')

    tooltip.append('tspan').text(' indoors')

    tooltip.append('tspan').text('I love doing ').attr('x', 0).attr('dy', 20)

    tooltip
      .append('tspan')
      .text(toolTipText.outdoorActivities)
      .attr('class', 'tooltip-labels')
    tooltip.append('tspan').text(' outdoors')

    tooltip
      .append('tspan')
      .text('Here are some of the books I adore  ')
      .attr('x', 0)
      .attr('dy', 30)

    for (const bookname of toolTipText.books) {
      tooltip.append('tspan').text(bookname).attr('x', 0).attr('dy', 20)
      // .attr('class', 'tooltip-labels')
    }
  })
  .on('mouseout', function (this) {
    d3.select('#tooltip').remove()
    d3.select('#tooltip-rectangle').remove()
  })

// draw svg flowers
createFlowersSvg(svgShapeArea)
createBranches(petalList, divSvgMain, width, height)
// initiatePan()
