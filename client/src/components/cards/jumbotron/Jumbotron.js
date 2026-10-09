import Typewriter from 'typewriter-effect';

import './Jumbotron.css';

const Jumbotron = ({ text }) => {
  return (
    <section className="jumbotron">
      {/* Decorative background */}
      <div className="jumbotron-grid"></div>

      {/* Main content */}
      <div className="jumbotron-inner">
        <div className="jumbotron-copy">
          <div className="jumbotron-label">
            <span className="jumbotron-label-line"></span>
            <span>SHOPLY / 2026 COLLECTION</span>
          </div>

          <h1 className="jumbotron-title">
            Everything
            <span className="jumbotron-title-light">you need,</span>
            <span className="jumbotron-typewriter">
              <Typewriter
                options={{
                  strings: text,
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>

          <div className="jumbotron-bottom">
            <p className="jumbotron-description">
              Discover products selected for everyday living, modern style, and
              everything in between.
            </p>

            <a href="/shop" className="jumbotron-shop-link">
              <span>Explore collection</span>
              <span className="jumbotron-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Visual side */}
        <div className="jumbotron-visual">
          <div className="jumbotron-circle circle-large"></div>
          <div className="jumbotron-circle circle-small"></div>

          <div className="jumbotron-card">
            <div className="jumbotron-card-top">
              <span>01</span>
              <span>DISCOVER</span>
            </div>

            <div className="jumbotron-card-shape">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="jumbotron-card-bottom">
              <span>CURATED</span>
              <span>FOR YOU</span>
            </div>
          </div>

          <div className="jumbotron-floating-text">
            EST.
            <br />
            SHOPLY
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="jumbotron-footer">
        <span>SCROLL TO EXPLORE</span>

        <span className="jumbotron-footer-line"></span>

        <span>NEW / BEST / ESSENTIAL</span>
      </div>
    </section>
  );
};

export default Jumbotron;
