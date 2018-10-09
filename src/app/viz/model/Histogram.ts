export interface HistogramDefinition {
  // axis implicit on the bars
  data: HistogramBar[]
}

export interface HistogramBar {
  xPoint: number,
  frequency: number[]
  color: string[]|number[]

}
