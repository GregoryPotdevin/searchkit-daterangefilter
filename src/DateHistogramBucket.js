import { AggsContainer } from "searchkit"

const assign = require("lodash/assign")

export function DateHistogramBucket(key, field, options={}, ...childAggs){
  return AggsContainer(key, {date_histogram:assign({field}, options)}, childAggs)
}