import { toast } from "react-hot-toast";
import { putData, getData } from "../service";

export const handleImportant = async (id, isImportant, userId, setUpdater) => {
    try {
        // const response = await putData(`/api/notes/important/${id}`, {});
        const response = await putData(`/posts/markNoteImportant/${id}`, {
            isImportant: isImportant
        })
        if (response.status == 201) {
            setUpdater(p => p + 1)
            toast.success('Marked as important')
        } else {
            console.log(response)
        }
    } catch (e) {
        console.log(e)
    }
}

export const handleImportantTodo = async (id, isImportant, setUpdater) => {
    try {
        // const response = await putData(`/api/notes/important/${id}`, {});
        const response = await putData(`/posts/markTodoImportant/${id}`, {
            isImportant: isImportant
        })
        if (response.status == 201) {
            setUpdater(p => p + 1)
            toast.success('Marked as important')
        } else {
            console.log(response)
        }
    } catch (e) {
        console.log(e)
    }

}

export const getAllNotes = async (setData, setLoading, id, updater) => {
    try {
        console.log('heree')
        !updater && setLoading(true);
        const response = await getData(`/posts/getNotes/${id}`);
        if (response?.status == 200) {
            !updater && setLoading(false);
            setData(response?.data);
        } else {
            !updater && setLoading(false);
        }
    } catch (e) {
        !updater && setLoading(false);
        console.log("error", e);
    }
};

export const handleGetTodos = async (setData, setLoading, userId, updater) => {
    try {
        !updater && setLoading(true)
        const response = await getData(`/posts/getTodos/${userId}`);
        if (response.status == 200) {
            !updater && setLoading(false)
            setData(response.data);
        } else {
            !updater && setLoading(false)
            console.log(response)
        }
    } catch (e) {
        setLoading(false)
        console.log(e)
    }
}

export const handleMarkDone = async (id, todo_item, isDone, setUpdater) => {
    try {
        const response = await putData(`/posts/markTodoDone/${id}`, {
            isDone: isDone,
            todo_id: todo_item
        });
        if (response.status == 201) {
            setUpdater(p => p + 1)
            toast.success(isDone ? 'Marked as done' : 'Marked as not done')
        }
        if (response.status == 201) {

        }
    } catch (e) {
        console.log(e)
    }
}