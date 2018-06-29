// Element objects are passed into the buildEl() function defined in main.js

// Basic text elements
{
  tag: 'p', //  or h1, h2, h3, h4
  html: 'This section is divided into four parts. The first will discuss the three primary models of piracy: kidnap for ransom, hijacking for cargo theft, and robbery. The second and third will provide overviews of violence at sea in the Gulf of Guinea and the Horn of Africa, respectively. Finally, the section concludes with a summary of the methodology.'
},

// Lists
{
  tag: 'ol', // for numbered, or or 'ul' for bullets
  rows: ['each', 'item', 'in', 'list', 'gets', 'a', 'line']
}

// Blockquote
{
  tag: 'blockquote',
  html: 'Text with html markup to be displayed as main quote.',
  source: "Attribution - will be displayed in box",
  link: 'url - links to source'
}

// Bigtext - Displays text in card large, for emphasis
{
  tag: 'bigtext',
  html: 'HTML to be displayed as big text in card'
}

// Table
{
  tag: 'table',
  rows: [
    ['Col1 Title','Col2 Title', 'Col3 Title'],
    ['1', '2', '3'],
    ['a','b','c'],
    ['d','d','f']]
}

// Image
{
  tag: 'img',
  image: '../assets/pic.jpg', // if hosted, relative path; otherwise, url
  alt: 'alt text for image',
  caption: 'Caption for image.'
},

// Caption
{
  tag: 'caption',
  html: 'Caption for image.'
}

// Horizatonal line
{
  tag: 'hr'
}

// Video
{
  tag: 'video',
  thumb: './link/to/thumb.png',
  url: 'http://www.youtube.com/link/'
}

// SVG - places SVG in card for card-specific d3 visualizations like pie charts
{
  tag: 'svg',
  id: 'svg-id' // as HTML element attribute - no spaces
}

// Citations, built at the bottom of the card
{
  tag: 'links',
  items: [
    { // Citation # 1
      org: 'text to be displayed - check on proper citation format',
      url: 'full url to source'
    },
  },
  { // Citation # 2
    org: '',
    url: ''
  }, // ... etc
  ]
}
