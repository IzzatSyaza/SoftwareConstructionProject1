import styles from "./Radio.module.scss";

const InputRadio = (props) => {
  return (
    <div className={styles.divInput}>
        <input className={styles.radioInput} type="radio" checked={props.checked}
        id={props.id} name={props.name} value={props.value} onChange={props.onChange}/>
        <label for={props.id}>{props.label}</label>
    </div>
  );
};

export default InputRadio;
