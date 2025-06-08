'use client'
import { useActionState } from "react"

// make sure to craete a flie and add it here
const action = async () => {
    return {
        action: "action"
    }
}

export default  function Template() {
    const [state, formAction] = useActionState(action, null)

    return (
        <div>
            <form action={formAction}>
                <input type="text" name="description" />
            </form>
        </div>
    )
}