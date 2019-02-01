// TODO: vpineda this is harcoded, should be removed!
import {EmptyFilter} from '../model/filters';

export const SERVER_URL = "http://localhost:8888";
export const API_ROUTE = "api";

export const OUTCOME_TABLE_ROUTE = 'table';


export const OUTCOME_TABLE_KEY = 't';
export const DEFAULT_TABLE = 'yield';

export const FILTERS_KEY = 'f';
export const DEFAULT_FILTERS = new EmptyFilter();

export const INTERVENTION_KEY = 'intervention';
export const INTERVENTION_ROUTE = 'intervention';
export const DEFAULT_INTERVENTIONS = {
  'organic': {
    key: 1,
    sKey: 'organic',
    title: 'Organic vs Conventional',
    desc: '',
    denom: 'Higher yields organic',
    numerator: 'Higher yields conventional',
  }};
