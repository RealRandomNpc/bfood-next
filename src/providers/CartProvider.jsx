import BottomSummary from "@/components/Cart/BottomSummary";
import CartSideBar from "@/components/Cart/CartSideBar";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const permittedCartFields = ["id", "amount", "name", "price", "img"];

const getPermittedCartFields = (product) => {
  return Object.fromEntries(
    permittedCartFields.map((key) => [key, product[key]])
  );
};

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children, cartSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  const isItemInCartById = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const addItemToCart = (product) => {
    setCartItems((prev) => [
      ...prev.map((p) => ({ ...p })),
      { ...getPermittedCartFields(product), amount: 1 },
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

  useEffect(() => {
    const calculateCartPrice = () => {
      return cartItems.reduce(
        (partialPrice, item) => partialPrice + item.price * item.amount,
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
      }}
    >
      {children}
      <BottomSummary setIsOpen={setIsOpen} />
      <CartSideBar
        cartSettings={cartSettings}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </CartContext.Provider>
  );
};

export default CartProvider;
