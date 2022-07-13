import ReactApexChart from "react-apexcharts";
import styles from "./Exhibit.module.scss";
import { Link } from "react-router-dom";

const Exhibit = ({ title, sales, percentage, path}) => {
  

  return (
    <Link to={`${path}`}>
    <div className={styles.chart}>
      <div className={styles.description}>
        <h2>{`${title}`}</h2>
        <div className={styles.sales}>
          <span></span>
          <div>

          </div>
        </div>
      </div>
      <div className={styles.canvas_wrapper}>
        {/* <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          className={styles.canvas}
          height="100%"
        /> */}
      </div>
    </div></Link>
  );
};

export default Exhibit;
