# Stable Seas : Core Content Documentation



For content contributors to update the content on the site, follow the following process:

## Content Creators

In order to create new content in the form of cards for the Stable Seas site, content creators will be required to fill in the Javascript object literal templates included below. For a brief explainer on object literals, check out Mozilla Developer Network's [Grammar and types guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals), or MDN's [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) tutorial.

Each page on the Stable Seas site is dynamically built in the client browser using D3, jQuery and Bootstrap from data included in a file loaded separately, the `main-data.js` file (which is in turn assembled from data included in other files like `blue-economy-data.js`). Abstractly, each page's data is organized as such:

`var issueAreaData = {
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
        metadata: { \* Card-specific metadata *\ },
        map: {
          // The map object 
        }
      }
    ]
  },
  internationalCooperation: {

  },
  ... etc.
}`

## Content Contributors

### Setup

1. Create a github account.
2. [Fork](https://help.github.com/articles/fork-a-repo/) the [Stable Seas base branch](https://github.com/johnrobisoniv/stable-seas) repository.
3. Clone your fork of the repository to your local machine. (You will have to use the git command line interface or download Github Desktop. This is possible on Windows, Mac and Linux).
4. (If you're using Github Desktop) Add the project folder to Github Desktop.
5. Download a text editor (I use [Atom](https://atom.io/)).
6. Add the base repository (**not your fork**) as one of the remote repositories on your local repo:<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On the command line:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git add remote upstream https://github.com/johnrobisoniv/stable-seas.git`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In Github Desktop:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Updating Content

1. Open the project folder in Atom (or your text editor).
2. *Best Practice: update your local master branch to reflect the upstream/master (AKA base) branch. This will minimize the risk of conflicts*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First, open your command line and navigate to your git repository:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cd (path/to/stable-seas/git/repo)`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Check if you're in the right folder by running `git status`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fetch the `upstream/master` branch (from the root repository - **not your forked `origin`**):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git fetch upstream`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ... and reset your `local/master` to be identical to the `upstream/master`:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git reset --hard upstream/master`

> **This should make your local master branch look exactly the same the root master branch - now your local codebase is identical to the production version.**

3. Make the changes you need to make to the content files.
4. Commit changed files to your local `master` branch.
5. Push local `master` to your remote repository's `origin/master` branch. (You should now see your changes reflected on the files on your github account forked repo.)
6. Submit a pull request to the base branch (https://github.com/johnrobisoniv/stable-seas) and let the base branch owner know, especially if time sensitive.

## Site Administrator

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

> **We think it is important to close this process (i.e. merge the pull request) before initiating another revision process. We suspect this will create conflicts or complicated merge processes.**
