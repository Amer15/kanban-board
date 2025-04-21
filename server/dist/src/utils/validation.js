"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
const custom_error_1 = require("./custom_error");
const zod_1 = require("./zod");
/**
 * Validates data against a Zod schema and returns the parsed data if valid.
 * @param schema - The Zod schema to validate the data against.
 * @param data - The data to validate.
 * @returns The parsed data, typed according to the schema.
 * @throws CustomError if validation fails, with a 400 status code.
 */
function validateSchema(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new custom_error_1.CustomError((0, zod_1.zodErrorMessage)(result.error), 400);
    }
    // Safe to disable because `schema.safeParse` ensures `result.data` matches `z.infer<T>` when `result.success` is true.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.data;
}
