import {
  VariantCombination,
  VariantField,
  VariantOptionCombinationResponse,
  VariantValue,
} from "./product.type";

// Helper function to generate all combinations of variant values
export const generateCombinationsImage = (
  arrays: VariantValue[][]
): VariantValue[][] => {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const restCombos = generateCombinationsImage(rest);
  return first.flatMap((f) => restCombos.map((r) => [f, ...r]));
};

// export const generateCombinations = (
//   variantFields: VariantField[],
//   baseProductName: string,
//   variantImageResponses: VariantOptionCombinationResponse[]
// ): VariantCombination[] => {
//   // Step 1: group each value with its field
//   const valueGroups = variantFields.map((field) =>
//     field.values.map((value) => ({ fieldName: field.name, ...value }))
//   );

//   // Step 2: generate cartesian product of all possible combinations
//   const cartesian = (arr: typeof valueGroups): typeof valueGroups => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return arr.reduce<any[][]>(
//       (acc, group) =>
//         acc.flatMap((accItem) => group.map((item) => [...accItem, item])),
//       [[]]
//     );
//   };

//   const combinations = cartesian(valueGroups);

//   // Step 3: build variant combinations from each permutation
//   return combinations.map((combo) => {
//     const properties = combo.map((v) => v.label);
//     const comboName = `${variantFields}-${properties.join("-")}`;

//     const variantPrice = combo.reduce(
//       (total, val) => total + (val.variantPrice || 0),
//       0
//     );

//     const variantStock = combo.reduce(
//       (min, val) =>
//         typeof val.variantStock === "number"
//           ? Math.min(min, val.variantStock)
//           : min,
//       Infinity
//     );

//     // Find matching image combo by name
//     const matchedImages = variantImageResponses.find(
//       (item) => item.name === comboName
//     );

//     return {
//       name: comboName,
//       variantPrice,
//       variantStock: isFinite(variantStock) ? variantStock : 0,
//       properties,
//       variantImages: matchedImages?.variantImages || [],
//     };
//   });
// };

export const generateCombinations = (
  variantFields: VariantField[],
  variantImageResponses: VariantOptionCombinationResponse[]
): VariantCombination[] => {
  return variantImageResponses.map((val) => {
    const nameParts = val.name.split("-");

    const comboMap: Record<string, string> = {};
    for (let i = 0; i < nameParts.length; i += 2) {
      const fieldName = nameParts[i];
      const valueLabel = nameParts[i + 1];
      comboMap[fieldName] = valueLabel;
    }

    const combo: VariantValue[] = [];

    const properties: string[] = variantFields.map((field) => {
      const matchedLabel = comboMap[field.name];
      const value = matchedLabel
        ? field.values.find((v) => v.label === matchedLabel)
        : field.values[0]; // fallback to first available value

      if (value) {
        combo.push(value);
        return value.label;
      }

      return ""; // fallback if nothing matched
    });

    const variantPrice = combo.reduce(
      (total, val) => total + (val.variantPrice || 0),
      0
    );

    const variantStock = combo.reduce(
      (min, val) =>
        typeof val.variantStock === "number"
          ? Math.min(min, val.variantStock)
          : min,
      Infinity
    );

    return {
      name: val.name,
      properties,
      variantPrice,
      variantStock: isFinite(variantStock) ? variantStock : 0,
      variantImages: val.variantImages,
    };
  });
};
