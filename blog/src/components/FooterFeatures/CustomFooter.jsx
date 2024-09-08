import React from 'react';
import styles from './custom-footer.module.css';

const CustomFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="mailto:stephen@raffleleader.com" className={styles.footerLink}>Contact</a>
            <a href="/blog" className={styles.footerLink}>Blog</a>
            <a href="/docs/intro" className={styles.footerLink}>Documentation</a>
          </div>
          
          <div className={styles.socialIcons}>
            {/* X (formerly Twitter) Icon */}
            <a href="https://twitter.com/your_twitter_handle" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <svg className={styles.svgIcon} viewBox="0 0 300 300.251" xmlns="http://www.w3.org/2000/svg">
                <path className={styles.svgIconFill} d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
              </svg>
            </a>
            
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/company/your_company" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <svg className={`${styles.svgIcon} ${styles.svgIconStroke}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            
            {/* Instagram Icon */}
            <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <svg className={`${styles.svgIcon} ${styles.svgIconStroke}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyrightText}>
            2024, Capella Software Company LLC. Raffle Leader is a<br />
            registered trademark of Capella Software Company LLC.
          </p>
          <a href="/terms-privacy" className={styles.termsLink}>TERMS & PRIVACY</a>
        </div>
      </footer>
    </div>
  );
};

export default CustomFooter;