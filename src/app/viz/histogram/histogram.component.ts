import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {HistogramDefinition} from '../model/Histogram';


let counter = 0;

@Component({
  selector: 'viz-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit, AfterViewInit {

  id = 'histogram-' + counter++;

  @Input()
  histogramDfn: HistogramDefinition;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.chart();
  }


  chart() {

    const margin = ({top: 10, right: 0, bottom: 20, left: 30});

    const d3Node = d3.select("#" + this.id)
    const width = (<HTMLElement> d3Node.node()).clientWidth;
    const height = (<HTMLElement> d3Node.node()).clientHeight - margin.top - margin.bottom;


    const data = this.histogramDfn.data
      .slice()
      .sort((a, b) => a.xPoint - b.xPoint)
      .map(({xPoint, frequency, color}) => {
        let acc = 0;
        return frequency.map( (e, idx, a) => ({
          name: xPoint,
          value: e,
          prev: acc,
          acc: (acc += e),
          color: color[idx % color.length]
        }));
      }).reduce((_1, _2) => _1.concat(_2), []);

    const svg = d3Node
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleBand()
      .domain(<any>data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.acc)]).nice()
      .range([height - margin.bottom, margin.top])

    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(<any>d.name))
      .attr("y", d => y(d.acc))
      .attr("fill", d => d.color)
      .attr("height", d => {
        return y(d.prev) - y(d.acc);
      })
      .attr("width", x.bandwidth());

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(_ => _.select(".domain").remove())

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    return svg.node();
  }



}
