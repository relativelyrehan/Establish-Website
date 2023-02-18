export const Tab = ({ setSelectedTab, selectedTab }) => {
    return (
        <div className="w-full flex gap-4 mt-8">
            <button
                onClick={() => setSelectedTab("all")}
                className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "all" ? "bg-skin text-black" : ""
                    }`}
            >
                All
            </button>
            <button
                onClick={() => setSelectedTab("important")}
                className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "important" ? "bg-skin text-black" : ""
                    }`}
            >
                Important
            </button>
            <button
                onClick={() => setSelectedTab("todos")}
                className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "todos" ? "bg-skin text-black" : ""
                    }`}
            >
                Todos
            </button>
            <button
                onClick={() => setSelectedTab("notes")}
                className={`text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset ${selectedTab == "notes" ? "bg-skin text-black" : ""
                    }`}
            >
                Notes
            </button>
        </div>
    )
}