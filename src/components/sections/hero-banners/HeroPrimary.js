import Link from "next/link";

const HeroPrimary = ({
  text,
  title,
  item,
  type,
  mb,
  isCapitalize,
  bg,
  headingTag = "h1",
}) => {
  const { name, path } = item ? item : {};
  const HeadingTag = headingTag;

  return (
    <div
      className={`ltn__breadcrumb-area ltn__breadcrumb-area-2 page-breadcrumb-area ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image ${
        type === 3 ? "plr--9" : type === 2 ? "ltn__breadcrumb-area-3 plr--9" : ""
      } ${mb ? mb : ""}`}
      data-bs-bg={bg ? bg : "/img/bg/9.webp"}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2">

              {/* LEFT: Breadcrumb */}
              <div className="ltn__breadcrumb-list">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  {item && (
                    <li>
                      <Link href={path}>{name}</Link>
                    </li>
                  )}
                  <li>{text}</li>
                </ul>
              </div>

              {/* CENTER: Title */}
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  Orbitto International
                </h6>
                <HeadingTag
                  className={`section-title white-color ${
                    isCapitalize ? "text-capitalize" : ""
                  }`}
                >
                  {title}
                </HeadingTag>
              </div>

              {/* RIGHT: empty spacer to keep title centered */}
              <div aria-hidden="true" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPrimary;
