import { z, ZodObject, ZodString } from 'zod';

/**
 * Dynamically extracts fields from FormData that correspond to keys defined
 * in a Zod object schema.
 * Only handles simple string or basic Zod types where `formData.get(key)`
 * makes sense. For complex types (arrays, objects), you'd need more
 * sophisticated parsing.
 *
 * @param formData The FormData object from the form submission.
 * @param schema A ZodObject schema to get the keys from.
 * @returns A plain JavaScript object containing only the fields present in
 *          both the FormData and the Zod schema, with their string values.
 */
export function filterFormDataByZodSchema<T extends z.ZodObject<any>>(
    formData: FormData,
    schema: T
): z.infer<T> {
    const rawData: { [key: string]: string | undefined } = {};

    // Get the keys defined in the Zod schema
    // `_def.shape()` provides an object of the schema's properties
    const schemaKeys = Object.keys(schema.shape); // Accessing the .shape property for defined keys

    // Iterate through the schema keys and extract values from FormData
    for (const key of schemaKeys) {
        const value = formData.get(key);

        // We convert to string, or undefined if not present, because Zod will handle
        // the actual type validation (e.g., whether it's a number, boolean, etc.) later.
        // FormData values are always strings or File objects.
        // We're primarily concerned with string fields here.
        if (value !== null) {
            // Check if it's a File. Zod can validate ZodFile but this simple
            // utility won't convert File to string for basic string fields.
            // Adjust logic if you expect file uploads.
            rawData[key] = value.toString();
        } else {
            rawData[key] = undefined; // Indicate it wasn't found in FormData
        }
    }

    // IMPORTANT: The function now returns the `rawData` object.
    // Zod's `safeParse` (or `parse`) should then be used on this `rawData`
    // to perform the actual validation and type conversion.
    // The `as T` cast at the end of the Joi function implies Joi then validates it.
    // Here, we return `rawData` and expect the validation *after* this filtering.
    // So the return type will be a partial object where keys are strings.
    // The final type safety comes from Zod's .parse or .safeParse.
    return rawData as z.infer<T>; // Type assertion to satisfy return type,
                                  // but actual type correctness is after Zod validation.
}