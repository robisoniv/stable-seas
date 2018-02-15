var piracyData = {
  // not prepped?
  metadata: { // Independent data source for each page
    version: '0.0.5',
    name: 'Piracy',
    updates: true,
    /*
         0.0.2:
           1 footnotes
           2 legends
           3 maps ready to go


         */
    index: 8,
    code: 'piracy',
    path: 'piracy',
    countryData: {},
    csv: '../../data/piracy/piracy.csv',
    color: '#B6782A',
    order: -1,
    description: 'Most maritime crime continues to be piracy and armed robbery. These acts endanger seafarers, threaten commerce, and fund criminal networks.'
  },
  load: function(csv, callback) {
    loadIAcsv(csv, callback);
    // We should probably also load incidents here instead of on card 0 ?
    d3.csv('../../data/piracy/piracy-incidents.csv', function(incidents) {
      incidents.forEach(function(d) {
        d.lat = +d.lat;
        d.lon = +d.lon;
      });

      var incidentsLayer = mapg.append('g')
        .classed('card-layer piracy-incidents card-1-layer card-2-layer ', true);

      incidentsLayer.selectAll('circle')
        .data(incidents).enter()
        .append('circle')
        .attr('cx', function(d) {
          return projection([d.lon, d.lat])[0];
        })
        .attr('cy', function(d) {
          return projection([d.lon, d.lat])[1];
        })
        .attr('class', function(d, i) {
          return 'a' + i
        })
        .classed('piracy-incident', true)
        .on('mousemove', function (d) {
          d3.select(this)
            .attr('opacity', 1)
            .attr('r', '4px');

          d3.select(this).moveToFront();
          var coords = d3.mouse(this);
          var y = d3.event.pageY,
            x = d3.event.pageX;
      //    console.log(d3.event);

          var tooltip = d3.select('div.tooltip');
          tooltip.style('left', (x + 20) + 'px')
            .style('top', (y - 20) + 'px')
            .classed('hidden', false)
            .classed('active', true)
            .style('text-align', 'left');

          tooltip.select('h1')
            .text(null);

          tooltip.select('.tooltip-body')
            .text(d.category);
        })
        .on('mouseleave', function () {
          d3.select(this)
            .transition().delay(2)
            .attr('opacity', 0.5)
            .attr('r', '3px');

          d3.select(this).moveToBack();

          d3.select('div.tooltip')
            .classed('hidden', true);

          d3.selectAll('.tooltip.active')
            .attr('style', null) // what did this just break??
            .classed('active', false);
        })
        .transition().delay(10)
        .attr('r', '3px')
        .attr('opacity', 0.5)
        .attr('fill', function(d) {
          //console.log(d.category);
          var i;
          switch (d.category.toLowerCase()) {
            case 'armed robbery':
              i = 1;
              break;
            case 'failed attack':
              i = 2;
              break;
            case 'failed boarding':
              i = 3;
              break;
            case 'hijack for cargo theft':
              i = 4;
              break;
            case 'kidnapping':
              i = 5;
              break;
            case 'robbery':
              i = 6;
              break;
            case 'suspicious activity':
              i = 7;
              break;
            case 'unarmed robbery':
              i = 8;
              break;
            default:
            //  console.log('error building piracy attack type:');
            //  console.log('[' + d.category + ']');
          }

        //  console.log('{' + d.category + '}', i);

          return d3.schemeCategory20[(i * 2)];
        })
        .attr('stroke', function(d) {
          var i;
          switch (d.category.toLowerCase()) {
            case 'armed robbery':
              i = 1;
              break;
            case 'failed attack':
              i = 2;
              break;
            case 'failed boarding':
              i = 3;
              break;
            case 'hijack for cargo theft':
              i = 4;
              break;
            case 'kidnapping':
              i = 5;
              break;
            case 'robbery':
              i = 6;
              break;
            case 'suspicious activity':
              i = 7;
              break;
            case 'unarmed robbery':
              i = 8;
              break;
            default:
              // console.log('error building piracy attack type:');
              // console.log('[' + d.category + ']');
          }
          return d3.schemeCategory20[(i * 2) + 1];
        });

    });
  },
  cards: [
    { // Card 0
      title: 'Piracy and Armed Robbery',
      menu: 'Piracy and Armed Robbery',
      metadata: {
        owner: 'Maisie Pigeon',
        description: 'Card will introduce the issue.'
      },
      map: {
        path: '../../data/piracy/piracy-incidents.csv',
        scale: [],
        classes: '',
        translate: [],
        tooltip: true,
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso].index;
          updatePointer(tooltipVal);
          return "Piracy and Armed Robbery:<br />" + tooltipVal + " / 100";

        },
        //    extent: [[27,-26],[94,30]],
        //  highlights: ,
        load: function(index, file) { // ### *** This only should be for the first card ...

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
          text: 'Piracy and Armed Robbery',
        },
        // {tag: 'indexTable'
        // },
        // { tag: 'caption',
        //   text: 'Note: scores are rounded to the nearest whole number.'
        // },
        {
          tag: 'caption',
          text: 'An evolving threat on both coasts'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Dots represent known piracy and armed robbery incidents in 2016. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
        },
        {
          tag: 'p',
          html: 'The threat of violence from non-state actors constitutes the clearest challenge to effective maritime governance and security. Though terrorism is a growing concern in some regions, the majority of violent maritime crime continues to be acts of piracy and armed robbery. These violent crimes endanger seafarers, threaten commerce, and can even fund violent political actors and transnational criminal networks.'
        },
        {
          tag: 'img',
          src: '../../assets/piracy/piracy_models-01.png',
        },
        {
          tag: 'h3',
          html: 'Kidnap for Ransom'
        },
        {
          tag: 'p',
          html: 'In kidnap-for-ransom attacks, perpetrators aim to capture a vessel and its crew and hold them— sometimes onshore—until a ransom payment is received. Historically, kidnap-for-ransom attacks are most closely associated with East African pirate groups, but a considerable increase in the number of these attacks was observed in West Africa in 2016.<sup>1</sup>'
        },
        {
          tag: 'p',
          html: 'Kidnapping for ransom entails less risk to the criminal groups than some of the other models of piracy and can result in substantial returns to the perpetrators. The rise in attacks of this kind is clearly a troubling development as kidnappings typically involve greater violence to the crews held hostage.'
        },
        {
          tag: 'p',
          html: 'Some regional variations of this model exist: in East Africa, pirate groups generally take the entire crew and their vessel hostage, whereas in West Africa, kidnappers tend to target high-ranking members of the crew, such as the captain or other officers. The durations of the kidnappings also vary; West African kidnappers normally only hold their hostages for a few weeks, though the victims are often subjected to considerable amounts of cruel treatment in that time.'
        },
        {
          tag: 'h3',
          html: 'Hijacking for Cargo Theft'
        },
        {
          tag: 'p',
          html: 'Hijacking for cargo theft entails perpetrators attacking a tanker and siphoning its oil while the crew is temporarily held captive onboard. Typically, the oil is then sold through black market channels. This form of piracy has been especially prevalent in the Gulf of Guinea.'
        },
        {
          tag: 'h3',
          html: 'Robberies'
        },
        {
          tag: 'p',
          html: 'Robberies occur when perpetrators steal ship stores, equipment, and personal effects from the crew. Robberies of this kind most often take place in port or at anchorage and differ from kidnappings in that profits come from the sale of stolen goods rather than the ransoming of a ship, its crew, or its cargo.'
        },
        {
          tag: 'p',
          html: 'As with other crimes perpetrated at sea, piracy and armed robbery are quite challenging to address. To date in West Africa, no prosecutions for piracy or armed robbery have occurred. This is further complicated by the fact that vast underreporting of this set of crimes is suspected because there are a multitude of disincentives to reporting, meaning that the full scope of the problem is not yet understood.'
        },
        {
          tag: 'links',
          items: [{
            org: '<sup>1</sup> Pigeon, Maisie et al., “State of Maritime Piracy 2016,” 3 May 2017,',
            url: 'http://oceansbeyondpiracy.org/reports/sop'
          }, ]
        }
      ] // end of els array
    }, // End of first element of cards object
    // { // Card 1
    //   title: 'Re-emergence in Somalia?',
    //   menu: 'Re-emergence in Somalia?',
    //   metadata: {
    //     owner: 'Maisie Pigeon',
    //     description: 'Feature Somali Waters report, talk about recent uptick in Somali piracy.'
    //   },
    //   map: {
    //     path: '../../data/piracy/piracy-2017-incidents.csv',
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     extent: [
    //       [43, -6],
    //       [68, 22]
    //     ],
    //     //  highlights: ,
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //
    //       d3.csv(file, function(incidents) {
    //         incidents.forEach(function(d) {
    //           d.lat = +d.lat;
    //           d.lon = +d.lon;
    //         });
    //
    //         var incidentsLayer = mapg.append('g')
    //           .classed('card-layer piracy-2017-incidents invisible ' + layer, true);
    //
    //         incidentsLayer.selectAll('circle')
    //           .data(incidents).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection([d.lon, d.lat])[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection([d.lon, d.lat])[1];
    //           })
    //           .attr('r', '1.5px')
    //           .attr('fill', function() {
    //             return rampColor(0.2);
    //           })
    //           .attr('stroke', function() {
    //             return rampColor(1);
    //           })
    //           .attr('class', function(d) {
    //             return 'a' + d.id
    //           })
    //           .classed('piracy-2017-incident', true);
    //
    //       });
    //     },
    //     switch: function(index) {
    //       d3.selectAll('.card' + index + '-layer')
    //         .classed('invisible', false);
    //     }
    //   },
    //   els: [
    //
    //     {
    //       tag: 'h1',
    //       text: 'Re-emergence in Somalia?'
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'An unusually active 2017'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>Vessels hijacked in 2017. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
    //     },
    //
    //     {
    //       tag: 'p',
    //       html: 'In response to the piracy threat, the international community spent billions of dollars to protect vessels transiting the High Risk Area in the Western Indian Ocean: a number of international navies deployed to the region, East African judicial systems absorbed much of the impact of piracy trials, and merchant vessels began to apply vessel self-protection measures, including re-routing around or increasing speeds through the High Risk Area.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/piracy/ITS_espero_escorts_aris-13.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR',
    //       caption: ' ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR'
    //     }, {
    //       tag: 'p',
    //       html: 'At its peak, piracy off the coast of Somalia posed a major threat to international shipping traffic transiting the Western Indian Ocean region. Between 2008 and 2012, thousands of seafarers and their vessels were taken hostage by pirate groups and held in miserable conditions, sometimes for years at a time.'
    //     },
    //
    //     // { tag: private <a href="http://oceansbeyondpiracy.org/sites/default/files/attachments/Privately_Contracted_Armed_Maritime_Security_IssuePaper.pdf" target="_blank"></a>
    //     //   html: 'With the decrease in acts of piracy against merchant vessels came an unexpected boost for the pirates: the international community’s perception of risk declined. Some naval mandates to address piracy were not renewed beyond 2016, removing naval forces from the region, and many vessels no longer employ vessel self-protection measures with the stringency observed during the peak of piracy, opening a window of opportunity for pirate groups. Our Piracy and Armed Robbery Scores, which show activity in the 2016 calendar year, reflect the final period before a sudden change.'
    //     // },
    //     {
    //       tag: 'p',
    //       html: 'In the spring of 2017, after almost five years without a successful attack on a merchant vessel, pirates hijacked <em>Aris-13</em> and its crew off the coast of Somalia and held them for three days. In the weeks that followed, pirate groups operating off the coast of Somalia hijacked four additional vessels.',
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Calling the incidents in the spring of 2017 a “re-emergence” is a bit of a misnomer. While no merchant vessels were hijacked between 2012 and 2017, pirate groups took a number of smaller, more vulnerable vessels, demonstrating their continued intention to hijack ships and their crews. Several fishing dhows and their crews were captured during this period, including <em>Siraj</em>, crewmembers of which remain in captivity two and a half years after their initial capture.',
    //     }
    //   ] // end of els array
    // },
    { // Card 1
      title: 'Three Models of Piracy',
      menu: 'Three Models of Piracy',
      metadata: {
        owner: 'Maisie Pigeon',
        description: 'Feature Somali Waters report, talk about recent uptick in Somali piracy.'
      },
      map: {
        path: '../../data/piracy/piracy-2017-incidents.csv',
        scale: [],
        classes: '',
        translate: [],
    //    extent: [
          // [43, -6],
          // [68, 22]
    //    ],
        //  highlights: ,
        load: function(index, file) { // ### *** This only should be for the first card ...
          var layer = 'card-' + index + '-layer';
          d3.select('.piracy-incidents')
            .classed(layer, true);
        },
        switch: function(index) {
          d3.selectAll('.card' + index + '-layer')
            .classed('invisible', false);
        }
      },
      els: [

        {
          tag: 'h1',
          text: 'Three Models of Piracy'
        },
        // {
        //   tag: 'caption',
        //   text: 'An unusually active 2017'
        // },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Vessels hijacked in 2017. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
        // },
        //
        // {
        //   tag: 'p',
        //   html: 'In response to the piracy threat, the international community spent billions of dollars to protect vessels transiting the High Risk Area in the Western Indian Ocean: a number of international navies deployed to the region, East African judicial systems absorbed much of the impact of piracy trials, and merchant vessels began to apply vessel self-protection measures, including re-routing around or increasing speeds through the High Risk Area.'
        // },
        // {
        //   tag: 'img',
        //   src: '../../assets/piracy/ITS_espero_escorts_aris-13.jpg', // This should be on the Stable Seas Deck - comments
        //   alt: 'ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR',
        //   caption: ' ITS Espero escorts Aris-13 after hijacking incident. Photo: EUNAVFOR'
        // }, {
        //   tag: 'p',
        //   html: 'At its peak, piracy off the coast of Somalia posed a major threat to international shipping traffic transiting the Western Indian Ocean region. Between 2008 and 2012, thousands of seafarers and their vessels were taken hostage by pirate groups and held in miserable conditions, sometimes for years at a time.'
        // },
        //
        // // { tag: private <a href="http://oceansbeyondpiracy.org/sites/default/files/attachments/Privately_Contracted_Armed_Maritime_Security_IssuePaper.pdf" target="_blank"></a>
        // //   html: 'With the decrease in acts of piracy against merchant vessels came an unexpected boost for the pirates: the international community’s perception of risk declined. Some naval mandates to address piracy were not renewed beyond 2016, removing naval forces from the region, and many vessels no longer employ vessel self-protection measures with the stringency observed during the peak of piracy, opening a window of opportunity for pirate groups. Our Piracy and Armed Robbery Scores, which show activity in the 2016 calendar year, reflect the final period before a sudden change.'
        // // },
        // {
        //   tag: 'p',
        //   html: 'In the spring of 2017, after almost five years without a successful attack on a merchant vessel, pirates hijacked <em>Aris-13</em> and its crew off the coast of Somalia and held them for three days. In the weeks that followed, pirate groups operating off the coast of Somalia hijacked four additional vessels.',
        // },
        // {
        //   tag: 'p',
        //   html: 'Calling the incidents in the spring of 2017 a “re-emergence” is a bit of a misnomer. While no merchant vessels were hijacked between 2012 and 2017, pirate groups took a number of smaller, more vulnerable vessels, demonstrating their continued intention to hijack ships and their crews. Several fishing dhows and their crews were captured during this period, including <em>Siraj</em>, crewmembers of which remain in captivity two and a half years after their initial capture.',
        // }
      ] // end of els array
    },
    // { // Card 2
    //   title: 'Counter-Piracy',
    //   menu: 'Counter-Piracy',
    //   metadata: {
    //     owner: 'Kelsey Soeth',
    //     description: 'Highlight international efforts to reduce piracy, but talk to Jay to avoid too much overlap.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     //  highlights: ,
    //     load: function(index, file) { // ### *** This only should be for the first card ...
    //       var layer = 'card-' + index + '-layer';
    //       d3.select('.card-eez-layer')
    //         .classed(layer, true);
    //       // Class loaded layer with card-0-layer to enable switch() method
    //
    //       //.classed(layer, true);
    //     },
    //     switch: function(index) {
    //       // d3.selectAll('.card' + index + '-layer')
    //       //   .classed('invisible', false);
    //
    //       // Need to review these highlights with Ben !!
    //       var highlights = ['SOM', 'DJI', 'SYC', 'KEN', 'MDG', 'TZA', 'MUS', 'COM', 'ZAF', 'MOZ', 'COG', 'COD', 'NGA', 'TGO', 'CMR', 'GHA', 'SLE', 'SEN', 'CIV', 'GAB', 'GIN', 'GNB', 'GNQ', 'BEN', 'LBR', 'GMB', 'AGO', 'NAM', 'CPV'];
    //
    //       highlights.forEach(function(iso3, i) {
    //         d3.selectAll('.eez.' + iso3)
    //           .classed('active', true)
    //           .transition().delay(10 * i)
    //           .style('stroke', rampColor(1));
    //
    //         d3.selectAll('.country.' + iso3)
    //           .classed('active', true)
    //           .transition().delay(10 * i)
    //           .style('fill', rampColor(0.5))
    //           .style('stroke', rampColor(1));
    //       })
    //     }
    //   },
    //
    //   els: [{
    //       tag: 'h1',
    //       text: 'Counter-Piracy',
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'International efforts to address piracy off Africa\’s coasts'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>Highlights represent sub-Saharan countries with ongoing maritime capacity-building projects. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The unanimous adoption of UN Security Council Resolution 1851 in 2008 resulted in the formation of the Contact Group on Piracy off the Coast of Somalia (CGPCS) to facilitate the discussion and coordination of actions among states and organizations to suppress Somali piracy. The resolution called for participants to cooperate in the fight against piracy and armed robbery at sea off the Somali coast by deploying naval vessels and seizing boats and arms used in the commission of attacks.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'More than 60 countries and organizations have joined the CGPCS, and their accomplishments include facilitation of the operational coordination of an unprecedented international naval effort from more than 30 countries; the creation of partnerships with the shipping industry to improve and promote Best Management Practices that merchant ships and crews can take to avoid, deter, delay, and counter pirate attacks; and the strengthening of regional capacity to counter piracy.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/piracy/Togolese_PM_Dussey_cgpcs.jpg',
    //       alt: 'Togolese Prime Minister Robert Dussey speaks at a CGPCS meeting. ###Ask Maisie for photo credit',
    //       caption: 'Togolese Prime Minister Robert Dussey speaks at a CGPCS meeting. Photo credit: Jérôme Michelet'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Another UN initiative, the United Nations Office on Drugs and Crime’s Maritime Crime Programme, supports a number of counter-piracy causes with a particular focus on the provision of a regional criminal justice response. The International Police Organization is also involved in counter-piracy efforts; the INTERPOL Maritime Piracy Task Force utilizes a three-pronged approach to countering maritime piracy through the improvement of evidence collection, facilitation of data exchange, and the provision of support for regional capabilities.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The EU has also become active by partnering with the UN on the Program to Promote Regional Maritime Security (MASE). Active from 2012 to 2018, the objective of MASE is to enhance maritime security in the eastern and southern Africa and Indian Ocean regions.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'In 2012, the EU launched EUCAP Nestor, a civilian mission which assisted host countries in the Horn of Africa with developing self-sustaining capacity for enhancement of maritime security. In 2015, EUCAP pivoted to focus on Somalia. Today, EUCAP Somalia contributes to establishing and building the capacity of maritime civilian law enforcement capabilities. The EU also launched the Critical Maritime Routes program in 2010 with two main objectives: to secure the sea lanes of communication and protect the economy of the EU.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The latest iteration of this initiative, CRIMARIO, goes beyond these initial objectives and aims to enhance maritime security and safety in the wider Indian Ocean region by supporting coastal countries in the establishment of maritime situational awareness, which is defined as the sharing and fusion of data from various maritime sources to achieve an understanding of the maritime domain in order to enable the improvement of maritime security and safety and the maritime environment.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/piracy/EUCAP_Nestor_Bosasso_port_police.jpg',
    //       alt: 'EUCAP Nestor working with Bosasso Port Police for logistical assistance. Photo: EUNAVFOR',
    //       caption: 'EUCAP Nestor working with Bosasso Port Police for logistical assistance. Photo: EUNAVFOR'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The EU’s support of maritime security in African waters extends to the Gulf of Guinea, where it supported the Critical Maritime Routes in the Gulf of Guinea project (CRIMGO). In 2016, the EU and several West African coastal countries launched the Gulf of Guinea Inter-regional Network (GoGIN) to replace CRIMGO. GoGIN aims to facilitate cooperation between the 19 Gulf of Guinea coastal countries from Senegal to Angola by setting up an effective and technically-efficient network for the exchange of information to improve and coordinate maritime security strategy in the region.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The international community has come together in a multitude of venues, from the UN Security Council to regional capacity-building programs, to combat piracy in the Horn of Africa and the Gulf of Guinea. Throughout the world, nations are working in tandem to counter threats to their maritime security in order to ensure safe passage on the high seas and foster economic development.'
    //     }
    //   ] // end of els array
    // },
    { // Card 2
      title: 'The Gulf of Guinea',
      menu: 'Gulf of Guinea',
      metadata: {
        owner: 'Kelsey Soeth',
        description: 'Track rise of piracy in GoG, feature State of Piracy report.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        extent: [
          [-20, -34],
          [46, 28]
        ],
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) { // ### *** This only should be for the first card ...
          var layer = 'card-' + index + '-layer';
          console.log('load load load', layer);

          d3.select('piracy-incidents')
            .classed(layer,true);
          // Load up point map GIS layer - geojson

          // Class loaded layer with layer to enable switch() method

          //.classed(layer, true);
        },
        switch: function(index) {

          d3.selectAll('.card' + index + '-layer')
            .classed('invisible', false);

        }
      },
      els: [{
          tag: 'h1',
          text: 'The New Hotspot',
        },
        {
          tag: 'caption',
          text: 'Piracy and Armed Robbery in the Gulf of Guinea'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Known piracy and armed robbery incidents during 2016. <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
        },
        {
          tag: 'p',
          html: 'Modern-day piracy burst into the public consciousness in the late 2000s when large merchant vessels were attacked off the coast of Somalia. The vessels and their crews were taken ashore and held for extended periods of time in deplorable conditions while their captors awaited enormous payoffs. In response, the international community banded together to counter the activity. Through multinational military deployments, the increasing prevalence of private armed security teams, and the implementation of Best Management Practices, piracy was gradually reduced to near-zero levels around the Horn of Africa. However, just as piracy dropped off in the Western Indian Ocean, it was exploding in the Gulf of Guinea.'
        },
        {
          tag: 'img',
          src: '../../assets/piracy/piracy_costs-01.png', // This should be on the Stable Seas Deck - comments
        },
        {
          tag: 'p',
          html: 'Oceans Beyond Piracy’s <em>2013 State of Maritime Piracy</em> report concluded that attacks in West Africa occurred at much higher frequency than in East Africa. There were 100 estimated attacks in the Gulf of Guinea in 2013 compared to 23 off the Somali coast. Furthermore, the attacks in West Africa were more violent than those in East Africa.<sup>2</sup>  This trend has continued. In 2016, 95 attacks were reported in the Gulf of Guinea compared to 27 attacks reported in the Horn of Africa. This difference is particularly significant in terms of the human cost. Nearly 1,400 more seafarers were subjected to attacks in the Gulf of Guinea than were attacked off the coast of Somalia.<sup>3</sup>  The Gulf of Guinea has the reputation of being the most dangerous area of transit in the world for seafarers.'
        },
        {
          tag: 'img',
          src: '../../assets/piracy/piracy_incidents_west_africa-01.png', // This should be on the Stable Seas Deck - comments
        },
        {
          tag: 'p',
          html: 'While the number of attacks has remained high in recent years, the model of piracy that is most commonly used has gradually shifted. The Niger Delta is home to an abundance of oil wealth, and criminal networks have historically turned to a piracy practice known as bunkering, or oil siphoning, for a cut of the region’s riches. Bunkering is time-consuming and logistically complex. It requires spending several days at sea and having a second vessel to carry the stolen oil.'
        },
        {
          tag: 'p',
          html: 'As oil prices declined and security efforts in the region stepped up, bunkering declined and kidnap-for-ransom attacks increased. In 2014, there were 5 incidents of bunkering and 15 kidnap-for-ransom attacks. By 2016, bunkering incidents had dropped by 80 percent while kidnap-for-ransom attacks rose by nearly 30 percent.'
        },
        {
          tag: 'p',
          html: 'In the Gulf of Guinea, the model of kidnap for ransom is less complicated than in the Horn of Africa; pirates tend to capture only high-value crew members and take them ashore, abandoning the vessel. The hostages are usually released after two to four weeks. While captured crew members spend relatively little time in captivity, the high turnover of hostages and the frequency of armed attacks results in a high level of violence.'
        },
        {
          tag: 'p',
          html: 'The international community has been tremendously successful in reducing piracy off the Somali coast, but piracy in the Gulf of Guinea is proving more difficult. Through actions formalized by UN Resolution 2446, Somali waters are patrolled by multiple international navies. The littoral states of the Gulf of Guinea are all sovereign nations with the rights to patrol their own territorial waters, but naval capacity is limited and no UN resolution exists for countering piracy there.'
        },
        {
          tag: 'p',
          html: 'Private armed security teams proved to be a powerful deterrent to Somali pirates, but these teams are prohibited by law from entering Nigeria’s territorial waters (where two-thirds of piracy attacks in the Gulf of Guinea occur). These challenges all contributed to the rise of piracy in the Gulf of Guinea, and they now contribute to the extraordinary difficulty of combating it.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>2</sup> Madsen, Jens Vestergard, et al. “State of Maritime Piracy 2013,” 8 May 2017,',
              url: 'http://oceansbeyondpiracy.org/sites/default/files/attachments/SoP2013-2PagerDigital_0.pdf'
            },
            {
              org: '<sup>3</sup> Pigeon, Maisie et al., “State of Maritime Piracy 2016,” 3 May 2017,',
              url: 'http://oceansbeyondpiracy.org/reports/sop'
            },
          ]
        }
      ] // end of els array
    },
    // { // Card 4
    //   title: 'Hijacking for Cargo Theft',
    //   menu: 'Hijacking for Cargo Theft',
    //   metadata: {
    //     owner: 'Kelsey Soeth',
    //     description: 'Focus mostly on Gulf of Guinea.'
    //   },
    //   map: {
    //     path: '../../data/piracy/bunkering-incidents.csv',
    //     scale: [],
    //     classes: '',
    //     extent: [
    //       [-12, -19],
    //       [50, 17]
    //     ],
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
    //       d3.csv(file, function(incidents) {
    //         incidents.forEach(function(d) {
    //           d.lat = +d.lat;
    //           d.lon = +d.lon;
    //         });
    //
    //         var incidentsLayer = mapg.append('g')
    //           .classed('card-layer bunkering-incidents invisible ' + layer, true);
    //
    //         incidentsLayer.selectAll('circle')
    //           .data(incidents).enter()
    //           .append('circle')
    //           .attr('cx', function(d) {
    //             return projection([d.lon, d.lat])[0];
    //           })
    //           .attr('cy', function(d) {
    //             return projection([d.lon, d.lat])[1];
    //           })
    //           .attr('r', '3px')
    //           .attr('fill', function() {
    //             return rampColor(0.2);
    //           })
    //           .attr('stroke', function() {
    //             return rampColor(1);
    //           })
    //           .classed('bunkering-incident', true);
    //
    //       });
    //
    //     },
    //     switch: function(index) {
    //       d3.selectAll('.card-' + index + '-layer')
    //         .classed('invisible', false);
    //     }
    //   },
    //
    //   els: [{
    //       tag: 'h1',
    //       text: 'Hijacking for Cargo Theft',
    //     },
    //     {
    //       tag: 'caption',
    //       html: 'Taking Advantage of Resource Wealth'
    //     },
    //     {
    //       tag: 'legend',
    //       text: 'Map Legend',
    //       legendContent: '<em>Known incidents of hijacking for cargo theft (2013-2016). <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'As global oil prices rose above $100 a barrel in the early 2000s, oil theft became a very lucrative business. In the Niger Delta, a region both marred by poverty and blessed by vast oil reserves. Though the oil boom has earned the Nigerian government billions of dollars since operations began in the 1980s, the riches have failed to trickle down to local communities. Furthermore, the environmental degradation caused by oil companies operating under corruption and weak government regulation has spoiled traditional industries such as farming and fishing. With those opportunities gone and unemployment persistently high, stealing crude oil is an attractive alternative.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/piracy/hijacking_oil_theft_model-01.png', // This should be on the Stable Seas Deck - comments
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Hydrocarbon theft takes many forms, from small-scale theft and illegal refining to theft at export terminals, as well as piracy and oil tanker hijackings.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'The Niger Delta’s swamps and shallow waters are crisscrossed in a grid-like pattern by oil pipelines linking the region’s 22 petroleum storage depots and 4 refineries.<sup>4</sup>  This infrastructure is most frequently targeted for theft by the tapping of oil pipelines or wellheads; much of it is hidden from inspectors as it takes place underwater. This method diverts a percentage of the oil flow, and the oil is then pumped onto waiting vessels. While approximately 25 percent of the stolen oil is refined in artisanal refineries and sold within the delta, 75 percent is transported to coastal tankers for export to the global market. “White collar” oil theft occurs at export terminals. Excess oil products beyond the amount licensed are transferred to tankers through manipulation of meters and forgery of bills of lading.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Hijacking for hydrocarbons occurs when a vessel is commandeered, its tracking devices are disabled, and its cargo is siphoned off onto a smaller ship in an isolated location and sold on the black market. This process can take days and the crew is often held captive for the duration. Since 2013, the number of attacks on oil tankers in the Gulf of Guinea has fallen drastically. This can be attributed to both the global drop in oil prices and the significantly increased naval activity in the region.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/piracy/oil_attacks_niger_delta.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'One of the armed militant groups attacking oil installations in the Niger Delta. Photo: Pius Utomi Ekpei/AFP/Getty Images',
    //       caption: 'One of the armed militant groups attacking oil installations in the Niger Delta. Photo: Pius Utomi Ekpei/AFP/Getty Images'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'A significant amount of oil theft in the delta can be attributed to regional rebel groups. Their stated goal is to force the foreign oil companies out in favor of turning control of oil operations over to local people. They are well-armed with machine guns, rocket launchers, and speedboats for attacks on offshore oil infrastructure. In 2016, successful attacks on high-value, strategic targets by rebel groups included Shell’s Forcados oil pipeline, Chevron’s Okan platform, and the largest export terminal in Nigeria, ExxonMobil’s Qua Iboe.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Continued low prices have discouraged the hijacking and bunkering of fuel tankers by reducing profits. Nigerian president Muhammadu Buhari has also made cracking down on oil theft a hallmark of his administration since 2015. In light of these factors, illicit networks have abandoned these activities in favor of kidnapping for ransom. However, as oil prices rise in 2017, pirate groups may return to the lucrative activities of bunkering and oil theft.'
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //         org: '<sup>4</sup> West Sands Advisory Intel, “Nigeria\'s Oil Theft Epidemic,” OilPrice.com, Oil Price, 6 June 2017,',
    //         url: 'http://oilprice.com/Energy/Crude-Oil/Nigerias-Oil-Theft-Epidemic.html'
    //       }, ]
    //     }
    //   ] // end of els array
    // },
    { // Card 5
      title: 'The Horn of Africa and the Bab el-Mandeb',
      menu: 'HOA & the Bab el-Mandeb',
      metadata: {
        owner: 'Maisie Pigeon',
        description: 'Be sensitive about how we describe emerging threats of terrorism in the Red Sea and Gulf of Aden.'
      },
      map: {
        scale: [],
        classes: '',
        path: '../../data/piracy/politically-motivated-incidents.csv',
        translate: [],
        extent: [
          [30, 8],
          [81, 6]
        ],
        //extent: [[45,24],[88,-15]],
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) { // ### *** This only should be for the first card ...
          var layer = 'card-' + index + '-layer';

          d3.csv(file, function(incidents) {
            incidents.forEach(function(d) {
              d.lat = +d.lat;
              d.lon = +d.lon;
            });

            var incidentsLayer = mapg.append('g')
              .classed('card-layer political-piracy-incidents invisible ' + layer, true);

            incidentsLayer.selectAll('circle')
              .data(incidents).enter()
              .append('circle')
              .attr('cx', function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr('cy', function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr('r', '0.5px')
              .attr('fill', function() {
                return rampColor(0.2);
              })
              .attr('stroke', function() {
                return rampColor(1);
              })
              .classed('political-incident', true);

          });
        },
        switch: function(index) {
          d3.selectAll('.card-' + index + '-layer')
            .classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          text: 'The Horn of Africa and the Bab el-Mandeb',
        },
        {
          tag: 'caption',
          text: 'vvv This all needs to be written / filled in vvv'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Politically motivated maritime security incidents (2016). <br> Source: <a href="http://obp.ngo/" target="_blank">Oceans Beyond Piracy</a></em>'
        },
        {
          tag: 'p',
          html: 'While the Horn of Africa is often associated with Somali pirates, observers have recently noted a different emerging threat: maritime terrorism. '
        },
        {
          tag: 'p',
          html: 'Attacks on five separate vessels in the Bab el-Mandeb strait in the last quarter of 2016 raised concerns over increasing maritime instability there. On 1 October, an anti-ship missile fired from shore inflicted damage on HSV-2 <em>Swift</em>, a high-speed vessel operated by the United Arab Emirates and previously owned by the U.S. military. Eight days later a similar incident targeted U.S. Navy-guided missile destroyer USS <em>Mason</em> in the first of three attacks against it; another attack against the <em>Mason</em> occurred later that day, and there was a final attack against it three days later.'
        },
        {
          tag: 'p',
          html: 'On 25 October, a small skiff loaded with explosives reportedly attacked <em>Galicia Spirit</em>. Saudi coalition forces reported responding to an attack against tanker vessel <em>Melati Satu</em> on 26 October. Finally, in December of 2016, an unconfirmed attack in the lower Red Sea against Iranian freighter MV <em>Joya 8</em> left six crewmembers missing and presumed dead.'
        },
        {
          tag: 'p',
          html: 'The trend continues into 2017; Oceans Beyond Piracy has recorded an increase in suspicious activity in the Bab el-Mandeb over the first half of the year, including sightings of naval mines and marine-borne improvised explosive devices.<sup>5</sup>'
        },
        {
          gif: true,
          tag: 'video',
          videoId: 'Dscw8gv4maY',
          thumb: '../../assets/piracy/bab-al-mandeb-attacks.gif'
        },
        {
          tag: 'caption',
          html: 'Note - this is not the correct video, just wanted to indicate functionality of the gif. Try clicking on it ;) ###'
        },
        {
          tag: 'p',
          html: 'The attack against HSV-2 <em>Swift</em> was claimed by Houthi rebels, but the majority of the incidents have gone unclaimed, despite most having originated from Houthi-held territory in Yemen. The attacks in the region are therefore most likely attributable to spillover from the conflict in Yemen. As discussed in the <em>Stable Seas: Somali Waters</em>  report, this has myriad implications for shipping traffic in the region.' //### add hyperlink to somali waters report
        },
        {
          tag: 'p',
          html: 'First, many naval operations deployed to address piracy are currently winding down or have ended already: EU NAVFOR’s Operation Atalanta was extended through the end of 2018, but NATO’s Operation Ocean Shield concluded its mission at the end of 2016<sup>6</sup> leaving limited naval forces in the area available for response. Complicating this further is the fact that the Combined Maritime Forces operations in the region are the only ones with a mandate that explicitly includes combating these evolving maritime terrorism threats.<sup>7</sup>'
        },
        {
          tag: 'p',
          html: 'Second, the response required to counter an attack of this nature differs considerably from the response necessary to protect a vessel from a pirate attack. Oceans Beyond Piracy asks if recommendations established to counter piracy in <em>Best Management Practices (Version 4)</em> need to be reevaluated to fit an evolving threat, and similarly, if private security teams require training to combat an array of risks in addition to piracy.<sup>8</sup>'
        },
        {
          tag: 'p',
          html: 'Finally, vessels may decide to re-route around the Bab el-Mandeb strait entirely in order to avoid any potential dangers—a decidedly expensive and difficult option for the shipping industry to take.'
        },
        {
          tag: 'p',
          html: 'The full extent to which these violent incidents might impact the international community has yet to be seen, but vessel traffic transiting the Gulf of Aden must continue to be vigilant.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>5</sup> NYA International, “Special Advisory: Naval mines and MBIEDs off Yemen,” 19 May 2017.',
              url: 'https://www.ukpandi.com/fileadmin/uploads/uk-pi/LP%20Documents/LP_Bulletins/170519_NYA_M_Special_Advisory_Yemen.pdf'
            },
            {
              org: '<sup>6</sup> North Atlantic Treaty Organization, “NATO Concludes Successful Counter-piracy Mission,” 15 December 2016.',
              url: 'http://www.nato.int/cps/en/natohq/news_139420.htm'
            },
            {
              org: '<sup>7</sup> Combined Maritime Forces, “About CMF,” accessed 31 August 2017.',
              url: 'https://combinedmaritimeforces.com/about/'
            },
            {
              org: '<sup>7</sup> Oceans Beyond Piracy, “Addressing Maritime Insecurity in the Horn of Africa: Can the Existing Counter-Piracy Framework Help Address the Evolving Maritime Threat?” Oceans Beyond Piracy Issue Paper, accessed 29 August 2017.',
              url: 'http://oceansbeyondpiracy.org/sites/default/files/attachments/Maritime_Insecurity_HornofAfrica_Issue_Paper.pdf'
            },
          ]
        }
      ] // end of els array
    },
    // {  // Card 6
    //   title: 'Methodology',
    //   menu: 'Methodology',
    //   metadata: {
    //     owner: 'Curtis Bell',
    //     description: 'Card will provide basic methodology info.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     highlights: [],
    //     load: function (index, file) {  // ### *** This only should be for the first card ...
    //       var layer = 'card-'+index+'-layer';
    //
    //       d3.selectAll('.card-eez-layer')
    //         .classed(layer, true);
    //
    //     },
    //     switch: function (index) {
    //       switchMainIndex(0);
    //     }
    //   },
    //   els: [
    // { tag: 'h1',
    //   text: 'Methodology',
    // },
    // { tag: 'p',
    //   html: 'The Piracy and Armed Robbery Score measures instances of these events within and around each country’s exclusive economic zone (EEZ). Our definition of piracy is that established by the United Nations Convention on the Law of Sea, as follows, and our definition of armed robbery is taken from that of the International Maritime Organization, as seen below.'
    // },
    // { tag: 'p',
    //   html: 'Piracy: “Any illegal acts of violence or detention, or any act of depredation, committed for private ends by the crew or the passengers of a private ship or a private aircraft, and directed:'
    // },
    // { tag: 'ul',
    //    rows: ['on the high seas, against another ship or aircraft, or against persons on property on board such ship or aircraft;', 'against a ship, aircraft, persons, or property in a place outside the jurisdiction of any state.”<sup>11</sup>']
    // },
    // { tag: 'p',
    //   html: 'Armed Robbery: “Unlawful act of violence or detention or any act of depredation, or threat thereof, other than an act of piracy, committed for private ends and directed against a ship or against persons or property on board such a ship, within a state’s internal waters, archipelagic waters and territorial sea.” '
    // },
    // { tag: 'p',
    //   html: 'Legally, then, these activities are very similar and are mainly distinguished by where they occur. Events occurring within the territorial waters of a state, typically within 12 nautical miles of the shoreline, are acts of armed robbery at sea. Incidents occurring farther from the coast, including those occurring within an EEZ, are acts of piracy at sea.',
    // },
    // { tag: 'p',
    //   html: 'The score includes two inputs. The first is the number of piracy and armed robbery incidents occurring within a state’s territorial waters or exclusive economic zone during the 2016 calendar year. We use data collected in the State of Piracy report, an annual evaluation of global piracy trends from Oceans Beyond Piracy. Using geographic information systems (GIS) methodology, we cross-reference the latitudes and longitudes of each qualifying incident with geographic shapefiles of each EEZ.'
    // },
    // { tag: 'p',
    //   html: 'States can still face a threat of piracy even if events are not occurring in their own waters. Many attacks occur against international vessels operating just beyond a state’s exclusive economic zone, so we also include a measure or proximity to piracy attacks.'
    // },
    // { tag: 'p',
    //   html: 'Using GIS, we calculate the minimum distance between every EEZ and every incident occurring around the African continent. Distances are measured as the minimum from the latitude and longitude of the incident to the closest border of the EEZ. Events occurring within an EEZ receive a distance score of 0. Then, we identify each country’s set of closest incidents and take the average distance of each incident in the set to the EEZ boundary. Closer events are given a higher score and we log-transform these distances so that more distant events have a much smaller influence on a state’s proximity-to-piracy score than events occurring very close to the EEZ. We measure distances in hundreds of kilometers and set a maximum distance of 1,000 kilometers, meaning anything occurring farther than that cannot count against a state’s proximity score.'
    // },
    // { tag: 'p',
    //   html: 'More technical details are provided in the data documentation available for download.'
    // }, // ### add link to data downloads page
    //
    //   ] // end of els array
    // }
  ] // end of cards array
};
