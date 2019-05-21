var sql = require('../db');

const compareUser = (user, result) => {
    console.log(user.username);
    sql.query(
        `select * from user where username='${user.username}'`,
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if(res.length === 0) {
                    result(null, 1);
                }
                else if(user.password === res[0]["password"]){
                    console.log("A1");
                    sql.query(
                        `select role from role join user_has_role on role.id = user_has_role.idRole where user_has_role.idUser = ${res[0]['id']}`,
                        (err2, res2) => {
                            result(null, res2);
                        }
                    )
                } else {
                    result(null, 2)
                }
            }
        })
}

module.exports = {
    compareUser
};