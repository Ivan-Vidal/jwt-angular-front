const  db  = require("../connection");
const bcrypt = require('bcryptjs')

const getUsers = (_,res) => {
    const q = "CALL sp_getUser";

    db.query(q, (err,data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

module.exports = getUsers


const addUsers = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExistsQuery = "SELECT email FROM users WHERE email = ?";
    const [existingUser] = await db.query(userExistsQuery, [req.body.email]);

    if (existingUser) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail' });
    }

    const createUserProcedure = "CALL sp_createUser(?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword
    ];

    db.query(createUserProcedure, values, (err) => {
        if (err) return res.json(err);
        return res.status(200).json('user created successfully!');
    });
};

module.exports = addUsers