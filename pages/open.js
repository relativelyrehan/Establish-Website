import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('beforeunload', function (e) {
                window.addEventListener("error", (event) => {
                    window.location.href = "www.google.com"
                });
            });
            window.location.href =
                "vnd.youtube://@TalkingThrones";
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            <h1 className="text-white text-4xl">Redirecting...</h1>
        </div>
    );
}
