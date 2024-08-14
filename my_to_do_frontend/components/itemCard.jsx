import { useRouter } from 'next/navigation';
import styles from './styles/itemCard.module.css';

const ItemCard = ({card, updateTask}) => {
    const rount = useRouter();

    const editTask = (e) => {
        e.stopPropagation();
        rount.push(`/edit/${card.id}`)
    }

    return (
        <div className={`${styles.itemCard} border p-6`}>
            <h3 className="text-lg underline flex justify-between">
                {card.name}

                <button className={styles.editButton} onClick={editTask}>
                    edit
                </button>
            </h3>

            <desc>{card.desc}</desc>
            <br/>
            <button 
                className="border rounded-lg p-2 mt-2 hover:bg-green-300"
                onClick={updateTask({id: card.id, val: !card.finished})}
            >
                {
                    card.finished ? 'uncomplete' : 'complete'
                }
            </button>
        </div>
    )
}


export default ItemCard;