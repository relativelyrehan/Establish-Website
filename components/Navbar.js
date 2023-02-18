import { useRouter } from "next/router";

export const Navbar = ({ setCreate }) => {
    const router = useRouter();
    return (
        <nav className="flex justify-between items-center py-5">
            <div className="cursor-pointer" onClick={() => router.push('/dashboard')}>
                <p className="text-xl lg:text-3xl made-gentle">
                    Establish <span className="text-sunset">.</span>
                </p>
            </div>
            <div className="flex gap-4">
                {router.asPath?.includes('create') ? null : <button
                    onClick={() => setCreate(true)}
                    className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                >
                    Create
                </button>}
                <button
                    onClick={() => {
                        window.localStorage.clear();
                        window.location.href = "/";
                    }}
                    className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}