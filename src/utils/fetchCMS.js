const REVALIDATION_TIME = 60;

export const getIndexPage = async () => {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/index-page`
    // { next: { revalidate: REVALIDATION_TIME } }
  );
  return await pageRes.json();
};

export const getFooterSettings = async () => {
  const footerRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/footer?locale=undefined&draft=false&depth=1`
    // { next: { revalidate: REVALIDATION_TIME } }
  );
  return await footerRes.json();
};
export const getCartSettings = async () => {
  const cartRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/cart-settings`
    // { next: { revalidate: REVALIDATION_TIME } }
  );
  return await cartRes.json();
};

export const getCategories = async () => {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=200&sort=-priority`
    // { next: { revalidate: REVALIDATION_TIME } }
  );

  const categoriesJson = await categoriesRes.json();

  return categoriesJson?.docs;
};

export const getProductOptions = async () => {
  const productOptionsRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products-options/?locale=undefined&draft=false&depth=1&limit=30`
    // { next: { revalidate: REVALIDATION_TIME } }
  );

  const productOptionsJson = await productOptionsRes.json();

  return productOptionsJson?.docs;
};

export const getTags = async () => {
  const tagsRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=200`,
    // { next: { revalidate: REVALIDATION_TIME } }
  );

  const tagsJson = await tagsRes.json();

  console.log(tagsJson);

  return tagsJson?.docs || [];
};

export const getPaymentPage = async () => {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/payment-page`,
    { next: { revalidate: REVALIDATION_TIME } }
  );
  return await pageRes.json();
};