"use client";
import BottomSummary from "@/components/Cart/BottomSummary";
import CartSideBar from "@/components/Cart/CartSideBar";
import OrderNotesModal from "@/components/Modals/OrderNotesModal";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const permittedCartFields = [
  "id",
  "amount",
  "name",
  "price",
  "img",
  "options",
  "has_product_options",
];

const getPermittedCartFields = (product) => {
  return Object.fromEntries(
    permittedCartFields.map((key) => [key, product[key]])
  );
};

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children, cartSettings, withSideBar = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage('last_cart_items',[]);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  const [orderNotesModalState, setOrderNotesModalState] = useState("close");
  const [orderNotes, setOrderNotes] = useLocalStorage('last_order_notes',"");

  const isItemInCartById = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const addItemToCart = (product, amount = 1) => {
    setCartItems((prev) => [
      ...prev.map((p) => ({ ...p })),
      { ...getPermittedCartFields(product), amount },
    ]);
  };

  const changeCartItemAmountById = useCallback(
    (productId, changeAmount) => {
      setCartItems((prev) => {
        const itemIdx = prev.map((p) => p.id).lastIndexOf(productId);

        if (itemIdx > -1) {
          const currentAmount = prev[itemIdx]?.amount;
          if (currentAmount + changeAmount <= 0) {
            return prev
              .filter((p, idx) => idx !== itemIdx)
              .map((p) => ({ ...p }));
          }
        }

        return prev.map((p, idx) =>
          idx === itemIdx ? { ...p, amount: p.amount + changeAmount } : { ...p }
        );
      });
    },
    [cartItems]
  );

  const changeCartItemAmountByIndex = useCallback(
    (itemIdx, changeAmount) => {
      setCartItems((prev) => {
        if (itemIdx > -1 && itemIdx < prev.length) {
          const currentAmount = prev[itemIdx]?.amount;
          if (currentAmount + changeAmount <= 0) {
            return prev
              .filter((p, idx) => idx !== itemIdx)
              .map((p) => ({ ...p }));
          }
        }

        return prev.map((p, idx) =>
          idx === itemIdx ? { ...p, amount: p.amount + changeAmount } : { ...p }
        );
      });
    },
    [cartItems]
  );

  const incAmountById = (productId) => {
    changeCartItemAmountById(productId, 1);
  };

  const incAmountByIndex = (cartItemIndex) => {
    changeCartItemAmountByIndex(cartItemIndex, 1);
  };

  const decItemAmountById = (productId) => {
    changeCartItemAmountById(productId, -1);
  };

  const decAmountByIndex = (cartItemIndex) => {
    changeCartItemAmountByIndex(cartItemIndex, -1);
  };

  const updateItemById = (productId) => {};

  const updateItemByIndex = (cartItemIndex) => {};

  const calculateThisItemPrice = (cartItem) => {
    const selectedOptionsPrice =
      (cartItem.options &&
        Object.values(
          cartItem.options
            ?.map((opt) => opt?.selected_options)
            .reduce((acc, opt) => ({ ...acc, ...opt }), {})
        ).reduce(
          (acc, selectedOpt) =>
            acc + selectedOpt.amount * selectedOpt.extra_price,
          0
        )) ||
      0;

    return cartItem.price + selectedOptionsPrice;
  };

  useEffect(() => {
    const calculateCartPrice = () => {
      return cartItems.reduce(
        (partialPrice, item) =>
          partialPrice + calculateThisItemPrice(item) * item.amount,
        0
      );
    };
    setCartAmount(
      cartItems
        .map((item) => item.amount)
        .reduce((partialAmount, itemAmount) => partialAmount + itemAmount, 0)
    );
    setCartPrice(calculateCartPrice());
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        cartItems,
        cartAmount,
        cartPrice,
        setIsOpen,
        incAmountById,
        incAmountByIndex,
        isItemInCartById,
        addItemToCart,
        decAmountByIndex,
        calculateThisItemPrice,
      }}
    >
      {children}

      {withSideBar && (
        <>
          <BottomSummary setIsOpen={setIsOpen} />
          <CartSideBar
            cartSettings={cartSettings}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerOrderNotesModal={() => setOrderNotesModalState("open")}
          />
          <OrderNotesModal
            setOrderNotes={setOrderNotes}
            setOrderNotesModalState={setOrderNotesModalState}
            orderNotesModalState={orderNotesModalState}
            orderNotes={orderNotes}
          />
        </>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;
