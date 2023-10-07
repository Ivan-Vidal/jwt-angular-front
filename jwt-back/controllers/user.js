const db = require("../connection");

const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

module.exports = getUsers

const addUsers = (req, res) => {
    const q = "INSERT INTO user (`name`,`email`, `password`, `entry_date`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.entry_date,
    ]

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json('user created successfully!');
    })
}
module.exports = addUsers