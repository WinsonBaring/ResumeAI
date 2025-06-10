'use server'

import { JOB_DESCRIPTION } from "@/const/variables"
import { revalidateTag } from "next/cache"

 
export async function revalidateButton() {
    revalidateTag(JOB_DESCRIPTION)
}