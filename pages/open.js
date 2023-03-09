import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        const url = "https://www.google.com";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            const a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            a.download = "download";
            a.click();
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
