"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { FiDownload, FiPrinter, FiShare2 } from "react-icons/fi";
import axios from "axios";
import Image from "next/image"; // For product images if needed
import { format } from "date-fns"; // For advanced date formatting (npm install date-fns)
import { enGB } from "date-fns/locale"; // For PK locale
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function InvoicePage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const invoiceRef = useRef(null); // Ref for capturing PDF

  // Fetch order with useCallback for optimization
  const fetchOrder = useCallback(async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/orders/${orderId}/view`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setOrder(res.data.data);
      } else {
        throw new Error("Order details not fetched");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch order");
      toast.error(err.message || "Order Not fetch ");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);



  const handleDownload = async () => {
    if (!order) return;
    console.log(order, "order")

    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const pdf = new jsPDF();

    const themeColor = "#240457";

    pdf.setFillColor(themeColor);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 30, "F");
    pdf.setFontSize(20);
    pdf.setTextColor("#ffffff");
    pdf.text("INVOICE", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setTextColor("#000000");
    pdf.text(`Order ID: ${order._id}`, 14, 40);
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 48);
    pdf.text(`Customer: ${order.userProfile.fullName}`, 14, 56);
    pdf.setDrawColor(200);
    pdf.line(14, 60, pdf.internal.pageSize.getWidth() - 14, 60);
    autoTable(pdf, {
      startY: 65,
      head: [["Item", "Category", "Price"]],
      body: order.products.map((item) => [
        item.title,
        item.category,
        `$${item.pricePerUnit}`
      ]),
      headStyles: {
        fillColor: themeColor,
        textColor: "#ffffff",
        halign: "center",
        fontStyle: "bold"
      },
      bodyStyles: {
        halign: "center"
      },
      alternateRowStyles: { fillColor: "#f3f3f3" },
      margin: { left: 14, right: 14 }
    });

    const finalY = pdf.lastAutoTable?.finalY || 65;
    pdf.setDrawColor(200);
    pdf.line(14, finalY + 5, pdf.internal.pageSize.getWidth() - 14, finalY + 5);

    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text(`Total: $${order.totalAmount}`, 14, finalY + 15);

    pdf.setFontSize(10);
    pdf.setTextColor("#666666");
    pdf.text(
      "Thank you for your purchase!",
      pdf.internal.pageSize.getWidth() / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );

    pdf.save(`invoice-${order._id}.pdf`);
  };

  // Print handler (browser print)
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Share handler (Web Share API if supported)
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice for Order ${order?._id}`,
          text: "View your invoice details",
          url: window.location.href,
        });
      } catch (err) {
        toast.error("Not Share");
      }
    } else {
      toast.info("Share feature not supported browser ");
    }
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#240457]"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
        <p className="text-xl font-bold mb-4">{error || "Order nahi mila"}</p>
        <button
          onClick={fetchOrder}
          className="bg-[#240457] text-white px-6 py-2 rounded-lg hover:bg-[#1e0a3c]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="bg-[#240457] text-white text-black p-6 text-center print:p-4">
          <h1 className="text-3xl font-bold  print:text-2xl">Invoice</h1>
          <p className="mt-2 print:text-sm">Order ID: {order._id}</p>
          <p className="text-sm print:text-xs">
            Status: <span className="capitalize">{order.status}</span>
          </p>
        </div>

        <div ref={invoiceRef} className="p-8 print:p-4">
          <div className="flex flex-col md:flex-row justify-between mb-10 print:mb-6">
            <div className="mb-6 md:mb-0">
              <h2 className="font-bold text-lg print:text-base text-black">Seller Details</h2>
              <p className="text-black">{order.businessProfile?.companyName || "Stwayne Manufacturer"}</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="font-bold text-lg print:text-base text-black">Buyer Details</h2>
              <p className="text-black">{order.shippingAddress?.name || ""}</p>
              <p className="text-black">{order.shippingAddress?.phone || ""}</p>
              <p className="text-black">
                {order.shippingAddress?.lineAddress?.join(", ") || "Johar Town, Johar Town"},
                {order.shippingAddress?.province || "Sindh"}, {order.shippingAddress?.postalCode || "45321"}
              </p>
            </div>
          </div>

          <div className="mb-8 print:mb-4">
            <p className="text-sm text-gray-600 print:text-xs">
              Invoice Date: {format(new Date(order.createdAt), "PPP", { locale: enGB })}
            </p>
            <p className="text-sm text-gray-600 print:text-xs">
              Category: {order.products[0]?.category || "Electronics"}
            </p>
          </div>

          {/* Responsive Table – header text fix */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-8 print:mb-4">
              <thead>
                <tr className="bg-gray-100 print:bg-gray-200">
                  <th className="border p-3 text-left print:p-2 print:text-sm text-gray-900 print:text-black font-bold">
                    Product
                  </th>
                  {/* <th className="border p-3 text-center print:p-2 print:text-sm text-gray-900 print:text-black font-bold">
            Image
          </th> */}
                  <th className="border p-3 text-center print:p-2 print:text-sm text-gray-900 print:text-black font-bold">
                    Qty
                  </th>
                  <th className="border p-3 text-right print:p-2 print:text-sm text-gray-900 print:text-black font-bold">
                    Unit Price
                  </th>
                  <th className="border p-3 text-right print:p-2 print:text-sm text-gray-900 print:text-black font-bold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => {
                  const prod = order.products?.[idx] || {};
                  return (
                    <tr key={idx}>
                      <td className="border text-black p-3 print:p-2 print:text-sm">
                        {prod.title || ""}
                        {/* <p className="text-xs text-black print:hidden">
                  {prod.detail ? JSON.parse(prod.detail)[0]?.children?.[0]?.text || "" : ""}...
                </p> */}
                      </td>
                      {/* <td className="border p-3 text-center print:p-2">
                {prod.image ? (
                  <Image
                    src={prod.image}
                    alt={prod.title || "Product"}
                    width={50}
                    height={50}
                    className="mx-auto rounded"
                    unoptimized
                  />
                ) : (
                  "N/A"
                )}
              </td> */}
                      <td className="border p-3 text-center text-black print:p-2 print:text-sm">{item.quantity}</td>
                      <td className="border p-3 text-right print:p-2 text-black print:text-sm">
                        ${item.priceAtPurchase.toFixed(2)}
                      </td>
                      <td className="border p-3 text-right print:p-2 text-black print:text-sm">
                        ${(item.quantity * item.priceAtPurchase).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-right text-xl font-bold text-black print:text-lg print:mb-4">
            Grand Total: ${order.totalAmount.toFixed(2)}
          </div>

          {/* <div className="mt-12 text-center text-gray-500 text-sm print:mt-6 print:text-xs print:mb-0">
    Thank you for your business! | Generated in Karachi, PK
  </div> */}
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t bg-gray-50 flex flex-wrap gap-4 justify-center print:hidden">
          <button
            onClick={handleDownload}
            className="flex-1 max-w-xs bg-[#1DAF61] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#189b53] transition-colors text-[15px]"
          >
            <FiDownload className="w-5 h-5" /> Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 max-w-xs bg-blue-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors text-[15px]"
          >
            <FiPrinter className="w-5 h-5" /> Print
          </button>
          <button
            onClick={handleShare}
            className="flex-1 max-w-xs bg-purple-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors text-[15px]"
          >
            <FiShare2 className="w-5 h-5" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}