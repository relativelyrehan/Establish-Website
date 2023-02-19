import { AiOutlineDelete, AiTwotoneStar } from "react-icons/ai";
import { handleImportantTodo, handleMarkDone } from "../utils/apis";

export const TodoCard = ({ data, removeTodo, setRemoveTodo, setUpdater, handleDeleteTodo }) => {
    return (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
            {
                removeTodo == data?._id ? <div className="bg-lime rounded-3xl p-5 flex flex-col justify-center items-center gap-5">
                    <button
                        onClick={() => handleDeleteTodo(data?._id)}
                        className="text-base lg:text-xl made-gentle border border-black border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setRemoveTodo(-1)}
                        className="text-base lg:text-xl made-gentle border border-black border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                    >
                        Cancel
                    </button>
                </div> : <div className="bg-lime rounded-3xl p-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl made-gentle">{data.title}</h1>
                        <div className="flex gap-4">
                            <button onClick={() => handleImportantTodo(data?._id, !data?.important)} className={""}>
                                <AiTwotoneStar color={
                                    data?.important &&
                                    "#F5EBC9"
                                } className="text-xl hover:text-purple-500"></AiTwotoneStar>
                            </button>
                            <button className={""} onClick={() => setRemoveTodo(data?._id)}>
                                <AiOutlineDelete className="text-xl hover:text-purple-500"></AiOutlineDelete>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        {data?.todos?.map((todo, key) => {
                            return (
                                <div onClick={() => handleMarkDone(data?._id, todo?._id, !todo?.done, setUpdater)} key={key} className="flex gap-4 items-center mb-2 cursor-pointer hover:text-gray-600">
                                    <div className="border border-black rounded-sm h-4 w-4 flex justify-center items-center">
                                        {todo?.done ? <div className="h-2 w-2 rounded-sm bg-black hover:border-gray-600"></div> : null}
                                    </div>
                                    <p className={`text-base ${todo?.done ? 'line-through' : ''} `}>{todo?.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    );
};
