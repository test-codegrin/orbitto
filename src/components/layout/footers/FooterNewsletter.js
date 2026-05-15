import BrandSocialLinks from "@/components/shared/socials/BrandSocialLinks";

const FooterNewsletter = () => {
  return (
    <div className="col-xl-3 col-md-6 col-sm-12 col-12">
      <div className="footer-widget footer-newsletter-widget">
        <h4 className="footer-title">Newsletter</h4>
        <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
        <div className="footer-newsletter">
          <form action="#">
            <input type="email" name="email" placeholder="Email*" />
            <div className="btn-wrapper animated">
              <button className="theme-btn-1 btn btn-effect-1 text-uppercase" type="submit">
                <i className="fas fa-location-arrow"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="footer-newsletter-socials">
          <BrandSocialLinks className="brand-social-links--footer" />
        </div>
       
      </div>
    </div>
  );
};

export default FooterNewsletter;
