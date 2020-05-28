// TODO: vpineda this is harcoded, should be removed!
import {EmptyFilter} from '../model/filters';

export const SERVER_URL = "https://agevbackend.herokuapp.com";
export const API_ROUTE = "api";

export const OUTCOME_TABLE_ROUTE = 'table';
export const HISTOGRAM_ROUTE = 'histogram';


export const OUTCOME_TABLE_KEY = 't';
export const DEFAULT_TABLE = 'yield';

export const FILTERS_KEY = 'f';
export const AREA_KEY = 'a'
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
export const DEFAULT_INTERVENTIONS = {};
export const INTERVENTIONS_STORAGE_KEY = 'INTERVENTIONS';

export const CLUSTER_LAYER_NAME = 'clusters';
export const CLUSTER_LAYER_TAGS_NAME = 'cluster-tag';
export const POINT_LAYER = 'point_layer';
