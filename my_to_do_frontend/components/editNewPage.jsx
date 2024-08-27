"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditNewPage = ({type}) => { // type is either edit or create
    const params = useParams();
    const router = useRouter();
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    // need a useEffect to grab card data
    useEffect(() => {
        if (type === 'edit') {
            fetch(`http://127.0.0.1:8000/api/tasks/${params.id}`).then(
                data => data.json()
            ).then(data => {
                setTaskName(data.name)
                setTaskDesc(data.desc)
            })
        }
    }, [])

    // need a func to send the any updated data to the backend and then redirect the use back the home page
    const updateTask = (e, form) => {
        e.stopPropagation();

        fetch(`http://127.0.0.1:8000/api/tasks/update/${params.id}`, {
            method: 'POST',
            body: form
        }).then( _ => {
            router.push(`/`)
        })
    }
    
    const createTask = (e, form) => {
        e.stopPropagation();

        form.append('finished', 'False');

        fetch(`http://127.0.0.1:8000/api/tasks/new`, {
            method: 'POST',
            body: form
        }).then(_ => {
            router.push(`/`)
        })
        
    }

    const controlAction = (e) => {
        let form = new FormData();
        form.append('name', taskName)
        form.append('desc', taskDesc)

        if (type === 'edit') {
            updateTask(e, form)
        } else {
            createTask(e, form)
        }
    }

    // check if our data isn't loaded yet, show a loading thing while the use waits
    if ((taskName === '' || taskDesc === '') && type === 'edit') {
        return <div>Loading...</div>
    }
    return (
        <div className="flex flex-col text-green-500 items-center">
            <h2 className="text-4xl my-10 animate-bounce">{type === 'edit' ? 'Edit' : 'New'} Task</h2>

            <input type="text" value={taskName} onChange={e=>setTaskName(e.target.value)} className="p-1 rounded bg-black border text-xl mb-4"/>

            <textarea value={taskDesc} onChange={e=>setTaskDesc(e.target.value)}></textarea>

            <div>
                <Link  className="mt-6 p-2 border rounded hover:text-black hover:bg-green-500 mr-4" href="/">cancel</Link>
                <button className="mt-6 p-2 border rounded hover:text-black hover:bg-green-500" onClick={controlAction}>{type === 'edit' ? "Update Task" : "Create Task"}</button>
            </div>
        </div>
    )
}

export default EditNewPage;