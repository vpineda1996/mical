// TODO: vpineda this is harcoded, should be removed!
import {EmptyFilter} from '../model/filters';

export const SERVER_URL = "http://localhost:8888";
export const API_ROUTE = "api";

export const OUTCOME_TABLE_ROUTE = 'table';
export const HISTOGRAM_ROUTE = 'histogram';


export const OUTCOME_TABLE_KEY = 't';
export const DEFAULT_TABLE = 'yield';

export const FILTERS_KEY = 'f';
export const DEFAULT_FILTERS = new EmptyFilter();
export const COLUMN_FILTERS_STORAGE_KEY = 'COL_FILTERS'
export const FILTER_COL = 'filterCols';

export const YIELD_FILTER_COLS = {
  SOIL: FILTER_COL + "." + "soil",
  CLIMATE: FILTER_COL + "." + "climate",
  DURATION: FILTER_COL + "." + "duration",
  CROP: FILTER_COL + "." + "crop"
};

export const INTERVENTION_KEY = 'intervention';
export const INTERVENTION_ROUTE = 'intervention';
export const DEFAULT_INTERVENTIONS = {
  'organic': {
    key: 1,
    sKey: 'organic',
    title: 'Organic vs Conventional',
    desc: '',
    denom: 'Hgher yields organic',
    numerator: 'Higher yields conventional',
  }
};
