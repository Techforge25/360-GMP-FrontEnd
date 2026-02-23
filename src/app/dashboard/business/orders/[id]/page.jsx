import BusinessOrderDetailsPage from "@/components/dashboard/orders/BusinessOrderDetailsPage";

export default function OrderDetailsRoute({ params }) {
    return <BusinessOrderDetailsPage orderId={params.id} />;
}
