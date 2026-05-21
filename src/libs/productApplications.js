export const splitLineSeparatedText = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => splitLineSeparatedText(item))
      .filter(Boolean);
  }

  return String(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const splitProductApplicationText = splitLineSeparatedText;

export const textOrNullPreservingLines = (value) => {
  if (value === undefined || value === null) return null;

  const text = String(value);
  return text.trim() ? text : null;
};
