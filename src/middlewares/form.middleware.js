import  formidableMiddleware from 'express-formidable';


const formMiddleware = formidableMiddleware({
  encoding: 'utf-8',
  //uploadDir: './uploads',
  multiples: true,
  // keepExtensions: true,
  // maxFieldsSize: 2 * 1024 * 1024,
  // maxFileSize: 2 * 1024 * 1024,

});

export { formMiddleware };