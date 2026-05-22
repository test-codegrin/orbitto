CREATE TABLE IF NOT EXISTS public.blog_detail_images (
  image_id BIGSERIAL PRIMARY KEY,
  blog_detail_id BIGINT NOT NULL REFERENCES public.blog_detail(blog_detail_id) ON DELETE CASCADE,
  image_blob BYTEA NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_detail_images_blog_detail_id
  ON public.blog_detail_images(blog_detail_id);

CREATE INDEX IF NOT EXISTS idx_blog_detail_images_sort_order
  ON public.blog_detail_images(blog_detail_id, sort_order, image_id);
