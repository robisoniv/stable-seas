var fisheriesData = {
  metadata: { // Independent data source for each page
    version: '0.0.2',
    name: 'Fisheries',
    updates: true,
    /*
         here is where you write updates
         do one line per update, like
         added legend to card 3
         added citations to card 5
         input thumbnail path to card 4
         loaded point data

         */
    index: 7,
    code: 'fisheries',
    path: 'fisheries',
    countryData: {},
    csv: '../../data/fisheries/fisheries.csv',
    color: '#06A89D',
    order: -1,
    description: 'Fish are one of the last remaining wild sources of protein on the planet, and are a critical component of both food and economic security.'
  },
  load: function(csv, callback) {
    var md = issueAreaData[issueArea].metadata;

    d3.csv(csv, function(vals) {
      vals.forEach(function(d) {
        d.ia7c0 = +d.ia7c0;
        d.ia7c2 = +d.ia7c2;
      });
      issueAreaData[issueArea].metadata.countryData = vals;
      callback('coastalWelfare load csv function callback');
    });

    d3.csv('../../data/' + md.path + '/indexValues.csv', function(vals) {

      issueAreaData[issueArea].metadata.indexData = vals;

    });
  },
  cards: [{ // Card 0
      title: 'Fisheries',
      menu: 'Fisheries',
      metadata: {
        owner: 'Sarah Glaser',
        description: 'Introduces the issue.'
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
          var layer = 'card-' + index + '-layer';
          var l = d3.select('.card-eez-layer')
            .classed(layer, true);

        },
        switch: function(index) {
          d3.selectAll('.eez')
            .classed('active', true);

          switchMainIndex(index);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Fisheries',
        },
        {
          tag: 'caption',
          text: 'A critical component of food and economic security'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Lighter shades indicate a lower share of the reported marine fishing catch is caught by foreign fishing vessels</em> <br> Source: <a href="http://www.seaaroundus.org/" target="_blank">Sea Around Us</a>'
        },
        {
          tag: 'p',
          html: 'Fish are one of the last remaining wild sources of protein on the planet and they are a critical component of both food and economic security around the world. Fish provide a low-fat source of vitamins, iron, and calcium for billions of people, especially in countries designated as Low-Income Food-Deficit Countries by the UN Food and Agriculture Organization (FAO).<sup>1</sup>'
        },

        // { tag: 'h3',
        //   text: 'The Fisheries Scores'
        // },
        // {tag: 'indexTable'
        // },
        // { tag: 'caption',
        //   text: 'Note: scores are rounded to the nearest whole number.'
        // },
        {
          tag: 'p',
          html: 'In Africa, fisheries employ 5.6 million people as fishers or fish farmers and international trade in fisheries products is a pillar of national economies, particularly in Cabo Verde and Seychelles.<sup>2</sup>'
        },
        {
          tag: 'p',
          html: 'Tuna and small, schooling fishes like sardines and anchovies make up the vast majority of global fish catch, and these migratory species tend to ignore national borders. As fish stocks face shortages and even collapse, competition for fishing grounds and for this mobile resource is growing.'
        },
        {
          tag: 'p',
          html: 'At sea, fisheries conflict can include violent attacks by foreign industrial vessels on domestic artisanal vessels; illegal, unreported, and unregulated (IUU) fishing; <a class="inline maritime-mixed-migration" href="../../maritime-mixed-migration#5">forced labor and slavery;</a> and <a class="inline international-cooperation" href="../../international-cooperation#2">territorial disputes</a> between and within national borders.'
        },
        {
          tag: 'p',
          html: 'Fishing vessels can also be used to surreptitiously transport weapons, drugs, and other illicit goods. Fisheries therefore contribute directly and indirectly to maritime security by stoking territorial and resource-based conflicts and by providing food and income that produce community resilience and reduce the root causes of conflict.'
        },
        // { tag: 'p',
        //    html: 'Our Fisheries Score considers five factors: presence of foreign fishing fleets, domestic fisheries law, membership in relevant regional fisheries management organizations (RFMOs), coastal pollution, and ecological health of fisheries. For more information about how these scores are calculated, please see our <a class="internal-ref inline fisheries" href="#" data-link="6">Methodology</a>'
        //  },
        {
          tag: 'p',
          html: 'When fisheries are abundant and well managed, they can contribute to maritime security by boosting national economies, local livelihoods, and nutrition. Nations that have formal governance mechanisms and strong fisheries laws are better able to monitor and enforce policies that support healthy fisheries. Likewise, clean waters and healthy fish stocks support economic growth and reinforce governance norms.'
        },
        {
          tag: 'p',
          html: 'Nations that do not prioritize fisheries management and governance are not fully leveraging a critical natural resource and may lose profits and food to larger, faster foreign and distant-water fishing fleets.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>1</sup> Low-Income Food-Deficit Countries, or LIFDCs, are defined by the UN FAO as countries that have an annual net income per person at a level that qualifies for International Development Association assistance (currently $1,395 per person) and are net importers of food; “Low-Income Food-Deficit Countries,” The Food and Agriculture Organization of the United Nations, accessed 1 September 2017.',
              url: 'http://www.fao.org/focus/e/SpeclPr/LIFDCs.htm'
            },
            {
              org: '<sup>2</sup> <em>The State of World Fisheries and Aquaculture 2016</em> (Rome: The Food and Agriculture Organization of the United Nations, 2016).',
              url: 'http://www.fao.org/3/a-i5555e.pdf'
            },
          ]
        }
      ] // end of els array
    },
    { // Card 1
      title: 'IUU Fishing',
      menu: 'IUU Fishing',
      metadata: {
        owner: 'Sarah Glaser',
        description: 'How IUU fishing undermines security, with link to maritime mixed migration and slavery at sea.'
      },
      map: {
        path: '../../data/ia7c1.csv',
        scale: [],
        classes: '',
        translate: [],
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {
          var layer = 'card-' + index + '-layer';
          // Load point data from Stimson Center research
          d3.csv(file, function(rows) {
            rows.forEach(function(d) {
              d.lat = +d.lat;
              d.lon = +d.lon;
            });

            var iuuIncidents = mapg.append('g')
              .classed('card-layer invisible ' + layer, true);

            iuuIncidents.selectAll('.iuu-incidents')
              .data(rows)
              .enter()
              .append('circle')
              .attr('cx', function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr('cy', function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr('r', '8px')
              .classed('iuu-incidents', true);

          })
          // Class GIS layer with layer:
          d3.select(layer)
            .classed('invisible', true);
        },
        switch: function(index) {
          d3.select('.card-' + index + '-layer')
            .classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          html: 'Illegal, Unreported, and Unregulated Fishing',
        },
        {
          tag: 'caption',
          text: 'Fueling maritime insecurity'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Reported incidents of IUU fishing that converge with US national or regional security in sub-Saharan Africa during 2016. <br> Source: <a href="https://www.stimson.org/" target="_blank">Stimson Center</a></em>'
        },
        {
          tag: 'p',
          html: 'Illegal, unreported, and unregulated (IUU) fishing exacerbates maritime insecurity and fuels armed conflict at sea, undermines national and international governance, and threatens the sustainability of fisheries. IUU fishing costs Mauritania, Senegal, The Gambia, Guinea-Bissau, and Sierra Leone $2.3 billion per year.<sup>3</sup>  About 37% of all fish catch off West Africa and 18% off East Africa is considered illegal or unreported.<sup>4</sup>  Foreign unregulated fishing accounts for twice as much fish catch as that made by the domestic artisanal fishing fleet in Somali waters.<sup>5</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/fisheries/legal-vs-illegal-fishing.png', // This should be on the Stable Seas Deck - comments
          alt: 'Source: Agnew, et al, (2009) Estimating the Worldwide Extent of Illegal Fishing, PLoS One, 4(2)',
          caption: 'Source: Agnew, et al, (2009) Estimating the Worldwide Extent of Illegal Fishing, PLoS One, 4(2)'
        },
        {
          tag: 'p',
          html: 'While good estimates can be difficult to make, the emerging picture is clear: IUU fishing deprives African fishers of a significant source of income, and much of it is driven by distant-water fishing fleets from Europe and Asia.'
        },
        {
          tag: 'p',
          html: 'Illegal fishing occurs in contravention of local, national, regional, or international law and can include fishing with banned gear, in closed locations or seasons, or without proper permission. Unreported fishing refers to fish catch that is not fully recorded or reported to proper authorities, often entering an illegal market. Unregulated fishing is that which occurs in areas lacking regulations to ensure resource sustainability and good management.'
        },
        //Possibly delete paragraph above if comms can produce usable infographic
        {
          tag: 'p',
          html: 'Fortunately, growing attention to the challenge represented by IUU fishing and strong international will to solve this problem have produced a host of projects, alliances, and policies. The non-profit organization, <a href="https://stopillegalfishing.com/" target="_blank">Stop Illegal Fishing</a>, has made significant progress in Africa by bringing attention to the problem of illegal fishing and partnering with governments, NGOs, civil society, and the fishing industry to stop illegal fishing in African waters. The <a href="http://www.naturalsecurityforum.org/" target="_blank">Stimson Center’s Natural Security Forum</a> is tracking and mapping IUU fishing around the world. <a href="http://www.globalfishingwatch.org" target="_blank">Global Fishing Watch</a>, a partnership between the Leonardo DiCaprio Foundation, Oceana, Google, and SkyTruth, is using satellite data to track and monitor fishing vessels around the world.'
        },
        {
          tag: 'p',
          html: 'Additionally, in 2016 the Port State Measures Agreement (PSMA) entered into force with ratification by 25 countries, including Cabo Verde, Gabon, The Gambia, Ghana, Guinea, Madagascar, Mauritius, Mozambique, Sao Tome & Principe, Senegal, Seychelles, Somalia, South Africa, and Togo. The PSMA is an international treaty written by the UN Food and Agriculture Organization that strengthens enforcement and monitoring capabilities at ports to reduce the amount of IUU fish entering global marketplaces. The strong support from African nations is a promising sign of political will to increase maritime domain awareness around fisheries issues and to prioritize the health of wild fisheries.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>3</sup> Alkaly Doumbouya, Ousmane T. Camara, Josephus Mamie, Jeremias F. Intchama, Abdoulie Jarra, Salifu Ceesay, Assane Guye, Diene Ndiaye, Elye Beibou, Allan Padilla, and Dyhia Belhabib, “Assessing the Effectiveness of Monitoring Control and Surveillance of Illegal Fishing: The Case of West Africa,” <em>Frontiers in Marine Science</em> 50, no. 4 (2017), doi: 10.3389/fmars.2017.00050.'
            },
            {
              org: '<sup>4</sup> D.J. Agnew, J. Pearce, G. Pramod, T. Peatman, R.A. Watson, J.R. Beddington, and T.J. Pitcher, “Estimating the Worldwide Extent of Illegal Fishing,” <em>PloS One</em> 4, no. 2 (2009), e4570.',
              url: 'http://doi.org/10.1371/journal.pone.0004570'
            },
            {
              org: '<sup>5</sup> Sarah Glaser, Paige Roberts, Robert Mazurek, Kaija Hurlburt, and Liza Kane-Hartnett, <em>Securing Somali Fisheries</em> (Denver: One Earth Future, 2015), doi: 10.18289/OEF.2015.001.'
            },
          ]
        }
      ] // end of els array
    },
    { // Card 2
      title: 'Fisheries Laws',
      menu: 'Fisheries Laws',
      metadata: {
        owner: 'Kelsey Soeth',
        description: 'How we define good policy, development of legislation, enforcement.'
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
          switchMainIndex(index);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Fisheries Laws',
        },
        {
          tag: 'caption',
          text: 'National efforts to protect a vital resource'
        },

        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Lighter shades indicate stronger national fisheries legislation.</em>'
        },
        {
          tag: 'p',
          html: 'Minimizing conflict around fisheries requires strong national policies and resource governance, and most African states have enacted domestic fisheries legislation. We identified key factors these policies should include: legislative provisions that remain in force, an observer program, data collection, foreign-vessel licensing, restrictions on foreign vessels, gear restrictions, endangered species protections, artisanal fisher protections, and catch limits based on maximum sustainable yield (MSY).<sup>6</sup>'
        },
        {
          tag: 'img',
          src: '../../assets/fisheries/Somaliland_fisherman_8S6A1185_JP_photo.jpg',
          alt: '',
          caption: ''
        },

        // { tag: 'p',
        //   html: 'By our criteria, the African nations considered here scored well. More than one-third of the states had provisions for at least seven of nine factors in their fisheries legislation. All countries but Cameroon, which recently repealed their domestic fisheries legislation without replacement, have current federal fisheries legislation in place. Gear restrictions and provisions for the collection of scientific and statistical data were commonly mandated. Two-thirds of countries have also included foreign-vessel licensing and protections for artisanal fishers in their legislation.'
        // },
        {
          tag: 'blockquote',
          html: '“Seeing the results of the Pristine Seas expedition made me realize that our marine ecosystems were as rich and as precious as our better-known rain forests, and that we had to do for the oceans what my father, the late President Omar Bongo Ondimba, did for the forests when he created 13 national parks in 2002.” — President Ali Bongo Ondimba of Gabon'
        },
        {
          tag: 'p',
          html: 'Endangered species protection was the only legislative factor included by fewer than one-third of states. However, a lack of endangered species protection in fisheries legislation does not necessarily indicate a lack of commitment to the protection of the marine environment. Gabon, for example, lacks explicit provisions for endangered species protection in its fisheries legislation, but Gabonese president Ali Bongo Ondimba announced at the 2017 UN Oceans Conference the creation of one of the African continent’s largest marine protected areas. The network of marine parks and aquatic reserves will protect 53,000 square kilometers of ocean, 27% of Gabon’s territorial waters. Gabon joins South Africa, Kenya, and Mauritius, among others, in hosting a marine protected area within its EEZ.'
        },
        //   { tag: 'p',
        //   html: 'While strong scores imply fairly robust fisheries management systems across the majority of African coastal states, in many cases they belie reality. Legislation alone is not indicative of capacity to enforce. Though the will to manage fisheries using modern legislative provisions is evident, and a heartening development after the purely mercantilist nature of colonial-era fisheries legislation, it is not sufficient for African fisheries to be managed solely on paper. States must proactively use these legislative provisions to cut down on illegal fishing activity and protect their resources.'
        // },
        {
          tag: 'links',
          items: [{
            org: '<sup>6</sup> Paige M. Roberts, Laura C. Burroughs, and Robert H. Mazurek, “An Exploration of Federal Fisheries Management Agencies in Eastern Africa,” Secure Fisheries, 2017.',
            url: 'http://dx.doi.org/10.18289/OEF.2017.014'
          }, ]
        }
      ] // end of els array
    },
    { // Card 3
      title: 'FISH-i Africa',
      menu: 'FISH-i Africa',
      metadata: {
        owner: 'Robert Mazurek',
        description: 'Description and case study from Fish-I Africa, a partnership and information sharing center comprised of 8 east African nations with a focus on IUU fishing in Western Indian Ocean.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        extent: [
          [15, -60],
          [120, 45]
        ],
        //          highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {
          // There might not be any load on this??
          var layer = 'card-' + index + '-layer';
          d3.select('.card-eez-layer')
            .classed(layer, true);
        },
        switch: function(index) {
          var layer = 'card-' + index + '-layer';
          var incl = ['COM', 'KEN', 'MDG', 'MUS', 'MOZ', 'SYC', 'SOM', 'TZA'];
          var color = rampColor(1);
          d3.selectAll('.eez.active')
            .classed('style', null)
            .classed('invisible', true);

          incl.forEach(function(iso3, i) {


            d3.selectAll('.eez.' + iso3) // ### wtf
              .classed('active', true)
              .transition().delay(i * 20)
              .style('stroke', function() {
                //console.log(iso3);
                return rampColor(1);
              });

            d3.selectAll('.country.' + iso3)
              .classed('active', true)
              .transition().delay(i * 20)
              .style('fill', function() {
                return rampColor(0.5);
              })
              .style('stroke', rampColor(1));
          });
        }
      },
      els: [{
          tag: 'h1',
          text: 'The Success of FISH-i Africa',
        },
        {
          tag: 'caption',
          text: 'Information sharing and international coordination'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: '<em>Shaded countries are participants in FISH-i Africa</em>'
        },

        {
          tag: 'p',
          html: 'The Western Indian Ocean is one of the world’s hotspots for illegal fishing and, in 2012, FISH-i Africa  was formed to improve cooperation and intelligence-sharing in order to combat illegal fishing operators. FISH-i Africa comprises eight countries—Comoros, Kenya, Madagascar, Mauritius, Mozambique, Seychelles, Somalia, and the United Republic of Tanzania. These task force countries work principally through national fisheries enforcement officers using cooperation, coordination, and shared tools to take legal action against illegal fishing vessels.'
        },
        {
          tag: 'video',
          videoId: 'CHbVYBllqtI',
          thumb: '../../assets/fisheries/Fish-i-Africa_video.jpg'
        },
        {
          tag: 'blockquote',
          html: '“We are very proud of the success we have had in tackling illegal fishing in the Western Indian Ocean. Unless we can create compliant fisheries, all efforts for a sustainable seafood sector are undermined.” —Per Erik Bergh, FISH-i Africa'
        },
        {
          tag: 'p',
          html: 'Since its inception, FISH-i Africa has coordinated law enforcement responses to suspected IUU fishing vessels. In 2015, the task force started tracking <em>Poseidon</em> and <em>Al-Amal</em>, two fishing vessels exhibiting suspicious behavior off Somalia and Kenya.  In response, FISH-i Africa:'
        },
        {
          tag: 'ul',
          rows: ['identified <em>Poseidon</em> and <em>Al-Amal</em> as high-risk vessels;', 'analyzed additional satellite tracking data and investigated company ownership;', 'engaged partners at the FAO, the UN Office on Drugs and Crime, the European Union’s counter-piracy military operation off the Horn of Africa (EUNAVFOR), Secure Fisheries, and the Kenyan authorities; and', 'provided support to Kenyan and Somali authorities during inspections of the vessels.']
        },
        {
          tag: 'p',
          html: 'In January 2015, Somali authorities arrested <em>Poseidon</em> for illegal fishing, and a $1.5 million fine was reportedly paid for the ship’s release. The ship then left with <em>Al-Amal</em> for Kenya. Inspections by Kenyan authorities raised questions about possible illegal transshipments (unreported transfers of fish) by the two vessels in Somali waters; <em>Poseidon</em> had been operating for six weeks at sea but the vessel did not contain any fish. Analysis of the movements of the vessel, undertaken by FISH-i Africa, also indicated transshipment activity. The registrations of both vessels were unclear, as was the validity of their fishing licenses.'
        },
        {
          tag: 'p',
          html: 'The evidence uncovered by FISH-i Africa and partners likely made it more difficult for these two vessels to offload their catch. Today, <em>Al-Amal</em> is sunk off the coast of Somalia and <em>Poseidon</em> is for sale in Yemen.'
        },
        {
          tag: 'links',
          items: [{
            org: '<sup>7</sup> FISH-i Africa, “Investigation No. 6: Mysterious Operations on the Somali Coast,” 2017.',
            url: 'https://www.fish-i-africa.org/what-we-do/fish-i-investigations/'
          }, ]
        }
      ] // end of els array
    },
    { // Card 4
      title: 'Coastal Resources in Mogadishu',
      menu: 'Coastal Resources in Mogadishu',
      metadata: {
        owner: 'Paige Roberts',
        description: 'Visualizing the interactions among disparate uses of the marine space means they can be managed effectively to support economic sustainability in all the relevant sectors and avoid conflict over this multi-use space.'
      },
      map: {
        scale: [],
        classes: '',
        translate: [],
        extent: [
          [45, 1.9],
          [46.3, 2.1]
        ],
        path: '../../data/fisheries/mogadishu-updated.js',
        highlights: [],
        tooltip: true,
        units: {
          text: 'xo units',
          multiplier: 100
        },
        load: function(index, file) {
          var layer = 'card-' + index + '-layer';

          var mogg = mapg.append('g')
            .classed('card-layer mogadishu-resources ' + layer, true);

          d3.json(file, function(error, json) {
            var bufferJSON = json.buffer,
              coralJSON = json.coral,
              landingJSON = json.landing;


            var coral = mogg.append('g')
              .classed('mog-coral', true);

            var buffer = mogg.append('g')
              .classed('mog-buffer', true);

            var landing = mogg.append('g')
              .classed('mog-landing', true);



            buffer.selectAll('.buffer-24nm')
              .data(bufferJSON.features)
              .enter()
              .append('path')
              .attr('d', path)
              .classed('buffer-24nm', true);

            //  console.log(coralJSON);
            coral.selectAll('.coral')
              .data(coralJSON.features)
              .enter()
              .append('path')
              .attr('d', path)
              .classed('coral', true)
              .style('fill', function(d) {
                return rampColor(d.properties.THREAT / 1500); // 1500 is the max value of THREAT
              });

            landing.selectAll('.landing-sites') // circles?? ###
              .data(landingJSON.features)
              .enter()
              .append('circle')
              .attr('cx', function(d) {
                return projection(d.geometry.coordinates)[0];
              })
              .attr('cy', function(d) {
                return projection(d.geometry.coordinates)[1];
              })
              .attr('r', function(d) {
                var radius;
                if (d.properties.Boats == 0) {
                  radius = '0.07px'
                } else {
                  radius = (d.properties.Boats) / 510 + 'px'
                }
                return radius;
              })
              .style('fill', function() {
                return rampColor(1);
              })
              .classed('landing-sites', true);

          });

          d3.json('../../data/fisheries/mog-roads.json', function(error, json) {
            // Make this file smaller and roll it in with the mogadisu.js ... ###
            var roads = mogg.append('g')
              .classed('mog-roads', true);

            roads.selectAll('.mog-roads')
              .data(topojson.feature(json, json.objects.roads).features)
              .enter()
              .append('path')
              .attr('d', path)
              .classed('mog-road', true)
              .style('stroke-width', '0.002px');
          });

          var mogCoords = [45.25, 2.09];
          d3.select('.labels').append('text')
            .classed('mogadishu-label card-layer invisible', true)
            .attr('x', function() {
              return projection(mogCoords)[0];
            })
            .attr('y', function() {
              return projection(mogCoords)[1];
            })
            .text('Mogadishu');

          d3.select('.' + layer)
            .classed('invisible', true);
        },
        switch: function(index) {
          d3.selectAll('.card-' + index + '-layer')
            .classed('invisible', false);

          d3.select('.mogadishu-label')
            .classed('active', true)
            .classed('invisible', false);
        }
      },
      els: [{
          tag: 'h1',
          text: 'Managing Coastal Resources in Mogadishu',
        },
        {
          tag: 'caption',
          text: 'Mapping potential conflict triggers'
        },
        {
          tag: 'legend',
          text: 'Map Legend',
          legendContent: 'Circles represent Somali fish landing sites. Larger circles indicate more boats. Blue cells show coral reefs. Light blue represents undisturbed reefs and dark blue represents reefs most at risk of degradation from human activities. <br>Source: <a href="http://securefisheries.org/somali-coastal-resources" target="_blank">Project Badweyn.</a>'
        },
        {
          tag: 'p',
          html: 'Healthy fisheries are about more than just the fish; fisheries are the nexus between the fish and the people who depend on them for their livelihoods. Fisheries involve every level of the value chain: catching fish, processing them, selling them, exporting them, and eating them. Maintaining healthy fisheries therefore requires a comprehensive view of the marine environment, the fishes, and the associated human activities.'
        },
        {
          tag: 'img',
          src: '../../assets/fisheries/managing_coastal_resources.png',
        },
        {
          tag: 'p',
          html: 'On the Somali coast, fisheries present potential for development, especially at the small, artisanal scale. But the fish stocks coastal communities depend upon are at risk if they are not managed well. An exercise in which the overlaps among various uses of the marine space are literally visualized can promote effective management and economic sustainability by identifying relevant sectors and minimizing conflict over this multi-use space.'
        },
        {
          tag: 'p',
          html: '<em><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2233959" target="_blank">Project Badweyn: Mapping Somali Coastal Resources</a></em> provides a tool for understanding the marine environment and how it is impacted by human activities such as shipping and coastal development.'
        },
        {
          tag: 'p',
          html: 'Mogadishu is an area that demonstrates how different uses of the marine space overlap and where actions might be taken to improve governance and sustainable use of the space. Mogadishu is a major coastal urban area with a rapidly growing population of over 2 million.<sup>8</sup>  Somali waters support this capital city by providing food from fisheries and jobs in many sectors, including in fisheries and at the large port.'
        },
        {
          tag: 'p',
          html: 'The growing city also poses a threat to the marine habitats that are home to the fish the artisanal fishing sector depends on. Coral reefs off the coast of Mogadishu support highly diverse marine life, but the ecosystem is sensitive and can be irreparably damaged by pollution, physical destruction, and overfishing.<sup>9</sup> Not only will increased fishing and shipping traffic<sup>10</sup> impact coral reefs, increasing pollution from the city will further degrade the health of this ecosystem, possibly beyond repair.'
        }, //###insert photo of mogadishu
        {
          tag: 'p',
          html: 'The vision for the future of the waters and fisheries around Mogadishu must account for the potential impacts of intense urban and industrial growth. Regulations on shipping lanes and traffic intensity could guide maritime traffic to avoid artisanal fishing areas and coral reefs while limiting ecosystem damage. Infrastructure must be in place to limit urban pollution such as drainage and sewage. The fishery itself must be protected from overfishing and other destructive fishing practices through placing limits on catch and the use of destructive gear. Implementing this type of holistic management now will protect these vital resources for the future.'
        },
        {
          tag: 'links',
          items: [{
              org: '<sup>8</sup> Helen Massy-Beresford, “Where is the Fastest-Growing City in the World?” <em>The Guardian</em>, 18 November 2015.',
              url: 'https://www.theguardian.com/cities/2015/nov/18/where-is-the-worlds-fastest-growing-city-batam-niamey-xiamen'
            },
            {
              org: '<sup>9</sup> Laura Burke, Kathleen Reytar, Mark Spalding, and Allison Perry, <em>Reefs at Risk Revisited</em> (Washington, D.C.: World Resources Institute, 2011): chap. 3.',
              url: 'http://www.wri.org/sites/default/files/pdf/reefs_at_risk_revisited.pdf'
            },
            {
              org: '<sup>10</sup> “Marine Problems: Shipping,” the World Wildlife Federation, accessed 8 August 2017.',
              url: 'http://wwf.panda.org/about_our_earth/blue_planet/problems/shipping/'
            },
          ]
        }
      ] // end of els array
    },
    // { // Card 5
    //   title: 'Methodology',
    //   menu: 'Methodology',
    //   metadata: {
    //     owner: 'Sarah Glaser',
    //     description: 'Methods.'
    //   },
    //   map: {
    //     scale: [],
    //     classes: 'card-5-layer',
    //     translate: [],
    //     highlights: null,
    //     load: function (index, file) {  // ### *** This only should be for the first card ...
    //       // Color EEZ according to master Stable Seas index
    //       var layer = 'card-'+index+'-layer';
    //
    //       d3.select('.card-eez-layer')
    //         .classed(layer, true);
    //     },
    //     switch: function (index) {
    //       switchMainIndex(0);
    //     }
    //   },
    //   els: [
    // { tag: 'h1',
    //   text: 'Methodology'
    // },
    // { tag: 'legend',
    //   text: 'Map Legend',
    //   legendContent: '<em>Map showing subindx scores</em>'
    // },
    // { tag: 'p',
    //    html: 'The Fisheries Score incorporates five factors relevant to fisheries-related conflict and healthy fisheries: presence of foreign fishing vessels, strength of domestic fisheries law, membership in regional fisheries management organizations (RFMOs), marine pollution, and biological health of the fishery. We calculate scores for these five factors and then average them with equal weighting for each factor. We provide an overview of our methodology below and a more complete technical summary in the supporting materials for download.'
    // },
    // { tag: 'h4',
    //    text: 'Foreign Fishing'
    // },
    // { tag: 'p',
    //    html: 'The presence of foreign fishing vessels in EEZ waters can be a cause of maritime insecurity and conflict. In African waters, domestic fishing fleets tend to be small-scale and artisanal, using small boats and gear. Foreign vessels, especially those from distant-water fleets that have traveled thousands of miles to fish, are larger, faster, and use larger gear. This can cause direct conflict between domestic and foreign vessels. In some African countries, foreign vessels have been accused of destroying artisanal gear, crowding out smaller boats, destroying marine habitat, and depleting fisheries resources. Case studies in both East and West Africa demonstrate IUU fishing is often related to, and even caused by, the presence of foreign fishing vessels in a nation’s waters. This is not universally true, and some nations that host large foreign fleets have low levels of IUU fishing. Likewise, not all foreign vessels perpetuate conflict. Given the lack of a comprehensive and comparative estimate of IUU fishing in EEZs, we calculate the percent of total fish catch made by foreign vessels within an EEZ. We use data collected and maintained by the Sea Around Us that assigns all fish catch in an EEZ to a given country based on the flag of the ship catching fish.'
    // },
    // { tag: 'h4',
    //    text: 'Domestic Fisheries Law'
    // },
    // { tag: 'p',
    //    html: 'Strong domestic fisheries laws include clear directives for management, provisions for enforcement, and mandates for data collection that inform fisheries management plans. When governments have strong fisheries laws, conflict is minimized through clear guidelines on access rights and approved fishing methods. We measure the strength of domestic fisheries laws by coding each piece of legislation, which are housed online by the FAO,<sup>11</sup>  for mandates on the following: the existence of a law, an observer program, data collection, foreign-vessel licensing, restrictions on foreign vessels, gear restrictions, endangered species protections, protections for artisanal (domestic) fishers, and catch limits based on maximum sustainable yield. The sub-score is calculated by summing the number of mandates in each piece of legislation and dividing by the maximum possible.'
    // },
    // { tag: 'h4',
    //    html: 'Regional Fisheries Management Organization Membership'
    // },
    // { tag: 'p',
    //    html: 'Governments that engage and collaborate with international fisheries bodies are more likely to adopt norms around fisheries management and scientific data collection and to adopt best practices for monitoring, control, and surveillance. Regional fisheries management organizations (RMFOs) are international bodies with voluntary membership for those countries whose fishing interests fall within RFMO jurisdiction. Some RFMOs are defined solely by geographic extent, while others are defined by the scope of the fishes they manage (e.g., tuna and other highly migratory species). We use maps showing the boundaries of four RFMOs—the Indian Ocean Tuna Commission, the International Commission for the Conservation of Atlantic Tunas, the Commission for the Conservation of Southern Bluefin Tuna, and the South East Atlantic Fisheries Organisation—to identify overlap between RFMO jurisdiction and EEZs. Scores were calculated by counting the number of RFMO memberships a country had from the pool of RFMOs that had overlapping jurisdictions (i.e., countries did not get penalized for not joining RFMOs outside their EEZs). (Note: ratification of the Port State Measures Agreement is relevant to this topic, but it was included in our International Cooperation  score.)'
    // },
    // { tag: 'h4',
    //    text: 'Marine Pollution'
    // },
    // { tag: 'p',
    //    text: 'Marine pollution can negatively impact fisheries by disrupting breeding or feeding areas, reducing reproduction, or introducing diseases. It is also a proxy for coastal development which disrupts marine habitat like seagrass beds and coral reefs. We use the score from the Clean Waters goal in the Ocean Health Index. The Ocean Health Index   measures countries on biological, physical, economic, and social factors to assess how sustainably humans are using the ocean. The Clean Waters goal measures pollution from chemicals, nutrients (agriculture), pathogens, and trash (including plastics) in EEZ waters. The Ocean Health Index collects data for all countries of the world and issues annual updates. We used the Clean Waters score directly.'
    // },
    // { tag: 'h4',
    //    text: 'Fisheries Health'
    // },
    // { tag: 'p',
    //   html: 'We used the score from the Wild-Caught Fisheries sub-goal of the Food Provision goal in the Ocean Health Index (see “Marine Pollution” above). The Fisheries sub-goal measures how well a nation achieves optimal sustainable production of seafood compared to a biological baseline. The target is for a given nation to maintain a fish population at the level that produces maximum sustainable yield (known as BMSY). Countries are penalized for both underfishing and overfishing. Thus, this metric is not solely one of conservation—a nation that does not fish will not earn the highest score, because they are leaving potential revenue in the water. We used the Wild-Caught Fisheries score directly.'
    // },
    // { tag: 'links',
    //   items: [
    //     {org: '<sup>11</sup> “FAO Document Depository,”', url: 'http://www.fao.org/documents/search/en/'},
    //     {org: '<sup>12</sup> “The Ocean Health Index,” Ocean Health Index, accessed 1 September 2017,', url: 'www.oceanhealthindex.org'},
    //   ]
    // }
    //  ]
    //  }
  ]
};
