


 function ErrorHandler(message: string, statusCode: number) {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
}


// class ErrorHandler extends Error {

//     statusCode: Number;

//     constructor(message: any, statusCode: Number){
//         super(message);
//         this.statusCode = statusCode;

//         Error.captureStackTrace(this, this.constructor);
//     }
// }

export default ErrorHandler;