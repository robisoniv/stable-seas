# Stable Seas : Core Content Documentation

For content contributors to update the content on the site, follow the following process:

## Content update process

In order to create new content in the form of cards for the Stable Seas site, content editors will be required to fill in the Javascript object literal templates included below. For a brief explainer on object literals, check out Mozilla Developer Network's [Grammar and types guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals), or MDN's [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) tutorial.

Each page on the Stable Seas site is dynamically built in the client browser using D3, jQuery and Bootstrap from data included in a file loaded separately, the `main-data.js` file (which is in turn assembled from data included in other files like `blue-economy-data.js`). Abstractly, each page's data is organized as such:

```javascript
var issueAreaData = {
  overview: {
    metadata: {
      // page-level metadata like the name and color assignment.
    },
    load: function () {
      // the page-level load method, which basically always calls
      // the loadIAcsv(csv, callback) function defined in main.js.
    },
    cards: [ // an array of objects, one for each card ...
      {
        title: 'Card Title',
        menu: 'The text displayed on this card\'s menu item',
        metadata: { /* Card-specific metadata */ },
        map: {
          // The map object
        }
      }
    ]
  },
  internationalCooperation: {

  },
  // ... etc.
}
```

## Content editors

### Setup

1. Create a github account.
2. [Fork](https://help.github.com/articles/fork-a-repo/) the [Stable Seas base branch](https://github.com/OEFDataScience/stable-seas) repository.
3. Clone your fork of the repository to your local machine. (You will have to use the git command line interface or download Github Desktop. This is possible on Windows, Mac and Linux).
4. (If you're using Github Desktop) Add the project folder to Github Desktop.
5. Download a text editor (I use [Atom](https://atom.io/)).
6. Add the base repository (**not your fork**) as one of the remote repositories on your local repo:<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On the command line:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git add remote upstream https://github.com/OEFDataScience/stable-seas.git`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In Github Desktop:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Updating Content

1. Open the project folder in Atom (or your text editor).
2. *Best Practice: update your local master branch to reflect the upstream/master (AKA base) branch. This will minimize the risk of conflicts*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First, open your command line and navigate to your git repository:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cd (path/to/local/stable-seas/git/repo)`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Check if you're in the right folder by running `git status`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fetch the `upstream/master` branch (from the root repository - **not your forked `origin`**):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git fetch upstream`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ... and reset your `local/master` to be identical to the `upstream/master`:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git reset --hard upstream/master`

**This should make your local master branch look exactly the same the root master branch - now your local codebase is identical to the production version.**

3. Make the changes you need to make to the content files.
4. Commit changed files to your local `master` branch.
5. Push local `master` to *your* remote repository's `origin/master` branch:

`git push origin master`
(You should now see your changes reflected on the files on your github account forked repo.)
6. Submit a pull request to the base branch (https://github.com/OEFDataScience/stable-seas) and let the base branch owner know, especially if time sensitive.

## Site administrator

### Setup
1. Make a github account.
2. Create a repository to host the production version of the codebase in the `master` branch.
3. `git clone` that repository to your local machine so you have the single source of truth (your `origin/master`) and a version you can develop on (your `local/master`.)

### Updating Content
1. Keep the base `master` branch up to date with the production server version of the site.
2. Monitor email / github for pull requests from content creators.
3. When a pull request is received, review changes and merge. *You may have to resolve conflicts if they exist.*
4. `git pull` the `master` branch from your origin repository to your local `master`.
5. Deploy the updated code onto the production server.

> **Now the up-to-date version of the site is synced with the production server, your origin master branch on github and your local machine's master branch.**

> **We think it is important to close this process (i.e. merge the pull request) before initiating another revision process. We suspect not doing this will create conflicts or complicated merge processes.**

## Templates

Here are links to files with object literal templates for [cards](./card-template.js) and [elements](./els-templates.js).

When copying a template, be sure to include both of the curly brackets on either end. If adding multiple objects to an array (enclosed in square brackets []) there must be a comma between each. If adding key-value pairs to an object (enclosed in curly braces - {key: value}) there must be a colon between the key and the value and a comma after every value.

Any syntactical errors will break the code, so if in doubt work with someone on the product team to make sure that updates and new content are valid code and that the site will still work when it is loaded.

## End user guide

The end user - the person who loads and interacts with `stableseas.org` on their web browser - is intended to have a clean and intuitive experience exploring the Stable Seas site and gaining an understanding of the issues analyzed by the research team down to the country level.

Use the main navigation header to toggle between the Issue Areas and Regions sides of the site and to access site resources.

The multi-color navigational ribbon allows users to switch between specific issue areas or regions.

The card navigation menu lets users view different cards on a page, including the interactive maps associated, designed to illustrate what is described on the cards.

The footer allows users to access relevant social media pages and provides instructions on how to contact the Stable Seas team with enquiries.

:D
