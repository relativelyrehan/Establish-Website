import { useRouter } from "next/router"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { RiMastodonLine, RiTodoLine } from "react-icons/ri"
import { Modal } from "./Modal"
import { Navbar } from "./Navbar"

export const Layout = ({ children }) => {
    const [create, setCreate] = useState(false)
    const router = useRouter()
    return (
        <div className="bg-black min-h-screen text-white px-5 py-8 pt-0">
            <Navbar setCreate={setCreate} />
            {children}
            <Modal
                title={"Select"}
                isVisible={create}
                onClose={() => setCreate(false)}
            >
                <div className="flex flex-col justify-center gap-5 p-5">
                    <div
                        className="flex-1 border border-skin border-opacity-40 rounded-md p-4 flex flex-col items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer"
                        onClick={() => router.push("/create/note")}
                    >
                        <p className="text-xl font-semibold mb-4">Notes</p>
                        <RiMastodonLine className="text-5xl"></RiMastodonLine>
                    </div>
                    <div
                        className="flex-1 border border-skin border-opacity-40 rounded-md p-4 flex flex-col items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer"
                        onClick={() => router.push("/create/todo")}
                    >
                        <p className="text-xl font-semibold mb-4">Todo</p>
                        <RiTodoLine className="text-5xl"></RiTodoLine>
                    </div>
                </div>
            </Modal>
            <Toaster />
        </div>
    )
}