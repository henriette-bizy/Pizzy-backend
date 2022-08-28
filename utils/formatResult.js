const mongoose = require('mongoose');

/**
 * One Day in Milliseconds
 * @type {number}
 */
 exports.ONE_DAY = 1 * 24 * 60 * 60;

 /***
  * @param id
  * @returns {*}
  */
 exports.validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
 
 /***
  * @param status
  * @param message
  * @param data
  * @returns {{data: *, message: string, status: number}}
  */
 exports.formatResult = ({ status = 200, message = 'OK', data }) => {
     return {
         status: status,
         message: message.toString().split('\"').join(''),
         data: data
     }
 }
 