import { useDebugValue, useEffect } from "react";

export default function Open() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let url = new URL('https://www.apple.com/safari/');
            window.UIApplication.shared.open(url)
        }
    }, [])

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            Opening Safari
        </div>
    )
}