import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Card } from "@/components/ui/Card";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-3 overflow-hidden border-none shadow-sm">
      <button
        className="flex w-full items-center justify-between bg-surface-elevated px-6 py-4 text-left transition-colors hover:bg-surface-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <span className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border">
          {isOpen ? (
            <FiMinus className="h-4 w-4" />
          ) : (
            <FiPlus className="h-4 w-4" />
          )}
        </span>
      </button>
      <div
        className={cn(
          "px-6 text-base text-text-secondary transition-all duration-300 ease-in-out",
          isOpen ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        {answer}
      </div>
    </Card>
  );
};

const FAQAccordion = ({ items }) => {
  // Mock items if none provided
  const defaultItems = [
    {
      question: "What is 360GMP?",
      answer:
        "360GMP is a unified platform for buying, selling, hiring, applying to jobs, creating business profiles, listing products, and managing transactions.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "New users get a 14-day trial with limited feature access. After the trial ends, account will be locked until membership is reactivated.",
    },
    {
      question: "Do I need to pay to create a business?",
      answer: "Yes, you need to pay to create a business.",
    },
    {
      question: "How does the escrow system work?",
      answer:
        "Buyers deposit funds -> 360GMP holds securely -> Seller delivers -> Buyer approves -> Funds released.",
    },
    {
      question: "Can job-seekers use the platform for free?",
      answer:
        "Yes, job-seekers can apply to limited jobs during trial. After trial if client purchased the member ship then he can apply on unlimited job applications.",
    },
  ];

  const data = items || defaultItems;

  return (
    <div className="w-full max-w-2xl">
      {data.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export { FAQAccordion };
