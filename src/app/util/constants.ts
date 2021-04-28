// TODO: vpineda this is harcoded, should be removed!
import {EmptyFilter} from '../model/filters';

export const SERVER_URL = "https://agevserver.herokuapp.com";
// local URL (lets create a dynamic switching type later)
// export const SERVER_URL = 'http://127.0.0.1:8888/'
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
export const MAP_COORDS = 'mapCoords'

export const YIELD_FILTER_COLS = {
  COUNTRY: "country",
  SOIL: FILTER_COL + ".soil",
  CLIMATE: FILTER_COL + ".climate",
  DURATION: FILTER_COL + ".duration",
  CROP: FILTER_COL + ".crop"
};

export const INTERVENTION_KEY = 'intervention';
export const INTERVENTION_ROUTE = 'intervention';
export const DEFAULT_INTERVENTIONS = {};

export const CLUSTER_LAYER_NAME = 'clusters';
export const CLUSTER_LAYER_TAGS_NAME = 'cluster-tag';
export const POINT_LAYER = 'point_layer';
