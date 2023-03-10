import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        const url = "https://www.google.com";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = "https://olawebcdn.com/assets/ola-universal-link.html?"
        } else {
            window.open(url);
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            Opening Safari
        </div>
    );
}
