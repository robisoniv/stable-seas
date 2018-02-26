var ruleOfLawData = {
  metadata: { // Independent data source for each page
    version: '1.0.0',
    name: '*Rule of Law*',
    updates: true,
    /*
         here is where you write updates
         do one line per update, like
         added legend to card 3
         added citations to card 5
         input thumbnail path to card 4
         loaded point data

         */
    index: 3, //Issue Area #3, index 2...
    code: 'ruleOfLaw',
    countryData: {},
    csv: '../../data/rule-of-law/ruleOfLaw.csv',
    path: 'rule-of-law',
    color: '#6E497E',
    order: -1,
    description: 'Where the rule of law is strong, governments can be confident that legal efforts to address maritime crime and violence will yield results.'
  },
  load: function(csv, callback) {

    loadIAcsv(csv, callback);
  },
  cards: [
    {   // Card 0
      title: 'Rule of Law',
      menu: 'Rule of Law',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Introduce the issue.'
      },
      map: {
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        highlights: [],
        tooltip: true,
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso].index;
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);

          return "Rule of Law:<br />" + tooltipVal + " / 100";

        },
        load: function(index, csv) { // ### *** This only should be for the first card ...
          // Class EEZ with card-0-layer to enable switch() method
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
          text: 'Rule of Law',
        },
        {
          tag: 'caption',
          text: 'Progress requires effective and legitimate legal institutions'
        },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Lighter shades indicate countries with a better Corruption Perceptions Index score. <br />Source: <a href="https://www.transparency.org/" target="_blank">Transparency International</a></em>'
        // },
        {
          tag: 'p',
          html: 'To achieve lasting maritime security and good maritime governance, countries must have officials and institutions that reliably enforce government policy. Where these structures are undermined by corruption, inefficiency, and discriminatory practices, legal efforts to improve maritime security will have little effect.'
        },
        // { tag: 'h3',
        //   text: 'The Rule of Law Scores'
        // },
        // {tag: 'indexTable'
        // },
        // { tag: 'caption',
        //   text: 'Note: scores are rounded to the nearest whole number.'
        // },
        // { tag: 'p',
        //   html: 'Our Rule of Law score considers five factors: corruption, government efficacy, government efficiency, judicial integrity, and inclusive governance. This year’s scores reveal strong governments across the region, though there are significant areas of concern in the southern Gulf of Guinea and the Horn of Africa. For more information about how these scores are calculated, please see our <a class="rule-of-law inline internal-ref" data-link="5">Methodology</a> page.'
        // },
        {
          tag: 'p',
          html: 'Where the rule of law is strong, governments can be confident that legal efforts to address maritime crime and violence will yield results. These states can establish effective bodies to regulate industries like fishing and hold bureaucrats accountable for faithfully implementing policy. Such states are often better at monitoring and reporting so that policies can be reviewed and improved.'
        },
        {
          tag: 'p',
          html: 'Countries with weak rule of law suffer from a disjuncture between policy and practice. Efforts to improve maritime security are impeded by poor norms and reporting structures, and this provides opportunities for corruption, bribe-seeking, and illicit economic activity. Additionally, these states lack the ability to effectively review, amend, and enforce new policies.'
        },
      ] // end of els array
    }, // End of first element of cards object
    {   // Card 1

      title: 'Fighting Corruption',
      menu: 'Fighting Corruption',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Corruption remains high, but efforts like EITI are making meaningful progress. Highlight Nigeria.'
      },
      map: {
        path: './data/main.csv',
        scale: [],
        classes: 'card-eez-layer',
        translate: [],
        tooltip: true,
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['corruptionPerceptions'];
          tooltipVal = (tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Corruption Perceptions Index:<br />" + tooltipVal + " / 100";

        },
        //  highlights: ['NGA'],
        load: function(index, js) {
          // Color EEZ according to change in Corruption Perceptions Index
          d3.select('.card-eez-layer')
            .classed('card-' + index + '-layer', true);
        },
        switch: function(index) {
          choropleth(index, 1, 'deltaCorruptionPerceptions');
        }
      }, // end of 'map' object
      els: [{
          tag: 'h1',
          text: 'Fighting Corruption***'
        },
        {
          tag: 'caption',
          text: '*** Need updated map data *** <br />When dishonesty and bribery undermine legal efforts'
        },
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Changes in the Corruption Perceptions Index, 2012-2016. Darker purple countries show improving conditions, while darker red countries show worsening. White-shaded countries saw no change during this period. <br />Source: <a href="https://www.transparency.org" target="_blank">Transparency International</a> </em>'
        // },
        {
          tag: 'p',
          html: 'Corruption remains the greatest threat to effective policy implementation in sub-Saharan Africa. It is especially threatening in the maritime domain due to weak state presence, proximity to international borders, and the great concentration of wealth that occurs at important seaports. Where the rule of law is weak, local officials take bribes, profit from selective enforcement of fisheries and environmental regulations, and permit black market trading and trafficking. According to Transparency International, corruption is especially acute in major states like Ghana and South Africa. The good news, however, is that many sub-Saharan countries have made significant progress against corruption over the last five years.'
        },
        {
          tag: 'p',
          html: 'Where the rule of law is weak, local officials take bribes, profit from selective enforcement of fisheries and environmental regulations, and permit black market trading and trafficking. The good news, however, is that many sub-Saharan countries have made significant progress against corruption over the last five years.'
        },
        {
          tag: 'img',
          src: '../../assets/rule-of-law/eiti_members-01.png',
          alt: 'Map of EITI African member states'
        },
        {
          tag: 'caption',
          text: 'These countries are African members of the <a href="https://eiti.org/" target="_blank"> Extractive Industries Transparency Initiative</a>'
        },
        {
          tag: 'h3',
          text: 'Nigeria: Overcoming Corruption in the Oil Industry'
        },
        // { tag: 'p',
        //   html: 'It isn’t coincidental that the countries receiving many of the region’s harshest corruption scores are also the region’s most important offshore oil producers. Unique challenges for this industry, including crude oil theft and opaque processes for licensing and rewarding contracts, hamstring economies that should be among Africa’s strongest. Still, success stories like Nigeria’s show that governments in this region can make considerable progress toward reducing corruption.'
        // },
        {
          tag: 'p',
          html: 'Nigeria, the region’s largest oil producer, was also the first sub-Saharan state to embrace the Extractive Industries Transparency Initiative (EITI) framework. Member states subject themselves to periodic reviews of their extractive industry management and are then held accountable for making progress toward any areas of concern. Following the January 2017 review, Fredrik Reinfeldt, Chair of the EITI Board, said of Nigeria:'
        },
        {
          tag: 'blockquote',
          html: '“Nigeria has repeatedly demonstrated how the EITI process can be used to achieve important, tangible results for its citizens. Swiftly addressing the corrective actions identified through Validation should help Nigeria continue to demonstrate regional leadership and make a full transition to the EITI standard.”<br /><em>- Fredrik Reinfeldt, Chair of the EITI Board</em>',
          source: ''
          //link: '#'       // What about internal references?
        },
        {
          tag: 'p',
          text: 'EITI’s review of 34 aspects of good extractives governance found inadequate progress in only one area (policy on contract disclosure), but found that Nigeria made meaningful or satisfactory strides in areas like public debate, distribution of revenues, and civil society engagement. With further work within this framework, Nigeria will build stronger institutions and deepen norms of good, corruption-free governance.'
        },
        {
          tag: 'p',
          text: 'Approximately half of coastal sub-Saharan states are now participating in the EITI process. Two oil-rich states that have seen the worst trends in corruption, Angola and Equatorial Guinea, are not among them.'
        }
      ]
    }, // End of second  object in cards array
    {   // Card 2
      title: 'Bribes and Bureaucracy',
      menu: 'Bribes & Bureaucracy',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Why is corruption linked to bureaucratic burdens, opportunities for bribery. Highlight firm behavior report.'
      },
      map: {
        path: '../../data/main.csv',
        scale: [],
        classes: 'card-2-layer',
        translate: [],
        highlights: null,
        tooltip: true,
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['easeOfTrade'];
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Ease of Trade Index:<br />" + tooltipVal + " / 100";

        },
        load: function(index, js) { // ### do we need the 'js' parameter??
          // Color EEZ -- Ease of Trade score
          var layer = 'card-' + index + '-layer';

          d3.select('.card-eez-layer')
            .classed(layer, true); // in the data.issueArea.cards array
        },
        switch: function(index) {
          // Map the Ease of Trade score (WB)
          choropleth(index, 1, 'easeOfTrade');

          //  d3.select('.' + target).classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Bribes and Bureaucracy'
        },
        {
          tag: 'caption',
          text: 'How excessive bureaucracy brings bribe-seeking'
        },
        //###insert corruption infographic from Andrea
        // {
        //   tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Lighter shades indicate lower barriers and restrictions on international trade <br> Source: <a href="https://www.doingbusiness.org/" target="_blank">2017 World Bank Doing Business Report</a></em>'
        // },
        {
          tag: 'p',
          html: 'To effectively fight corruption and curtail bribe-seeking, states can review their bureaucracies and eliminate points where these activities are most likely to occur. Seaports should be a focal point in this search. Because more than 90% of sub-Saharan Africa’s international trade flows through its seaports, port administrators are uniquely positioned to demand bribes, permit illicit economic activity, and undermine good governance. A recent report by <em> The Economist </em> went as far as to call this behavior “onshore piracy.”<sup>1</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/rule-of-law/cross_border_corruption.png',
          alt: 'Pie graph showing African / non-Africa cross-border corruption.',
          caption: 'Source: United Nations Economic Commission for Africa'
        },
        {
          tag: 'p',
          html: 'Where the rule of law is weak, administrative gatekeepers can demand bribes before goods can continue to their next destination. The World Bank estimates that the resulting transit delays cost African economies billions of dollars each year, so it is no surprise that recent anti-graft efforts in Kenya, Tanzania, Mozambique, and elsewhere have resulted in high-profile removals of customs officials and port directors.<sup>2</sup>'
        },
        {
          tag: 'p',
          html: 'Solving this problem will require compliance from both African and non-African actors, as most of this kind of rent-seeking occurs as a transaction between an African recipient and non-African firm. Cooperation from the many multi-national corporations doing business in African seaports will be especially important. A 2016 report <sup>3</sup> from the United Nations Economic Commission for Africa found more than 99% of known cases of cross-border corruption in the region since 1994 involved non-African firms. These cases included simple bribery of port and customs authorities as well as more elaborate illicit financial schemes involving kickbacks, insurance fraud, money laundering, and selective enforcement of trade regulations.'
        },
        {
          tag: 'p',
          html: 'The cross-border corruption occurring in African seaports has detrimental spillover effects for other sectors. Preferential treatment of foreign firms, norms of rent-seeking, and corrupt officials can negatively influence the regulatory environment for domestic businesses that are far removed from international trade.'
        },
        {
          tag: 'img',
          src: '../../assets/rule-of-law/firm-behavior.jpeg',
          alt: 'Firm Behavior in Fragile States',
          caption: 'Firm Behavior in Fragile States by Dr Victor Owuor',
          link: 'http://oefresearch.org/publications/firm-behavior-fragile-states'
        },
        {
          tag: 'p',
          html: 'The recent <em> Firm Behavior in Fragile States </em> report on the issues facing small firms in fragile sub-Saharan economies highlights how excessive bureaucracy and regulation suppress business growth, impose unnecessary “facilitation fees,” and weaken judicial integrity. The report, based on field research in Somaliland, the Democratic Republic of the Congo, and South Sudan, strongly argues that informal non-governmental arrangements like business collectives, sector-specific cooperatives, and public-private partnerships must be part of the solution.'
        },
        {
          tag: 'p',
          html: 'Unless governments can rein in corruption and improve maritime trade governance, it will be difficult for governments, private associations, and institutions to promote a stronger rule of law and healthier business environment.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>1</sup> “Africa’s Ports: The Bottleneck,” The Economist, 19 March 2016.',
              url: 'https://www.economist.com/news/middle-east-and-africa/21695054-new-investment-alone-will-not-fix-africas-ports-governments-need-deal'
            },
            {
              org: '<sup>2</sup> Sandra Sequeria, “Investigating and Tackling Corruption in African Ports,” <em>Research Impact: Making a Difference</em> (The London School of Economics and Political Science, 2015).',
              url: 'http://www.lse.ac.uk/researchAndExpertise/researchImpact/PDFs/Sequeria.pdf'
            },
            {
              org: '<sup>3</sup> UN Economics Commission for Africa, “Measuring Corruption in Africa: The International Dimension Matters,” African Governance Report IV (2016).',
              url: 'https://www.uneca.org/sites/default/files/PublicationFiles/agr4_eng_fin_web.pdf'
            },
          ]
        }
      ]
    }, // End of third object in cards array
    // {   // Card 3
    //
    //   title: 'Weak Sovereignty',
    //   menu: 'Weak Sovereignty',
    //   metadata: {
    //     owner: 'Kelsey Soeth',
    //     description: 'Highlight an area that is under weak state control, poor governance - maybe the Bijagós in guinea-bissau.'
    //   },
    //   map: {
    //     path: '../../data/main.csv',
    //     scale: [],
    //     classes: 'card-eez-layer',
    //     translate: [],
    //     extent: [
    //       [-20, 14],
    //       [-3, 7]
    //     ],
    //     highlights: ['GNB'], // Guinea Bissau
    //     tooltip: false,
    //     load: function(index, js) {
    //       var layer = 'card-' + index + '-layer';
    //       // d3.select('.card-eez-layer')
    //       //   .classed(layer, true)
    //     },
    //     switch: function(target) {
    //       //  ### Need to figure out what this map will look like
    //
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Weak Sovereignty'
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'Weak local control undermines regional stability'
    //     },
    //     // {
    //     //   tag: 'legend',
    //     //   text: 'Map Legend',
    //     //   legendContent: '<em>The Bijagos are the island group off the coast of Guinea-Bissau.</em>'
    //     // },
    //     {
    //       tag: 'p',
    //       html: 'Weak state control is a particular problem for states with offshore territories, such as Guinea-Bissau. The Bijagós Islands are a group of 88 islands and islets located in the Atlantic Ocean. Only 23 of the islands are inhabited.<sup>4</sup>'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/rule-of-law/packets_cocaine_guinea_bissau.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'Packets of seized cocaine at a police station in Guinea-Bissau. Photo: Issouf Sanogo/AFP/Getty Images',
    //       caption: 'Packets of seized cocaine at a police station in Guinea-Bissau. Photo: Issouf Sanogo/AFP/Getty Images'
    //     },
    //     {
    //       tag: 'blockquote',
    //       html: '“The greatest fragility we have is the islands, many of them uninhabited, but still the drug traffickers use them as a depot and then transport [the drug] to the continent. On the other hand, even in those that are inhabited the presence of the state is weak, or in some cases nonexistent.” —Mamadu Djalo Pires, Minister of Justice, Guinea-Bissau, 2009; translated<sup>5</sup>', //### need closed brackets around the words "the drug" in this blockquote
    //       link: 'http://***.org/***' // What about internal references?
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Since the early 2000s, the isolated and practically autonomous islands have proven an attractive lure for Latin American drug cartels to use as a waystation for <a class="illicit-trade inline" href="../../illicit-trade#2">drug-smuggling operations</a> into Europe and Africa. The large swaths of uninhabited land are physically ideal for hiding drugs and speedboats, and the easy money of harboring drug smugglers is attractive to residents who have little to nothing to fear from a faraway authority with little capacity to enforce the law. The few patrol vessels belonging to Guinea-Bissau are not able to effectively monitor the islands due to their limited resources.<sup>6</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'To weaken transnational crime in the Bijagós Islands, Guinea-Bissau will need to continue to improve its offshore communications infrastructure and allocate resources to more effectively patrol its maritime territory. While Guinea-Bissau is ultimately responsible for maintaining the rule of law over the Bijagós Islands, combatting transnational crime requires international partnerships.'
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>4</sup> Adam Nossiter, "Bijagós, a Tranquil Haven in a Troubled Land," <em>The New York Times</em>, 4 November 2009,',
    //           url: 'http://www.nytimes.com/2009/11/08/travel/08Bijagos.html?mcubz=1'
    //         },
    //         {
    //           org: '<sup>5</sup> S.A, RTP, Rádio e Televisão de Portugal 2009 LUSA Agência de Notícias de Portugal. “Arquipélago Dos Bijagós Utilizado Como Depósito Dos Narcotraficantes.” Accessed September 28, 2017.',
    //           url: 'https://www.rtp.pt/noticias/mundo/arquipelago-dos-bijagos-utilizado-como-deposito-dos-narcotraficantes_n302245.'
    //         },
    //         {
    //           org: '<sup>6</sup> Amy Corbin and Ashley Tindall, "Bijagós Archipelago,” Sacred Land Film Project, 1 September 2007,',
    //           url: 'http://www.sacredland.org/bijagos-archipelago/'
    //         },
    //       ]
    //     }
    //   ]
    // }, // End of fourth  object in cards array
    // {   // Card 4
    //
    //   title: 'Gender Equality',
    //   menu: 'Gender Equality',
    //   metadata: {
    //     owner: 'Kelsey Soeth',
    //     guest: 'Our Secure Future',
    //     description: 'Partner with OSF to talk about inclusion of women, perhaps in national security strategies.'
    //   },
    //   map: {
    //     path: '../../data/main.csv',
    //     scale: [],
    //     classes: 'card-4-layer',
    //     translate: [],
    //     highlights: null,
    //     tooltip: true,
    //     tooltipHTML: function(iso) {
    //
    //       var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso]['inclusion'];
    //       tooltipVal = Math.round(tooltipVal * 100);
    //       return "Inclusion:<br />" + tooltipVal + " / 100";
    //
    //     },
    //     load: function(index, js) {
    //       // Color map with 'some aspect of inclusion' chloropleth ...
    //       d3.select('.card-eez-layer')
    //         .classed('card-' + index + '-layer', true);
    //     },
    //     switch: function(index) {
    //
    //       choropleth(index, 1, 'inclusion');
    //       // var target = 'card-' + index + '-layer';
    //       // var vals = issueAreaData[issueArea].metadata.countryData;
    //       // var valsArr = [];
    //       // vals.forEach(function(val) {
    //       //   valsArr.push(parseFloat(val.ia3c4));
    //       // });
    //       //
    //       // var max = d3.max(valsArr);
    //       // var min = d3.min(valsArr);
    //       // var range = max - min;
    //       //
    //       // vals.forEach(function(d, i) {
    //       //   console.log(d.ia3c4);
    //       //   d3.selectAll('.eez.' + d.iso3)
    //       //     .transition()
    //       //     .delay(i * 10)
    //       //     .style('fill', function() {
    //       //       return rampColor(1 - ((d.ia3c4 - min) / range));
    //       //     });
    //       // });
    //       //
    //       // d3.select('.' + target)
    //       //   .classed('invisible', false);
    //
    //       //setBGImg();
    //     }
    //   },
    //   els: [{
    //       tag: 'h1',
    //       text: 'Gender Equality'
    //     },
    //     {
    //       tag: 'caption',
    //       text: 'How women\'s inclusion strengthens the rule of law'
    //     },
    //     // {
    //     //   tag: 'legend',
    //     //   text: 'Map Legend',
    //     //   legendContent: '<em>Lighter shades indicate more gender-inclusive political systems. <br> Source: <a href="https://www.v-dem.net/en/" target="_blank">Varieties of Democracy</a></em>'
    //     // },
    //     {
    //       tag: 'p',
    //       html: 'Equal treatment under the law regardless of ethnicity, socioeconomic status, religion, subnational region, or gender is the basis of inclusive governance. Levels of inclusion vary greatly along the sub-Saharan coastline, though many states have made notable progress in this area, especially with regard to greater inclusion of women.'
    //     },
    //     {
    //       tag: 'img',
    //       src: '../../assets/rule-of-law/NetumboNandi-Ndaitwah_03-2015.jpg', // This should be on the Stable Seas Deck - comments
    //       alt: 'Deputy Prime Minister of Namibia Netumbo Nandi-Ndaitwah shakes hands with politician Penehupifo Pohamba. Photo: Benutzer:Chtrede',
    //       caption: 'Deputy Prime Minister of Namibia Netumbo Nandi-Ndaitwah shakes hands with politician Penehupifo Pohamba. Photo: Benutzer:Chtrede'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'As of 2016, 19 members<sup>7</sup> of the African Union had developed and adopted National Action Plans on Women, Peace, and Security, including several of the top-ranking coastal states included in this analysis. The objective of these National Action Plans is the implementation of UN Security Council Resolution 1325, which calls for increased participation and representation of women at all levels of decision-making in an effort to empower women to participate as equals in preventing conflict and peacebuilding. These agreements do not speak specifically to the role of women in improving maritime governance, but they are an important step toward formalizing women’s inclusion.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Several countries have improved women’s representation through new legislation and development-oriented partnerships with regional and global organizations. Senegal, for example, has been particularly successful at incorporating gender parity into its governance structures.'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'Following the 2010 adoption of a new law requiring gender parity for candidates for elected positions, women’s participation in local government tripled from 15.9% in 2009 to 47.2% in 2015. Furthermore, 20% of ministerial-level positions were held by women as of 2015. According to the most recent data from the Inter-Parliamentary Union and the World Bank, The Gambia, Ghana, Guinea-Bissau, Namibia, and Nigeria have even higher proportions of women in high-level political positions.<sup>8</sup>'
    //     },
    //     {
    //       tag: 'p',
    //       html: 'As Sierra Leone emphasized in its national security strategy following its devastating civil war, poverty and a lack of social cohesion are national security threats that require civilian engagement to counter. To this end, Somalia is promoting women’s economic empowerment through a number of fisheries projects by the Food and Agriculture Organization of the United Nations (FAO). These projects include training women boat-builders and adding value to post-harvest fish catches. One community organizer working with the project notes:'
    //     },
    //     {
    //       tag: 'blockquote',
    //       html: '“It is important to have women involved in these activities since their contributions have a big influence on ensuring stronger household level financial management and food security that will directly benefit their families.”',
    //       source: 'Ms. Shukri Ahmed Mohamed, community organizer with FAO Somalia<sup>9</sup',
    //       link: '#'
    //     },
    //     {
    //       tag: 'p',
    //       text: 'Programs like this, when coupled with equal property and business rights for women, can greatly expand licit opportunities in coastal economies. Equal application of the rule of law across society is necessary for good governance. Whether gender equality is achieved through legislated parity or economic initiatives, the equal application of the rule of law can only help the region achieve peace and security and alleviate poverty.'
    //     },
    //     {
    //       tag: 'links',
    //       items: [{
    //           org: '<sup>7</sup> Semiha Abdulmelik, “Implementation of the Women, Peace, and Security Agenda in Africa,” The African Union Commission, July 2016.',
    //           url: 'http://www.un.org/en/africa/osaa/pdf/pubs/2016womenpeacesecurity-auc.pdf'
    //         },
    //         {
    //           org: '<sup>8</sup> Ibid.'
    //         },
    //         {
    //           org: '<sup>9</sup> "Promoting Gender in Fisheries Activities in Somalia," Food and Agriculture Organization of the United Nations, accessed 28 August 2017.',
    //           url: 'http://www.fao.org/blogs/blue-growth-blog/promoting-gender-in-fisheries-activities-in-somalia/en/'
    //         },
    //       ]
    //     }
    //   ]
    // }, // End of fifth  object in cards array
    {   // Card 5

      title: 'Methodology',
      menu: 'Methodology',
      metadata: {
        owner: 'Curtis Bell',
        description: 'Methods.'
      },
      map: {
        scale: [],
        classes: 'card-5-layer',
        translate: [],
        highlights: null,
        tooltip: true,
        tooltipHTML: function(iso) {

          var tooltipVal = issueAreaData[issueArea].metadata.countryData[iso].index;
          tooltipVal = Math.round(tooltipVal * 100);
          updatePointer(tooltipVal);
          return "Rule of Law:<br />" + tooltipVal + " / 100";

        },
        load: function(index, csv) { // ### *** This only should be for the first card ...
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
          tag: 'h3',
          text: 'Methodology'
        },
        // { tag: 'legend',
        //   text: 'Map Legend',
        //   legendContent: '<em>Lighter shades indicate higher Rule of Law scores.</em>'
        // },
        // { tag: 'p',
        //    html: 'The Rule of Law score considers five concepts that are central to good governance: corruption, government efficacy, government efficiency, judicial integrity, and inclusion. We calculate these five scores and then average them across the five areas. We provide an overview of our methodology below and a complete summary in the <a href="../../data" target="_blank">Technical Notes</a>.'
        // },
        // { tag: 'h4',
        //   text: 'Corruption'
        // },
        // { tag: 'p',
        //    html: 'Corrupt officials fail to enforce policy and thus enable transnational crime, and corruption in maritime governance and maritime trade is especially problematic because nearly all of Africa’s international economic activity—both legitimate and illicit—transits the maritime space. Many organizations have created corruption measures already, so we adapt the Corruption Perceptions Index by Transparency International (TI). This measure averages 13 other corruption indicators and scores states on a scale from 0 to 100, with more corrupt countries earning lower scores. TI’s methodology prevents nearly every state from exceeding 80, so we divide each country’s score by 80 to achieve a more reasonable high benchmark.'
        // },
        // { tag: 'h4',
        //   text: 'Government Efficacy'
        // },
        // { tag: 'p',
        //   html: 'Ineffective governments cannot enforce policy, which hinders a state’s ability to secure its maritime space and prevent illicit maritime activities. We measure efficacy by rescaling the Functioning of Government score from Freedom House. This score, published as part of the annual <em> Freedom in the World report </em>, reflects expert responses to questions like “Do non-state actors, including criminal gangs, the military, and foreign governments, interfere with or prevent elected representatives from adopting and implementing legislation and making meaningful policy decisions?” and “Are there independent and effective auditing and investigative bodies that function without impediment or political pressure or influence?”'
        // },
        // { tag: 'h4',
        //   text: 'Government Efficiency'
        // },
        // { tag: 'p',
        //   html: 'Governments that have unnecessary administrative and bureaucratic hurdles provide more opportunities for bribery and corruption, especially as these systems relate to trade, customs, and international migration. Each year, the World Bank gauges government efficiency in several areas, one of which is “Trading Across Borders.” This score is computed from expert estimates of the amount of time and money required to move a standard shipping container into the country. The measure is especially relevant for efficiency in African maritime governance, as the region’s international trade transits almost exclusively through seaports.'
        // },
        // { tag: 'h4',
        //   text: 'Judicial Integrity'
        // },
        // { tag: 'p',
        //   html: 'Judicial integrity is important to the enforcement of existing laws and ensuring that the de jure regulations are de facto conditions. Where judges are bribed and laws go unenforced, the rule of law is too weak for policies aimed at the maritime domain to be effective. We capture this concept using three variables from the Varieties of Democracy Project, a leading dataset on the strength of governance around the world. Specifically, we create a Judicial Integrity score from three measures that score how often (1) the government attacks the judiciary in public, (2) corrupt or inept judges are held accountable and removed from office, and (3) individuals and businesses pay bribes in return for favorable or speedy decisions.'
        // },
        // { tag: 'h4',
        //   text: 'Inclusion'
        // },
        // { tag: 'p',
        //   html: 'We gauge political inclusion with five measures from the Varieties of Democracy Project. These data are collected both globally and annually and they cover unequal treatment of the law according to social group identification (i.e., ethnic groups), subnational region, religion, socioeconomic status, and gender. Note that this is a measure of equal treatment under the law, and not the absolute provision of liberal and transparent governance. Non-democratic states can score well if the law is equally applied across all five of these social divisions.'
      ]
    }
  ]
}
