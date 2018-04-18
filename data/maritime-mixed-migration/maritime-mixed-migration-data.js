var maritimeMixedMigrationData = {
  // not prepped?
  metadata: { // Independent data source for each page
    version: '0.0.2',
    name: 'Mixed Migration',
    updates: true,
    /*
         here is where you write updates
         do one line per update, like
         added legend to card 3
         added citations to card 5
         input thumbnail path to card 4
         loaded point data

         */
    index: 10,
    code: 'maritimeMixedMigration',
    path: 'maritime-mixed-migration',
    countryData: {},
    csv: '../../data/maritime-mixed-migration/maritimeMixedMigration.csv',
    color: '#896F33',
    order: -1,
    description: 'Migrants hoping for better economic opportunities are susceptible to being victims of crimes such as human trafficking, slavery, and the illicit sex trade.'
  },
  load: function(csv, callback) {
    loadIAcsv(csv, callback);
  },
  cards: [
    { // Card 0
      title: 'Maritime Mixed Migration',
      menu: 'Maritime Mixed Migration',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Card will introduce the section, define smuggling and trafficking.'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        highlights: [],
        tooltip: true,
        legend: 'Maritime Mixed Migration Score',
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['index'];
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Maritime Mixed Migration:<br />" + tooltipVal + " / 100";

        },
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, csv) { // ### *** This only should be for the first card ...
          // Class EEZ with card-0-layer to enable switch() method
          var layer = 'card-' + index + '-layer';
          classEEZ(layer);
        },
        switch: function(index) {
          // var target = 'card-' + index + '-layer';
          choropleth(index, 1, 'index');

          // var vals = issueAreaData[issueArea].metadata.countryData;
          //
          // vals.forEach(function(d, i) { // ### this is a misuse of D3! or is it?!
          //   d3.selectAll('.country.' + d.iso3)
          //     .classed('active', true)
          //     .transition().delay(i * 10)
          //     .style('fill', colorBrew[d.ia10c0][0])
          //     .style('stroke', colorBrew[d.ia10c0][1]);
          //   //   .style('fill', colorBrew[d.ia10c0][0])
          //   //  .style('stroke', colorBrew[d.ia10c0][1]);
          //
          //   d3.selectAll('.eez.' + d.iso3)
          //     .classed('active', true)
          //     .transition().delay(i * 10)
          //     .style('stroke', colorBrew[d.ia10c0][1]);
          //
          // });
          //
          // d3.select('.' + target)
          //   .classed('invisible', false);

        }
      },
      els: [{
          tag: 'h1',
          text: 'Maritime Mixed Migration',
        },
        {
          tag: 'caption',
          text: 'Trafficking and smuggling in persons'
        },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<div class="brew-10 legend-entries light">Tier 2</div><br /><div class="brew-30 legend-entries light">Tier 2 Watchlist</div><br /><div class="brew-20 legend-entries light">Tier 3</div><br /><div class="brew-40 legend-entries light">Special Case</div><br />Source: <a href="https://www.state.gov/j/tip/rls/tiprpt/2017/" target="_blank">2017 Trafficking in Persons Report, United States Department of State</a>'
        // },
        {
          tag: 'p',
          html: 'Experts in human security have long realized the complex and inseparable nature of activities like human smuggling, human trafficking, slavery, economic migration, asylum-seeking, and the global illicit sex trade. Individual migrants who leave their home countries for economic opportunities elsewhere may find themselves both voluntarily paying smugglers and involuntarily paying bribes and ransoms before they reach their destinations. Others will never arrive, and will instead endure long periods of forced labor or subjugation to sex traffickers. Some will see their families divided among transnational criminal networks that exploit vulnerable migrants.'
        },
        {
          tag: 'p',
          html: 'Following the lead of the International Organization for Migration, we describe these inter-related activities as <em>mixed migration</em>, and further describe the presence of these activities at sea and in ports as <em>maritime mixed migration.</em> '
        }, // ### Add hyperlink: <<link https://www.iom.int/files/live/sites/iom/files/Country/docs/Mixed-Migration-HOA.pdf>>
        // { tag: 'h3',
        //   text: 'The Maritime Mixed Migration Score'
        // },
        // {tag: 'indexTable'
        // },
        // { tag: 'caption',
        //   text: 'Note: scores are rounded to the nearest whole number.'
        // },
        {
          tag: 'p',
          html: 'This section focuses on the extent to which these activities occur at sea, with a special emphasis on issues like slavery in the fishing industry, the smuggling of economic migrants, child trafficking, and international efforts to address these issues. We also show how events in and around Africa, such as famine and war in Yemen, are changing routes and endangering migrants from across the region.'
        },
        // { tag: 'p',
        //    html: 'To learn more about how these scores are calculated, please visit our “Methodology” page.'
        // }
      ] // end of els array
    }, // End of first element of cards object
    { // Card 1
      title: 'Beyond the Med',
      menu: 'Beyond the Med',
      metadata: {
        owner: 'Emina Sadic',
        description: 'Overview of routes outside the Med.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) { // ### *** This only should be for the first card ...
          var layer = 'card-' + index + '-layer';

          var labels = [
            [-15.5, 29.2],
            [8.2, 4.88],
            [47.8, 12.6],
            [39, -18],
            [45, -9]
          ];

          var labelg = mapg.append('g')
            .classed('card-layer invisible ' + layer, true);

          labels.forEach(function(label, i) {
            labelg.append('rect')
              .attr('x', function() {
                return projection(label)[0];
              })
              .attr('y', function() {
                return projection(label)[1];
              })
              .classed('migration-label', true)
              .style('fill', function() {
                return colorBrew[(i * 2) + 1];
              })
              .style('cursor', 'pointer')
              .attr('data-num', (i + 1))
              .on('click', function() {
                var id = '.migration-route-' + d3.select(this).attr('data-num');
                var dist = $(id).offset().top;
                $(window).scrollTop(dist - 80);

                var header = d3.select(id);



                header.transition()
                  .duration(800)
                  //  .delay(400)
                  .style('background-color', function() {
                    return colorBrew[(i * 2)];

                  });

                header.transition()
                  .duration(500)
                  .delay(800)
                  .style('background-color', function() {
                    return colorBrew[((i + 1) * 2) - 1];

                  });
              });

            labelg.append('text')
              .attr('x', function() {
                return projection(label)[0] + 14;
              })
              .attr('y', function() {
                return projection(label)[1] + 29;
              })
              .style('fill', function() {
                return colorBrew[i][1];
              })
              .classed('migration-label-text', true)
              .text(i + 1)
              .style('pointer-events', 'none');

          });


          // Load up flow map GIS layer - geojson

          // Class loaded layer with card-0-layer to enable switch() method

          //.classed(layer, true);
        },
        switch: function(index) {
          d3.selectAll('.card' + index + '-layer')
            .classed('invisible', false);

          for (var i = 0; i < 5; i++) {
            var select = '.migration-route-' + (i + 1);
            d3.select(select)
              .style('background-color', function() {
                return colorBrew[(i * 2) + 1];
              });
          }
        }
      },
      els: [{
          tag: 'h1',
          text: 'Beyond the Med',
        },
        {
          tag: 'caption',
          text: 'Maritime economic migration occurs in every part of sub-Saharan Africa'
        },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Number squares correspond with the route descriptions offered below</em>'
        // },
        {
          tag: 'p',
          html: 'The surge in migrants leaving Africa for Europe has garnered global attention, but significant migration routes also surround sub-Saharan Africa, and these routes receive far less attention. This section highlights some of the major African migration routes beyond the Mediterranean Basin.'
        },


        {
          tag: 'h3',
          classes: 'migration-heading migration-route-1',
          text: '1 To the Canary Islands',
        },
        {
          tag: 'p',
          html: 'Nearly a decade ago, the West African route that links Senegal and Mauritania to the Spanish Canary Islands was frequently utilized for migrants smuggled in small wooden fishing boats. When its popularity peaked in 2006, nearly 32,000 migrants made the journey and an estimated 20 percent died in the attempt.<sup>1</sup> Increased patrolling efforts by Spain, Senegal, and Mauritania over the last decade have reduced the popularity of this route by 98 percent; in 2016, these countries identified just 671 known travelers.<sup>2</sup>'
        },
        {
          tag: 'h3',
          classes: 'migration-heading migration-route-2',
          text: '2 West Africa to Gabon',
        },
        {
          tag: 'p',
          html: 'While the majority of West African migrants travel north to the Mediterranean Sea, some turn south to seek work in oil-rich Gabon and Equatorial Guinea. Calabar, a port city in southeastern Nigeria, is a known launching point for those heading south to find work in oil hubs. As West African members of ECOWAS permit free movement between member states, an unknown number of economic migrants take this route from Benin, Burkina Faso, Mali, Nigeria, and elsewhere.'
        },
        {
          tag: 'h3',
          classes: 'migration-heading migration-route-3',
          text: '3 Somalia to Yemen, and Back',
        },
        {
          tag: 'p',
          html: 'Over 200,000 migrants from the Horn of Africa crossed the Red Sea or Gulf of Aden to reach Yemen over the last decade, but ongoing conflict and increasing travel costs have caused a sharp drop in the popularity of this route. The severity of Yemen’s ongoing humanitarian disaster and stronger labor laws around the Arabian Peninsula have instead generated a growing reverse flow back to the Horn of Africa. Since 2015, nearly 100,000 people are believed to have migrated to Africa from this war zone.'
        },
        {
          tag: 'h3',
          classes: 'migration-heading migration-route-4',
          text: '4 East Africa to South Africa',
        },
        {
          tag: 'p',
          html: 'South Africa receives around 15,000 migrants per year from the Horn of Africa.<sup>3</sup> They travel a maritime route that transits Kenya and Tanzania to arrive in Mozambique. From there, migrants travel over land to South Africa. Approximately 97 percent of the migrants on this route use smuggling networks.<sup>4</sup>'
        },
        {
          tag: 'h3',
          classes: 'migration-heading migration-route-5',
          text: '5 Comoros and Madagascar to Mayotte',
        },
        {
          tag: 'p',
          html: 'Each year, the French territorial island of Mayotte draws migrants from neighboring countries including Comoros and Madagascar. This draw increased when Mayotte became France’s 101<sup>st</sup> department in 2011. This new political status brought higher wages, higher standards of health and education, and the practice of birthright citizenship, which allows non-French citizens born in Mayotte to apply for citizenship upon attaining adulthood.<sup>5</sup> Migrants often travel by night in small overcrowded boats called <em>kwassa-kwassa</em>; this makes the risky journey even more perilous by increasing the risk of capsizing.'
        },
        {
          tag: 'img',
          src: '../../assets/maritime-mixed-migration/beyond_the_med_routes-01.png', // This should be on the Stable Seas Deck - comments
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>1</sup> Walter Kemp, “Learning from the Canaries: Lessons from the ‘Cayucos’ Crisis,” New York: International Peace Institute, May 2016, 3.'
            },
            {
              org: '<sup>2</sup> Jorgen Carling and Maria Hernandez-Carretero. “Protecting Europe and Protecting Migrants? Strategies for Managing Unauthorised Migration from Africa,” <em>British Journal of Politics and International Relations</em> 13 (2011): 43, doi:10.1111/j.1467-856X.2010.00438.x.'
            },
            {
              org: '<sup>3</sup> Bram Frouws and Christopher Horwood, “Smuggled South,” Regional Mixed Migration Secretariat, March 2017,2,',
              url: 'http://regionalmms.org/images/briefing/Smuggled_South.pdf'
            },
            {
              org: '<sup>4</sup> Frouws and Horwood, “Smuggled South,” 15.'
            },
            {
              org: '<sup>5</sup> Simon Massey, “A Hidden Catastrophe: Irregular Migration within the Comoros Archipelago,” in <em>Eurafrican Migration: Legal, Economic and Social Responses to Irregular Migration</em>, eds. Simon Massey and Rino Coluccello (London: Palgrave Pivot, 2015), 109.'
            }
          ]
        }
        //(http://www.aljazeera.com/programmes/aljazeeraworld/2016/02/island-death-160203115053532.html, documentary, boat scenes starting 22:42, 30:30)
      ] // end of els array
    },
    {
      title: "Slavery at Sea",
      menu: "Slavery at Sea",
      metadata: {
        "owner": "Alex Amling",
        "description": "Forced labor / fishing, Gulf of Guinea."
      },
      map: {
        type: 'boolean',
        scale: [],
        classes: "",
        translate: [],
        legend: 'Ratified the ILO Work in Fishing Convention of 2007',
        tooltip: true,
    //    "highlights": ['AGO', 'ZAF', 'COG'],
        tooltipHTML: function(iso) {
          var val = issueAreaData[issueArea].metadata.countryData[iso]['ilo-work-in-fishing'];
          if (val != 0) {
            return "Ratified ILO Work in Fishing Convention of 2007";
          } else {
            return "Has not ratified ILO Work in Fishing Convention of 2007";
          }
        },
        load: function (index, csv) {
          var layer = 'card-' + index + '-layer';
          classEEZ(layer);
        },
        switch: function (index) {
          choropleth(index, 1, 'ilo-work-in-fishing');
        }
      },
      "els": [{
          "tag": "h1",
          "text": "Slavery at Sea"
        },
        {
          "tag": "caption",
          "text": "Forced labor in marine fisheries"
        },
        {
          "tag": "legend",
          "text": "Map Legend",
          "legendContent": "<em>In sub-Saharan Africa, only Angola, Congo, and South Africa have ratified the International Labor Organization's Work in Fishing Convention of 2007 (No. 188)</em>"
        },
        {
          "tag": "p",
          "html": "Forced labor is a significant problem in the fishing industry in the Gulf of Guinea, where both adults and children can suffer severe physical abuse, starvation, and sickness due to labor exploitation.<sup>24</sup>  At the time of writing, there are no legal instruments in place that regulate living and working conditions on fishing vessels, making the fishing sector “particularly susceptible to human trafficking.”<sup>25</sup>"
        },
        {
          "tag": "p",
          "html": "In many cases, fishing vessels are registered in states that do not enforce international protocols and treaties on human smuggling and trafficking.<sup>26</sup>  Trafficking victims have no access to legal recourse, are stripped of identification documents, and are often stuck on fishing vessels against their will for prolonged periods of time.<sup>27</sup>"
        },
        {
          "tag": "p",
          "html": "The U.S. State Department’s 2017 <em>Trafficking in Persons Report</em> lists several countries where human trafficking is directly linked to the fishing industry. Among the listed countries, South Africa and Ghana stand out for different reasons.<sup>28</sup>"
        },
        {
          "tag": "p",
          "html": "In South Africa, young, mostly South and Southeast Asian men<sup>29</sup> are deceived by recruitment agencies specializing in the fishing industry.<sup>30</sup>  Once on board the fishing vessels, these men suffer from beatings and verbal abuse they cannot escape due to their isolation at sea.<sup>31</sup>"
        },
        {
          "tag": "p",
          "html": "In Ghana, traffickers exploit the traditional practice of leasing young boys to fishing boats, beating and denying food and education to children as young as six who have been knowingly turned over by their parents due to extreme poverty.<sup>32</sup>  The violence these boys are subjected to is especially heinous “because trafficked children [are] considered dispensable due to the poverty of their families and the ease of acquiring more children” to work.<sup>33</sup>  While pressure from the international community has led to significant changes in other industries that have relied predominantly on child labor and child trafficking (e.g., cocoa), legislation is non-existent for boys in the artisanal fishing industry on Lake Volta.<sup>34</sup>"
        },
        {
          "tag": "img",
          "src": "../assets/maritime-mixed-migration/fishing_vessel_illegal_ghana.jpg",
          "alt": "U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng.",
          "caption": "U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng."
        },
        {
          "tag": "p",
          "html": "In both artisanal inland and sea-based fishing, it remains unclear to what extent human trafficking for forced labor as a cost-saving feature influences the pricing of fish.<sup>35</sup>  What is clear, however, is the fact that human trafficking networks thrive where there is high demand for cheap labor and poor enforcement of labor protections.<sup>36</sup> "
        },
        {
          "tag": "links",
          "items": [{
              "org": "<sup>24</sup> International Labour Organization, <em>Caught at Sea: Forced Labour and Trafficking in Fisheries</em> (Geneva, Switzerland: ILO, 2013),",
              "url": "http://www.ilo.org/wcmsp5/groups/public/---ed_norm/---declaration/documents/publication/wcms_214472.pdf"
            },
            {
              "org": "<sup>25</sup> Interpol, <em>Study on Fisheries Crime in the West African Coastal Region</em> (Lyon, France: Interpol Environmental Security Sub-Directorate, 2014),",
              "url": "http://globalinitiative.net/wp-content/uploads/2017/01/interpol-illegal-fishing-study.pdf"
            },
            {
              "org": "<sup>26</sup> United Nations Office on Drugs and Crime, <em>Transnational Organized Crime in the Fishing Industry – Focus on: Trafficking in Persons, Smuggling of Migrants, Illicit Drugs Trafficking</em> (Vienna, Austria: United Nations, 2011),",
              "url": "https://www.unodc.org/documents/human-trafficking/Issue_Paper_-_TOC_in_the_Fishing_Industry.pdf"
            },
            {
              "org": "<sup>27</sup> Ibid."
            },
            {
              "org": "<sup>28</sup> U.S. Department of State, <em>Trafficking in Persons Report</em> (Washington, D.C.: U.S Department of State, June 2017),",
              "url": "https://www.state.gov/documents/organization/271339.pdf"
            },
            {
              "org": "<sup>29</sup> Melanie Gosling, “’Slave Ships’ Seized off Cape Coast,” <em>Independent Online</em>, 24 January 2014,",
              "url": "https://www.iol.co.za/news/south-africa/western-cape/slave-ships-seized-off-cape-coast-1636266"
            },
            {
              "org": "<sup>30</sup> Seafish, <em>Seafish Ethics Profile: South Africa</em> (Grimsby, UK: Seafish Industry Authority, 2015),",
              "url": "http://www.seafish.org/media/publications/SouthAfricaEthicsProfile_201509.pdf"
            },
            {
              "org": "<sup>31</sup> Rebecca Surtees, <em>In African Waters: The Trafficking of Cambodian Fishers in South Africa</em> (Geneva, Switzerland and Washington, D.C.: IOM and Nexus Institute, 2014),",
              "url": "http://un-act.org/publication/view/in-african-waters-the-trafficking-of-cambodian-fishers-in-south-africa/"
            },
            {
              "org": "<sup>32</sup> Sharon LaFraniere, “Africa’s World of Forced Labor, in a 6-Year-Old’s Eyes,” <em>The New York Times</em>, 29 October 2006,",
              "url": " http://www.nytimes.com/2006/10/29/world/africa/29ghana.html"
            },
            {
              "org": "<sup>33</sup> Kirsten Singleton, Katrina B. Stone, and Julie Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana: A Mixed Methods Assessment</em> (Washington, D.C.: International Justice Mission, 2016),",
              "url": "https://www.ijm.org/sites/default/files/resources/ijm-ghana-report.pdf"
            },
            {
              "org": "<sup>34</sup> Ibid."
            },
            {
              "org": "<sup>35</sup> International Labour Organization, <em>Caught at Sea</em>; Singleton, Stone, and Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana</em>."
            },
            {
              "org": "<sup>36</sup> Christopher Horwood, <em>In Pursuit of the Southern Dream: Victims of Necessity: Assessment of the Irregular Movement of Men from East Africa and the Horn to South Africa</em> (Geneva, Switzerland: International Organization for Migration, 2009),",
              "url": "http://publications.iom.int/system/files/pdf/iomresearchassessment.pdf"
            }
          ]
        }
      ]
    },
    // { // Card 2
    //   title: 'Across the Gulf of Aden',
    //   menu: 'Across the Gulf of Aden',
    //   metadata: {
    //     owner: 'Alex Amling',
    //     description: 'How conflict affects things in the horn of Africa, includes a Somali Waters plug.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     path: '../../data/maritime-mixed-migration/gulf-of-aden-routes.csv',
    //     extent: [
    //       [42, 3],
    //       [60, 20]
    //     ],
    //     highlights: [],
    //     tooltip: true,
    //     units: {
    //       text: 'xo units',
    //       multiplier: 100
    //     },
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //
    //       d3.csv(file, function(vals) {
    //         vals.forEach(function(d) {
    //           d.lat = +d.lat;
    //           d.lon = +d.lon;
    //         });
    //
    //         var aden = mapg.append('g')
    //           .classed('card-layer invisible ' + layer, true);
    //
    //         aden.selectAll('circle')
    //           .data(vals).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection([d.lon, d.lat])[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection([d.lon, d.lat])[1];
    //           })
    //           .attr('r', '1px')
    //           .style('fill', function(d) {
    //             if (d.class == 'southerly') {
    //               return colorBrew[1][1];
    //             } else if (d.class == 'northerly') {
    //               return colorBrew[2][1];
    //             }
    //           })
    //           .attr('class', function(d) {
    //             return d.class;
    //           });
    //
    //       });
    //
    //     },
    //     switch: function(index) {
    //       d3.selectAll('.card' + index + '-layer')
    //         .classed('invisible', false);
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Across the Gulf of Aden',
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'How migration in conflict zones fuels humanitarian crises'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>Green dots represent southbound trafficking routes. <br />Red dots represent northbound trafficking routes.</em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Violence and political instability around the Gulf of Aden are driving migration patterns in some unexpected ways. Many migrants begin their journeys to escape conflict, but many also find themselves in conflict zones as they seek out established smuggling networks that can facilitate maritime passage. In this way, political violence both repels and attracts migrants. This is apparent near the Gulf of Aden.'
    //     },
    //     {
    //       gif: true,
    //       tag: 'video',
    //       videoId: 'bRm4-RUi42M',
    //       thumb: '../../assets/maritime-mixed-migration/migration-gulf-of-aden.gif' // ###
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Smuggling and trafficking networks thrive where poor governance and weak border controls ease transnational travel. These conditions, the 2017 <a href="http://oefresearch.org/publications/stable-seas-somali-waters" target="_blank">Stable Seas: Somali Waters</a> report found, have made Djibouti and the northern Somali coastline preferred points of transit for migrants trying to reach the Arabian Peninsula. However, the route is dynamic, changing in response to violence, humanitarian crises, economic opportunity, and even drought.'
    //     },
    //
    //     {
    //       tag: 'p',
    //       html: 'Obock, Djibouti, was the central hub for African migrants heading for the Arabian Peninsula until 2014, but changing conditions shifted some traffic eastward toward northern Somalia around that time. These changes included recurrent incidents of violence against migrants in Obock, a growing reverse flow of migrants from the Arabian Peninsula to the Somali coast, and, of course, the outbreak of a major civil war in Yemen.<sup>6</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The best available statistics on Gulf of Aden migration indicate that the flow of migrants into Yemen dropped briefly at the beginning of the war, but increased slightly again thereafter. Pervasive violence complicates the task of counting migrants, but the best information available suggests the long drought is hindering migration once again. Smuggling and trafficking networks are in place, but many in the Horn of Africa can no longer afford the fee to cross the Gulf of Aden.<sup>7</sup>' //### JPS Video will go here
    //     },
    //     {
    //       tag: 'p',
    //       html: 'While weak maritime enforcement capacity<sup>8</sup> supports smuggling and trafficking, it increases the vulnerabilities of migrants at the same time. Violence against maritime migrants, including murder, sexual violence, and forced evacuations of boats far from any shore, is common.<sup>9</sup> Even when migrants and asylum-seekers make it to Yemen, they remain physically and economically insecure. Migrants must face the perils of being in a war-torn country that is suffering from severe drought and a new cholera epidemic. The lawlessness of the area also facilitates extortion, kidnapping, smuggling, forced labor, and sex trafficking.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Migration will occur so long as the potential economic gains outweigh the expense and danger of the journey, so making real progress against this problem will require a very broad strategy that addresses these core motivations. Otherwise, as seen around the Gulf of Aden, migrants will shift routes and smuggling networks will quickly reestablish themselves to accommodate—and exploit—these vulnerable travelers.'
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>6</sup> “Regional Mixed Migration in the Horn of Africa and Yemen in 2012: 1st Quarter Trend Summary and Analysis,” Regional Mixed Migration Secretariat, accessed 11 September 2017,',
    //           url: 'http://www.regionalmms.org/trends/RMMS%20Mixed%20Migration%20Trends%20Q1%202012.pdf'
    //         },
    //         {
    //           org: '<sup>6</sup> “Ethiopia Country Profile,” Regional Mixed Migration Secretariat,  accessed 11 September 2017.',
    //           url: 'http://www.regionalmms.org/images/CountryProfile/Ethiopia/EthiopiaCountryProfile.pdf'
    //         }, // this uses the same citation number (6) twice - is that ok? ###
    //         {
    //           org: '<sup>7</sup> “Regional Mixed Migration in East Africa and Yemen in 2017: 1st Quarter Trend Summary and Analysis,” Regional Mixed Migration Secretariat, accessed 21 August 2017,',
    //           url: 'http://regionalmms.org/trends/RMMS%20Mixed%20Migration%20Trends%20Q1%202017.pdf'
    //         },
    //         {
    //           org: '<sup>8</sup> Thean Potgieter and Reiner Pommerin, <em>Maritime Security in Southern African Waters</em> (Stellenbosch, South Africa: AFRICAN SUN MeDIA, 2009).'
    //         },
    //         {
    //           org: '<sup>9</sup> Christopher Horwood, “The Migration Compact: A Robust Triangle of Victims and Perpetrators,” Regional Mixed Migration Secretariat, 7 November 2016,',
    //           url: 'http://regionalmms.org/index.php/research-publications/feature-articles/item/55-the-migration-compact-a-robust-triangle-of-victims-and'
    //         }
    //       ]
    //     }
    //   ] // end of els array
    // },
    // { // Card 3
    //   title: 'Closing the Canaries',
    //   menu: 'Closing the Canaries',
    //   metadata: {
    //     owner: 'Emina Sadic',
    //     description: 'Efficacy of maritime patrols in closing route.'
    //   },
    //   map: {
    //     scale: [],
    //     path: '../../data/maritime-mixed-migration/ia10c3-migration-routes.json',
    //     classes: '',
    //     translate: [],
    //     extent: [
    //       [-30, -7],
    //       [70, 40]
    //     ],
    //     highlights: [],
    //     tooltip: true,
    //     units: {
    //       text: 'xo units',
    //       multiplier: 100
    //     },
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //
    //
    //
    //
    //       d3.json(file, function(error, vals) {
    //
    //         var canaryRoutes = mapg.append('g')
    //           .classed('canary-routes card-layer invisible ' + layer, true);
    //
    //         var guineaCanary = canaryRoutes.append('g')
    //           .classed('guinea-canary-route', true);
    //
    //         guineaCanary.selectAll('circle')
    //           .data(vals.guineaCanary).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection(d)[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection(d)[1];
    //           })
    //           .attr('r', '4px')
    //           .style('fill', function(d, i) {
    //             return rampColor(i / vals.guineaCanary.length);
    //           })
    //           .classed('guinea-canary', true)
    //           .on('mouseenter', function() {
    //             d3.selectAll('.guinea-canary.route-label')
    //               .classed('invisible', false);
    //           })
    //           .on('mouseleave', function() {
    //             d3.selectAll('.guinea-canary.route-label')
    //               .classed('invisible', true);
    //           });
    //
    //
    //         var mauritaniaCanary = canaryRoutes.append('g')
    //           .classed('mauritania-canary-route', true);
    //
    //         mauritaniaCanary.selectAll('circle')
    //           .data(vals.mauritaniaCanary).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection(d)[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection(d)[1];
    //           })
    //           .attr('r', '4px')
    //           .style('fill', function(d, i) {
    //             return rampColor(i / vals.mauritaniaCanary.length);
    //           })
    //           .classed('mauritania-canary', true)
    //           .on('mouseenter', function() {
    //             d3.selectAll('.mauritania-canary.route-label')
    //               .classed('invisible', false);
    //           })
    //           .on('mouseleave', function() {
    //             d3.selectAll('.mauritania-canary.route-label')
    //               .classed('invisible', true);
    //           });
    //
    //         var senegalCanary = canaryRoutes.append('g')
    //           .classed('senegal-canary-route', true);
    //
    //         senegalCanary.selectAll('circle')
    //           .data(vals.senegalCanary).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection(d)[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection(d)[1];
    //           })
    //           .attr('r', '4px')
    //           .style('fill', function(d, i) {
    //             return rampColor(i / vals.senegalCanary.length);
    //           })
    //           .classed('senegal-canary', true)
    //           .on('mouseenter', function() {
    //             d3.selectAll('.senegal-canary.route-label')
    //               .classed('invisible', false);
    //           })
    //           .on('mouseleave', function() {
    //             d3.selectAll('.senegal-canary.route-label')
    //               .classed('invisible', true);
    //           });
    //
    //
    //         var transSaharan = canaryRoutes.append('g')
    //           .classed('trans-saharan-canary-route', true);
    //
    //         transSaharan.selectAll('circle')
    //           .data(vals.transSaharan).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection(d)[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection(d)[1];
    //           })
    //           .attr('r', '4px')
    //           .style('fill', function(d, i) {
    //             return rampColor(i / vals.transSaharan.length);
    //           })
    //           .classed('trans-saharan', true)
    //           .on('mouseenter', function() {
    //             d3.selectAll('.trans-saharan.route-label')
    //               .classed('invisible', false);
    //           })
    //           .on('mouseleave', function() {
    //             d3.selectAll('.trans-saharan.route-label')
    //               .classed('invisible', true);
    //           });
    //
    //         var labels = [{
    //             title: 'Senegal-Canary Route',
    //             class: 'senegal-canary',
    //             coords: [-16.3, 15.76]
    //           },
    //           {
    //             title: 'Trans-Saharan Route',
    //             class: 'trans-saharan',
    //             coords: [0, 17.5]
    //           },
    //           {
    //             title: 'Mauritania-Canary Route',
    //             class: 'mauritania-canary',
    //             coords: [-16.2, 21.1]
    //           },
    //           {
    //             title: 'Guinea-Canary Route',
    //             class: 'guinea-canary',
    //             coords: [-15.2, 11.4]
    //           }
    //         ];
    //
    //         var routeLabels = mapg.append('g')
    //           .classed('route-labels', true);
    //
    //         routeLabels.selectAll('.route-label')
    //           .data(labels).enter()
    //           .append('text')
    //           .attr('x', function(d) {
    //             return projection(d.coords)[0];
    //           })
    //           .attr('y', function(d) {
    //             return projection(d.coords)[1];
    //           })
    //           .text(function(d) {
    //             return d.title
    //           })
    //           .attr('class', function(d) {
    //             return 'route-label invisible ' + d.class
    //           });
    //
    //       });
    //
    //       // Load up flow map GIS layer - geojson
    //
    //       // Class loaded layer with card-0-layer to enable switch() method
    //
    //       //.classed(layer, true);
    //     },
    //     switch: function(index) {
    //       d3.selectAll('.card' + index + '-layer')
    //         .classed('invisible', false);
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Closing the Canaries',
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'When one route is closed, migrants and smuggling networks often find others'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em> Shifting migration routes in West Africa. Markers are lighter near origin countries and grow darker as migrants near their intended destinations.</em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Not all routes to Europe cross the Mediterranean. In 2005, Spain revised immigration laws, granting amnesty to irregular migrants for a period of time. African migrants, believing they would be allowed to stay if they could only reach Spain, sought new routes to nearby Spanish holdings, including the exclaves of Ceuta and Melilla on the Moroccan coast. These are well-secured and far from West Africa,<sup>10</sup> so the “route of least resistance” went to Spain’s Canary Islands, which lie just 50 miles off Morocco’s Atlantic coast. However, journeys starting in Mauritania or Senegal must cover more than 300 miles.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/maritime-mixed-migration/migrants_canary_islands.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'Migrants arriving on the Spanish Canary Islands in 2004. Photo: Noborder Network',
    //       caption: 'Migrants arriving on the Spanish Canary Islands in 2004. Photo: Noborder Network'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Fewer than 5,000 people were smuggled to the Canary Islands by boat in 2005,<sup>11</sup>  but nearly 32,000 arrived in 2006. 6,000 more died while attempting the crossing.<sup>12</sup>  Nearly half of these migrants originated from Senegal, though significant numbers also came from The Gambia, Côte d’Ivoire, and Guinea-Bissau.<sup>13</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The bilateral African-European response to the crisis was to enhance security measures in the Atlantic. Hera II, the first operation coordinated by Frontex—the European Union’s border control agency—was launched in 2006 to surveil the waters of Mauritania, Senegal, and Cabo Verde; further patrols followed by subsequent agreements with The Gambia, Guinea-Bissau, and Guinea.<sup>14</sup>'
    //     },
    //     // ### document says:  [frontex chart…number of migrants reaching Canary Islands from West Africa] here
    //     {
    //       tag: 'p',
    //       html: 'While patrols successfully reduced the number of people attempting this particular crossing, they did not deter migrants overall. Instead, the routes have shifted.<sup>15</sup> Migrants from West Africa represented a large portion of those attempting the Central Mediterranean route in 2016. This shift exposes the shortcomings of using security forces to deter and intercept migrants relative to strategies aimed at addressing root causes of migration such as poverty, poor human rights, and pervasive unemployment.'
    //     },
    //     // ### [altai arrivals chart--pg 55, nationalities]. https://www.youtube.com/watch?v=KOXdY9YaapA
    //
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>10</sup> “Migrants in Morocco,” Doctors Without Borders, 8 September 2010,',
    //           url: 'www.doctorswithoutborders.org/news-stories/briefing-document/migrants-morocco'
    //         },
    //         {
    //           org: '<sup>11</sup> Dale Fuchs, “Canary Islands Fear Disaster as Number of Migrants Soars,” <em>The Guardian</em>, 3 September 2006,',
    //           url: 'www.theguardian.com/world/2006/sep/04/spain.mainsection'
    //         },
    //         {
    //           org: '<sup>12</sup> Carling and Carretero. “Protecting Europe and Protecting Migrants?” 43.'
    //         },
    //         {
    //           org: '<sup>13</sup> Kemp, “Learning from the Canaries,” 3.'
    //         },
    //         {
    //           org: '<sup>14</sup> Carling and Carretero, “Protecting Europe and Protecting Migrants?” 48.'
    //         },
    //         {
    //           org: '<sup>15</sup>   Carling and Carretero, “Protecting Europe and Protecting Migrants?” 49; Derek Lutterbeck, “Small Frontier Island: Malta and the Challenge of Irregular Immigration,” <em>Mediterranean Quarterly</em> 20, no. 1 (2009): 119–144, 123; Europa Press, “Frontex Justifica El Descenso De Inmigración Por Vía Marítima a Canarias En Un ‘Efecto Desplazamiento’ a Italia,” <em>Europa Press</em>, 30 July 2008.', // Is this right?
    //           url: 'http://www.europapress.es/nacional/noticia-frontex-justifica-descenso-inmigracion-via-maritima-canarias-efecto-desplazamiento-italia-20080730115309.html'
    //         },
    //       ]
    //     }
    //
    //   ] // end of els array
    // },
    // { // Card 4
    //   title: 'Minors for Sale',
    //   menu: 'Minors for Sale',
    //   metadata: {
    //     owner: 'Emina Sadic',
    //     description: 'Child trafficking.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     highlights: [],
    //     tooltip: true,
    //     units: {
    //       text: 'xo units',
    //       multiplier: 100
    //     },
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //
    //       d3.selectAll('.card-eez-layer')
    //         .classed(layer, true);
    //
    //     },
    //     switch: function(index) {
    //       //switchMainIndex(index);
    //
    //       var target = 'card-' + index + '-layer';
    //       var vals = issueAreaData[issueArea].metadata.countryData;
    //
    //       vals.forEach(function(val, i) {
    //         if (val.ia10c4 == 1) {
    //           d3.selectAll('.country.' + val.iso3)
    //             .classed('active', true)
    //             .transition().delay(10 * i)
    //             .style('fill', rampColor(0.5))
    //             .style('stroke', rampColor(1));
    //
    //           d3.selectAll('.eez.' + val.iso3)
    //             .classed('active', true)
    //             .transition().delay(i * 10)
    //             .style('stroke', rampColor(1));
    //           //  function () {
    //           //   return d3.interpolateLab('white', color)(0.5);
    //           // });
    //         }
    //       });
    //
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Minors for Sale',
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'How trafficking affects the most vulnerable victims'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>Highlighted countries have ratified the Optional Protocol to the Convention on the Rights of the Child on the Involvement of Children in Armed Conflict.</em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'UNICEF estimates that 24 percent of global trafficking victims are children, but for sub-Saharan Africa this estimate rises to 64 percent.<sup>16</sup>  Children are often vulnerable following negotiations to transport them for work, education, or formal training in another city or country. Their parents are sometimes aware of the circumstances involved. Additionally, porous borders and lax regulatory environments allow for trafficking of children to flourish.<sup>17</sup>'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/maritime-mixed-migration/Gabon_oil_economy_migrants.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: ' Port-Gentil in Gabon. Photo: Justin Tallis/AFP/Getty Images',
    //       caption: 'Port-Gentil in Gabon. Photo: Justin Tallis/AFP/Getty Images'
    //     },
    //
    //     {
    //       tag: 'p',
    //       html: 'In oil-rich Gabon and Equatorial Guinea, children are trafficked into the oil industry, domestic servitude, or the commercial sex trade.<sup>18</sup>  Many of these victims arrive by cramped boat from southern Nigeria. These migrations take several days and there is a high risk of boats capsizing.<sup>19</sup>  Due to limited monitoring services, few statistics are available to prove exactly how many children begin and complete this journey.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'In Gabon, girls are trafficked through middlepersons, including women called “aunties,” who facilitate opportunities for girls to work for wealthy African or European families.<sup>20</sup> The risks of sexual abuse and forced child labor are severe. Often, girls fleeing situations of forced domestic labor fall into prostitution and pedophilia networks.<sup>21</sup>  Young girls from neighboring countries also run the risk of becoming child brides in Gabon. Boys who come to Gabon seeking work can be lured into unpaid and unsafe jobs, or forced into street begging.<sup>22</sup>  Others are trafficked in the fishing sector, forced into dangerous jobs on the open sea.<sup>23</sup>'
    //       // insert video ### https://www.youtube.com/watch?v=QGEXAW4alBE
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>16</sup> Jan Beise, Anna Grojec, Claus Bech Hansen, Jens Matthes, Sarah Rosengaertner, and Danzhen You, “A Child is a Child: Protecting Children on the Move from Violence, Abuse and Exploitation,” UNICEF, May 2017, 36.',
    //           url: 'https://data.unicef.org/wpcontent/uploads/2017/05/UNICEF_A_child_is_a_child_May_2017_EN.pdf'
    //         },
    //         {
    //           org: '<sup>17</sup> “Borderline Slavery,” <em>Human Rights Watch</em>, 1 April 2003.',
    //           url: 'http://www.hrw.org/report/2003/04/01/borderline-slavery/child-trafficking-togo;'
    //         },
    //         {
    //           org: '<sup>17</sup> United Nations General Assembly, “Report of the Special Rapporteur on Trafficking in Persons, Especially Women and Children, Joy Ngozi Ezeilo,” United Nations Human Rights Council Twenty-Third Session A/HRC/23/48/Add.2, 24 May 2013, 3,',
    //           url: 'https://documents-dds-ny.un.org/doc/UNDOC/GEN/G13/139/70/PDF/G1313970.pdf?OpenElement'
    //         },
    //         {
    //           org: '<sup>18</sup> IRIN News, “Africa: High Cost of Child Trafficking,” <em>ReliefWeb</em>, 25 January 2012,',
    //           url: 'http://reliefweb.int/report/gabon/africa-high-cost-child-trafficking'
    //         },
    //         {
    //           org: '<sup>19</sup> “Borderline Slavery,” <em>Human Rights Watch</em>.'
    //         },
    //         {
    //           org: '<sup>20</sup> ### Need citation!! ###'
    //         },
    //         /// ###footnote missing in original copy-edited document.
    //         {
    //           org: '<sup>21</sup> Serge Rinkel, “Piracy and Maritime Crime in the Gulf of Guinea: Experience-Based Analyses of the Situation and Policy Recommendations,” Institute for Security Policy at Kiel University working paper 41, August 2015, 6.'
    //         },
    //         {
    //           org: '<sup>22</sup> Ibid.'
    //         },
    //         {
    //           org: '<sup>23</sup> “Trafficked Boys in Ghana Are Forced into Early Marriage,” <em>Deutsch Welle</em>, 2 May 2016.',
    //           url: 'www.dw.com/en/trafficked-boys-in-ghana-are-forced-into-early-marriage/a-19229198'
    //         },
    //
    //       ]
    //     }
    //   ] // end of els array
    // },
    // { // Card 5
    //   title: 'Slavery at Sea',
    //   menu: 'Slavery at Sea',
    //   metadata: {
    //     owner: 'Alex Amling',
    //     description: 'Forced labor / fishing, Gulf of Guinea.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     highlights: [],
    //     tooltip: true,
    //     units: {
    //       text: 'xo units',
    //       multiplier: 100
    //     },
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //
    //       d3.selectAll('.card-eez-layer')
    //         .classed(layer, true);
    //
    //     },
    //     switch: function(index) {
    //
    //       var target = 'card-' + index + '-layer';
    //       var vals = issueAreaData[issueArea].metadata.countryData;
    //
    //       vals.forEach(function(val, i) {
    //         if (val.ia10c5 == 1) {
    //           d3.selectAll('.country.' + val.iso3)
    //             .classed('active', true)
    //             .transition().delay(10 * i)
    //             .style('fill', rampColor(0.5))
    //             .style('stroke', rampColor(1));
    //
    //           d3.selectAll('.eez.' + val.iso3)
    //             .classed('active', true)
    //             .transition().delay(i * 10)
    //             .style('stroke', rampColor(1));
    //           //  function () {
    //           //   return d3.interpolateLab('white', color)(0.5);
    //           // });
    //         }
    //       });
    //
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Slavery at Sea',
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'Forced labor in marine fisheries'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>In sub-Saharan Africa, only Angola, Congo, and South Africa have ratified the International Labor Organization\'s Work in Fishing Convention of 2007 (No. 188)</em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Forced labor is a significant problem in the fishing industry in the Gulf of Guinea, where both adults and children can suffer severe physical abuse, starvation, and sickness due to labor exploitation.<sup>24</sup>  At the time of writing, there are no legal instruments in place that regulate living and working conditions on fishing vessels, making the fishing sector “particularly susceptible to human trafficking.”<sup>25</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'In many cases, fishing vessels are registered in states that do not enforce international protocols and treaties on human smuggling and trafficking.<sup>26</sup>  Trafficking victims have no access to legal recourse, are stripped of identification documents, and are often stuck on fishing vessels against their will for prolonged periods of time.<sup>27</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The U.S. State Department’s 2017 <em>Trafficking in Persons Report</em> lists several countries where human trafficking is directly linked to the fishing industry. Among the listed countries, South Africa and Ghana stand out for different reasons.<sup>28</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'In South Africa, young, mostly South and Southeast Asian men<sup>29</sup> are deceived by recruitment agencies specializing in the fishing industry.<sup>30</sup>  Once on board the fishing vessels, these men suffer from beatings and verbal abuse they cannot escape due to their isolation at sea.<sup>31</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'In Ghana, traffickers exploit the traditional practice of leasing young boys to fishing boats, beating and denying food and education to children as young as six who have been knowingly turned over by their parents due to extreme poverty.<sup>32</sup>  The violence these boys are subjected to is especially heinous “because trafficked children [are] considered dispensable due to the poverty of their families and the ease of acquiring more children” to work.<sup>33</sup>  While pressure from the international community has led to significant changes in other industries that have relied predominantly on child labor and child trafficking (e.g., cocoa), legislation is non-existent for boys in the artisanal fishing industry on Lake Volta.<sup>34</sup>'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/maritime-mixed-migration/fishing_vessel_illegal_ghana.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng.',
    //       caption: 'U.S. and Ghanaian law enforcement inspect a fishing vessel suspected of illicit activity. U.S. Navy photo by Kwabena Akuamoah-Boateng.'
    //     },
    //
    //     {
    //       tag: 'p',
    //       html: 'In both artisanal inland and sea-based fishing, it remains unclear to what extent human trafficking for forced labor as a cost-saving feature influences the pricing of fish.<sup>35</sup>  What is clear, however, is the fact that human trafficking networks thrive where there is high demand for cheap labor and poor enforcement of labor protections.<sup>36</sup> '
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>24</sup> International Labour Organization, <em>Caught at Sea: Forced Labour and Trafficking in Fisheries</em> (Geneva, Switzerland: ILO, 2013),',
    //           url: 'http://www.ilo.org/wcmsp5/groups/public/---ed_norm/---declaration/documents/publication/wcms_214472.pdf'
    //         },
    //         {
    //           org: '<sup>25</sup> Interpol, <em>Study on Fisheries Crime in the West African Coastal Region</em> (Lyon, France: Interpol Environmental Security Sub-Directorate, 2014),',
    //           url: 'http://globalinitiative.net/wp-content/uploads/2017/01/interpol-illegal-fishing-study.pdf'
    //         },
    //         {
    //           org: '<sup>26</sup> United Nations Office on Drugs and Crime, <em>Transnational Organized Crime in the Fishing Industry – Focus on: Trafficking in Persons, Smuggling of Migrants, Illicit Drugs Trafficking</em> (Vienna, Austria: United Nations, 2011),',
    //           url: 'https://www.unodc.org/documents/human-trafficking/Issue_Paper_-_TOC_in_the_Fishing_Industry.pdf'
    //         },
    //         {
    //           org: '<sup>27</sup> Ibid.'
    //         },
    //         {
    //           org: '<sup>28</sup> U.S. Department of State, <em>Trafficking in Persons Report</em> (Washington, D.C.: U.S Department of State, June 2017),',
    //           url: 'https://www.state.gov/documents/organization/271339.pdf'
    //         },
    //         {
    //           org: '<sup>29</sup> Melanie Gosling, “’Slave Ships’ Seized off Cape Coast,” <em>Independent Online</em>, 24 January 2014,',
    //           url: 'https://www.iol.co.za/news/south-africa/western-cape/slave-ships-seized-off-cape-coast-1636266'
    //         },
    //         {
    //           org: '<sup>30</sup> Seafish, <em>Seafish Ethics Profile: South Africa</em> (Grimsby, UK: Seafish Industry Authority, 2015),',
    //           url: 'http://www.seafish.org/media/publications/SouthAfricaEthicsProfile_201509.pdf'
    //         },
    //         {
    //           org: '<sup>31</sup> Rebecca Surtees, <em>In African Waters: The Trafficking of Cambodian Fishers in South Africa</em> (Geneva, Switzerland and Washington, D.C.: IOM and Nexus Institute, 2014),',
    //           url: 'http://un-act.org/publication/view/in-african-waters-the-trafficking-of-cambodian-fishers-in-south-africa/'
    //         },
    //         {
    //           org: '<sup>32</sup> Sharon LaFraniere, “Africa’s World of Forced Labor, in a 6-Year-Old’s Eyes,” <em>The New York Times</em>, 29 October 2006,',
    //           url: ' http://www.nytimes.com/2006/10/29/world/africa/29ghana.html'
    //         },
    //         {
    //           org: '<sup>33</sup> Kirsten Singleton, Katrina B. Stone, and Julie Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana: A Mixed Methods Assessment</em> (Washington, D.C.: International Justice Mission, 2016),',
    //           url: 'https://www.ijm.org/sites/default/files/resources/ijm-ghana-report.pdf'
    //         },
    //         {
    //           org: '<sup>34</sup> Ibid.'
    //         },
    //         {
    //           org: '<sup>35</sup> International Labour Organization, <em>Caught at Sea</em>; Singleton, Stone, and Stricker, <em>Child Trafficking into Forced Labor on Lake Volta, Ghana</em>.'
    //         },
    //         {
    //           org: '<sup>36</sup> Christopher Horwood, <em>In Pursuit of the Southern Dream: Victims of Necessity: Assessment of the Irregular Movement of Men from East Africa and the Horn to South Africa</em> (Geneva, Switzerland: International Organization for Migration, 2009),',
    //           url: 'http://publications.iom.int/system/files/pdf/iomresearchassessment.pdf'
    //         }
    //       ]
    //     }
    //   ] // end of els array
    // },
    { // Card 3
      title: 'Methodology',
      menu: 'Methodology',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Card will provide basic methodology info.'
      },
      map: {
        type: 'continuous',
        scale: [],
        classes: '',
        translate: [],
        highlights: [],
        tooltip: true,
        legend: 'Maritime Mixed Migration Score',
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['index'];
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Maritime Mixed Migration:<br />" + tooltipVal + " / 100";

        },
        load: function(index, file) { // ### *** This only should be for the first card ...
          var layer = 'card-' + index + '-layer';

          d3.selectAll('.card-eez-layer')
            .classed(layer, true);

        },
        switch: function(index) {
          choropleth(index, 1, 'index');
        }
      },
      els: [{
          tag: 'h1',
          text: 'Methodology',
        },
        {
          tag: 'p',
          html: 'Mixed migration is a complex and rapidly evolving topic, and this complexity complicates efforts to measure it even where some data on migration, trafficking, and human smuggling are available. Our effort to measure mixed migration focuses less on raw numbers of people involved in some aspect of mixed migration and more on the variety of activities known to occur in each country, the role of the sea in these activities, each country’s international and domestic legal effort, and a population’s baseline vulnerability to exploitation based on relevant socioeconomic factors.'
        },
        {
          tag: 'p',
          html: 'We adopt a definition of mixed migration from the International Organization for Migration, which uses the following:'
        },
        {
          tag: 'blockquote',
          html: '“The principal characteristics of mixed migration flows include the irregular nature of and the multiplicity of factors driving such movements, and the differentiated needs and profiles of the persons involved. Mixed flows have been defined as ‘complex population movements including refugees, asylum seekers, economic migrants and other migrants’. Unaccompanied minors, environmental migrants, smuggled persons, victims of trafficking and stranded migrants, among others, may also form part of a mixed flow.”<br /> <em>REFERENCE?? ###</em>'
        },
        {
          tag: 'p',
          html: 'We measure the Mixed Maritime Migration Score with four equally weighted components:'
        },
        {
          tag: 'h4',
          html: 'Maritime Trafficking'
        },
        {
          tag: 'p',
          html: 'Using sources like the US State Department Trafficking in Persons report, we score the severity and breadth of forced labor and sex trafficking across men, women, boys, and girls. We also identify countries used as major international “transit hubs” for smuggled and trafficked persons, and we then weight these scores according to whether such activities occur exclusively, predominantly, or rarely at sea.'
        },
        {
          tag: 'h4',
          html: 'Maritime Transit'
        },
        {
          tag: 'p',
          html: 'Whereas the Maritime Trafficking Score aims to capture the extent of trafficking at sea, the Maritime Transit Component focuses on the movement of people in the maritime space, rather than their exploitation. Many persons who are not being trafficked transit by sea as they pay smugglers to take them to their destinations. We approximate the extent of this kind of maritime transit by considering a country’s refugee rate, calculated from data from the United Nations High Commissioner on Refugees, and the relative prevalence of maritime routes vis-a-vis routes by land or air.'
        },

        {
          tag: 'h4',
          text: 'Legal Protections'
        },
        {
          tag: 'p',
          text: 'The legal protections portion of the score is comprised of an international agreements indicator and a domestic legislation indicator. The international portion of the score measures participation in seven agreements that are directly relevant to protecting migrants, children, and laborers from various forms of involuntary trafficking:'
        },
        {
          tag: 'ul',
          rows: ['Optional Protocol to the Convention on the Rights of the Child on the Sale of Children, Child Prostitution, and Child Pornography', 'Optional Protocol to the Convention on the Rights of the Child on the Involvement of Children in Armed Conflict', 'International Labor Organization Forced Labor Convention of 1930', 'International Labor Organization Abolition of Forced Labor Convention of 1957', 'International Labor Organization Worst Forms of Child Labor Convention of 1999', 'International Labor Organization Domestic Workers Convention of 2011', 'International Labor Organization Work in Fishing Convention of 2007'] // HTML or text?
        },
        {
          tag: 'p',
          text: 'The domestic portion of the score is adapted from the “3P Anti-trafficking Policy Index” by Seo-Young Cho. This index uses the Trafficking in Persons report to annually score a state’s legal efforts in the areas of prosecuting traffickers, protecting potential victims, and preventing trafficking networks.'
        },
        {
          tag: 'h4',
          text: 'Socioeconomic Vulnerability'
        },
        {
          tag: 'p',
          text: 'Finally, populations are more vulnerable to trafficking where political systems are ineffective, human capital is low, and socioeconomic conditions are poor. We operationalize a population’s vulnerability with two indicators: the primary-school completion rate as recorded by the World Bank, and the Vulnerability to Slavery score calculated by the Walk Free Foundation as part of its Global Slavery Index.'
        },

      ] // end of els array
    }
  ] // end of cards array
};
