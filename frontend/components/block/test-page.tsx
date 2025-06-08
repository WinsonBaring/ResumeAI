'use client'
import { createJobDescription } from "@/api/actions/createJobDescription";
import { useActionState } from "react";
import { json } from "stream/consumers";



export default function TestingPage() {
    const [state, formAction] = useActionState(createJobDescription, null);

    return (
        <form action={formAction}>
            <div className="flex flex-col w-[10%]">
                <input type="text" name="description" />
                <button
                    className="bg-blue "
                >
                    create job
                </button>
                {/* {JSON.stringify(state) s } */}


                {/* {state?.description as undefined} */}
                <div className="flex flex-col gap-4">

                {state?.error?.map((error:string, index:number) => {
                    return (

                        <div key={index}>
                            {error}
                        </div>
                    )
                })}
                </div>

            </div>
        </form>
    )
}