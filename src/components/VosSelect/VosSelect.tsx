import { useState } from "react";
import { vos } from "../../helpers/vos";

interface SelectedValues {
  mainCategory: string;
  subCategory: string;
}

interface VosItem {
  code: string;
  spec: string;
}

export const VosSelect = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    mainCategory: "",
    subCategory: "",
  });

  const mainCategories = Object.keys(vos[0]);

  const getSubCategories = (mainCategory: string) => {
    if (!mainCategory) return [];
    return Object.keys(vos[0][mainCategory as keyof typeof vos[0]] || {});
  };

  const handleMainCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValues({
      mainCategory: e.target.value,
      subCategory: "",
    });
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValues((prev) => ({
      ...prev,
      subCategory: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        value={selectedValues.mainCategory}
        onChange={handleMainCategoryChange}
        className="p-2 border rounded"
      >
        <option value="">Оберіть категорію</option>
        {mainCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Селект підкатегорій */}
      {selectedValues.mainCategory && (
        <select
          value={selectedValues.subCategory}
          onChange={handleSubCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">Оберіть підкатегорію</option>
          {getSubCategories(selectedValues.mainCategory).map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      )}

      {selectedValues.subCategory && (
        <div className="mt-4">
          <p>Обрані спеціальності:</p>
          <ul className="list-disc pl-5">
            {(vos[0][selectedValues.mainCategory as keyof typeof vos[0]]?.[
              selectedValues.subCategory as keyof typeof vos[0][keyof typeof vos[0]]
            ] as VosItem[]).map((item) => (
              <li key={item.code}>
                {item.code} - {item.spec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
