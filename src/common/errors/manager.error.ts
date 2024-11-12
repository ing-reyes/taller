import { HttpException, HttpStatus } from "@nestjs/common"
import { error } from "console";

export class ManagerError extends Error {

    constructor(
        { type, message }: { type: keyof typeof HttpStatus, message: string }
    ) {
        super(`${type} :: ${message}`);
    }

    static createSignatureError(message: string) {
        const name = message.split(' :: ')[0];
        const description = message.split(' :: ')[1];

        if (name) {
            throw new HttpException(
                {
                    error: HttpStatus[name],
                    statusCode: name,
                    message: description,
                },
                HttpStatus[name],
                {
                    cause: new Error(message),
                }
            );
        }

        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
