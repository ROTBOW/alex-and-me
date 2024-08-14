"use client"
import { useParams } from "next/navigation";1

const EditPage = () => {
    const params = useParams();
    // need a useEffect to grab card data

    // need a func to send the any updated data to the backend and then redirect the use back the home page

    // check if our data isn't loaded yet, show a loading thing while the use waits
    return (
        <div className="flex flex-col text-green-500 items-center">
            <h2 className="text-4xl my-10 animate-bounce">Edit Task</h2>

            <input type="text" placeholder="task name" className="p-1 rounded bg-black border text-xl mb-4"/>

            <textarea placeholder="Task Desc"></textarea>

            <button className="mt-6 p-2 border rounded hover:text-black hover:bg-green-500">Update Task</button>
        </div>
    )
}

export default EditPage;