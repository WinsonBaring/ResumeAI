'use server'


import { revalidatePath, revalidateTag } from "next/cache";
import { auth, } from '@clerk/nextjs/server'
import Joi from 'joi';
import { JOB_DESCRIPTION } from "@/const/variables";
import { filterFormDataBySchema } from "@/utils/filterFormDataBySchema";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const schema = Joi.object({

    jobId: Joi.number()
        .required()
        .messages({
            'number.base': 'Job ID must be a number',
        }),
});


const client = createServerSupabaseClient();
export const deleteJobDescription = async (prevState: any, formData: FormData) => {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) redirectToSignIn()


    console.log('hello kk')
    const filteredData = filterFormDataBySchema(formData, schema);
    console.log('filteredData', filteredData)

    const { error, value } = schema.validate(filteredData, { abortEarly: false });
    console.log('value11', value) 

    if (error) {
        return {
            error: error.details.map(detail => detail.message)
        };
    }

    // console.log("client-winson", client)
    const result = await client.from(JOB_DESCRIPTION).delete().eq('job_id', value.jobId);


    // Process with valid value.description here
    // revalidateTag("job-description");
    // revalidatePath('home')
    revalidateTag(JOB_DESCRIPTION)

    return {
        result
    };
}
