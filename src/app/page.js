import { blocks } from "@/blocks";
import ProductsPage from "@/components/Pages/Home/ProductsPage";
import Footer from "@/components/ui/Footer";
import {
  getCartSettings,
  getCategories,
  getFooterSettings,
  getIndexPage,
  getProductOptions,
  getTags,
} from "@/utils/fetchCMS";

export const revalidate = 360;

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    pageData,
    preloadedCategories,
    existingTags,
    cartSettings,
    preloadedProductOptions,
    footerSettings,
  ] = await Promise.all([
    getIndexPage(),
    getCategories(),
    getTags(),
    getCartSettings(),
    getProductOptions(),
    getFooterSettings(),
  ]);
  const availableTags = [
    ...existingTags,
    ...preloadedCategories.map((c) => ({
      id: c.id,
      name: c.title,
      type: "category",
    })),
  ];

  return (
    <>
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
          preloadedProductOptions={preloadedProductOptions}
        />
      </main>
      <Footer footerSettings={footerSettings} />
    </>
  );
}
