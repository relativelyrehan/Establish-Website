import { useDebugValue, useEffect } from "react";

export default function Open() {
    useEffect(() => {
        if (window) {
            window.location.href = "com.apple.Safari://?url=https://www.google.com";
        }
    }, [])

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            Opening Safari
        </div>
    )
}