import React from 'react';

interface VerticalBarProps {
    orangePercentage?: number; // 0-100
    barWidth?: number; // in pixels
    orangeColor?: string;
    grayColor?: string;
    height?: string;
}

const VerticalBar: React.FC<VerticalBarProps> = ({
    orangePercentage = 60,
    barWidth = 4,
    orangeColor = 'bg-orange-500',
    grayColor = 'bg-gray-300',
    height = 'h-64'
}) => {
    return (
        <div className={`relative ${height} flex justify-center`}>
            {/* Gray background bar */}
            <div
                className={`${grayColor} rounded-full`}
                style={{ width: `${barWidth}px` }}
            />

            {/* Orange portion */}
            <div
                className={`${orangeColor} rounded-full absolute top-0`}
                style={{
                    width: `${barWidth}px`,
                    height: `${orangePercentage}%`
                }}
            />
        </div>
    );
};

// Demo component just to show the bar
const StaticBarDemo = () => {
    return (
        <div className="p-4 flex flex-col items-center">
            <div className="w-full flex justify-center">
                <VerticalBar />
            </div>
        </div>
    );
};

export default StaticBarDemo;