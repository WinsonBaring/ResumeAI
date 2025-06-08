
import Joi from "joi";
export function filterFormDataBySchema(formData: FormData, schema: Joi.ObjectSchema) {
    const schemaKeys = Object.keys(schema.describe().keys);
    const data = Object.fromEntries(formData.entries());
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => schemaKeys.includes(key))
    );
}
