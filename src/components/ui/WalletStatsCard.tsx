import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./card";
import { dmSans } from "../fonts";
import { ReactNode } from "react";

type StatsCardProps = {
    title: string;
    icon: ReactNode;
    info?: string;
    value: string;
    percentageValue?: string;
    className?: string;
    showActionTop?: boolean;       
    showActionBottom?: boolean;   
    actionText?: string;          
    actionClassName?: string;    
};

export const StatsCard = ({
    icon,
    title,
    info,
    value,
    percentageValue,
    className,
    showActionTop = false,
    showActionBottom = false,
    actionText = "",
    actionClassName = "text-red-500 underline font-bold"
}: StatsCardProps) => {
    return (
        <Card className={cn("flex flex-col justify-between", className)}>
            <CardHeader className="space-y-3 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <div className="size-[2rem] rounded-lg bg-[#EDF4FF] grid place-items-center border border-[#C2DCFF]">
                            {icon}
                        </div>
                        <CardTitle
                            className={cn(
                                "text-theme-blue text-sm font-medium",
                                dmSans.className
                            )}
                        >
                            {title}
                        </CardTitle>
                    </div>

                    {showActionTop && actionText && (
                        <div className="flex items-center gap-x-1">
                            <p className={cn(actionClassName)}>{actionText}</p>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-x-1">
                    {percentageValue && (
                        <div className="bg-[#EDF4FF] py-[2px] px-1.5 rounded-xl flex items-center gap-x-1.5 text-xs text-theme-blue">
                            <IconChart />
                            <span>{percentageValue}%</span>
                        </div>
                    )}

                    {info && <CardDescription>{info}</CardDescription>}
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <div className="flex justify-between items-center">
                    <p className={cn("font-semibold text-3xl text-[#12110F]")}>{value}</p>

                    {showActionBottom && actionText && (
                        <div className="flex items-center gap-x-1">
                            <p className={cn(actionClassName)}>{actionText}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const IconChart = () => (
    <svg
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.31442 3.85355C2.11915 3.65829 2.11915 3.3417 2.31442 3.14644C2.50968 2.95118 2.82626 2.95118 3.02152 3.14644L4.70185 4.82677L5.3517 4.29606C5.5559 4.1293 5.8545 4.14974 6.03406 4.34278L7.66939 6.10075L8.3032 5.42469C8.49207 5.22323 8.80848 5.21303 9.00994 5.40189C9.2114 5.59076 9.2216 5.90718 9.03274 6.10863L8.03274 7.1753C7.93798 7.27637 7.80554 7.3336 7.667 7.33333C7.52846 7.33306 7.39624 7.27532 7.30188 7.17388L5.62116 5.36711L4.98424 5.88726C4.78541 6.04963 4.49593 6.03506 4.31442 5.85355L2.31442 3.85355Z"
            fill="#000051"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.16797 0.5C1.0634 0.5 0.167969 1.39543 0.167969 2.5V7.5C0.167969 8.60457 1.0634 9.5 2.16797 9.5H9.16797C10.2725 9.5 11.168 8.60457 11.168 7.5V2.5C11.168 1.39543 10.2725 0.5 9.16797 0.5H2.16797ZM1.16797 2.5C1.16797 1.94772 1.61568 1.5 2.16797 1.5H9.16797C9.72025 1.5 10.168 1.94772 10.168 2.5V7.5C10.168 8.05228 9.72025 8.5 9.16797 8.5H2.16797C1.61568 8.5 1.16797 8.05228 1.16797 7.5V2.5Z"
            fill="#000051"
        />
    </svg>
);
