import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div
      className="
        bg-background rounded-lg shadow-sm border 
        p-3 sm:p-4 md:p-6 
        w-full sm:w-[80%] md:w-[300px] lg:w-[350px] 
        mx-auto md:mx-0
        max-h-[80vh] overflow-y-auto
        sticky top-20
      "
    >
      {/* Header */}
      <div className="pb-3 border-b mb-3">
        <h2 className="text-lg sm:text-xl font-extrabold text-center md:text-left">
          Filters
        </h2>
      </div>

      {/* Filter Sections */}
      <div className="space-y-5">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2">
                {keyItem}
              </h3>

              <div
                className="
                  grid gap-2
                  grid-cols-1 sm:grid-cols-2 md:grid-cols-1
                  text-sm sm:text-base
                "
              >
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span>{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            {index !== Object.keys(filterOptions).length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
