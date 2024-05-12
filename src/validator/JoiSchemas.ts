import Joi, { ObjectSchema } from "joi";
import { IBook } from "src/types/bookTypes";

/**
 * @desc schema that defines custom Error Messages
 **/

interface CustomErrorMessages {
    [key: string]: string;
}
const customErrorMessages: CustomErrorMessages = {
    "string.base": "must be a valid string.",
    "string.pattern.base": "can not contain spaces.",
    "string.min": "must be at least {#limit} characters long.",
    "string.max": "must not exceed {#limit} characters.",
    "string.email": "The email address is not valid.",
    "any.required": "is required.",
    "string.empty": "can not be empty.",
    "number.base": "must be a valid ID."
};

/**
 * @Book
 */

export const BookSchema: ObjectSchema<IBook> = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    pages: Joi.number().required(),
    author: Joi.string().required(),
    rating: Joi.number().required(),
    description: Joi.string().required(),
    language: Joi.string().required()
});

export const validator = (schema: ObjectSchema, data: object) => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errors: { field: string; message: string }[] = error.details.map(
            (detail) => {
                const field: string | undefined = detail.path
                    ? Array.isArray(detail.path) && detail.path.length > 1
                        ? detail.path[1]?.toString()
                        : detail.path[0]?.toString()
                    : undefined;

                const errorMessage =
                    customErrorMessages[detail.type] || detail.message;

                return {
                    field: field || "",
                    message: field + " " + errorMessage
                };
            }
        );
        return errors;
    }
    return null;
};
