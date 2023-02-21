import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';


import { Input, Layout } from "../../components";
import { StateContext } from "../../utils/context/context";
import { getData } from "../../utils/service";
import parse from "html-react-parser";

export default function NoteDetails() {
    const router = useRouter()
    const [appState,] = useContext(StateContext);
    const [isEdit, setEdit] = useState(false);
    const [note, setNote] = useState({
        title: '',
        content: ''
    })
    const [value, setValue] = useState('')
    const { id } = router.query

    const getNoteDetails = async (id) => {
        try {
            const response = await getData(`/posts/getNote/${id}`)
            if (response.status == 200) {
                setNote({
                    title: response.data.title,
                    content: response.data.content
                })
            } else {
                toast.error('Something went wrong')
            }
        } catch (e) {
            toast.error('Something went wrong')
            console.log(e)
        }
    }
    useEffect(() => {
        if (id) {
            setEdit(router.asPath.includes('edit'))
            getNoteDetails(id)
        }
    }, [id, router])

    return (
        <Layout>
            <h1 className="text-center font-semibold text-3xl made-gentle">Note Details</h1>
            <div className="mt-6 max-w-2xl mx-auto">
                <div className="mb-6">
                    <Input
                        disabled={isEdit ? false : true}
                        onChange={(e) => {
                            setNote({
                                ...note,
                                title: e.target.value
                            })
                        }}
                        title="Title"
                        value={note.title}
                    />
                </div>

                <p className="mb-1 capitalize made-gentle tracking-wider">Description</p>
                {isEdit ? <ReactQuill placeholder="Start typing here" theme={'snow'} value={value} onChange={setValue} /> : <div>{parse(note.content)}</div>}
                {isEdit ? <button
                    onClick={() => { }}
                    className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                >
                    Save Changes
                </button> : null}
            </div>
        </Layout>
    )
}