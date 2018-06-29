# Stable Seas : Core System Documentation

- Site structure
  - Directory structure
- Functions and Variables
- The Load process
  - index.html
  - Which scripts in what order
- Dependent Libraries and Frameworks
- System security

## Site Structure

Broadly, the Stable Seas site is structured as two views of the data and maps based on the same template interface: "Issue Areas" and "Regions". This enables users to view findings through a substantive and geographic lens, respectively, depending on their interests. While these two sides of the site share much interactivity, in the development process they were broken into more-or-less separate sides with separate data sources and load scripts. This made development a bit easier but incurred some technical debt; it is recommended that in future iterations of the site both sides leverage one `main.js` file, for example, so updates to the code are reflected site-wide and don't have to be replicated on the other side.

The site's backend is a flat file system - development of a more sophisticated content management system was beyond the capability of the initial implementation team. Integration with a CMS such as Drupal could make content updates much easier, but will require a significant investment of time to replicate the existing interface and functionality; as such, it is not the team's priority.

### Directory Structure
*Cleaned of most specific filenames*

```
stableseas.org/
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
│   │   └── PDFs of different summaries
├── css
│   └── css files
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
│   └── rule-of-law
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
├── README.md (for the github)
├── TRANSITION.md (a transition plan)
└── stable-seas-executive-brief.html
```

The end user will only interact with the root directory (i.e. `https://stableseas.org/`, represented as `/`), as well as `/regions/{region}` and `/issue-areas/{issue area}` directories (and corresponding `index.html` files). Everything else is referenced using relative paths and loaded into the `index.html` pages referenced above.

There are plans to build user-facing pages at `stableseas.org/data/` but right now there is no outward facing page there.


### Anatomy of a page
*(True for issue areas and regions pages)*

- Nav header
  - Buttons to switch between Issue Areas and Regions sides of the site
  - Resources dropdown contains links to relevant OEF programs
- Nav ribbon enables navigation to different issue areas or regions, depending on which side of the site you're on
- Interactive map with interactive countries, tooltips when relevant, and geographic layers to visualize data
- Card menu to navigate between cards
- Cards display content including text, images, videos, charts etc.
- Footer with social links and the Project Lead's email
- Overview pages for both regions and issue areas display a modal overlay introducing the user  to the project.


## Functions and Variables

When the page is loaded on a desktop or laptop browser, a main javascript file is evaluated. During this evaluation functions are read into memory, global variables are set, and a series of functions are executed in succession to build and configure the page elements and set event listeners, to endow the interface with functionality.

This section will break down that load process and provide an overview of helper functions and variables set. It should be noted that unfortunately the code retains a lot of vestigial code - some commented out, some not. While this code does not serve a purpose, it is beyond the capacity of the development team and the present time to clean and reorganize it; it is recommended that a thorough refactoring take place, as well as that efforts be made to clean and organize the codebase.


### Assets

The following assets are loaded when the browser reads the `index.html` file loaded from each public-facing directory.

Again, note that the codebase was replicated and modified for the `stableseas.org/regions` pages, and that Regions pages load and execute `regions.js` rather than `main.js`. Functions, CSS selectors, etc on the regions side of the site replace `issue-area`, `issueArea` and `ia` with `region`.

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

Bootstrap's Javascript file, part of the Bootstrap framework.

12 `modal-video.js`:

The library enabling modal video functionality.

13 `main.js`:

The `main.js` file both defines many of the variables and functions that the interactive interface relies on and executes the sequence of events (defined in the `loadIA()` and `loadRegions()` functions) that dynamically builds the interface on page load. The code also sets many event listeners on site elements.


### `main.js` step by step:

1 Define global variables and helper functions:

`includedCountries` - an array of ISO3 codes for each country included in this version of the Stable Seas report.

Colors:

`colorBrew` - an array of 20 colors, defined in d3.schemeCategory20.

` iaColorSelection` - the hex color assigned to that particular issue area (or region)

` themeColor()` - a function that returns a  hex or rgb code for the color lying on a specific point on the color ramp from white (0) to iaColorSelection (1). Uses d3.interpolateLab

`rampColor()` - a function that returns a hex or rgb value corresponding to a certain point on a color ramp. This is used to create the continuous ramp in the legend and called by `choropleth()` to color each EEZ with the color corresponding to that point - between 0 and 1 - on the ramp.

`ssiValues` - an object literal that holds float values for each country's score

In addition, the Load Process calls a few crucial functions:


#### The Load process

##### `buildMap()`

Loads geographic data to be displayed in the `#map-svg` element included in each page's HTMl template. Furthermore, the function assigns the `<path>` elements representing different country or EEZ polygons with relevant attributes like `data-iso` (ISO country code), the `included` class (for countries included in the study), etc.

Additionally, the function binds event listeners to the elements created. These event listeners include code to display the appropriate tooltip and to highlight the country and EEZ with the appropriate color on `mouseenter`.

##### `loadIA()` / `loadRegions()`

These functions both execute a series of statements and return promises, to ensure that subsequent code is not executed until dependent data and DOM elements have loaded or been created. They accept two parameters - the global variable `issueAreaData` (or `regionsData`) object literal (defined in `main-data.js`) and the `activeCard`, which the page will load to display (defaulting to 0).

This function sets page-relevant data like the site title, builds the multicolored nav ribbon, loads page-specific numerical data and builds each card through a series of nested loops.  

##### `switchCard()`

This final function called in the load process loads the `activeCard`, displaying the card `<div>` and relevant map layers. This includes clearing out state-specific data bound to the DOM on the prior `switchCard()` invocation.

### Dependent Libraries and Frameworks

The Stable Seas web app relies on a number of open source libraries for page load and site interactivity. Most of these are part of the D3.js family (loaded as individual modules), as well as [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/). D3 modules - linked to documentation - used in the project include:

- [D3.js (v4)](https://github.com/d3)
  - [color](https://github.com/d3/d3-color)
  - [interpolate](https://github.com/d3/d3-interpolate)
  - [scale-chromatic](https://github.com/d3/d3-scale-chromatic)
[topojson.js](https://github.com/topojson/topojson)

It should be noted that the beta development team constrained itself to D3.js and jQuery as external; a much more sophisticated site could be built leveraging React, Angular or vue.js, p5.js, node.js, mongodb, wordpress or drupal, etc. If the project is extended it is advised that the software be redesigned and built on top of these helpful tools, as appropriate.


### System security

It is advised that the development team inheriting the site conduct a thorough security audit to ensure that all vulnerabilities are addressed.
