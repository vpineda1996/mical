import {ChartDataSets} from 'chart.js';

export interface HistogramDefinition {
  // axis implicit on the bars
  buckets: string[]
  datasets : Array<ChartDataSets>
}
