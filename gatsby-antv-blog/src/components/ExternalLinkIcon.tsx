import React from 'react';
import ExternalLink from '../images/external-link.svg';
import * as styles from './ExternalLinkIcon.module.less';

const ExternalLinkIcon: React.FC = () => (
  <i className={styles.test}>
    <ExternalLink />
  </i>
);

export default ExternalLinkIcon;
