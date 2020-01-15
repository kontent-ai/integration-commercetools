function getLocalizedProperty(product, property, culture) {
  const valueExists =
    product && product[property] && product[property][culture];
  return valueExists ? product[property][culture] : null;
}

function getSmallImage(product) {
  if (
    product &&
    product.masterVariant &&
    product.masterVariant.images.length > 0
  ) {
    const full = product.masterVariant.images[0].url;
    const index = full.lastIndexOf(".");
    return full.substring(0, index) + "-small" + full.substring(index);
  }
  return null;
}

function simplifyProductProjection(product, culture) {
  return {
    key: product.key,
    name: getLocalizedProperty(product, "name", culture),
    image: getSmallImage(product)
  };
}

export { getLocalizedProperty, getSmallImage, simplifyProductProjection };
