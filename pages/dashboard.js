import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../utils/context/context";
import { Layout, Note, Tab } from "../components";
import { deleteData, getData } from "../utils/service";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { getAllNotes, handleGetTodos } from "../utils/apis";
import { TodoCard } from "../components/TodoCard";
export default function Dashboard() {
    const router = useRouter();
    const [appState] = useContext(StateContext);
    const [remove, setRemove] = useState(-1);
    const [removeTodo, setRemoveTodo] = useState(-1);
    const [selectedTab, setSelectedTab] = useState("all");
    const [allNotes, setAllNotes] = useState([]);
    const [allTodos, setAllTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updater, setUpdater] = useState(0);

    const handleDeleteNote = async (id) => {
        try {
            const response = await deleteData(`/posts/deleteNote/${id}`);
            if (response.status == 200) {
                setUpdater((p) => p + 1);
                setRemove(-1);
                toast.success("Note deleted successfully");
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const response = await deleteData(`/posts/deleteTodo/${id}`);
            if (response.status == 200) {
                setUpdater((p) => p + 1);
                setRemove(-1);
                toast.success("Todo deleted successfully");
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    useEffect(() => {
        if (appState?.user?._id) {
            getAllNotes(setAllNotes, setLoading, appState?.user?._id, updater);
            handleGetTodos(setAllTodos, setLoading, appState?.user?._id, updater);
        }
    }, [appState, updater]);

    if (loading) {
        return (
            <Layout>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Tab setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
            <div className="mt-8 grid grid-cols-12 gap-4 text-black">
                {[...allTodos, ...allNotes]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    ?.filter((i) => {
                        if (selectedTab == "important") {
                            return i.important;
                        } else if (selectedTab == "all") {
                            return i;
                        } else if (selectedTab == "todos") {
                            return i.type == "Todo";
                        } else if (selectedTab == "notes") {
                            return i.type == "Note";
                        }
                    })
                    ?.map((item) => {
                        return item?.type == "Note" ? (
                            <Note
                                router={router}
                                key={item?._id}
                                remove={remove}
                                handleDeleteNote={handleDeleteNote}
                                note={item}
                                setRemove={setRemove}
                                updater={updater}
                                setUpdater={setUpdater}
                            />
                        ) : (
                            <TodoCard
                                removeTodo={removeTodo}
                                setRemoveTodo={setRemoveTodo}
                                router={router}
                                key={item?._id}
                                data={item}
                                handleDeleteTodo={handleDeleteTodo}
                                setUpdater={setUpdater}
                            />
                        );
                    })}
            </div>

            {allTodos?.length + allNotes?.length ? null : (
                <div className="p-10 flex justify-center items-center flex-col">
                    <Image
                        src={"/images/empty.svg"}
                        alt="No Notes"
                        height={300}
                        width={300}
                    />
                    <p className="made-gentle text-2xl text-center mt-4">No Data found</p>
                </div>
            )}
        </Layout>
    );
}
