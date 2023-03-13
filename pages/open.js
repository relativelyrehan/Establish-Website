import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.location.href =
                "spotifyooo://track/05Eq6SWneoZYvKQbm2xN25?si=s38D71i_TEyk_RrnhlYIbg&app_destination=copy-link&context=spotify%3Aalbum%3A4sLtOBOzn4s3GDUv3c5oJD";
            window.onerror = function () {
                window.location.href = "www.google.com"
                console.error(
                    "Failed to launch:",
                );
            };
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            <h1 className="text-white text-4xl">Redirecting...</h1>
        </div>
    );
}
