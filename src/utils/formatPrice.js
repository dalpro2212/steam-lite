export const formatPrice = (price) =>
  price === 0 ? 'Gratis' : `$${price.toFixed(2)}`
