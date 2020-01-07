# Kentico Kontent Custom Element: Vue Template

This [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) for [Kentico Kontent](https://kontent.ai) gives editors a way to INSERT PURPOSE.

## Features

- Editors can ...
- Optional debug panel for diagnostics

## Quick testing

If you're interested in trying this out without deploying it yourself, you can use <https://YOUR_PUBLICLY_DEPLOYED_URL/>. This is the deployed version of the master branch in this repo. **This should only be used for quick testing as it is subject to change**

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

***UPDATE THE REPO URL IN THE DEPLOY BUTTON TO YOUR REPO URL***

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ChristopherJennings/kontent-custom-element-vue-template)

## Configuring the Custom Element

You will need to add the custom element to a content type filling in the hosted code URL and the JSON parameters (see below for details).

The JSON parameters required as as follows:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| someSetting | string | This is an example setting that you want to document. |
| debug    | boolean | (Optional) If present and set to true the debug panel will activate when editing a content item. |

Sample parameters JSON:

```json
{
  "someSetting": "<CUSTOM_VALUE>",
  "debug": true
}
```

## Developing

### Initial project setup

```console
npm install
```

### Compiles and hot-reloads for development

```console
npm run serve
```

### Compiles and minifies for production

```console
npm run build
```

### Lints and fixes files

```console
npm run lint
```

### Customize Vue CLI configuration

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
