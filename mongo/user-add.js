var UserModel = require("./user-model.js");

/**
 * 插入
 */
function insert(params,okFn,errorFn) {

    var userModel = new UserModel({
        username : params.name,
        userage: params.age,
        useremail:params.email,
        usersex:params.sex,
        logindate : new Date()
    });
    userModel.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            errorFn&&errorFn();
        }
        else {
            console.log("Res:" + res);
            okFn&&okFn(res.username);
        }

    });
}
module.exports = insert;
