"use client";
import getAllBlogs from "@/libs/getAllBlogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import makePath from "@/libs/makePath";
import BlogCard4 from "@/components/shared/cards/BlogCard4";
import modifyNumber from "@/libs/modifyNumber";
import countCommentLength from "@/libs/countCommentLength";
import sliceText from "@/libs/sliceText";

/* ─── tiny icon helpers ─────────────────────────────────────── */
const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const ArrowIcon = ({ dir = "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─── social icons ──────────────────────────────────────────── */
const FB = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const TW = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
const LI = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
const YT = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#f0f4e8" /></svg>;

/* ─── shared style tokens ───────────────────────────────────── */
const T = {
  bg: "#f0f4e8",
  card: "#ffffff",
  border: "#e2ebd4",
  green: "#1e4d14",
  greenMid: "#2d6e1a",
  greenLight: "#e4f0d8",
  text: "#1a2e14",
  muted: "#6b8560",
  amber: "#c87941",
  radius: "20px",
  radiusSm: "12px",
  font: "'Georgia', 'Times New Roman', serif",
  sans: "'Helvetica Neue', Arial, sans-serif",
};

const BlogDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const blogs = getAllBlogs();
  const blog = blogs?.find(({ id }) => id === parseInt(currentId));
  const { title, image, id, publishDate, desc, author, category, comments, tags } = blog ? blog : {};
  const pervBlog = blogs.find(({ id }) => id === parseInt(currentId) - 1);
  const nextBlog = blogs.find(({ id }) => id === parseInt(currentId) + 1);
  const { title: prevTitle, id: prevId } = pervBlog ? pervBlog : {};
  const { title: nextTitle, id: nextId } = nextBlog ? nextBlog : {};
  const relatedBlogs = blogs?.filter(({ author: a2 }) => a2?.name === author?.name)?.slice(0, 2);
  const totalBlogs = blogs?.length;
  const commentsLength = countCommentLength(comments);
  const totalComments = modifyNumber(commentsLength);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 28px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>

          {/* Left — title block */}
          <div>
            {/* Category badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: T.greenLight, color: T.greenMid,
              fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "5px 14px",
              borderRadius: "30px", marginBottom: "20px",
              border: `1px solid ${T.border}`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.greenMid, display: "inline-block" }} />
              <Link href={`/blogs?category=${makePath(category)}`} style={{ color: "inherit", textDecoration: "none" }}>
                {category || "Science & Research"}
              </Link>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: T.font, fontSize: "clamp(28px,4vw,42px)", fontWeight: "800",
              color: T.text, lineHeight: "1.18", letterSpacing: "-0.02em", margin: "0 0 18px",
            }}>
              {title || "The Bioavailability of Plant-Based Proteins"}
            </h1>

            {/* Description */}
            <p style={{ fontSize: "13.5px", color: T.muted, lineHeight: "1.7", margin: "0 0 24px" }}>
              {desc || "Understanding how micro-milling technology unlocks the true nutritional potential of botanical sources, ensuring maximum absorption and vitality."}
            </p>

            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: `2px solid ${T.border}`, flexShrink: 0 }}>
                {author?.image
                  ? <Image src={author.image} alt={author.name} width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  : <div style={{ width: "100%", height: "100%", background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: T.greenMid, fontWeight: "700" }}>
                      {author?.name?.[0] || "A"}
                    </div>
                }
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: T.text }}>
                  <Link href={`/blogs?author=${makePath(author?.name)}`} style={{ color: "inherit", textDecoration: "none" }}>
                    By {author?.name || "Dr. Elena Rostova"}
                  </Link>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: T.muted, marginTop: "2px" }}>
                  <CalIcon />
                  <span>{publishDate || "Oct 12, 2024"}</span>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <ClockIcon />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — hero image */}
          <div style={{ position: "relative", borderRadius: "22px", overflow: "hidden", aspectRatio: "4/3" }}>
            {image
              ? <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a4d1a,#2d8a2d)", minHeight: "280px" }} />
            }
            {/* Play button overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "rgba(255,255,255,0.22)", backdropFilter: "blur(6px)",
                border: "1.5px solid rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "transform 0.2s",
              }}>
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ARTICLE BODY
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 28px 0" }}>

        {/* Intro paragraph */}
        <p style={{ fontSize: "15px", color: "#3a5530", lineHeight: "1.8", marginBottom: "52px" }}>
          For decades, the conversation around plant-based protein centered on completeness—did it contain all nine essential amino acids?
          Today, the science has shifted. The new frontier is just what's in the powder, but how effectively your body can actually use it.
        </p>

        {/* ── Section 1 ── */}
        <h2 style={{ fontFamily: T.font, fontSize: "26px", fontWeight: "800", color: T.text, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
          The Micro-Milling Advantage
        </h2>
        <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.8", marginBottom: "18px" }}>
          Bioavailability refers to the proportion of a nutrient that is digested, absorbed, and metabolized through normal pathways.
          Plant cell walls are notoriously robust, often locking away valuable proteins and phytonutrients behind matrices of cellulose and pectin.
        </p>
        <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.8", marginBottom: "48px" }}>
          Traditional processing methods often rely on harsh extraction techniques that can denature proteins. Our approach utilizes cold micro-milling technology.
          By reducing the particle size to sub-micron levels under temperature-controlled conditions, we exponentially increase the surface area exposed to digestive enzymes.
        </p>

        {/* ── Blockquote ── */}
        <div style={{
          borderLeft: `4px solid ${T.greenMid}`,
          padding: "8px 0 8px 28px",
          margin: "0 0 52px",
          position: "relative",
        }}>
          <span style={{
            position: "absolute", top: "-4px", left: "14px",
            fontFamily: T.font, fontSize: "48px", color: T.greenMid, lineHeight: 1, opacity: 0.5,
          }}>"</span>
          <blockquote style={{
            fontFamily: T.font, fontStyle: "italic",
            fontSize: "17px", lineHeight: "1.7", color: T.greenMid,
            fontWeight: "600", margin: 0,
          }}>
            "We are not what we eat; we are what we absorb. The cellular matrix of botanical sources must be respected and gently unraveled, not forcefully destroyed."
          </blockquote>
        </div>

        {/* ── Dual images ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "52px" }}>
          {["/img/blog/blog-details/1.jpg", "/img/service/31.jpg"].map((src, i) => (
            <div key={i} style={{ borderRadius: T.radius, overflow: "hidden", aspectRatio: "4/3", background: i === 0 ? "#0d3d2a" : "#0a2e18" }}>
              <Image src={src} alt={`Article image ${i + 1}`} width={600} height={450} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>

        {/* ── Section 2 ── */}
        <h2 style={{ fontFamily: T.font, fontSize: "26px", fontWeight: "800", color: T.text, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
          Enzymatic Synergy
        </h2>
        <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.8", marginBottom: "36px" }}>
          Beyond physical milling, the pairing of ingredients plays a crucial role. We formulate with naturally occurring proteolytic enzymes—like bromelain from pineapple and papain from papaya—which begin the digestive process before the powder even reaches your stomach.
        </p>

        {/* ── Stats Card ── */}
        <div style={{
          background: T.card, borderRadius: T.radius,
          border: `1px solid ${T.border}`,
          padding: "28px 32px", marginBottom: "40px",
          boxShadow: "0 2px 16px rgba(30,70,20,0.07)",
        }}>
          <h4 style={{ fontFamily: T.font, fontSize: "17px", fontWeight: "700", color: T.text, margin: "0 0 20px" }}>
            Absorption Metrics
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {[
              { val: "89%", label: "PDCAAS Score", color: T.amber },
              { val: "3x", label: "Faster Assimilation", color: T.text },
              { val: "100%", label: "Plant-Derived", color: T.text },
            ].map(({ val, label, color }) => (
              <div key={label}>
                <div style={{ fontSize: "28px", fontWeight: "800", fontFamily: T.font, color, lineHeight: 1, marginBottom: "6px" }}>{val}</div>
                <div style={{ fontSize: "11px", color: T.muted, letterSpacing: "0.02em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing paragraph ── */}
        <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.8", marginBottom: "60px" }}>
          The resulting blend is not just a supplement; it is a bio-active functional food. By honoring the complex architecture of plant cells while applying modern milling precision, we deliver a product that feels remarkably light yet intensely nourishing.
        </p>

        {/* ══ Tags + Social ══ */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
          {tags?.length ? (
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Related Tags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tags.map((tag, i) => (
                  <Link key={i} href={`/blogs?tag=${makePath(tag)}`} style={{
                    padding: "5px 14px", borderRadius: "30px",
                    background: T.greenLight, color: T.greenMid,
                    fontSize: "12px", fontWeight: "600", textDecoration: "none",
                    border: `1px solid ${T.border}`,
                  }}>{tag}</Link>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Share</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { href: "https://www.facebook.com", icon: <FB /> },
                { href: "https://X.com", icon: <TW /> },
                { href: "https://www.linkedin.com", icon: <LI /> },
                { href: "https://www.youtube.com", icon: <YT /> },
              ].map(({ href, icon }) => (
                <Link key={href} href={href} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: T.card, border: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.muted, transition: "all 0.2s", textDecoration: "none",
                }}>{icon}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── divider ── */}
        <div style={{ height: 1, background: T.border, marginBottom: "36px" }} />

        {/* ══ Prev / Next ══ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
          {[
            { show: !!prevId, dir: "left", label: "← Prev Post", title: prevTitle, href: `/blogs/${prevId || 1}`, align: "left" },
            { show: !!nextId, dir: "right", label: "Next Post →", title: nextTitle, href: `/blogs/${nextId || totalBlogs}`, align: "right" },
          ].map(({ show, label, title: t, href, align }) => (
            <div key={label} style={{ visibility: show ? "visible" : "hidden", textAlign: align }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
              <Link href={href} style={{
                fontFamily: T.font, fontSize: "15px", fontWeight: "700", color: T.text,
                textDecoration: "none", lineHeight: "1.4", display: "block",
              }}>
                {t ? sliceText(t, 12, true) : ""}
              </Link>
            </div>
          ))}
        </div>

        {/* ── divider ── */}
        <div style={{ height: 1, background: T.border, marginBottom: "48px" }} />

        {/* ══ Related Posts ══ */}
        {relatedBlogs?.length ? (
          <div style={{ marginBottom: "52px" }}>
            <h4 style={{ fontFamily: T.font, fontSize: "20px", fontWeight: "700", color: T.text, margin: "0 0 24px" }}>Related Post</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {relatedBlogs.map((b, idx) => <BlogCard4 key={idx} blog={b} />)}
            </div>
          </div>
        ) : null}

        {/* ══ Author card ══ */}
        <div style={{
          background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`,
          padding: "28px 32px", marginBottom: "52px",
          display: "flex", gap: "20px", alignItems: "flex-start",
          boxShadow: "0 2px 16px rgba(30,70,20,0.07)",
        }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `3px solid ${T.greenLight}` }}>
            {author?.image
              ? <Image src={author.image} alt={author.name} width={72} height={72} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              : <div style={{ width: "100%", height: "100%", background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: T.greenMid, fontWeight: "700" }}>{author?.name?.[0] || "A"}</div>
            }
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: T.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px" }}>Written by</div>
            <h3 style={{ fontFamily: T.font, fontSize: "20px", fontWeight: "800", color: T.text, margin: "0 0 8px" }}>{author?.name || "Dr. Elena Rostova"}</h3>
            <p style={{ fontSize: "13px", color: T.muted, lineHeight: "1.7", margin: 0 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
        </div>


        {/* ── divider ── */}
        <div style={{ height: 1, background: T.border, marginBottom: "48px" }} />
      </div>

    </div>
  );
};

/* ── shared input style ─────────────────────────── */
const inputStyle = {
  width: "100%", padding: "13px 18px",
  borderRadius: "14px", border: "1.5px solid #dde8cc",
  background: "#fff", fontSize: "13.5px", color: "#1a2e14",
  outline: "none", fontFamily: "'Helvetica Neue', Arial, sans-serif",
  resize: "vertical", boxSizing: "border-box",
};

/* ── CommentItem ────────────────────────────────── */
const CommentItem = ({ author, desc, date, isReply }) => (
  <div style={{
    display: "flex", gap: "14px", padding: "20px 0",
    borderBottom: "1px solid #e2ebd4",
  }}>
    <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #e4f0d8" }}>
      {author?.image
        ? <Image src={author.image} alt={author.name} width={42} height={42} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        : <div style={{ width: "100%", height: "100%", background: "#e4f0d8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", color: "#2d6e1a", fontWeight: "700" }}>{author?.name?.[0] || "U"}</div>
      }
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <div>
          <Link href="#" style={{ fontSize: "13.5px", fontWeight: "700", color: "#1a2e14", textDecoration: "none" }}>{author?.name}</Link>
          <span style={{ fontSize: "11px", color: "#6b8560", marginLeft: "10px" }}>{date}</span>
        </div>
        <Link href="#comment_form" style={{
          fontSize: "11px", fontWeight: "700", color: "#2d6e1a",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "4px",
          padding: "4px 12px", borderRadius: "20px", background: "#e4f0d8", border: "1px solid #c8ddb0",
        }}>↩ Reply</Link>
      </div>
      <p style={{ fontSize: "13px", color: "#6b8560", lineHeight: "1.65", margin: 0 }}>{desc}</p>
    </div>
  </div>
);

export default BlogDetailsPrimary;