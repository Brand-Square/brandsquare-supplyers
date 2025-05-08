type TableHeadingProps = {
  text: string;
};

export const TableHeading = ({ text }: TableHeadingProps) => {
  return <h1 className="text-[#2A2B2D] font-semibold text-lg">{text}</h1>;
};
