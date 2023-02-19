import { AiOutlineDelete, AiOutlineEdit, AiTwotoneStar } from "react-icons/ai";
import parse from "html-react-parser";
import { hanldeTruncate } from "../utils/helpers";
import { handleImportant } from "../utils/apis";

export const Note = ({
    key,
    remove,
    note,
    setRemove,
    handleDeleteNote,
    router,
    updater,
    setUpdater,
}) => {
    return (
        <div
            key={key}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
        >
            <div className="bg-sky cursor-pointer p-6 rounded-3xl max-h-96 h-auto">
                {remove == note?._id ? (
                    <div className="flex h-full justify-center items-center gap-5 flex-col">
                        <button
                            onClick={() => handleDeleteNote(note?._id)}
                            className="text-base lg:text-xl made-gentle border border-black border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setRemove(-1)}
                            className="text-base lg:text-xl made-gentle border border-black border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                        >
                            Cancel
                        </button>
                    </div>
                ) : null}
                {remove != note?._id ? (
                    <div className="h-full">
                        <div className="flex gap-4 items-center justify-between h-full mb-2">
                            <h1 className="text-xl made-gentle mb-2 truncate">
                                {note.title}
                            </h1>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        // handleImportant(note?._id)
                                        handleImportant(note?._id, !note?.important, note?.creator, setUpdater);
                                    }}
                                    className={""}
                                >
                                    <AiTwotoneStar
                                        color={
                                            note?.important &&
                                            "#F5EBC9"
                                        }
                                        className="text-xl hover:text-purple-500"
                                    ></AiTwotoneStar>
                                </button>
                                <button
                                    onClick={() => {
                                        router.push(`/create/note?edit=${note?._id}`);
                                    }}
                                    className={""}
                                >
                                    <AiOutlineEdit className="text-xl hover:text-purple-500"></AiOutlineEdit>
                                </button>
                                <button onClick={() => setRemove(note?._id)} className={""}>
                                    <AiOutlineDelete className="text-xl hover:text-red-400"></AiOutlineDelete>
                                </button>
                            </div>
                        </div>
                        <p className="text-base tracking-wider h-full">
                            {parse(hanldeTruncate(note?.content))}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
