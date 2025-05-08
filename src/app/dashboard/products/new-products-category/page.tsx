import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { AddCategoryForm } from "./AddCategoryForm";

const NewProductPage = () => {
  return (
    <div>
      <div>
        <PrimaryHeading text="Add New Category" />
        <SectionSubtitle text="Add a new category to your dashboard" />
      </div>
      <div className="mt-5">
        <AddCategoryForm />
      </div>
    </div>
  );
};
export default NewProductPage;
