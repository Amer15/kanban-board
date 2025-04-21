"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOfIdsSchema = void 0;
exports.zodErrorMessage = zodErrorMessage;
const zod_1 = require("zod");
/**
 * Formats a Zod validation error into a readable error message.
 * @param error - The `ZodError` object containing validation issues.
 * @returns A formatted string summarizing all validation issues.
 *
 * - Each issue is represented as: `path: message - code`.
 * - Paths are joined with a dot notation; if the path is unavailable, "unknown-path" is used.
 * - Issues are separated by commas in the resulting string.
 */
function zodErrorMessage(error) {
    return error.issues
        .map((issue) => `${issue.path.join(".") || "unknown-path"}: ${issue.message} - ${issue.code}`)
        .join(", ");
}
exports.arrayOfIdsSchema = zod_1.z
    .object({
    ids: zod_1.z.array(zod_1.z.number()).min(1),
})
    .strict();
