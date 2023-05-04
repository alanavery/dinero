import Link from 'next/link';
import styles from './add-button.module.scss';

const AddButton = ({ resolvedUrl }) => {
  return (
    <div className={styles.wrapper}>
      <Link className={`button ${styles.button}`} href={`${resolvedUrl}/add`}>
        Add
      </Link>
    </div>
  );
};

export default AddButton;
