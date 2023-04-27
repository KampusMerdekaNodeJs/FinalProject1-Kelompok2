const bcrypt = require ('bcrypt');

function comparePassword(userPassword, hashedPassword){
    return bcrypt.compareSync(userPassword, hashedPassword);
}
module.exports={ 
    comparePassword
}