var crypto = require('crypto');

// var initVector = crypto.randomBytes(16);
//  var Securitykey = crypto.randomBytes(16);
var initVector = Buffer.from('3e10bb241d611ac910af5d8690011e6c', 'hex');
var Securitykey = Buffer.from('34db16c275e2895654e798794f6e47ae', 'hex');
// console.log(initVector.toString('hex'))
// console.log(Securitykey.toString('hex'))
var algorithm = "aes-128-cbc";

// the cipher function
function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    var crypted = cipher.update(text, 'utf8', 'base64')
    crypted += cipher.final('base64');
    return crypted; //94grt976c099df25794bf9ccb85bea72
}

function decrypt(text) {
    var decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector)
    var dec = decipher.update(text, 'base64', 'utf8')
    dec += decipher.final('utf8');
    return dec; //myPlainText
}


// var message = '{"id":1453,"type":1,"id_avn":3929,"s":"Камбарова","n":"Гульнара","p":"Бексултановна","exp":1680251896165}'
// console.log("Encrypted message: " + encrypt(message));
// console.log("Decrypted message: " + decrypt(encrypt(message)));

// var enc= 'nEa44x07xzIYEtf0DZ+UIB6nTUMGn4ohNp17j6ysDwlgoehaaJsdYk3e/9oFKQVzlicm/bUZWApQe3n97D2nS4VVUhsUoIEKA8yWU/ZOyc9lKk7PXHxqactjD/tqqVoVaFu/fbniICYZnLLTYDg7OkNCv7wETgs4r6gr/SMTf28xMNzJwFbC5/if0VTaq+03'
// console.log("Decrypted message: " + decrypt(enc));

module.exports = {
    encrypt, decrypt,
}