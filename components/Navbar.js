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
                    className="text-base lg:text-xl made-gentle border border-white border-opacity-80 rounded-full py-2 px-6 hover:border-sunset hidden lg:block"
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
            {router.asPath?.includes('create') ? null : <button
                onClick={() => setCreate(true)}
                className="text-xl made-gentle border bg-sunset text-black rounded-full py-3 px-8 hover:border-sunset block lg:hidden fixed bottom-8 right-4 shadow-lg shadow-sunset"
            >
                Create
            </button>}
        </nav>
    )
}