'use server'


import { revalidatePath, revalidateTag } from "next/cache";
import { auth, } from '@clerk/nextjs/server'
import Joi from 'joi';
import { JOB_DESCRIPTION, WORK_EXPERIENCE } from "@/const/variables";
import { filterFormDataBySchema } from "@/utils/filterFormDataBySchema";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const schema = Joi.object({
    work_experience_unstructure: Joi.string()
        // .email({ tlds: { allow: true } })
        .min(7)
        // .max(3)
        .required()
        .messages({
            // 'string.email': 'Invalid email format',
            'string.min': 'should be long enough',
            // 'string.max': 'Email must be at at max of 3 characters',
            // 'any.required': 'Email is required',
        }),
});


const client = createServerSupabaseClient();
export const createWorkExperience = async (prevState: any, formData: FormData) => {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) redirectToSignIn()

    const filteredData = filterFormDataBySchema(formData, schema);

    const { error, value } = schema.validate(filteredData, { abortEarly: false });

    if (error) {
        return {
            error: error.details.map(detail => detail.message)
        };
    }

    // console.log("client-winson", client)
    const result = await client.from(WORK_EXPERIENCE).insert([{ work_experience_unstructured: value.work_experience_unstructured}]);
    // console.log("This is the result: ", result)


    // Process with valid value.description here
    // revalidateTag("job-description");
    // revalidatePath('home')
    revalidateTag(WORK_EXPERIENCE)

    return {
        result
    };
}
