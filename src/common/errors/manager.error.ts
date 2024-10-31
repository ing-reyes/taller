import { HttpException, HttpStatus } from "@nestjs/common"

export class ManagerError extends Error {

    constructor(
        { type, message }: { type: keyof typeof HttpStatus, message: string }
    ){
        super( `${type} :: ${message}` ); // NOT_FOUND :: este error sucudaçsndkajsdb
                                        
    }

    


    static createSignatureError( message: string ){
        const name = message.split(' :: ')[0]; // [ 'NOT_FOUND', 'este error sucudaçsndkajsdb' ]

        if( name ){
            throw new HttpException( message, HttpStatus[name] );
        }

        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
