import React from 'react'
import PropTypes from 'prop-types';

import {
	SearchkitComponent,
	FastClick,
	RangeAccessor,
	renderComponent,
	Panel,
	RangeSliderHistogram, RangeSlider
} from "searchkit"

import { DateRangeAccessor } from './DateRangeAccessor'

const defaults = require("lodash/defaults")
const max = require("lodash/max")
const map = require("lodash/map")
const maxBy = require("lodash/maxBy")
const get = require("lodash/get")

function computeMaxValue(items, field) {
  if (!items || items.length == 0) return 0
  return maxBy(items, field)[field]
}

export class DateRangeFilter extends SearchkitComponent {

	constructor(props){
		super(props)
		this.sliderUpdate = this.sliderUpdate.bind(this)
		this.sliderUpdateAndSearch = this.sliderUpdateAndSearch.bind(this)
	}

	defineAccessor() {
		const { id, title, min, max, field,
			interval, showHistogram } = this.props
		return new DateRangeAccessor(id,{
			id, min, max, title, field, interval, loadHistogram:showHistogram
		})
	}

	defineBEMBlocks() {
		let block = this.props.mod || "sk-range-filter"
		return {
			container: block,
			labels: block+"-value-labels"
		}
	}

  sliderUpdate(newValues) {
  	if ((newValues.min == this.props.min) && (newValues.max == this.props.max)){
  		this.accessor.state = this.accessor.state.clear()
  	} else {
    	this.accessor.state = this.accessor.state.setValue(newValues)
  	}
		this.forceUpdate()
	}

	sliderUpdateAndSearch(newValues){
		this.sliderUpdate(newValues)
		this.searchkit.performSearch()
	}

	getMaxValue() {
		if (this.accessor.getBuckets() == 0) return 0
		return max(map(this.accessor.getBuckets(), "doc_count"))
	}

	getRangeComponent(){
	  const { rangeComponent, showHistogram } = this.props
	  if (!showHistogram && (rangeComponent === RangeSliderHistogram)) {
	    return RangeSlider
	  } else {
	    return rangeComponent
	  }
	}

	render() {
    const { id, title, containerComponent, collapsable, defaultCollapsed } = this.props

    const maxValue = computeMaxValue(this.accessor.getBuckets(), "doc_count")

    return renderComponent(containerComponent, {
      title,
      className: id ? `filter--${id}` : undefined,
      defaultCollapsed,
      disabled: maxValue == 0
    }, this.renderRangeComponent(this.getRangeComponent()))
  }

  renderRangeComponent(component) {
    const { min, max } = this.props
    const state = this.accessor.state.getValue()
    const minHeight = (this.props.showHistogram ? 100 : 0)
    return (
      <div className="search-result-dropdown">
        <div style={{padding: 16, minHeight: minHeight}}>
          {renderComponent(component, {
            min, max,
            minValue: Number(get(state, "min", min)),
            maxValue: Number(get(state, "max", max)),
            items: this.accessor.getBuckets(),
            onChange: this.sliderUpdate,
            onFinished: this.sliderUpdateAndSearch
          })}
        </div>
      </div>
    )
  }
}

DateRangeFilter.propTypes = defaults({
  field:PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired,
  // containerComponent:RenderComponentPropType,
  // rangeComponent:RenderComponentPropType
}, SearchkitComponent.propTypes)

DateRangeFilter.defaultProps = {
  containerComponent: Panel,
  rangeComponent: RangeSliderHistogram,
  showHistogram: true
}