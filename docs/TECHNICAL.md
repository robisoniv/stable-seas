# Stable Seas : Core Technical Documentation

Overall code structure

- Issue Areas
- Regions

The Load process

- index.html
- Which scripts in what order

Dependent Libraries and Frameworks

The Stable Seas web app relies on a number of open source libraries for page load and site interactivity. Most of these are part of the D3.js family (loaded as individual modules), as well as [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/). D3 modules - linked to documentation - used in the project include:

- [D3.js (v4)](https://github.com/d3)
  - [color](https://github.com/d3/d3-color)
  - [interpolate](https://github.com/d3/d3-interpolate)
  - [scale-chromatic](https://github.com/d3/d3-scale-chromatic)
[topojson.js](https://github.com/topojson/topojson)



# Site Structure

Issue areas and regions

Broadly, the Stable Seas site is structured as follows:

.
├── README.md
├── TRANSITION.md
├── assets (contains photos etc)
│   ├── blue-economy
│   ├── coastal-welfare
│   ├── favicon.ico
│   ├── fisheries
│   ├── illicit-trade
│   ├── international-cooperation
│   ├── maritime-enforcement
│   ├── maritime-mixed-migration
│   ├── overview
│   ├── piracy
│   ├── rule-of-law
│   ├── summaries
│   │   ├── PDFs of different summaries
├── css
│   ├── css files
├── data
│   ├── various data files, including map data
│   ├── blue-economy
│   |   └── data relevant to the blue economy page
│   ├── coastal-welfare
│   ├── fisheries
│   ├── illicit-trade
│   ├── international-cooperation
│   ├── maritime-enforcement
│   ├── maritime-mixed-migration
│   ├── overview
│   ├── piracy
│   ├── rule-of-law
├── docs
│   ├── CONTENT.md
│   └── TECHNICAL.md
├── fonts
├── index.html
├── issue-areas
│   ├── blue-economy
│   │   └── index.html (as in each directory)
│   ├── coastal-welfare
│   ├── fisheries
│   ├── illicit-trade
│   ├── international-cooperation
│   ├── maritime-enforcement
│   ├── maritime-mixed-migration
│   ├── overview
│   ├── piracy
│   └── rule-of-law
├── js
│   └── javascript files
├── regions
│   ├── eastern-coast
│   │   └── index.html (as in each directory)
│   ├── northern-gulf
│   ├── overview
│   ├── southern-coast
│   ├── southern-gulf
│   ├── west-indian-ocean
│   └── western-coast
└── stable-seas-executive-brief.html


The end user will only interact with the root directory (i.e. `https://stableseas.org/`, represented as `/`), as well as `/regions/{region}` and `/issue-areas/{issue area}` directories (and corresponding `index.html` files); everything else is referenced internally using relative paths and loaded into the `index.html` pages referenced above.

There are plans to build user-facing pages at `stableseas.org/data` but right now there is no outward facing page there.




Anatomy of a page
(True for issue areas and regions pages)

- Nav header
  - Buttons to switch between Issue Areas and Regions sides of the site
  - Resources dropdown contains links to relevant OEF programs
- Nav ribbon enables navigation to different issue areas or regions, depending on which side of the site you're on
- Interactive map with interactive countries, tooltips when relevant, and geographic layers to visualize data
- Card menu to navigate between cards
- Cards display content including text, images, videos, charts etc.
- Footer with social links and the Project Lead's email

- Overview pages for both regions and issue areas display a modal overlay introducing the user  to the project.


# Scripts

(Note that the codebase was replicated and modified for the `stableseas.org/regions` pages, and that Regions pages load and execute `regions.js` rather than `main.js`. Functions, CSS selectors, etc on the regions side of the site replace `issue-area`, `issueArea` and `ia` with `region`.)

This process is the same for each issue area page (`stableseas.org/issue-areas/{issue area}/index.html`) and regions page (`stableseas.org/regions/{region}/index.html`). As the browser parses the HTML document, critical scripts css files are loaded and global variables set in the following order:

1 `bootstrap-ss.css`:

A slightly modified version of bootstrap's css file.

2 `custom.css`:

Defines the site's custom CSS selectors and rules. May also extend some of bootstrap's native CSS selectors.

3 `sticky-footer-navbar.css`

CSS rules related to the footer and navbar.

4 `font-awesome.min.css v4.7.0`:

Loaded from maxcdn, font-related CSS rules.

5 `modal-video.min.css`:

The CSS required by the modal video plugin used to display embedded videos from Youtube and Vimeo.

6 D3.js etc:

`d3.v4.min.js`
`d3-color.v1.min.js`
`d3-interpolate.v1.min.js`
`d3-scale-chromatic.v1.min.js`
`topojson.js v3.0.0`

7 Data for either regions or issue areas:

All below in `/data/`

`overview/overview-data.js`
`international-cooperation/international-cooperation-data.js`
`rule-of-law/rule-of-law-data.js`
`maritime-enforcement/maritime-enforcement-data.js`
`maritime-mixed-migration/maritime-mixed-migration-data.js`
`illicit-trade/illicit-trade-data.js`
`coastal-welfare/coastal-welfare-data.js`
`blue-economy/blue-economy-data.js`
`fisheries/fisheries-data.js`
`piracy/piracy-data.js`

`main-data.js`

These data files were broken up for ease of development; they should probably be combined in the production codebase to minimize the number HTTP requests to the server. This is especially true as the final custom data file loaded, `main-data.js`, simply defines a global variable (`issueAreaData` or `regionsData`) and sets keys to values defined in data sources above. i.e.

`issueAreaData = {
  overview: /* data from overview-data.js */,
  internationalCooperation: /* data from international-cooperation.js */,
  ... etc ...
  }`

That said, this does represent an opportunity to improve site efficiency: within the context of a single issue area page the other pages' data is not necessary. Alternatively, a single-page app could be built without too much of an architectural redesign, making for a smoother user experience but perhaps sacrificing SEO optimization.

8 `issueArea` or `region` global string variable:

This page-specific global variable is set so appropriate data is accessed by the page. This variable employs the camel case convention for multi-word titles (i.e. `illicitTrade`).

9 Google Fonts

10 `jquery.js`:

The jQuery library is loaded, used in custom scripts and for Bootstrap.

11 `bootstrap.js`:

Javascriptm, part of the Bootstrap framework.

12 `modal-video.js`:

The library enabling modal video functionality.

13 `main.js`:

The `main.js` file both defines many of the variables and functions that the interactive interface relies on and executes the sequence of events (defined in the `loadIA()` and `loadRegions()` functions) that dynamically builds the interface on page load. The code also sets many event listeners on site elements.


## `main.js`: Key functions and variables:

1 Define global variables and helper functions:

`includedCountries` - an array of ISO3 codes for each country included in this version of the Stable Seas report.

Colors:

`colorBrew` - an array of 20 colors, defined in d3.schemeCategory20.

` iaColorSelection` - the hex color assigned to that particular issue area (or region)

` themeColor()` - a function that returns a  hex or rgb code for the color lying on a specific point on the color ramp from white (0) to iaColorSelection (1). Uses d3.interpolateLab

`rampColor()` - a function that returns a hex or rgb value corresponding to a certain point on a color ramp. This is used to create the continuous ramp in the legend and called by `choropleth()` to color each EEZ with the color corresponding to that point - between 0 and 1 - on the ramp.

`ssiValues` - an object literal that holds float values for each country's score 

### `loadIA()` / `loadRegions()`

These functions both execute a series of statements and return promises, to ensure that subsequent code is not executed until dependent data and DOM elements have loaded or been created. They accept two parameters - the global variable `issueAreaData` (or `regionsData`) object literal (defined in `main-data.js`) and an


## #

- /js/modal-video.js -

# Data sources

- /data/main-data.js
- /data/{issue area}/{issue area}-data.js
- /data/regions-data.js
- /data/{issue area}/{issue area}.csv
- Google Drive
