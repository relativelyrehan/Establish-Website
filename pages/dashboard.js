import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../utils/context/context";
import { Input, Layout, Note, Tab } from "../components";
import { deleteData, getData, postData } from "../utils/service";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { getAllNotes, handleGetTodos } from "../utils/apis";
import { TodoCard } from "../components/TodoCard";
import useDebounce from "../utils/hooks/debounce";
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
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState(false);
    const debounceValue = useDebounce(search, 500);

    const handleSearch = async (s) => {
        if (s == "") {
            getAllNotes(setAllNotes, setLoading, appState?.user?._id, updater);
            handleGetTodos(setAllTodos, setLoading, appState?.user?._id, updater);
            return;
        }
        try {
            setLoading(true);
            const response = await postData(`/posts/searchNotes/${appState?.user?._id}`, {
                search: s
            });
            if (response.status == 200) {
                setAllNotes(response.data.notes);
                setAllTodos(response.data.todos);
                setLoading(false);
                setFocus(true)
            } else if (response.status == 400) {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            toast.error('Something went wrong')
        }
    }


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

    useEffect(() => {
        handleSearch(debounceValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])

    if (loading) {
        return (
            <Layout>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-full lg:w-[30%] xl:w-1/5 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                </div>
            </Layout>
        );
    }



    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center mt-8">
                <Tab setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                <Input autoFocus={focus} setValue={setSearch} value={search} onChange={e => setSearch(e.target.value)} placeholder={'Search Notes'} className="w-full lg:w-96" />
            </div>
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
