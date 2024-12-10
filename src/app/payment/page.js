import { blocks } from "@/blocks";
import PaymentPage from "@/components/Pages/Payment/PaymentPage";
import Footer from "@/components/ui/Footer";
import { getCartSettings, getFooterSettings, getPaymentPage } from "@/utils/fetchCMS";

export const revalidate = 360;

export const dynamic = "force-dynamic";

export default async function Payment() {
  const [pageData, cartSettings, footerSettings] = await Promise.all([
    getPaymentPage(),
    getCartSettings(),
    getFooterSettings()
  ]);

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
        <PaymentPage cartSettings={cartSettings} />
      </main>
      <Footer footerSettings={footerSettings}/>
    </>
  );
}
