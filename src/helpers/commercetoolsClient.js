import axios from "axios";

export default class commercetoolsClient {
  constructor(options) {
    this.projectKey = options.projectKey;
    this.clientId = options.clientId;
    this.secret = options.secret;
    this.scope = options.scope;
    this.apiUrl = options.apiUrl;
    this.oauthUrl = options.oauthUrl;
    this.defaultCulture = options.defaultCulture;
    this._tokenDetails = options.tokenDetails;
  }

  async getTokenDetails() {
    if (!this._tokenDetails) {
      const url = `${this.oauthUrl}/oauth/token?grant_type=client_credentials&scope=${this.scope}`;
      const response = await axios.post(url, null, {
        auth: {
          username: this.clientId,
          password: this.secret
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

  async getProject() {
    const url = `${this.apiUrl}/${this.projectKey}`;
    return await this.getResponse(url);
  }

  async searchProducts({
    text,
    staged = true,
    limit = 10,
    culture = this.defaultCulture,
    offset = 0
  }) {
    const url = `${this.apiUrl}/${this.projectKey}/product-projections/search?staged=${staged}&limit=${limit}&offset=${offset}&text.${culture}="${text}"`;
    return await this.getResponse(url);
  }

  async getProductByKey({ key, staged = true }) {
    const url = `${this.apiUrl}/${this.projectKey}/product-projections/key=${key}?staged=${staged}`;
    return await this.getResponse(url);
  }

  async getProductByID({ id, staged = true }) {
    const url = `${this.apiUrl}/${this.projectKey}/product-projections/${id}?staged=${staged}`;
    return await this.getResponse(url);
  }

  async getResponse(url) {
    const axiosRequestConfig = await this.getAxiosRequestConfig();
    const response = await axios.get(url, axiosRequestConfig);
    return response.data;
  }
}
