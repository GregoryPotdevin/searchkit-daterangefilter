# searchkit-daterangefilter

[![Travis][build-badge]][build]
[![searchkit-daterangefilter][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

DateRangeFilter component for Searchkit

[build-badge]: https://img.shields.io/travis/GregoryPotdevin/searchkit-daterangefilter/master.svg?style=flat-square
[build]: https://travis-ci.org/GregoryPotdevin/searchkit-daterangefilter

[npm-badge]: https://img.shields.io/npm/v/searchkit-daterangefilter.svg?style=flat-square
[npm]: https://www.npmjs.org/package/searchkit-daterangefilter

[coveralls-badge]: https://img.shields.io/coveralls/GregoryPotdevin/searchkit-daterangefilter/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/GregoryPotdevin/searchkit-daterangefilter

## Installation

`npm install searchkit-daterangefilter --save`

## Features

Similar to the classic RangeFilter, but with a date field

## Usage

```
import DateRangeFilter from "searchkit-daterangefilter"
```

```
<DateRangeFilter 
  id="year"
  field="publication_date"
  title="Publication Date"
  min={2005} 
  max={new Date().getFullYear()} 
  interval="year"
  showHistogram={true} />
```

It is recommended to increase the size to benefit from the filter functionnality.

## Example

```
const Demo = React.createClass({
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
          </TopBar>
          <LayoutBody>
            <SideBar>
              <HierarchicalMenuFilter
                fields={["type.raw", "genres.raw"]}
                title="Categories"
                id="categories"/>
              <DateRangeFilter 
                id="year"
                field="publication_date"
                title="Publication Date"
                min={2005} 
                max={new Date().getFullYear()} 
                interval="year"
                showHistogram={true} />
            </SideBar>
            <LayoutResults>
              <Hits mod="sk-hits-grid" hitsPerPage={10} itemComponent={MovieHitsGridItem}
                sourceFilter={["title", "poster", "imdbId"]}/>
              <NoHits/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    )
  }
})
```

## License

MIT