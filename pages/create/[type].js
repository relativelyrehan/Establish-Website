import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Input, Layout } from "../../components";
import { StateContext } from "../../utils/context/context";
import { postData } from "../../utils/service";

// next dynamic import
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import { toast } from "react-hot-toast";

export default function Create() {
    const router = useRouter();
    const [appState,] = useContext(StateContext);
    const [user, setUser] = useState({});
    const [type, setType] = useState("");
    const [noteObject, setNoteObject] = useState({
        title: "",
        content: "",
    });
    const [value, setValue] = useState('');

    console.log(noteObject)

    useEffect(() => {
        if (appState?.user) {
            console.log(appState.user._id);
            setUser(appState.user);
        }
    }, [appState]);

    useEffect(() => {
        setType(router.query.type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        setNoteObject({ ...noteObject, content: value })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleNoteSubmit = async () => {
        try {

            if (!noteObject.title || !noteObject.content) {
                toast.error('Please fill all the fields');
                return
            }
            if (user?._id) {
                const response = await postData("/posts/createNote", {
                    title: noteObject.title,
                    content: noteObject.content,
                    userId: user._id,
                });
                if (response.status == 201) {
                    console.log(response.data);
                    router.push("/dashboard");
                }
            }
        } catch (e) {
            console.log("error", e);
        }
    };
    return (
        <Layout>
            <h1 className="text-center font-semibold text-3xl made-gentle">Create {type}</h1>
            <div className="mt-6 max-w-2xl mx-auto">
                <div className="mb-6">
                    <Input
                        onChange={(e) => {
                            setNoteObject({
                                ...noteObject,
                                title: e.target.value,
                            });
                        }}
                        title="Title"
                    />
                </div>

                <p className="mb-1 capitalize made-gentle tracking-wider">Description</p>
                <ReactQuill placeholder="Start typing here" theme={'snow'} value={value} onChange={setValue} />
                <button
                    onClick={handleNoteSubmit}
                    className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                >
                    Submit
                </button>
            </div>
        </Layout>
    );
}
