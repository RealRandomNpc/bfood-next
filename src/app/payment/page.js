import { blocks } from "@/blocks";
import PaymentPage from "@/components/Pages/Payment/PaymentPage";

const REVALIDATION_TIME = 60;

const getPaymentPage = async () => {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/payment-page`,
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

export default async function Payment() {
  const [pageData, cartSettings] =
    await Promise.all([
      getPaymentPage(),
      getCartSettings()
    ]);


  return (
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
  );
}
