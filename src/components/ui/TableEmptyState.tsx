import { EmptySvg } from "../../../public/assets/svg/EmptySvg";

type EmptyStateProps = {
  heading: string;
  subText: string;
};

export const TableEmptyState = ({ heading, subText }: EmptyStateProps) => {
  return (
    <div className="h-[20rem] grid place-items-center">
      <div className="text-center grid place-items-center">
        <EmptySvg />
        <div>
          <p className="font-semibold text-[#2A2B2D]">
          {heading}
          </p>
          <p className="text-sm text-[#6A6B72] font-medium">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
};
