import { useRouter } from "next/router";
import { Navbar } from "../../components";

export default function NoteDetails() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Navbar />
            <h1>Note Details {id}</h1>
        </div>
    )
}