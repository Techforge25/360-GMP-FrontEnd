"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { showSuccess } from "@/utils/toasterMessage";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Load cart from localStorage on mount
  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   if (savedCart) {
  //     try {
  //       setCartItems(JSON.parse(savedCart));
  //     } catch (error) {
  //       console.error("Failed to parse cart data", error);
  //     }
  //   }
  // }, []);

  // Save cart to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    let message = "Added to cart!";

    setCartItems((prevItems) => {
      const productId = product._id || product.id;

      // Use selected tier only if tier is selected
      const actualQuantity = product.isTierSelected
        ? Number(product.selectedTier.qty)
        : quantity;

      const price = product.isTierSelected
        ? Number(product.selectedTier.price)
        : product.pricePerUnit;

      const existingItem = prevItems.find((item) => item.productId === productId);

      if (existingItem) {
        message = "Cart updated!";
        return prevItems.map((item) =>
          item.productId === productId
            ? {
              ...item,
              quantity: actualQuantity,
              price,
              isTierSelected: !!product.isTierSelected,
              selectedTier: product.isTierSelected ? product.selectedTier : null,
            }
            : item
        );
      }

      return [
        ...prevItems,
        {
          productId,
          quantity: actualQuantity,
          price,
          isTierSelected: !!product.isTierSelected,
          selectedTier: product.isTierSelected ? product.selectedTier : null,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    showSuccess(message);
  };
  
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (item) => item.productId !== productId,
      );
      // Only show success message if item was actually removed
      if (filteredItems.length < prevItems.length) {
        showSuccess("Removed from cart");
      }
      return filteredItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    showSuccess("Cart cleared");
  };

  console.log(cartItems, "cart items")

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
