import { HTMLProps } from 'react';
import styles from './styles.module.css';

//res propriedade dinâmica porque vou usar este mesmo textarea em outro lugar
export const Textarea = ({...res}: HTMLProps<HTMLTextAreaElement>) => {
    return(
        <textarea className={styles.textarea} { ...res }></textarea>
    )
}
export default Textarea;
