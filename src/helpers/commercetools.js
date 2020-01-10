import axios from "axios";

async function getToken(oauthUrl, clientId, clientSecret, scope) {
  const url = `${oauthUrl}/oauth/token?grant_type=client_credentials&scope=${scope}`;
  const response = await axios.post(url, null, {
    auth: {
      username: clientId,
      password: clientSecret
    }
  });

  return response.data;
}

async function searchProducts(
  apiUrl,
  project,
  token,
  text,
  culture = "en-US",
  staged = true,
  limit = 10
) {
  const url = `${apiUrl}/${project}/product-projections/search?staged=${staged}&limit=${limit}&text.${culture}="${text}"`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  return response.data;
}

async function getProductByKey(apiUrl, project, token, key, staged = true) {
  const url = `${apiUrl}/${project}/product-projections/key=${key}?staged=${staged}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  return response.data;
}

export default {
  getToken,
  searchProducts,
  getProductByKey
};
