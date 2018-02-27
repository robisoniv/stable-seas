
// When you click the h2s the content reveals
// on hover it gets darker
// mask in svg ? to stars .. . ?


// data
// mostly links to external things
// would be cool to go to local data vis with svg
//

// pop ups / console logs:
// 'i think it's cool that you use chrome'
// just so you know i can read your ip address ... my automated lookup has your
// address as xxx


// h2 image
// click reveals square images vertically aligned 36% apart
// on click
// maybe lightbox pops up that you can flip through ...
// more images  in the set - or link to them visible behind
// 7 - 10 images / stories
// one or two triptychs
// dawn in atlantic
// croatia
// uk
// czech
// blue ridge
//
// rainier
// st lucia
// canaria
// portraits
// spherical
// instagram

var clicks = 0;
// Randomize font:
var fonts = ["font-family: 'Slabo 27px', serif;",
"font-family: 'Source Sans Pro', sans-serif;",
"font-family: 'Karma', serif;",
"font-family: 'Playfair Display', serif;",
"font-family: 'Lora', serif;"];

d3.select('body')
  .attr('style',fonts[Math.round(Math.random() * 10) % 5] );

d3.selectAll('h2')
  .on('click', function (d) {
    clicks += 1;
    var col = d3.select(this).attr('data-col');

    // Check to see if your column is visible
    var visible = d3.selectAll('.' + col).classed('visible');
    var invisible = !visible;

    // Then make everything invisible
    d3.selectAll('.visible')
      .classed('visible', false)
      .classed('invisible', true);

    // then toggle your column
    if (invisible) {
      d3.selectAll('.invisible.' + col )
        .classed('invisible', false)
        .classed('visible', true);

    } else {
      d3.selectAll('.visible.' + col )
        .classed('invisible', true)
        .classed('visible', false);
    }
  });


// count interactions ...
// set conditions to unlock more of the site if you interact with it more ....

d3.select('h1')
  .on('click', function () {
    if (clicks > 4) {
      var a = d3.select('#about'),
      i = a.classed('invisible'),
      v = a.classed('visible');

      a.classed('invisible', !i)
        .classed('visible', !v);
    }
    console.log(clicks);
  })
