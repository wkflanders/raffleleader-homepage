import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './custom-navbar.module.css';

function CustomNavbar() {
  const { siteConfig } = useDocusaurusContext();

  const handlePricingClick = (e) => {
    e.preventDefault();
    const mainSiteOrigin = 'https://raffleleader.com';
    
    if (window.location.origin !== mainSiteOrigin) {
        // If not on the main site, navigate to it with the pricing hash
        window.location.href = `${mainSiteOrigin}/#pricing`;
    } else {
        // If on the main site, post a message to scroll to pricing
        window.postMessage({ type: 'SCROLL_TO_PRICING' }, mainSiteOrigin);
    }
};

  return (
    <div className={`navbar ${styles.navbar}`}>
      <nav className={styles.customNavbar} aria-label="Global">
        <div className={styles.navbarLeft}>
          <Link
            to="#pricing"
            className={styles.navbarLink}
            onClick={handlePricingClick}
          >
            Pricing
          </Link>
        </div>
        <div className={styles.navbarCenter}>
          {/* Use external links for Wasp.lang app pages */}
          <Link to="https://raffleleader.com/#pricing" className={styles.navbarLink}>
            Pricing
          </Link>
          {/* Keep internal links for Docusaurus blog and docs */}
          <Link to={useBaseUrl('/')} className={styles.navbarLink}>
            Blog
          </Link>
          <Link to={useBaseUrl('docs/intro')} className={styles.navbarLink}>
            Documentation
          </Link>
          {/* <Link to="https://raffleleader.com/about" className={styles.navbarLink}>
                  About
              </Link> */}
        </div>
        <div className={styles.navbarRight}>
          <div style={{ visibility: 'hidden' }}>Placeholder</div>
        </div>
      </nav>
    </div>
  );
}

export default CustomNavbar;
