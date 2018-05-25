var coastalWelfareData = {
  metadata: {
    name: 'Coastal Welfare',
    version: '1.0.0',
    updates: true,
    /*
         here is where you write updates
         do one line per update, like
         added legend to card 3
         added citations to card 5
         input thumbnail path to card 4
         loaded point data

         */
    index: 5,
    code: 'coastalWelfare',
    path: 'coastal-welfare',
    countryData: {},
    csv: '../../data/coastal-welfare/coastalWelfare.csv',
    color: '#B89E42',
    order: -1,
    description: 'Maritime security is closely linked to the well-being of the people living in adjacent coastal areas.'
  },
  load: function(csv, callback) {
    loadIAcsv(csv, callback);
    // Add point to Conflict and Maritime Crime legend.
    var violenceLegend = d3.select('.legend.continuous')
      .append('g').classed('violent-incidents-legend invisible card-layer card-1-layer', true)
      .attr('transform', 'translate(10,-80)');

    violenceLegend.append('circle')
      .attr('r', '7px')
      .style('fill', '#255aa8');

    violenceLegend.append('text')
      .attr('transform', 'translate(20,5)')
      .attr('font-size', '18px')
      .html('Violent incident, <a target="_blank" class="svg-link" href="http://ucdp.uu.se/">UCDP Dataset</a>');
  },
  cards: [
    { // Card 0
      title: 'Coastal Welfare',
      menu: 'Coastal Welfare',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Overview of the sub-index.'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: 'card-eez-layer',
        path: '',
        translate: [],
        highlights: [],
        tooltip: true,
        legend: 'Coastal Welfare Score',
        tooltipHTML: function(iso3) {
          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso3].index;
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Coastal Welfare:<br />" + tooltipVal + " / 100";
        },
        load: function(index, file) {
          var layer = 'card-' + index + '-layer';
          var l = d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          // This works because we classed the layer with .card-0-layer
          choropleth(index, 1, 'index');
        }
      },
      els: [{
          tag: 'h1',
          text: 'Coastal Welfare',
        },
        {
          tag: 'caption',
          text: 'The primary driver of maritime insecurity'
        },
        {
          tag: 'p',
          html: 'Maritime security is closely linked to the well-being of the people living in adjacent coastal areas. When coastal residents suffer from violence and poverty on or near the coast, their close proximity to the sea may draw them toward illicit maritime activities like piracy, smuggling, and trafficking. Transnational criminal networks are especially likely to establish themselves along coastlines that are weakly governed and affected by <a class="internal-ref inline coastal-welfare" href="#" data-link="1">armed conflict and other forms of violence</a>. In Nigeria, Somalia, the Philippines and elsewhere, violent non-state actors operating on shore often turn to the maritime space to smuggle in <a class="illicit-trade inline" href="../illicit-trade">arms and illicit goods</a>.The coastal welfare score measures a population’s physical and economic security, both coastal and country-wide.'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/coastal-welfare-coin-cloud.png', // This should be on the Stable Seas Deck - comments
        },
        {
          tag: 'p',
          html: 'A high level of coastal welfare is closely linked to a well-developed blue economy, strong rule of law, low incidence of piracy and armed robbery, and a low level of maritime mixed migration.'
        },
        {
          tag: 'p',
          html: 'This section is divided into three parts. The first will discuss the links between conflict and physical insecurity and maritime crime. The second will explore the economic insecurity trap and how illicit maritime activities undermine coastal economies. The section concludes with a discussion of methodology.'
        },
        // Insert infographic here ###
        // { tag: 'p',
        //   html: 'For more information about how these scores are calculated, please see our <a class="internal-ref coastal-welfare inline" href="#" data-link="6">Methodology</a> page.'
        // }

      ] // end of els array

    },
    { // Card 1
      title: 'Conflict and Maritime Crime',
      menu: 'Conflict and Maritime Crime',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'How maritime crime funds violent non-state actors'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: '',
        translate: [],
        // extent: [
        //   [5, 20],
        //   [111, -41]
        // ],
        path: '../../data/coastal-welfare/lethal-incidents.csv',
        highlights: [],
        tooltip: true,
        legend: 'Physical Security Score',
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['physical_security'];
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Physical Security Score:<br />" + tooltipVal + " / 100";

        },
        load: function(index, file) {

          var layer = 'card-' + index + '-layer';
          d3.csv(file, function(vals) {
            vals.forEach(function(d) {
              d.lat = +d.lat;
              d.lon = +d.lon;
              d.deaths = +d.deaths;
            });

            var incidents = mapg.append('g')
              .classed('card-layer coastal-incidents invisible ' + layer, true);

            incidents.selectAll('circle')
              .data(vals)
              .enter()
              .append('circle')
              .attr('cx', function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr('cy', function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr('r', '2px')
              .attr('class', function(d) {
                return 'nationwide'
              });

          });

          classEEZ(layer);

          // Add legend item for violent incident

        },
        switch: function(index) {
          var layer = 'card-' + index + '-layer';
          d3.select('.' + layer)
            .classed('invisible', false)
            .classed('active', true);

          choropleth(index, 1, 'physical_security');


          // Reveal legend item for violent incident
        }
      },
      els: [{
          tag: 'h1',
          text: 'War and Maritime Crimes',
        },
        {
          tag: 'caption',
          text: 'Vicious cycles of violence and insecurity'
        },
        {
          tag: 'p',
          html: 'Sub-Saharan Africa is among the most war-torn regions of the world. In 2016, 10 of the 30 countries in the Stable Seas Maritime Security Index were affected by civil war. A total of 1,039 armed clashes occurred in these states; 256 incidents occurred within 50 kilometers of the coast and in the vicinity of key coastal towns, ports, and other critical maritime infrastructure.<sup>1</sup>'
        },
        {
          tag: 'p',
          html: 'Armed conflict and maritime crime are linked in a cycle that perpetuates violence and insecurity. Civil war and other physically violent conflicts facilitate and drive illicit maritime activities. Active conflict creates the conditions illicit networks need to flourish: low government penetration and weak control of insurgent territories, poor rule of law, proliferation of arms, and additional networks that can be tapped into to support illicit activities.'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/coastal_welfare_loop-01.png', // This should be on the Stable Seas Deck - comments
        },

        {
          tag: 'p',
          html: 'Moreover, war is a great market opportunity for illicit activities. Maritime arms trade and human smuggling are especially profitable in environments affected by civil war due to the demand for arms and the volume of refugees fleeing the violence.'
        },
        {
          tag: 'p',
          html: 'Conversely, criminal activities at sea facilitate violent conflict by funding insurgent campaigns.<sup>2</sup> For example, piracy and armed robbery attacks on commercial vessels are a lucrative strategy for financing militant groups in the Gulf of Guinea. Since 2008, the Movement for the Emancipation of the Niger Delta (MEND) has attacked oil infrastructure off the coast of Nigeria. These attacks prompted the government to come to the negotiation table but also financed the group’s continued existence through ransom payments and the sale of stolen oil on the black market.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>1</sup> Ralph Sundberg and Erik Melander, “Introducing the UCDP Georeferenced Event Dataset,” <em>Journal of Peace Research</em> 50, no.4 (2013): 523–532; Mihai Croicu and Ralph Sundberg, “UCDP GED Codebook version 17.1,” Department of Peace and Conflict Research, Uppsala University, 2017.',
              url: 'http://journals.sagepub.com/doi/abs/10.1177/0022343313484347?journalCode=jpra'
            },
            {
              org: '<sup>2</sup> Ursula Daxacker and Brandon C. Prins, “Financing Rebellion: Using Piracy to Explain and Predict Conflict Intensity in Africa and Southeast Asia,” <em>Journal of Peace Research</em> 54, no. 2 (2017): 215–230.',
              url: 'http://journals.sagepub.com/doi/abs/10.1177/0022343316683436'
            }
          ]
        }
        // How about internal references????? ###

      ] // end of els array
    },
    { // Card 2
      title: 'The Economic Insecurity Trap',
      menu: 'The Economic Insecurity Trap',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Feedback loop between crime and economic insecurity.'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: '',
        translate: [],
        path: '',
        highlights: [],
        tooltip: true,
        legend: 'Economic Security Score',
        tooltipHTML: function(iso3) {
          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso3].economic;
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);

          return "Economic Security Score:<br />" + tooltipVal + " / 100<br />";
        },
        load: function(index, file) {
          var layer = 'card-' + index + '-layer';
          var l = d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          choropleth(index, 1, 'economic');
        }
      },
      els: [{
          tag: 'h1',
          text: 'The Economic Insecurity Trap',
        },
        {
          tag: 'caption',
          text: 'How maritime crime hurts local economies'
        },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Lighter shades indicate greater artisanal fishing opportunities.<br />Source: <a href="http://www.oceanhealthindex.org/" target="_blank">Ocean Health Index</a></em>'
        // },
        {
          tag: 'p',
          html: 'Fisheries, tourism, and other maritime industries provide coastal populations with opportunities to thrive in the <a class="blue-economy inline" href="../blue-economy">legal maritime economy</a>.<sup>3</sup> When such opportunities diminish or are not available, workers are more likely to join criminal networks and to exploit maritime resources through illegal means.'
        },
        {
          tag: 'p',
          html: 'The relationship between recruitment for piracy and unemployment in fisheries is a striking example. Pirates recruit from local fishing communities, among other sectors, since fishers possess the navigational knowledge, skills, and resources that pirates need to execute their attacks. Stable and abundant income opportunities in the fishing sector keep people away from criminal activity, while poor fish catches can propel more people to join pirate networks.<sup>4</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/al_faxti_fishing.JPG',
          alt: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. ',
          caption: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. '
        },
        {
          tag: 'p',
          html: 'While poor coastal economic welfare enables maritime crimes, maritime crimes also disrupt local economies. Large injections of capital acquired through illicit means have effects similar to those of the “resource curse.”<sup>5</sup> Large illicit capital inflows, such as ransom payments, lead to inflation. Inflation in turn undermines local manufacturing industries and exports. The service industry booms, and imports grow. While advantageous in the short term, this effect undermines long-term development and fosters dependency on the illicit sectors.'
        },
        // {
        //   tag: 'blockquote',
        //   html: '"Ransom revenues appear to largely fuel investment in services, real estate, finance or criminal sectors. Little appears to go into pastoral or export sectors."',
        //   source: 'Authors Steven Oliver, Ryan Jablonski, and Justin V. Hastings<br />The Tortuga Disease<sup>4</sup>',
        //   link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959' // What about internal references?
        // },
        {
          tag: 'p',
          html: 'The result of these dynamics is a feedback loop between poor coastal welfare and illicit maritime activity. As the illicit maritime economy develops to the detriment of the legitimate economy, workers are increasingly drawn to participate in the illicit economy.'
        },
        // Insert graph of Change in export volumes ###
        // {
        //   tag: 'img',
        //   src: '../../assets/coastal-welfare/change_export_volumes.jpg',
        // },
        // {
        //   tag: 'p',
        //   html: 'As a result of the effects of ransom revenues on the economy, employment opportunities in manufacturing, agriculture, and other export industries decrease. As unemployment and poverty rise, people start seeing more opportunity in the illicit economy.'
        // },
        // {
        //   tag: 'p',
        //   html: 'One result of these dynamics is the inception of a feedback loop between poor coastal welfare and illicit maritime activity; the more maritime crime develops, the more it can take a toll on economic development. The more economic development stagnates, the more people are inclined to move into illicit activities and crimes.'
        // },
        {
          tag: 'links',
          items: [{
              org: '<sup>3</sup> Ryan Jablonski and Steven Oliver, “The Political Economy of Plunder: Economic Opportunity and Modern Piracy,” <em>Journal of Conflict Resolution</em> 57, no. 4 (2012): 682–708.',
              url: 'http://journals.sagepub.com/doi/abs/10.1177/0022002712448907?journalCode=jcrb'
            },
            {
              org: '<sup>4</sup> Mattias Fluckiger and Markus Ludwig, “Economic Shocks in the Fisheries Sector and Maritime Piracy,” <em>Journal of Development Economics</em> 114 (2015): 107–125.',
              url: 'https://www.sciencedirect.com/science/article/pii/S0304387814001552'
            },
            {
              org: '<sup>5</sup> Steven Oliver, Ryan Jablonski, and Justin V. Hastings, “The Tortuga Disease: The Perverse Effects of Illicit Foreign Capital,” <em>International Studies Quarterly<em> (forthcoming, 2017), accessed 28 August 2017,',
              url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959'
            }
          ]
        }
      ] // end of els array

    },
    { // Card 3
      title: 'Data and Methods',
      menu: 'Data and Methods',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Methods.'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: 'card-6-layer',
        translate: [],
        highlights: null,
        tooltip: true,
        legend: 'Coastal Welfare Score',
        tooltipHTML: function(iso3) {
          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso3].index;
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);

          return "Coastal Welfare:<br />" + tooltipVal + " / 100";
        },
        load: function(index, file) { // ### *** This only should be for the first card ...
          // Color EEZ according to master Stable Seas index
          var layer = 'card-' + index + '-layer';

          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          choropleth(index, 1, 'index');
        }
      },
      els: [{
          tag: 'h1',
          text: 'Data and Methods'
        },
        {
          tag: 'caption',
          text: 'How we created the Coastal Welfare score'
        },
        {
          tag: 'p',
          html: 'We conceptualize coastal welfare as a function of a population’s physical and economic security, both on the coast and in a country more generally. We calculate the Coastal Welfare Score with four equally weighted components:'
        },
        {
          tag: 'h4',
          text: 'Country-wide Physical Security'
        },
        {
          tag: 'p',
          html: 'We used two indicators to measure the Country-wide Physical Security Component: country-wide armed conflict events and homicide rates. The first indicator was derived from the Georeferenced Event Dataset (GED) produced by a joint initiative of the Uppsala Conflict Data Program (UCDP) and the Peace Research Institute of Oslo (PRIO).<sup>6</sup> The dataset includes geocoded information about specific lethal instances of armed conflict, such as battles between governments and rebels or uses of violence against civilians worldwide. Homicide rate is taken from the United Nations Office on Drugs and Crime (UNODC).'
        },
        {
          tag: 'h4',
          html: 'Coastal Physical Security'
        },
        {
          tag: 'p',
          html: 'To isolate armed conflict occurring near the coastline, we identified armed conflict events within 50 kilometers of a country’s coast using the same Georeferenced Event Dataset (GED) from UCDP.<sup>7</sup> The 256 qualifying events are spread across six countries: Somalia, Nigeria, Kenya, Angola, Mozambique, and Côte d’Ivoire.'
        },
        {
          tag: 'h4',
          html: 'Coastal Economic Security Component'
        },
        {
          tag: 'p',
          html: 'We use two indicators to measure coastal economic security. The first is the Artisanal Fishing Opportunities goal from the Ocean Health Index (OHI), which captures whether the demand for fishing opportunities is met on the coast in a lawful and sustainable manner.<sup>8</sup> The second is the Coastal Livelihoods and Economies measure from OHI. This score measures the relative economic-well being of coastal areas in comparisonE to the rest of the country. This score is weighted by the Human Development Index (HDI) produced by the United Nations Development Program (UNDP).'
        },
        {
          tag: 'h4',
          html: 'Country-wide Economic Security'
        },
        {
          tag: 'p',
          html: 'We measure country-wide economic security using two indicators: the Human Development Index (HDI) from the the UNDP and infant mortality data from the World Bank. The Human Development Index is perhaps the world’s most influential score of social well-being. The HDI seeks to capture well-being by looking at three key measures of economic and human development: life expectancy, education provision, and gross national income. Infant mortality is commonly viewed as one of the best single indicators of social welfare. To improve infant mortality rates, countries must invest in health care, transportation infrastructure, nutrition, and women’s education across all socioeconomic classes and social groups.<sup>9</sup>'
        },
        {
          tag: 'p',
          html: 'More details about all of these scores are available on our data page.'
        },

        {
          tag: 'links',
          items: [{
              org: '<sup>6</sup> Sundberg and Melander, “Introducing the UCDP Georeferenced Event Dataset."',
              url: 'http://journals.sagepub.com/doi/abs/10.1177/0022343313484347?journalCode=jpra'
            },
            {
              org: '<sup>7</sup> Ibid.'
            },
            {
              org: '<sup>8</sup> “Artisanal Fishing Opportunities,” the Ocean Health Index, accessed 1 September 2017,',
              url: 'http://www.oceanhealthindex.org/methodology/goals/artisanal-fishing-opportunities'
            },
            {
              org: '<sup>9</sup> The Women, Business, and the Law Project, “All Indicators,” the World Bank, accessed 1 September 2017,',
              url: 'http://wbl.worldbank.org/'
            }
          ], // How about internal references????? ###
        }

      ]
    } // End of seventh object in cards array
  ]
};
