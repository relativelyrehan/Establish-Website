import { useState } from "react";

export default function Dashboard() {
    const [create, setCreate] = useState(false);
    const [selectedTab, setSelectedTab] = useState("all");
    return (
        <div className="bg-black min-h-screen text-white px-5">
            <nav className="flex justify-between py-5">
                <div>
                    <p className="text-xl lg:text-3xl made-gentle">
                        Establish <span className="text-sunset text-5xl">.</span>
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => setCreate(true)}
                        className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                    >
                        Create
                    </button>
                </div>
            </nav>
            <div className="w-full flex gap-4 mt-8">
                <button
                    onClick={() => setSelectedTab('all')}
                    className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "all" ? "bg-skin text-black" : ""
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setSelectedTab('important')}
                    className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "important" ? "bg-skin text-black" : ""
                        }`}
                >
                    Important
                </button>
                <button
                    onClick={() => setSelectedTab('todos')}
                    className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "todos" ? "bg-skin text-black" : ""
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setSelectedTab('notes')}
                    className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "notes" ? "bg-skin text-black" : ""
                        }`}
                >
                    Notes
                </button>
            </div>

            <div className="mt-8 grid grid-cols-12 gap-4 text-black">
                <div className="col-span-4 bg-sunset px-6 py-8 rounded-3xl rounded-tl-none">
                    <h1 className="text-xl made-gentle mb-2">
                        Heading
                    </h1>
                    <ul>
                        <li className="text-lg">One</li>
                        <li className="text-lg">Two</li>
                        <li className="text-lg">Three</li>
                    </ul>
                </div>
                <div className="col-span-4 bg-lime px-6 py-8 rounded-3xl rounded-tl-none">
                    <h1 className="text-xl made-gentle mb-2">
                        Heading
                    </h1>
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    </p>
                </div>
                <div className="col-span-4 bg-sky px-6 py-8 rounded-3xl rounded-tl-none">
                    <h1 className="text-xl made-gentle mb-2">
                        Heading
                    </h1>
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    </p>
                </div>
            </div>
        </div>
    );
}
