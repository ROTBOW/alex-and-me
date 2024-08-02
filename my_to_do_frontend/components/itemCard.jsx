

const ItemCard = ({card}) => {

    return (
        <div className="border p-6">
            <h3 className="text-lg underline">{card.name}</h3>

            <desc>{card.desc}</desc>
            <br/>
            <button className="border rounded-lg p-2 mt-2 hover:bg-green-300">
                {
                    card.finished ? 'uncomplete' : 'complete'
                }
            </button>
        </div>
    )
}


export default ItemCard;