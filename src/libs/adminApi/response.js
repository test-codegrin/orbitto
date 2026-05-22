export const successResponse = (message, data = {}, status = 200) =>
  Response.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );

export const listResponse = (data, pagination, status = 200) =>
  Response.json(
    {
      success: true,
      data,
      pagination,
    },
    { status }
  );

export const errorResponse = (message, status = 400) =>
  Response.json(
    {
      success: false,
      message,
    },
    { status }
  );

export const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const buildPagination = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: total > 0 ? Math.ceil(total / limit) : 0,
});
