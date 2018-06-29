var issueAreaData = { // set variable to iaNameData in camel case
  metadata: {
    version: '', // A holder to indicate version - not really in use yet
    name: '', // Name of page
    index: 8, // Order
    code: '', // page title, camelcase (i.e. coastalWelfare)
    path: '', // page title, with dashes (i.e. coastal-welfare)
    countryData: {}, // holder object to take in page data
    csv: '', // relative path to page's csv data file
    color: '', // hex code for page's theme color
    description: '' // Description of page
  },
  load: function(csv, callback) {

    // This function should be called on every Issue Area page's load method -
    // this is how index data is loaded into
    // issueAreaData[issueArea].metadata.countryData
    loadIAcsv(csv, callback);

    // Custom code to be executed on page load goes here

  },
  cards: [
    { // Card 0
      title: '',
      menu: '', // Alternate text in case title (above) is too long
      metadata: {
        owner: '',
        description: ''
      },
      map: {
        type: 'continuous', // 'continuous', 'categorical' or 'boolean' -
          // conditional flag for choropleth() function to build appropriate map
        path: '', // relative path to map data. Often not used
        classes: '', // classes to be assigned to map layer
        tooltip: true, // boolean, whether or not to show tooltip on hover
        legend: '', // legend title text
        tooltipHTML: function(iso) {
          // This code is executed each time the tooltip is displayed (i.e. for each country)
          // The design pattern employed is:
          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['index']; // (replace 'index' with the target column header from the csv file)
          updatePointer(tooltipVal); // dynamically updates arrow on legend
          return "Piracy and Armed Robbery:<br />" + tooltipVal + " / 100"; // Displays this string inside tooltip - custom for each card

        },
        //    extent: [[27,-26],[94,30]], // this defines [[lower left], [upper right]] coordinates of map
        //  highlights: [], // array of strings - ISO3 codes for countries to highlight
        load: function(index, file) { // Card-specific code executed on page load

          // Usually classes relevant layer (often EEZ) with card layer class so it
          // is displayed when we switch to this card
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);

        },
        switch: function(index) {

          // On card switch, execute this code in addition to displaying the
          // target card and target map layers

          // Often call choropleth(), unless we aren't displaying that type of map
          choropleth(index, 1, 'index', false);

          // 'index' could be replaced with whichever data you're referring to

        }
      },
      els: [
        // Element objects go here in the proper order
      ]
    }
  ]
};
