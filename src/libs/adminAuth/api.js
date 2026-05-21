export const jsonError = (message, status = 400) =>
  Response.json({ error: message }, { status });

export const normalizeString = (value) => String(value || "").trim();

