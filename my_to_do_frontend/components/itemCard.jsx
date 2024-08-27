import { useRouter } from 'next/navigation';
import styles from './styles/itemCard.module.css';

const ItemCard = ({card, updateTask, refreshTasks}) => {
    const rount = useRouter();

    const editTask = (e) => {
        e.stopPropagation();
        rount.push(`/edit/${card.id}`)
    }

    const removeSelf = (e) => {
        e.stopPropagation();
        fetch(`http://127.0.0.1:8000/api/tasks/delete/${card.id}`, {
            method: "DELETE"
        }).then(_ => {
            refreshTasks();
        })
    }

    return (
        <div className={`${styles.itemCard} border p-6`}>
            <h3 className="text-lg underline flex justify-between">
                {card.name}

                <div>
                    <button className={styles.editButton} onClick={editTask}>
                        edit
                    </button>
                    <button className={`${styles.editButton} ml-3`} onClick={removeSelf}>
                        X
                    </button>

                </div>
            </h3>

            <desc>{card.desc}</desc>
            <br/>
            <button 
                className="border rounded-lg p-2 mt-2 hover:bg-green-300 hover:text-black"
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