import axios from "axios";

export default class commercetoolsClient {
  constructor(options) {
    this.project = options.project;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.oauthUrl = options.oauthUrl;
    this.apiUrl = options.apiUrl;
    this.scope = options.scope;
    this.defaultCulture = options.defaultCulture;
    this._tokenDetails = options.tokenDetails;
  }

  async getTokenDetails() {
    if (!this._tokenDetails) {
      const url = `${this.oauthUrl}/oauth/token?grant_type=client_credentials&scope=${this.scope}`;
      const response = await axios.post(url, null, {
        auth: {
          username: this.clientId,
          password: this.clientSecret
        }
      });
      this._tokenDetails = response.data;
    }

    return this._tokenDetails;
  }

  async getAxiosRequestConfig() {
    const tokenDetails = await this.getTokenDetails();
    return {
      headers: { Authorization: `Bearer ${tokenDetails.access_token}` }
    };
  }

  async searchProducts({
    text,
    staged = true,
    limit = 10,
    culture = this.defaultCulture,
    offset = 0
  }) {
    const url = `${this.apiUrl}/${this.project}/product-projections/search?staged=${staged}&limit=${limit}&offset=${offset}&text.${culture}="${text}"`;
    return await this.getResponse(url);
  }

  async getProductByKey({ key, staged = true }) {
    const url = `${this.apiUrl}/${this.project}/product-projections/key=${key}?staged=${staged}`;
    return await this.getResponse(url);
  }

  async getResponse(url) {
    const axiosRequestConfig = await this.getAxiosRequestConfig();
    const response = await axios.get(url, axiosRequestConfig);
    return response.data;
  }
}
