function getLocalizedProperty(product, property, culture) {
  const propertyExists = product && product[property];
  if (propertyExists) {
    const valueExists = propertyExists && product[property][culture];
    if (valueExists) {
      return product[property][culture];
    } else {
      const fallback = Object.keys(product[property])[0];
      return `${product[property][fallback]} (${fallback})`;
    }
  }
}

// function getSmallImage(product) {
//   if (
//     product &&
//     product.masterVariant &&
//     product.masterVariant.images.length > 0
//   ) {
//     const full = product.masterVariant.images[0].url;
//     const index = full.lastIndexOf(".");
//     return full.substring(0, index) + "-small" + full.substring(index);
//   }
//   return null;
// }

// function simplifyProductProjection(product, culture) {
//   return {
//     key: product.key,
//     name: getLocalizedProperty(product, "name", culture),
//     image: getSmallImage(product)
//   };
// }

export { getLocalizedProperty };
