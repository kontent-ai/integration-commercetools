# Kentico Kontent Custom Element: commercetools

This [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) for [Kentico Kontent](https://kontent.ai) gives editors a way to select products from commercetools.

## Features

- Editors can...
  - Search for products in all languages in the commercetools project
  - Select a single product (or one of it's variants)
  - Select multiple products (or their variants)
- Optional debug panel for diagnostics

## Demo

![Demo Animation](../assets/commercetools-demo.gif?raw=true)

<!--
## Quick testing

If you're interested in trying this out without deploying it yourself, you can use <https://YOUR_PUBLICLY_DEPLOYED_URL/>. This is the deployed version of the master branch in this repo. **This should only be used for quick testing as it is subject to change**
-->

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-custom-element-commercetools)

## Configuring the Custom Element

You will need to add the custom element to a content type filling in the hosted code URL and the JSON parameters (see below for details).

The JSON parameters required as as follows:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| debug    | boolean | (Optional) If present and set to true the debug panel will activate when editing a content item. |
| multiSelect  | boolean | If set to true, it will be possible to select multiple products. If set to false, it will be possible to only select a single product |
| commercetools | object | This contains all the details required to connect to the [commercetools API](https://docs.commercetools.com/http-api). The values for this object will be derived from an API client that you configure in commercetools with the exception of the `defaultCulture`. When generating the API client, be sure to select the `view_products` and `view_project_settings` scopes. |
| commercetools.defaultCulture | string | Set this to the IETF language tag of the language in commercetools to use by default for search. |
| commercetools.project | string | This is the commercetools project key. |
| commercetools.clientId | string | This is the commercetools API client ID. |
| commercetools.clientSecret | string | This is the commercetools API client secret. |
| commercetools.oauthUrl | string | This is the base URL to use for authenticating with commercetools. |
| commercetools.apiUrl | string | This is the base URL to use for commercetools API calls. |
| commercetools.scope | string | This is the list of scopes that the client has. This should include the `view_products` and `view_project_settings` scopes. |

Sample parameters JSON:

```json
{
    "debug": true,
    "multiSelect": true,
    "commercetools": {
        "defaultCulture": "en",
        "project": "your-project",
        "clientId": "your-client-id",
        "clientSecret": "your-client-secret",
        "oauthUrl": "https://auth.sphere.io",
        "apiUrl": "https://api.sphere.io",
        "scope": "view_products:your-project view_project_settings:your-project"
    }
}
```

## Values saved

The custom element will store the selected product's information in the following format (In an array):

```json
{
  "id": "<GUID_OF_PRODUCT>",
  "variantId": <Variant_ID>,
  "culture": "<IETF_LANGUAGE_TAG>"
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


## Contributors

Originally contributed by [@ChristopherJennings](https://github.com/christopherjennings)

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/kontent-custom-element-commercetools?pixel)
