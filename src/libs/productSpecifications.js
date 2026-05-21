import { splitLineSeparatedText } from "@/libs/productApplications";

const valueToAdminText = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean)
      .join("\n");
  }

  if (typeof value === "string") return value;
  if (value === undefined || value === null) return "";

  return JSON.stringify(value);
};

export const normalizeSpecificationEntries = (specification) => {
  if (!specification) return [];

  if (Array.isArray(specification)) {
    return specification
      .map((item, index) => ({
        key: String(item?.key ?? "").trim(),
        value: item?.value,
        order: Number.isFinite(Number(item?.order))
          ? Number(item.order)
          : index + 1,
        originalIndex: index,
      }))
      .filter(({ key }) => key)
      .sort((a, b) => a.order - b.order || a.originalIndex - b.originalIndex);
  }

  if (typeof specification === "object") {
    return Object.entries(specification)
      .map(([key, value], index) => ({
        key,
        value,
        order: index + 1,
        originalIndex: index,
      }))
      .filter(({ key, value }) => {
        if (!String(key || "").trim()) return false;
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null;
      });
  }

  return [];
};

export const specificationToRows = (specification, createSpecRow) => {
  const rows = normalizeSpecificationEntries(specification).map((item) =>
    createSpecRow(item.key, valueToAdminText(item.value))
  );

  return rows.length ? rows : [createSpecRow()];
};

export const rowsToOrderedSpecification = (rows) =>
  rows
    .map((row, index) => ({
      key: String(row.key || "").trim(),
      valueText: String(row.value ?? ""),
      order: index + 1,
    }))
    .filter(({ key }) => key)
    .map(({ key, valueText }, index) => {
      const items = splitLineSeparatedText(valueText);

      return {
        key,
        value: items.length > 1 ? items : valueText.trim(),
        order: index + 1,
      };
    });
