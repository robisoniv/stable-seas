var coastalWelfareData = {
  metadata: { // Independent data source for each page
    name: 'Coastal Welfare',
    version: '0.0.2',
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
    var md = issueAreaData[issueArea].metadata;

    d3.csv(csv, function(vals) {
      vals.forEach(function(d) {
        //  d.ia5c0 = +d.ia5c0;
        d.ia5c1 = +d.ia5c1;
        d.ia5c4 = +d.ia5c4;
      });
      issueAreaData[issueArea].metadata.countryData = vals;
      callback('coastalWelfare load csv function callback');
    });

    d3.csv('../../data/' + md.path + '/indexValues.csv', function(vals) {

      issueAreaData[issueArea].metadata.indexData = vals;

    });
  },
  cards: [{ // Card 0
      title: 'Coastal Welfare',
      menu: 'Coastal Welfare',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Overview of the sub-index.'
      },
      map: {
        scale: [],
        classes: 'card-eez-layer',
        path: '',
        translate: [],
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {
          // var layer = 'card-'+index+'-layer';
          // var l = d3.select('.card-eez-layer')
          //   .classed(layer, true);
        },
        switch: function(index) {
          // This works because we classed the layer with .card-0-layer

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
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Dots represent lethal conflict incidents occurring in 2016. Gold incidents occurred within 50km of the coast. <br><a href="https://www.prio.org/Data/Armed-Conflict/UCDP-PRIO/" target="_blank">Source: UCDP/PRIO</a></em>'
        },
        // { tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Lighter shades indicate higher coastal welfare scores.</em><br /><br /><a class="internal-ref coastal-welfare inline" href="#" data-link="6">Methodology</a>'
        // },
        {
          tag: 'p',
          html: 'Maritime security is closely linked to the well-being of the people living in adjacent coastal areas. When coastal residents suffer from violence and poverty on or near the coast, their close proximity to the sea can draw them toward maritime crime and the illicit maritime economy.'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/coastal_welfare_loop-01.png', // This should be on the Stable Seas Deck - comments
        },

        // { tag: 'h3',
        //   text: 'The Coastal Welfare Scores'
        // },
        // {tag: 'indexTable'
        // },
        // { tag: 'caption',
        //   text: 'Note: scores are rounded to the nearest whole number.'
        // },
        {
          tag: 'p',
          html: 'Violent non-state actors operating on shore are likely to turn to the maritime space to smuggle in <a class="illicit-trade inline" href="../../illicit-trade">arms and illicit goods</a>, as seen in Somalia, Nigeria, the Philippines, and elsewhere. Transnational criminal networks are especially likely to establish themselves along coastlines that are weakly governed and affected by <a class="internal-ref inline coastal-welfare" href="#" data-link="3">armed conflict and other forms of violence</a>.'
        },
        // { tag: 'p',
        //   html: 'Our Coastal Welfare score captures the physical and economic security of coastal and nationwide populations. The highest-ranking countries are not experiencing civil war, and have lower homicide rates and lower infant mortality and higher per capita incomes, life expectancies, and levels of education attainment. They also have profitable and sustainable maritime industries.'
        // },
        // { tag: 'p',
        //    html: 'In 2017, coastal welfare is highest among African island states, in the western Gulf of Guinea, and in the southern cone. High levels of violence near the coast dramatically reduce scores near the Niger River Delta and on the Horn of Africa.'
        // },
        {
          tag: 'p',
          html: 'We are only starting to learn about the complex relationships between coastal conditions and various maritime crimes. While many criminal networks flourish in situations of poor coastal welfare, the enabling conditions often vary based on the crime. For example, <a class="piracy inline" href="../../piracy">piracy activities</a> often need a semblance of stability and functioning markets, as seen in parts of Somalia. If conditions are too violent and unstable, pirates and criminal networks have difficulty operating.<a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">Human smuggling</a> benefits from civil war, as seen in Libya. However, some crimes, such as <a class="illicit-trade inline" href="../../illicit-trade">illicit trades</a>, flourish in more sophisticated economies and stable environments, such as South Africa.'
        },
        {
          tag: 'p',
          html: 'The nature of maritime crime can shift depending on the changing conditions and opportunities on shore. Recognizing what these conditions are and how they might impact or be impacted by maritime crimes is important for identifying vulnerable locations, ports, and shorelines and intervening to prevent an escalation of illicit activity.'
        },
        // Insert infographic here ###
        // { tag: 'p',
        //   html: 'For more information about how these scores are calculated, please see our <a class="internal-ref coastal-welfare inline" href="#" data-link="6">Methodology</a> page.'
        // }

      ] // end of els array

    },
    { // Card 1
      title: 'The Economic Insecurity Trap',
      menu: 'The Economic Insecurity Trap',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Feedback loop between crime and economic insecurity.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        path: '',
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {
          var layer = 'card-' + index + '-layer';
          var l = d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          //  switchMainIndex(index);
          var artisanalFishing = issueAreaData[issueArea].metadata.countryData;

          var values = [];

          artisanalFishing.forEach(function(row, i) {
            values.push(row.ia5c1);
          });

          var max = d3.max(values),
            min = d3.min(values),
            range = max - min;
          artisanalFishing.forEach(function(row, i) {
            d3.selectAll('.eez.' + row.iso3)
              .classed('active', true)
              .style('fill', function() {
                return rampColor(1 - ((row.ia5c1 - range) / (max - min)))
              })

          });
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
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Lighter shades indicate greater artisanal fishing opportunities.<br />Source: <a href="http://www.oceanhealthindex.org/" target="_blank">Ocean Health Index</a></em>'
        },
        {
          tag: 'p',
          html: 'Strong fisheries, tourism, and other maritime industries provide coastal populations with an opportunity to thrive in the <a class="blue-economy inline" href="../../blue-economy">legal maritime economy</a>.<sup>1</sup> When such opportunities diminish or are not available, people are more likely to join criminal networks and to exploit maritime resources through illegal means.'
        },
        {
          tag: 'p',
          html: 'The relationship between recruitment for piracy and unemployment in fisheries is a striking example. Pirates recruit from local fishing communities, among other sectors, since fishers possess the navigational knowledge, skills, and resources that pirates need to execute their attacks. Stable and abundant income opportunities in the fishing sector keep people away from criminal activity. On the other side, poor fish catches can propel more people to join pirate networks.<sup>2</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/al_faxti_fishing.jpg',
          alt: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. ',
          caption: 'Stable income opportunities in the fishing sector keep people away from criminal activity. Photo: Al Faxti Fishing, Jean-Pierre Larroque, OEF. '
        },
        {
          tag: 'p',
          html: 'However, while poor coastal economic welfare enables maritime crimes, maritime crimes also disrupt local economies. Large injections of capital acquired through illicit means have effects similar to those of the “resource curse.”<sup>3</sup> Large illicit capital inflows, such as ransom payments, lead to inflation. Inflation in turn undermines local manufacturing industries and exports. The service industry booms, and imports grow. While advantageous in the short term, this effect undermines long-term development and fosters a dependency on the illicit sectors.'
        },
        {
          tag: 'blockquote',
          html: '"Ransom revenues appear to largely fuel investment in services, real estate, finance or criminal sectors. Little appears to go into pastoral or export sectors."',
          source: 'Authors Steven Oliver, Ryan Jablonski, and Justin V. Hastings<br />The Tortuga Disease<sup>4</sup>',
          link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959' // What about internal references?
        },
        {
          tag: 'p',
          html: 'The effect has been strong in Puntland, which has seen a significant decline in exports in comparison to Somaliland since 2005, despite having trade figures that were tracking very closely to Somaliland’s prior to the onset of piracy.<sup>5</sup>'
        },
        // Insert graph of Change in export volumes ###
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/change_export_volumes.jpg',
        },
        {
          tag: 'p',
          html: 'As a result of the effects of ransom revenues on the economy, employment opportunities in manufacturing, agriculture, and other export industries decrease. As unemployment and poverty rise, people start seeing more opportunity in the illicit economy.'
        },
        {
          tag: 'p',
          html: 'One result of these dynamics is the inception of a feedback loop between poor coastal welfare and illicit maritime activity; the more maritime crime develops, the more it can take a toll on economic development. The more economic development stagnates, the more people are inclined to move into illicit activities and crimes.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>1</sup> Ryan Jablonski and Steven Oliver, “The Political Economy of Plunder: Economic Opportunity and Modern Piracy,” <em>Journal of Conflict Resolution</em> 57, no. 4 (2012): 682–708.'
            },
            {
              org: '<sup>2</sup> Mattias Fluckiger and Markus Ludwig, “Economic Shocks in the Fisheries Sector and Maritime Piracy,” <em>Journal of Development Economics</em> 114 (2015): 107–125.'
            },
            {
              org: '<sup>3</sup> Steven Oliver, Ryan Jablonski, and Justin V. Hastings, “The Tortuga Disease: The Perverse Effects of Illicit Foreign Capital,” <em>International Studies Quarterly<em> (forthcoming, 2017), accessed 28 August 2017,',
              url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959'
            },
            {
              org: '<sup>4</sup> Ibid.'
            },
            {
              org: '<sup>5</sup> Ibid.'
            },
          ]
        }
      ] // end of els array

    },
    { // Card 2
      title: 'Somali Livelihoods',
      menu: 'Somali Livelihoods',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Focus on economic livelihoods in Somalia.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        path: '../../data/blue-economy/world-port-index.csv',
        extent: [
          [37, 14],
          [76, -9]
        ], // ### Guinea Bissau
        //    highlights: ['SOM'],
        load: function(index, file) {

          var layer = 'card-' + index + '-layer';
          d3.csv(file, function(vals) {
            vals.forEach(function(d) {
              d.lat = +d.lat;
              d.lon = +d.lon;
              d.Harbor_2ize_code = +d.Harbor_2ize_code;
            });

            var wpi = mapg.append('g')
              .classed('card-layer wpi-layer invisible ' + layer, true);

            wpi.selectAll('circle')
              .data(vals).enter()
              .append('circle')
              .attr('cx', function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr('cy', function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr('r', function(d) {
                return d.Harbor_2ize_code * 2;
              })
              .classed('wpi-port', true)
              .style('fill', function() {
                return rampColor(1);
              });
          });
        },
        switch: function(index) {
          //  switchMainIndexInverse(0);
          d3.select('.card-' + index + '-layer')
            .classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Somali Livelihoods',
        },
        {
          tag: 'caption',
          text: 'Supporting coastal communities amid drought'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Larger dots indicate larger ports, smaller dots indicate smaller ports. <br> Source: World Port Index</em>'
        },
        // { tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Somalis suffer from the region\'s lowest coastal welfare score <br> <a class="internal-ref inline coastal-welfare" href="#" data-link="6">Methodology</a></em>' //###Fix this map if we have time its ugly
        // },
        {
          tag: 'p',
          html: 'The 2017 drought and famine have forced many Somalis to turn to the sea to support their livelihoods. As livestock and crops died, and with the reach of humanitarian assistance limited, many turned to fishing to feed their families. Conversely, illicit maritime activities might have also been fueled by the drought.'
        },
        {
          tag: 'blockquote',
          html: '“What we\'re seeing is that migration is increasing exponentially in all directions. People are leaving the region however they can. Some are going through Libya and across the Mediterranean and some are going to Yemen.”',
          source: 'Nichole Sobecki<sup>6</sup><br />Photojournalist',
          link: 'http://www.npr.org/sections/goatsandsoda/2017/06/17/533050733/photos-of-somalia-surviving-in-one-of-the-worlds-driest-places' // What about internal references?
        },
        {
          tag: 'p',
          html: '<a class="maritime-mixed-migration inline" href="../../maritime-mixed-migration">Human smuggling</a>is one of the key maritime crimes associated with the deteriorating coastal welfare off the coast of Somalia. Most Somalis do not have the financial means to be smuggled abroad and feel they have to migrate internally within Somalia.<sup>7</sup> As famine conditions worsen, many who can do so choose to be smuggled to other countries from Somali ports in order to escape the drought.'
        },
        {
          tag: 'p',
          html: 'Somalia is just one example of how a change in coastal welfare and livelihoods can contribute to growing maritime insecurity. Amid crises like these, links between poor coastal welfare and maritime crimes can be addressed by supporting coastal development.'
        },
        { // Get this thumbnail!
          tag: 'video',
          videoId: '9U7fD3JkB60',
          thumb: '../../assets/coastal-welfare/AgriFood_video.jpg' // ###
        },
        {
          tag: 'p',
          html: 'These links between poor coastal welfare and maritime crime also mean that improved coastal opportunities could improve maritime security. For example, <a href="http://shuraako.org/" target="_blank">Shuraako</a>, a program of One Earth Future, has been supporting agriculture, fishing, and other businesses across the Somali regions through investments to create livelihood opportunities and foster economic growth. By boosting the formal economy, this work provides viable alternatives to illicit activities that undermine international security.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>6</sup> Jason Beaubien, “Photos Of Somalia: The Drought, the People, the Captured Porcupine,” <em>NPR</em>, 17 July 2017,',
              url: 'http://www.npr.org/sections/goatsandsoda/2017/06/17/533050733/photos-of-somalia-surviving-in-one-of-the-worlds-driest-places'
            },
            {
              org: '<sup>7</sup> The Research and Evidence Facility Consortium, “Migration between the Horn of Africa and Yemen,” 25 July 2017,',
              url: 'https://www.soas.ac.uk/ref-hornresearch/research-papers/file122639.pdf'
            }
          ]
        }
      ] // end of els array

    },
    { // Card 3
      title: 'War and Maritime Crimes',
      menu: 'War and Maritime Crimes',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'How maritime crime funds violent non-state actors'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        extent: [
          [5, 20],
          [111, -41]
        ],
        path: '../../data/ia5c3.csv',
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
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
              .classed('card-layer card-0-layer coastal-incidents ' + layer, true);

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
              .attr('r', '3px')
              .attr('class', function(d) {
                return d.type;
              });

          });


        },
        switch: function(index) {
          var layer = 'card-' + index + '-layer';
          d3.select('.' + layer)
            .classed('invisible', false);
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
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Dots represent lethal conflict incidents occurring in 2016. Gold incidents occurred within 50km of the coast. <br><a href="https://www.prio.org/Data/Armed-Conflict/UCDP-PRIO/" target="_blank">Source: UCDP/PRIO</a></em>'
        },
        {
          tag: 'p',
          html: 'Sub-Saharan Africa is the most war-torn region of the world. Just in 2016, 10 out of 30 countries covered by our Stable Seas Maritime Security Index were affected by civil war. A total of 1,039 armed clashes occurred throughout their territories; 256 of them occurred within 50 kilometers of the coast, including in the vicinities of key coastal towns, ports, and other critical maritime infrastructure.<sup>8</sup>'
        },
        {
          tag: 'img', // Add graph ###
          src: '../../assets/coastal-welfare/coastal_welfare_conflict_events.png',
        },
        {
          tag: 'p',
          html: 'There is a complex relationship between armed conflict and maritime crimes. First of all, civil war can facilitate and drive illicit activities. Active conflict creates the opportunities illicit networks need to flourish: low government penetration and weak control of insurgent territories, weak rule of law, a proliferation of arms, and ample networks that can be tapped into to support illicit activities.'
        },
        {
          tag: 'p',
          html: 'Moreover, war is a great market opportunity for illicit activities. Maritime arms trade and human smuggling are especially profitable in environments affected by civil war due to the demand for arms and the volume of refugees fleeing the violence.'
        },
        {
          tag: 'p',
          html: 'Conversely, criminal activities can also facilitate war by funding insurgent campaigns.<sup>9</sup> Attacking oil tankers and <a class="piracy inline" href="../../piracy">kidnapping for ransom</a> have proven to be lucrative strategies for financing insurgency in the Gulf of Guinea. The Movement for the Emancipation of the Niger Delta (MEND) has attacked oil tankers and infrastructure off the coast of Nigeria regularly since 2008. Attacks prompted the government to come to the negotiation table, but, most importantly, financed the group’s activities through ransom payments and the sale of stolen oil on the black market.<sup>10</sup>'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>8</sup> Ralph Sundberg and Erik Melander, “Introducing the UCDP Georeferenced Event Dataset,” <em>Journal of Peace Research</em> 50, no.4 (2013): 523–532; Mihai Croicu and Ralph Sundberg, “UCDP GED Codebook version 17.1,” Department of Peace and Conflict Research, Uppsala University, 2017.'
            },
            {
              org: '<sup>9</sup> Ursula Daxacker and Brandon C. Prins, “Financing Rebellion: Using Piracy to Explain and Predict Conflict Intensity in Africa and Southeast Asia,” <em>Journal of Peace Research</em> 54, no. 2 (2017): 215–230.'
            },
            {
              org: '<sup>10</sup> Ibid.'
            }
          ]
        }
        // How about internal references????? ###

      ] // end of els array
    },
    { // Card 4
      title: 'Women and Coastal Welfare',
      menu: 'Women and Coastal Welfare',
      metadata: {
        owner: 'Sasha Egorova',
        description: 'Gender aspect of coastal welfare. Structural impediments towards women equally participating in coastal economies.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        path: '',
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {

          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);

        },
        switch: function(index) {

          var values = issueAreaData[issueArea].metadata.countryData;
          var valArr = [];
          values.forEach(function(d) {
            valArr.push(d.ia5c4);
          });

          var max = d3.max(valArr);
          var min = d3.min(valArr);
          var range = max - min;

          values.forEach(function(row, i) {
            d3.selectAll('.eez.' + row.iso3)
              .classed('active', true)
              .style('fill', rampColor(1 - ((row.ia5c4 - min) / range)));
          });

          var layer = 'card-' + index + '-layer';
          d3.select('.' + layer)
            .classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Women and Coastal Welfare',
        },
        {
          tag: 'caption',
          text: 'Secure coastlines for all'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Lighter shades indicate greater women\'s economic security. <br> Source: <a href="http://wbl.worldbank.org/" target="_blank">World Bank Women, Business, and the Law Dataset</a></em>'
        },
        {
          tag: 'p',
          html: 'Women’s active participation in coastal economies helps create more stable, secure, and profitable coastal areas for all. However, there are many obstacles to their full participation in the economy, and maritime industries in particular.'
        },
        {
          tag: 'blockquote',
          html: '“Women today represent about 50 percent of the world’s population and, for the past two decades, about 50 percent of the labor force. Yet there are stark differences in the outcomes they achieve: women are only half as likely as men to have a full-time wage-earning job. The women who do have paid jobs earn as much as one-third less than men. Fewer women than men are involved in trade or own registered companies. And women are more likely to work in low-productivity activities or informal employment.”',
          source: 'Cecile Fruman, Author<br />Why Gender Equality in Doing Business Makes Good Economic Sense<sup>11</sup>',
          link: 'http://blogs.worldbank.org/psd/why-gender-equality-doing-business-makes-good-economic-sense' // What about internal references?
        },
        {
          tag: 'p',
          html: 'Maritime industries are no exception to this overall trend. There are fewer female seafarers than male ones, fewer women serving in navies and marine authorities, and fewer female members of coast guards.<sup>12</sup> Women’s participation in fisheries value chains is often limited to roles in processing and marketing, rather than fishing and resource management, which are considered to be traditionally male roles.<sup>13</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/coastal-welfare/women_fisheries_west_africa.jpg', // This should be on the Stable Seas Deck - comments
          alt: 'A woman cooks in Youpwe fishing village, Cameroon. Photo: Jean-Pierre Larroque, OEF',
          caption: 'A woman cooks in Youpwe fishing village, Cameroon. Photo: Jean-Pierre Larroque, OEF'
        },
        {
          tag: 'p',
          html: 'These differences in outcomes between men and women in business and the job market largely stem from the legal systems of their respective states. In sub-Saharan Africa in particular, women face multiple obstacles to equal participation in the economy:<sup>14</sup>'
        },
        {
          tag: 'ul',
          rows: ['In 5 out of 30 countries considered in the index, there are extra procedures for women to start a business compared to the procedures required for men.<sup>15</sup>', 'In 17 out of 30 countries, equal remuneration for work of equal value is not legally mandated.', 'In 21 out of 30 countries, nondiscrimination based on gender in hiring is not legally mandated.', 'In 18 out of 30 countries, non-pregnant women can’t do the same jobs as men.', 'In 2 out of 30 countries, non-pregnant women cannot work in the same occupations as men.']
        },
        {
          tag: 'p',
          html: 'In addition to unequal legal rights in terms of employment, women also face a lack of protection against different forms of violence:<sup>16</sup>'
        },
        {
          tag: 'ul',
          rows: ['In 17 out of 30 countries, there are no clear criminal penalties for domestic violence.', 'In 8 out of 30 countries, there is no legislation that addresses sexual harassment.', 'In 20 out of 30 countries, marital rape is not criminalized.']
        },
        {
          tag: 'p',
          html: 'Removing obstacles to women’s participation in the economy and establishing functioning regulatory frameworks to protect women from violence are key steps toward having inclusive, sustainable, and secure coastal economies and welfare.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>11</sup> Cecile Fruman, “Why Gender Equality in Doing Business Makes Good Economic Sense,” the World Bank Private Sector Development Blog, 17 November 2016,',
              url: 'http://blogs.worldbank.org/psd/why-gender-equality-doing-business-makes-good-economic-sense'
            },
            {
              org: '<sup>12</sup> Timothy Walker, “Why We Need More Women in Maritime Industries,” <em>World Economic Forum Agenda</em>, 4 September 2015,',
              url: 'https://www.weforum.org/agenda/2015/09/why-we-need-more-women-in-maritime-industries/'
            },
            {
              org: '<sup>13</sup>  Angela Lentisco and Robert Ulric Lee, <em>A Review of Women’s Access to Fish in Small-scale Fisheries</em> (Rome: Food and Agricuture Organization of the United Nations, 2015),',
              url: 'http://www.fao.org/3/a-i4884e.pdf'
            },
            {
              org: '<sup>14</sup> “Women, Business, and the Law 2016: Getting to Equal,” the World Bank, available at',
              url: 'http://wbl.worldbank.org/'
            },
            {
              org: '<sup>15</sup> The Doing Business Project, “Starting a Business,” the World Bank, 2017, accessed 28 August 2017,',
              url: 'http://www.doingbusiness.org/data/exploretopics/starting-a-business'
            },
            {
              org: '<sup>16</sup> “Women, Business, and the Law 2016: Getting to Equal,” the World Bank, available at',
              url: 'http://wbl.worldbank.org/'
            },
          ]
        }
      ] // end of els array
    },
    // { // Card 5
    //   title: 'Progress in Ghana',
    //   menu: 'Progress in Ghana',
    //   metadata: {
    //     owner: 'Sasha Egorova',
    //     description: 'Lessons learned on what makes high coastal welfare in Ghana.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: '',
    //     translate: [],
    //     path: '',
    //     extent: [[-5,14],[17,-2]],
    //     highlights: ['GHA'],
    //     load: function (index, file) {
    //       var layer = 'card-'+index+'-layer';
    //       d3.select('.card-eez-layer')
    //         .classed(layer, true);
    //
    //     },
    //     switch: function (index) {
    //       var layer = 'card-'+index+'-layer';
    //       d3.select('.' + layer)
    //         .classed('invisible', false);
    //       switchMainIndex(0);
    //     }
    //   },
    //   els: [
    //     { tag: 'h3',
    //       text: 'Progress in Ghana',
    //     },
    //     { tag: 'caption',
    //       text: 'Leading the Gulf of Guinea'
    //     },
    //     // { tag: 'legend',
    //     //   text: 'Map Legend',
    //     //   legendContent: '<em>Ghana enjoys one of the highest coastal welfare scores in sub-Saharan Africa.<br><a class="internal-ref inline coastal-welfare" href="#" data-link="6">Methodology</a><em>'
    //     // },
    //     { tag: 'p',
    //       html: 'Ghana has long been hailed as a success story for stability and growth in Africa, and for good reason. Since the institutionalization of a democratic political system in the early 1990s, the state has seen stable economic growth, a significant reduction of poverty, continuously climbing life expectancies and attainment of education, and steady progress towards other development goals.<sup>17</sup>'
    //     },
    //     { tag: 'img', // Add image ###
    //       src: '../../assets/placeholder.jpg',
    //       alt: '',
    //       caption: 'Caption for picture to be added###.'
    //     },
    //     { tag: 'p',
    //        html: 'Unlike in many of its neighbors, people in Ghana also enjoy a high degree of physical security. The country has not experienced a civil war, and has a low homicide rate of just 1.70, which puts it in the company of Canada, Kosovo, Malawi, Kuwait, and Bulgaria on the global scale. This is a remarkable level of physical security for a country that has been in close proximity to war and violent political change in recent memory.'
    //     },
    //     { tag: 'p',
    //        html: 'Ghana’s coastal areas are some of the most prosperous areas in the country, at least in part due to the location of the capital, Accra, on the coast. Maritime industries such as mariculture, commercial fishing, shipping, tourism, and others keep up with incomes and employment trends in other industries across the country, providing coastal populations with stable jobs and incomes.'
    //     },
    //     // { tag: 'p',
    //     //    html: 'Yet, having a high level of coastal welfare does not shield the country from maritime crime originating in neighboring countries. Ghana receives an unfavorable “high” ranking on both our  <a class="piracy inline" href="../../piracy">Piracy</a> and <a class="illicit-trade inline" href="../../illicit-trade">Illicit Trades</a> scores, in part because it shares the Gulf of Guinea with major piracy and maritime crime hotspots such as Nigeria. Ghana has become a significant hub for <a class="internal-ref inline illicit-trade" href="#" data-link="2">illicit trades in drugs and contraband</a>. This is due, at least in part, to internal challenges like corruption, insufficient capacity for enforcement of regulations, and growing internal demand for illicit goods.<sup>18</sup> Because coastal welfare is strong in Ghana relative to neighboring states, it is a destination country for economic migrants, which increases opportunities for trafficking and exploitation.'
    //     // },//###Make ssure links format color correctly in above paragraph
    //     { tag: 'p',
    //        html: 'Though Ghana faces challenges, citizens living along the coast are more secure, both physically and economically, than they are elsewhere in the Gulf of Guinea region. For this reason, Ghana is in a strong position to make gains against these problems and to continue leading regional efforts to secure the Gulf of Guinea maritime environment.'
    //     },
    //     { tag: 'links',
    //       items: [
    //         {org: '<sup>17</sup> “Ghana,” the World Bank, accessed 1 September 2017,', url: 'http://data.worldbank.org/country/ghana'},
    //         {org: '<sup>18</sup> U.S. Department of State, “Ghana,” Bureau of International Narcotics and Law Enforcement Affairs 2014 International Narcotics Control Strategy Report, accessed 1 September 2017,', url: 'https://www.state.gov/j/inl/rls/nrcrpt/2014/vol1/222893.htm.'},
    //       ]  // How about internal references????? ###
    //     }
    //   ] // end of els array
    // },
    //{ // Card 6
    // title: 'Methodology',
    // menu: 'Methodology',
    // metadata: {
    //   owner: 'Curtis Bell',
    //   description: 'Methods.'
    // },
    // map: {
    //   scale: [],
    //   classes: 'card-6-layer',
    //   translate: [],
    //   highlights: null,
    //   load: function (index, file) {  // ### *** This only should be for the first card ...
    //     // Color EEZ according to master Stable Seas index
    //     var layer = 'card-'+index+'-layer';
    //
    //     d3.select('.card-eez-layer')
    //       .classed(layer, true);
    //   },
    //   switch: function (index) {
    //     switchMainIndexInverse(0);
    //   }
    // },
    // els: [
    // { tag: 'h3',
    //   text: 'Methodology'
    // },
    // { tag: 'legend',
    //   text: 'Map Legend',
    //   legendContent: '<em>Lighter shades indicate higher coastal welfare scores.</em>'
    // },
    // { tag: 'p',
    //    html: 'The Coastal Welfare Score gauges physical security and economic security, both throughout a country and specifically along the coast. This section briefly summarizes how each concept is measured. More technical details are included in the data documentation available for download.'
    // },
    // { tag: 'h4',
    //   text: 'Physical Security'
    // },
    // { tag: 'p',
    //    html: 'We use four inputs to measure physical security: the severity of coastal armed conflicts, the severity of nationwide armed conflicts, nationwide homicide rates, and an analysis of women’s physical security.'
    // },
    // { tag: 'p',
    //    html: 'The first two of these inputs are derived from data from a joint initiative of the Uppsala Conflict Data Program and the Peace Research Institute of Oslo. The georeferenced event dataset produced by this initiative includes geocoded information about specific lethal instances of armed conflict, such as battles between governments and rebels or use of violence against civilians.<sup>19</sup> The project codebook defines a qualifying event as: “An incident where armed force was used by an organized actor against another organized actor, or against civilians, resulting in at least one direct death at a specific location and a specific date.”<sup>20</sup>'
    // },
    // { tag: 'p',
    //    html: 'Counts of nationwide events by country were used to create the nationwide armed-conflict severity measure for each state. In 2016 the 30 coastal sub-Saharan countries collectively experienced 1,039 qualifying events. To isolate political violence occurring near the coastline, we used geographic event data to identify events occurring within 50 kilometers of a country’s coastline. This reduced the number of events to 256, and those are spread across six countries. Some countries, like Somalia and Angola, experienced most of their lethal conflict events near the coast. Others, like the Democratic Republic of the Congo and Cameroon, suffered conflict in interior regions but not in coastal areas.'
    // },
    // { tag: 'p',
    //    html: 'The third measure of physical security is the nationwide homicide rate as recorded by the United Nations Office on Drugs and Crime. Homicide data was taken for the most recent available year for each country. In most cases, 2015 was the most recent year used.'
    // },
    // { tag: 'p',
    //    html: 'The fourth measure is an analysis of women’s physical security, derived from the Women, Business, and the Law data from the World Bank. To create this measure, we used the data from the Protecting Women indicator in the dataset, which “examines the existence of legislation on domestic violence and sexual harassment”<sup>21</sup> in each country. '
    // },
    // { tag: 'h4',
    //   text: 'Economic Security'
    // },
    // { tag: 'p',
    //    html: 'We use five inputs to measure economic security on the coast and nationwide: artisanal fishing opportunities, coastal livelihoods and economies, the Human Development Index, infant mortality rate, and women’s economic security. We use three data sources to measure economic security: the Ocean Health Index (OHI) for coastal livelihoods and economies and artisanal fishing opportunities, the United Nations Development Programme for the Human Development Index, and the World Bank for infant mortality rate data and the Women, Business, and the Law dataset.'
    // },
    // { tag: 'p',
    //    html: 'The first measure is the <a href="http://www.oceanhealthindex.org/methodology/components/artisanal-fishing-need" target="_blank">Artisanal Fishing Opportunities Index</a> collected by OHI. The index measures “whether people who need to fish on a small, local scale have the opportunity to do so.”<sup>22</sup> In other words, it captures whether the demand for fishing opportunities is met on the coast in a lawful and sustainable manner.'
    // },
    // { tag: 'p',
    //    html: 'Second, the “Livelihoods and Economies” measure from OHI, weighted by the Human Development Index, assesses jobs and revenue produced from marine-related industries relative to national trends in employment and GDP. The score thus captures the relative economic well-being of coastal areas in comparison to the rest of the country. The industries considered in the measure are: (1) commercial fishing, (2) mariculture, (3) tourism and recreation, (4) shipping and transportation, (5) whale watching, (6) ports and harbors, (7) ship and boat building, and (8) renewable energy production (wind and wave).'
    // },
    // { tag: 'p',
    //    html: 'Third, the Human Development Index (HDI) is a composite measure of the overall social well-being of citizens in each country and includes data on life expectancy, education, and per capita income. This measure is an excellent indicator for economic welfare across a country. We multiply it by the Livelihoods and Economies score to proxy coastal development.'
    // },
    // { tag: 'p',
    //    html: 'Fourth, infant mortality rate is an ideal measure of social welfare because it reflects the state of healthcare, women’s education, and the availability of sufficient nutrition, transportation infrastructure, and shelter. These data are used with the HDI to gauge economic security at the country level.'
    // },
    // { tag: 'p',
    //    html: 'Finally, the fifth measure is an analysis of women’s economic security derived from the Women, Business, and the Law data from the World Bank. To create this measure, we use the data from the “Getting a Job” indicator in the dataset, which “assesses restrictions on women’s work, such as prohibitions on working at night or in certain jobs. This indicator also covers laws on work-related maternity, paternity, parental benefits, retirement ages, equal remuneration for work of equal value and nondiscrimination in hiring.”<sup>23</sup>'
    // },
    // { tag: 'links',
    //   items: [
    //     {org: '<sup>19</sup> Sundberg and Melander, “Introducing the UCDP Georeferenced Event Dataset.'},
    //     {org: '<sup>20</sup> Ibid., pg. 2'},
    //     {org: '<sup>21</sup> The Women, Business, and the Law Project, “All Indicators,” the World Bank, accessed 1 September 2017,', url: 'http://wbl.worldbank.org/data/exploretopics/all-indicators'},
    //     {org: '<sup>22</sup> “Artisanal Fishing Opportunities,” the Ocean Health Index, accessed 1 September 2017,', url: 'http://www.oceanhealthindex.org/methodology/goals/artisanal-fishing-opportunities'},
    //     {org: '<sup>23</sup> The Women, Business, and the Law Project, “All Indicators,” the World Bank, accessed 1 September 2017,', url: 'http://wbl.worldbank.org/data/exploretopics/all-indicators'},
    //   ],  // How about internal references????? ###
    // }

    //   ]
    // } // End of seventh object in cards array
  ]
};
