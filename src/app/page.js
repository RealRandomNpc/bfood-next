import { blocks } from "@/blocks";
import ProductsPage from "@/components/Pages/Home/ProductsPage";


const REVALIDATION_TIME = 60;

export const revalidate = 360;

export const dynamic = 'force-dynamic'

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
  console.log("RETURNED DATA", pageData, preloadedCategories, existingTags, cartSettings)
  const availableTags = [
    ...existingTags,
    ...preloadedCategories.map((c) => ({
      id: c.id,
      name: c.title,
      type: "category",
    })),
  ];

  return (
    <main>
        {pageData?.beforeProducts?.map((b, idx) => {
          const Block = blocks[b.blockType];
          if (Block) {
            return <Block key={"before-blocks-" + idx} {...b} />;
          }

          return null;
        })}
        <ProductsPage
          cartSettings={cartSettings}
          preloadedCategories={preloadedCategories}
          availableTags={availableTags}
          afterSearchPromoted={pageData.afterSearchPromoted}
        />
        <div className="h-screen w-1"></div>
    </main>
  );
}