import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Progress.module.scss";


const Progress = ({ percentage }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.filler}
        style={{ width: `${percentage}%` }}
      >
        <span className={styles.label}>{percentage}%</span>
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
