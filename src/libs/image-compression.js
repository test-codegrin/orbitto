import sharp from "sharp";

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const HARD_TARGET_OUTPUT_BYTES = 50 * 1024;

const QUALITY_STEPS = [
  80, 74, 68, 62, 56, 50, 44, 38, 32, 26, 20, 16, 12, 8, 5, 4, 3, 2, 1,
];

const MAX_COMPRESSION_ATTEMPTS = Number(
  process.env.IMAGE_COMPRESSION_MAX_ATTEMPTS ?? 120
);

const MAX_IMAGE_COMPRESSION_MS = Number(
  process.env.IMAGE_COMPRESSION_TIMEOUT_MS ?? 120000
);

async function compressToWebpBuffer(file) {
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error(
      `Unsupported image type "${file.type}". Use jpg, jpeg, png, or webp.`
    );
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  let attempts = 0;
  let smallestAttemptBytes = Number.POSITIVE_INFINITY;
  let smallestOutput = null;
  const startedAt = Date.now();

  for (const quality of QUALITY_STEPS) {
    attempts += 1;

    if (attempts > MAX_COMPRESSION_ATTEMPTS) {
      break;
    }

    if (Date.now() - startedAt > MAX_IMAGE_COMPRESSION_MS) {
      if (smallestOutput) return smallestOutput;

      throw new Error(
        `Image "${file.name}" compression timed out after ${
          MAX_IMAGE_COMPRESSION_MS / 1000
        }s. Try a smaller image.`
      );
    }

    const output = await sharp(fileBuffer)
      .rotate()
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (output.length < smallestAttemptBytes) {
      smallestAttemptBytes = output.length;
      smallestOutput = output;
    }

    if (output.length <= HARD_TARGET_OUTPUT_BYTES) {
      return output;
    }
  }

  if (smallestOutput) return smallestOutput;

  throw new Error(
    `Image "${file.name}" compression failed before any output was generated.`
  );
}

function toByteaHex(value) {
  return `\\x${value.toString("hex")}`;
}

export async function compressImagesForDatabase(images) {
  const compressed = [];

  for (const image of images) {
    const originalBytes = image.size;
    const buffer = await compressToWebpBuffer(image);
    const compressedBytes = buffer.length;
    const savedBytes = Math.max(originalBytes - compressedBytes, 0);
    const savedPercent =
      originalBytes > 0
        ? Number(((savedBytes / originalBytes) * 100).toFixed(2))
        : 0;

    compressed.push({
      imageBlob: toByteaHex(buffer),
      mimeType: "image/webp",
      sourceName: image.name,
      originalBytes,
      compressedBytes,
      savedBytes,
      savedPercent,
    });
  }

  return compressed;
}

export function byteaToBuffer(value) {
  if (!value) {
    throw new Error("Image not found");
  }

  if (Buffer.isBuffer(value)) {
    return value;
  }

  if (typeof value === "string") {
    if (value.startsWith("\\x")) {
      return Buffer.from(value.slice(2), "hex");
    }

    return Buffer.from(value, "base64");
  }

  if (value instanceof ArrayBuffer) {
    return Buffer.from(value);
  }

  if (ArrayBuffer.isView(value)) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  }

  throw new Error("Unsupported image blob format");
}
