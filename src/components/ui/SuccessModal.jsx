import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export const SuccessModal = ({
  isOpen,
  title,
  description,
  buttonText = "Next",
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <CardContent className="p-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center shadow-lg shadow-green-200">
              <FiCheck className="text-white w-6 h-6" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3 text-text-primary">{title}</h2>

          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-[300px]">
            {description}
          </p>

          <Button
            onClick={onNext}
            className="w-full h-11 bg-[#240457] hover:bg-indigo-800 text-white rounded-md font-medium"
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
