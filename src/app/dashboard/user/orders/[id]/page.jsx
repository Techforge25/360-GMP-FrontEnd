import OrderTrackingPage from "@/components/dashboard/orders/OrderTrackingPage";

export default function Page({ params }) {
    // We can pass the order ID, but for the demo it's hardcoded to 39201 in the component
    return <OrderTrackingPage orderId={params.id} />;
}
