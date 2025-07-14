'use server'


import { revalidatePath, revalidateTag } from "next/cache";
import { auth, } from '@clerk/nextjs/server'
import Joi from 'joi';
import { JOB_DESCRIPTION, RESUME, WORK_EXPERIENCE } from "@/const/variables";
import { filterFormDataBySchema } from "@/utils/filterFormDataBySchema";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { z } from "zod"
import { fromTheme } from "tailwind-merge";
import { filterFormDataByZodSchema } from "@/utils/filterFormDataBySchemaZod";

type ResumeSchema = {
    title: string;
    description: string;
}

const schema = Joi.object<ResumeSchema>({
    title: Joi.string()
        .min(7)
        .required()
        .messages({
            'string.min': 'should be long enough',
        }),
    description: Joi.string()
        .min(7)
        .required()
        .messages({
            'string.min': 'should be long enough',
        }),
});
const resumeSchema = z.object({
    title: z.string()
        .min(7, { message: 'title should be long enough' })
        .refine(val => val.trim().length > 0, { message: 'title is required' }), // More explicit "required" for empty string
    // Alternatively, if min(7) implies required and you just want "short" error for both:
    // .min(7, { message: 'title should be long enough and is required' }),

    description: z.string()
        .min(7, { message: 'description should be long enough' })
        .refine(val => val.trim().length > 0, { message: 'description is required' }),
    // Alternatively:
    // .min(7, { message: 'description should be long enough and is required' }),
});

// 2. Infer the TypeScript type from the Zod schema
type ResumeSchemaa = z.infer<typeof resumeSchema>;


const client = createServerSupabaseClient();
export const createResume = async (prevState: any, formData: FormData) => {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) redirectToSignIn()

    const zodFilteredData = filterFormDataByZodSchema(formData,resumeSchema) 
    const filteredData = filterFormDataBySchema(formData, schema);

    const { error, value } = schema.validate(filteredData, { abortEarly: false });

    if (error) {
        return {
            error: error.details.map(detail => detail.message)
        };
    }

    // console.log("client-winson", client)
    const result = await client.from(RESUME).insert([{ ...value }]);

    console.log("This is the result: ", result)


    // Process with valid value.description here
    // revalidateTag("job-description");
    // revalidatePath('home')
    revalidateTag(RESUME)

    return {
        result
    };
}
