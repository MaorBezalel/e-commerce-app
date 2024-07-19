import { useApi } from "@/shared/hooks/useApi.hook";
import { useEffect, useRef, useState} from "react";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { Cart } from "@/shared/types/entities.types";
import { ProductDisplayInCart } from "./ProductDisplayInCart";

type UserCartProps = {
    onTotalPriceUpdate: (totalPrice: number) => void;
    onClearCart: () => void;
    clearTrigger: boolean;
  };


  export default function UserCart({ onTotalPriceUpdate, onClearCart, clearTrigger }: UserCartProps) {

    const api = useApi();
    const isMounted = useRef<boolean>(false);
    const userId = useAuth().auth?.user.user_id;
    const [cartItems, setCartItems] = useState<Cart>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


    useEffect(() => {
        isMounted.current = true;
        const fetchData = async () => {
            setIsLoading(true);
            if (userId) {
              try {
                const response = await api.cartApi.getUserCart(userId);
                if ('userCart' in response) {
                  setCartItems(response.userCart);
                  setIsEmpty(response.userCart.length === 0);
                } else {
                  console.log(response.message);
                  setIsError(true);
                }
              } catch (error) {
                console.error("Fetching error:", error);
                setIsError(true);
              }
            }
            setIsLoading(false);
          };
      
          fetchData();
          return () => {
            isMounted.current = false;
          };
        }, [api.cartApi, userId]);

const calculateTotalPrice = () => {
    // Logic to calculate total price based on cart items
    let totalPrice = 0;
    cartItems?.forEach(item => {
        totalPrice += item.__product__.price * item.quantity;
    });
    return totalPrice;
};

useEffect(() => {
    const totalPrice = calculateTotalPrice();
    onTotalPriceUpdate(totalPrice); // Update parent component with the total price
}, [cartItems]); // Recalculate when cartItems changes

const handleRemoveProductFromCart = async (productId: string) => {
    if (!userId) return; // Ensure there's a userId available
    try {
        const response = await api.cartApi.removeProductFromCart(productId, userId);
        if (response.message === "Product removed from cart successfully") {
            // Filter out the removed product and update state
            setCartItems(currentItems => currentItems?.filter(item => item.__product__.product_id !== productId));
        } else {
            console.error(response.message); // Handle error scenario
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

const handleClearCart = async () => {
    if (!userId) return; // Ensure there's a userId available
    try {
        const response = await api.cartApi.removeCart(userId);
        if (response.message === "All products removed from cart successfully") {
            // Clear the cart items and update state
            setCartItems([]);
            onClearCart(); // Notify parent component that the cart is cleared
        } else {
            console.error(response.message); // Handle error scenario
        }
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};

useEffect(() => {
    if (clearTrigger) {
        handleClearCart(); // Call the existing cart clearing logic when clearTrigger changes
    }
}, [clearTrigger]);


    return (
        <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading cart.</p>
        ) : isEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <ProductDisplayInCart
              key={item.__product__.product_id}
              thumbnail={item.__product__.thumbnail}
              title={item.__product__.title}
              price={item.__product__.price}
              quantity={item.quantity}
              onRemoveProduct={() => handleRemoveProductFromCart(item.__product__.product_id)}
            />
          ))
        )}
      </div>
    );
}