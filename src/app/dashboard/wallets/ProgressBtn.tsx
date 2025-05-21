import React from "react";

interface ProgressButtonProps {
    value: number;
    height?: string;
    className?: string;
}

export const ProgressButton: React.FC<ProgressButtonProps> = ({
    value,
    height = "h-8",
    className = "",
}) => {

    const progressValue = Math.max(0, Math.min(100, value));


    let bgColor = "";
    let textColor = "";
    let fillColor = "";
    let borderColor = "";

    if (progressValue === 0) {
        bgColor = "bg-[#fff]";
        textColor = "text-[#AD3307]";
        fillColor = "bg-[#FFECE5]";
        borderColor = "border border-[#AD3307]";

    } else if (progressValue === 100) {
        bgColor = "bg-[#fff]";
        textColor = "text-[#036B26]";
        fillColor = "bg-[#E7F6EC]";
        borderColor = "border border-[#036B26]";
        
    } else {
        bgColor = "bg-[#fff]";
        textColor = "text-[#865503]";
        fillColor = "bg-[#FEF6E7]";
        borderColor = "border border-[#865503]";

    }

    return (
        <div
            className={`relative w-full ${height} ${bgColor} ${borderColor} rounded-lg overflow-hidden ${className}`}
            role="progressbar"
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
        >

            <div
                className={`absolute top-0 left-0 ${fillColor} ${height} transition-all duration-300`}
                style={{ width: `${progressValue}%` }}
            />


            <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold ${textColor} z-10`}
            >
                {progressValue}%
            </div>
        </div>
    );
};

