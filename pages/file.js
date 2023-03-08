import { useEffect, useState } from "react"
import { postData } from '../utils/service'

export default function File() {
    const [data, setData] = useState(null);
    const [local, setLocal] = useState(null);
    useEffect(() => {
        if (document) {
            // (async () => {
            //     const res = await postData('/experimental/postHTML', {
            //         html: document.documentElement.outerHTML
            //     })
            //     setData(res.data)
            // })();
            setLocal(document.documentElement.outerHTML)
        }
    }, [])

    return (
        <pre>
            {local}
        </pre>
    )
}