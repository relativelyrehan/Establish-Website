import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BorderButton, Input } from "../components";
import { getData } from "../utils/service";

export default function YoutubeLinks() {
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);

    function formatText(text) {
        if (!text) {
            return "";
        }
        const lines = text.split("\n\n");
        const formattedLines = lines.map((line) => {
            if (line.startsWith("http")) {
                return `<a href="${line}" className="text-blue-500 hover:text-blue-700">${line}</a>`;
            } else {
                return line;
            }
        });

        return formattedLines.slice(1);
    }

    const handleGetLinks = async (id) => {
        try {
            setLinks([])
            toast.dismiss();
            setLoading(true);
            const res = await getData(`/experimental/getCaptions/${id}`);
            if (res.status == 200) {
                setLoading(false);
                const r = formatText(res.data.text);
                setLinks(r);
            } else {
                toast.error("Something went wrong");
                setLoading(false);
            }
        } catch (e) {
            toast.error(e?.message || "Something went wrong")
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <div className="h-screen bg-black w-full py-20 px-4 lg:px-10 text-white">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleGetLinks(id);
                }}
                className="max-w-2xl mx-auto"
            >
                <h1 className="text-white made-gentle text-center text-2xl lg:text-4xl">
                    LINKS
                </h1>
                <Input
                    value={id}
                    placeholder={"Enter youtube video id"}
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                    autoComplete="off"
                    required={true}
                    type="text"
                    title={"Video ID"}
                />
                <BorderButton
                    loading={loading}
                    containerClass={"mx-auto block mt-6"}
                    title={"Submit"}
                />
            </form>

            <div className="mt-10 w-full">
                {links?.map((item) => {
                    return (
                        <div
                            className="text-lime block mb-2"
                            target={"_blank"}
                            href={item}
                            key={item}
                            rel="noreferrer"
                        >
                            {item} {console.log(item)}
                            <div className="block"></div>
                        </div>
                    )
                })}
            </div>
            <Toaster />
        </div >
    );
}
