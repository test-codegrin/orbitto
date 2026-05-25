"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const T = {
  border: "#e2ebd4",
  greenMid: "#2d6e1a",
  text: "#1a2e14",
  muted: "#6b8560",
  card: "#ffffff",
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const toEmbeddableVideoUrl = (rawUrl) => {
  const value = String(rawUrl || "").trim();
  if (!value) return "";

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    // Convert standard YouTube links to embed links.
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      let videoId = "";

      if (host === "youtu.be") {
        videoId = parsed.pathname.split("/").filter(Boolean)[0] || "";
      } else if (parsed.pathname.startsWith("/watch")) {
        videoId = parsed.searchParams.get("v") || "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/").filter(Boolean)[1] || "";
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/").filter(Boolean)[1] || "";
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return value;
  } catch {
    return value;
  }
};

const BlogDetailsPrimary = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [detailRes, listRes] = await Promise.all([
        fetch(`/api/blog/${id}`, { cache: "no-store" }),
        fetch("/api/blog", { cache: "no-store" }),
      ]);
      const detail = await detailRes.json().catch(() => ({}));
      const list = await listRes.json().catch(() => ({}));
      setBlog(detail.data || null);
      setAllBlogs(list.data || []);
    };
    if (id) load();
  }, [id]);

  const orderedBlocks = useMemo(() => blog?.content_sequence || [], [blog]);
  const sortedImages = useMemo(
    () => (blog?.blog_images || []).slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [blog]
  );
  const blogTitle = blog?.title || blog?.blog_author || "Orbitto Article";
  const coverSrc = sortedImages.length ? `/api/blog/image/${sortedImages[0].image_id}` : `/api/blog/${id}/image`;
  const coverImageId = sortedImages[0]?.image_id ?? null;

  const currentIndex = allBlogs.findIndex((b) => b.blog_detail_id === Number.parseInt(id, 10));
  const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  const getImageSrc = (block) =>
    block?.image_id ? `/api/blog/image/${block.image_id}` : block?.url || "";

  if (!blog) {
    return <div style={{ padding: "80px 24px", textAlign: "center", color: T.muted }}>Loading blog...</div>;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 28px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", background: "#e4f0d8", color: T.greenMid, fontSize: "10px", fontWeight: "700", padding: "5px 14px", marginBottom: "20px", border: `1px solid ${T.border}` }}>
              {blog.blog?.blog_category || "General"}
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: "800", color: T.text, lineHeight: "1.18", margin: "0 0 18px" }}>
              {blogTitle}
            </h1>
            <p style={{ fontSize: "13.5px", color: T.muted, lineHeight: "1.7", margin: "0 0 24px" }}>{blog.excerpt || ""}</p>
            <div style={{ fontSize: "11px", color: T.muted }}>
              {formatDate(blog.created_at)} • {blog.blog_read_time || "5 min read"}
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <Image src={coverSrc} alt={blogTitle} fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 28px 0" }}>
        {(() => {
          const rendered = [];
          for (let i = 0; i < orderedBlocks.length; i += 1) {
            const block = orderedBlocks[i];

            if (block.type === "image" || block.type === "image_url") {
              const imageGroup = [block];
              while (
                i + 1 < orderedBlocks.length &&
                (orderedBlocks[i + 1].type === "image" || orderedBlocks[i + 1].type === "image_url")
              ) {
                imageGroup.push(orderedBlocks[i + 1]);
                i += 1;
              }

              const nonDuplicateImages = imageGroup.filter((imageBlock) => {
                if (imageBlock?.image_id && coverImageId) {
                  return Number(imageBlock.image_id) !== Number(coverImageId);
                }
                return getImageSrc(imageBlock) !== coverSrc;
              });

              if (!nonDuplicateImages.length) {
                continue;
              }

              rendered.push(
                <div
                  key={`image-group-${i}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: nonDuplicateImages.length > 1 ? "1fr 1fr" : "1fr",
                    gap: "16px",
                    marginBottom: "24px",
                    maxWidth: nonDuplicateImages.length > 1 ? "100%" : "560px",
                    marginLeft: nonDuplicateImages.length > 1 ? "0" : "auto",
                    marginRight: nonDuplicateImages.length > 1 ? "0" : "auto",
                  }}
                >
                  {nonDuplicateImages.map((imageBlock, imageIndex) => (
                    <div key={`img-wrap-${imageIndex}-${getImageSrc(imageBlock)}`} style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                      <Image
                        key={`img-${imageIndex}-${getImageSrc(imageBlock)}`}
                        src={getImageSrc(imageBlock)}
                        alt={`Blog image ${imageIndex + 1}`}
                        width={1200}
                        height={900}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              );
              continue;
            }

            if (block.type === "description") {
              rendered.push(
                <div
                  key={`desc-${i}`}
                  style={{ marginBottom: "40px", color: T.muted, lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: block.html || "" }}
                />
              );
              continue;
            }

            if (block.type === "quote") {
              rendered.push(
                <div key={`quote-${i}`} style={{ borderLeft: `4px solid ${T.greenMid}`, padding: "8px 0 8px 28px", margin: "0 0 52px" }}>
                  <blockquote style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.7", color: T.greenMid, fontWeight: "600", margin: 0 }}>
                    {block.text}
                  </blockquote>
                </div>
              );
              continue;
            }

            if (block.type === "video") {
              const embedUrl = toEmbeddableVideoUrl(block.url);
              if (!embedUrl) continue;
              rendered.push(
                <div key={`video-${i}`} style={{ marginBottom: "24px", aspectRatio: "16/9" }}>
                  <iframe
                    src={embedUrl}
                    title={`video-${i}`}
                    style={{ width: "100%", height: "100%", border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              );
            }
          }
          return rendered;
        })()}

        {Object.keys(blog.blog_metrics || {}).length ? (
          <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "28px 32px", marginBottom: "40px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: T.text, margin: "0 0 20px" }}>Absorption Metrics</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
              {Object.entries(blog.blog_metrics || {}).map(([key, value]) => (
                <div key={key}>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: T.text, lineHeight: 1, marginBottom: "6px" }}>{String(value)}</div>
                  <div style={{ fontSize: "11px", color: T.muted, letterSpacing: "0.02em" }}>{key}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ height: 1, background: T.border, marginBottom: "36px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
          <div style={{ textAlign: "left", visibility: prev ? "visible" : "hidden" }}>
            {prev ? <Link href={`/blogs/${prev.blog_detail_id}`} style={{ color: T.text, textDecoration: "none" }}>← Prev Post</Link> : null}
          </div>
          <div style={{ textAlign: "right", visibility: next ? "visible" : "hidden" }}>
            {next ? <Link href={`/blogs/${next.blog_detail_id}`} style={{ color: T.text, textDecoration: "none" }}>Next Post →</Link> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPrimary;
