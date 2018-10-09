import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';


let counter = 0;

@Component({
  selector: 'viz-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit, AfterViewInit {

  id = 'histogram-' + counter++;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    const parseDate = d3.timeParse("%d-%m-%Y");

    // set the ranges
    const x = d3.scaleTime()
      .domain([new Date(2010, 6, 3), new Date(2012, 0, 1)])
      .rangeRound([0, 200]);
    const y = d3.scaleLinear()
      .range([height, 0]);

    // set the parameters for the histogram
    const histogram = d3.histogram()
      .value(function(d: any) { return d.date; })
      .domain(x.domain())
      .thresholds(x.ticks(d3.timeMonth));

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select("#" + this.id).append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    const data = [
      {
        dtg: "01-01-11",
        date: null,
        value: 1
      },
      {
        dtg: "01-01-12",
        date: null,
        value: 1
      },
      {
        dtg: "01-01-12",
        date: null,
        value: 2
      }
    ];
    // format the data
    data.forEach(function(d) {
      d.date = parseDate(d.dtg);
    });

    // group the data for the bars
    const bins = histogram(data);

    // Scale the range of the data in the y domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
      .data(bins)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr("transform", function(d: any) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", function(d: any) { return x(d.x1) - x(d.x0) - 1 ; })
      .attr("height", function(d: any) { return height - y(d.length); });

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  }




}

