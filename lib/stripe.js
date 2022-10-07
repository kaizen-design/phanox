import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }
  return stripePromise;
}

export const handleCheckout = async (products) => {
  const stripe = await getStripe();
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  });

  if (response.statusCode === 500) return;

  const data = await response.json();
  toast.loading('Redirecting to checkout page...');
  stripe.redirectToCheckout({
    sessionId: data.id
  });
};