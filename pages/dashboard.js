import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../utils/context/context";
import { Input, Layout, Modal, Navbar, Note, Tab } from "../components";
import { RiTodoLine, RiMastodonLine } from "react-icons/ri";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { deleteData, getData, patchData, putData } from "../utils/service";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
export default function Dashboard() {
    const router = useRouter();
    const [appState, dispatch] = useContext(StateContext);
    const [create, setCreate] = useState(false);
    const [remove, setRemove] = useState(-1);
    const [edit, setEdit] = useState(-1);
    const [editObject, setEditObject] = useState({
        title: "",
        content: "",
    })
    const [selectedTab, setSelectedTab] = useState("all");
    const [allNotes, setAllNotes] = useState([]);
    const [user, setUser] = useState({});

    const getAllNotes = async (id) => {
        try {
            const response = await getData(`/posts/getNotes/${id}`);
            if (response?.status == 200) {
                setAllNotes(response?.data);
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await deleteData(`/posts/deleteNote/${id}`);
            if (response.status == 200) {
                getAllNotes(appState?.user?._id);
                setRemove(-1);
                toast.success("Note deleted successfully")
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    const handleEditNote = async (id) => {
        try {
            const response = await putData(`/posts/updateNote/${id}`, {
                title: editObject.title,
                content: editObject.content,
                userId: appState?.user?._id,
            });
            if (response.status == 200) {
                getAllNotes(appState?.user?._id);
                setEdit(-1);
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    useEffect(() => {
        if (appState?.user?._id) {
            getAllNotes(appState?.user?._id);
        }
    }, [appState])


    return (
        <Layout>
            <Tab setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

            {allNotes?.length ? <div className="mt-8 grid grid-cols-12 gap-4 text-black">
                {allNotes?.map((note, key) => {
                    return (
                        <Note router={router} key={key} remove={remove} handleDeleteNote={handleDeleteNote} note={note} setRemove={setRemove} />
                    );
                })}
            </div> : <div className="p-10 flex justify-center items-center flex-col">
                <Image src={'/images/empty.svg'} alt="No Notes" height={300} width={300} />
                <p className="made-gentle text-2xl text-center mt-4">No Data found</p>
            </div>}
        </Layout>
    );
}
