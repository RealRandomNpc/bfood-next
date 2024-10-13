import { blocks } from "@/blocks";
import ProductsContainer from "@/components/Home/ProductsContainer";

const REVALIDATION_TIME = 60;

const getIndexPage = async () => {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/index-page`,
    { next: { revalidate: REVALIDATION_TIME } }
  );
  return await pageRes.json();
};
const getCartSettings = async () => {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/cart-settings`,
    { next: { revalidate: REVALIDATION_TIME } }
  );
  return await pageRes.json();
};

const getCategories = async () => {
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?limit=200&sort=-priority`,
    { next: { revalidate: REVALIDATION_TIME } }
  );

  const categoriesJson = await categoriesRes.json();

  return categoriesJson?.docs;
};

const getTags = async () => {
  const tagsRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/tags?limit=200`,
    { next: { revalidate: REVALIDATION_TIME } }
  );

  const tagsJson = await tagsRes.json();

  console.log(tagsJson);

  return tagsJson?.docs || [];
};

export default async function Home() {
  const [pageData, preloadedCategories, existingTags, cartSettings] =
    await Promise.all([
      getIndexPage(),
      getCategories(),
      getTags(),
      getCartSettings(),
    ]);
  const availableTags = [
    ...existingTags,
    ...preloadedCategories.map((c) => ({
      id: c.id,
      name: c.title,
      type: "category",
    })),
  ];

  console.log("PAGE DATA", pageData);

  return (
    <main dir="rtl">
      {pageData?.beforeProducts?.map((b, idx) => {
        const Block = blocks[b.blockType];
        if (Block) {
          return <Block key={"before-blocks-" + idx} {...b} />;
        }

        return null;
      })}
      <ProductsContainer
        cartSettings={cartSettings}
        preloadedCategories={preloadedCategories}
        availableTags={availableTags}
        afterSearchPromoted={pageData.afterSearchPromoted}
      />
      <div className="h-screen w-1"></div>
    </main>
  );
}
