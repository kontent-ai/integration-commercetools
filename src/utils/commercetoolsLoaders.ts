import { createApiBuilderFromCtpClient, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { ElementConfig } from '../types/elementConfig';
import { SavedProduct, SelectedProduct } from '../types/product';

export const loadLanguages = (config: ElementConfig) =>
  createApiBuilderForProject(config)
    .get()
    .execute()
    .then(res => res.body.languages);

export const loadSelectedProducts = (config: ElementConfig, products: ReadonlyArray<SavedProduct>, languages: string[]): Promise<ReadonlyArray<SelectedProduct>> => {
  const apiBuilder = createApiBuilderForProject(config);

  return Promise.all(
    products
      .map(savedProduct => apiBuilder
        .productProjections()
        .withId({ ID: savedProduct.id })
        .get({ queryArgs: { staged: true, localeProjection: languages } })
        .execute()
        .then(r => ({
          product: r.body,
          variant: [r.body.masterVariant, ...r.body.variants].find(v => v.id === savedProduct.variantId),
          language: savedProduct.culture,
        }))),
  )
    .then(r => r.filter(hasVariant));
};

export const searchProducts = (config: ElementConfig, allLanguages: ReadonlyArray<string>, selectedLanguage: string, searchString: string): Promise<ReadonlyArray<ProductProjection>> =>
  createApiBuilderForProject(config)
    .productProjections()
    .search()
    .get({
      queryArgs: {
        staged: true,
        localeProjection: [...allLanguages],
        [`text.${selectedLanguage}`]: searchString,
      },
    })
    .execute()
    .then(res => res.body.results);

const createApiBuilderForProject = (config: ElementConfig) => {
  const authOptions: AuthMiddlewareOptions = {
    credentials: {
      clientId: config.commercetools.clientId,
      clientSecret: config.commercetools.secret,
    },
    projectKey: config.commercetools.projectKey,
    scopes: [config.commercetools.scope],
    host: config.commercetools.oauthUrl,
  };
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: config.commercetools.apiUrl,
  };

  const client = new ClientBuilder()
    .withProjectKey(authOptions.projectKey)
    .withClientCredentialsFlow(authOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withUserAgentMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey: config.commercetools.projectKey });
};

const hasVariant = <T extends { variant: ProductVariant | undefined }>(value: T): value is T & { variant: ProductVariant } =>
  !!value.variant;
