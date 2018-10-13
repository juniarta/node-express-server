# **NODE + EXPRESS SERVER**

## Description

This project is an example of an Express server written in Javascript running on Node.js
It was created for study / demonstration purpose only, but could be useful for others.
There is no support, pull requests are welcome however.

## Goals

The first goal for this project is to create a microservice server that exposes a simple API.
For details regarding this, look at `auth route`.

The final goal of this project is to create a "look-alike" WordPress in Node.js.
There's no need for a front-end within this project, just the API is important.

---

## **What this boilerplate contains**

<img src="./__repo_readme_assets__/logo-node.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-express.png" height="55" alt="logo placeholder">&nbsp;&nbsp;

- [x] Node 10.9.0
- [x] Express 4.16.3
- [x] Pm2 3.2.2

---

## **Set up project**

Before cloning the repo **be sure** to install:

- [Node](http://nodejs.org/download/) (version >= 9.10.x)
- [Yarn](https://yarnpkg.com/en/docs/install) (version >= 1.9.x)
- [Npm](https://www.npmjs.com/) (version >= 6.3.x)
- [Pm2](http://pm2.keymetrics.io/) (version >= 3.2.x)

Then:

- Choose a folder for your project and move into it `cd [folder path]`
- Clone the repo into your project's folder `git clone [repository url]`

---

## **Installation**

To install the project and all dependencies, run:
`npm install` or `yarn`
in the directory of your project.

---

## **Starting the project**

##### run the project

As the pm2.config.json, develop server will run on port 9009 and production server will run on port 8080

```bash
npm start
# or
yarn start
```

##### run the tests (work in progress)

```bash
npm test
#or
yarn test
```

---

## **Editor setup**

To keep our style consistent to the style of our resources, I decided to stick to some shared rules that have to be applied to every project using some editor's plugins. Please be sure to disable and/or remove any other js/jsx linters or custom configurations.

#### Basic Editor Configuration

I chose to use [EditorConfig](http://editorconfig.org/) to share the basic configuration like indentation and charset. It works by having a `.editorconfig` file in the root directory and making sure your editor has the necessary plugin. You can find a list of downloads [here](http://editorconfig.org/#download). The choice to keep the indentation with 2 spaces is to be compliant with actual standards (major frameworks use this configuration both for JS and CSS).

#### Auto correction on save

I have chosen to use [js-beautify](https://github.com/beautify-web/js-beautify). Despite of it's name it works as a beautifier not only for Javascript, but also for HTML and CSS. The most used texteditors have a plugin available that integrate js-beautify, e.g. [Sublime](https://github.com/victorporof/Sublime-HTMLPrettify), [Atom](https://atom.io/packages/atom-beautify) or [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify). The setup for js-beautify is controlled within a `.jsbeautifyrc` file that has to be included in the root directory of the project (.hbs are not completely supported yet).

#### Eslint

To check the Javascript / React [.js / .jsx] syntax I use [Eslint](http://eslint.org/). The rules to detect errors are written in a `.eslintrc` file included in the root directory of the project (best practice is to use `airbnb linter`).

---

## **Todo**

- [ ] Refactor with best practices and performance
- [ ] Store auth session
- [ ] Store server log
- [ ] Create simple authentication api

---

## **Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **Troubleshootings**

This is just a personal project created for study / demonstration purpose only, it may or may not be a good fit for your project(s).

---

> GitHub [@ibbatta](https://github.com/ibbatta) &nbsp;&middot;&nbsp;
> Twitter [@battago](https://twitter.com/battago)