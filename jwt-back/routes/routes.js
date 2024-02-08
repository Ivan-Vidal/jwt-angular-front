const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const db = require('../connection')
const addUsers = require('../controllers/user')

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const createUserProcedure = "CALL sp_createUser(?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword
    ];

    db.query(createUserProcedure, values, (err, result) => {
        if (err) {
            // Se ocorrer um erro, verifica se é devido ao usuário já existir
            if (err.code === 'ER_SIGNAL_EXCEPTION' && err.sqlMessage === 'Usuário já cadastrado') {
                return res.status(422).json({ msg: 'Por favor, utilize outro e-mail' });
            } else {
                // Se for outro tipo de erro, retorna uma resposta de erro genérica
                return res.status(500).json({ msg: 'Erro ao criar usuário' });
            }
        } else {
            // Se não houver erro, o usuário foi criado com sucesso
            return res.status(200).json('Usuário criado com sucesso!');
        }
    });
})

router.post('/login', async (req, res) => {
    const user = await db.findOne({email: req.body.email})

    const query = await "SELECT  `email` FROM `users` AS `user` WHERE `user`.`email` = '(?)' LIMIT 1;`"

  db.query(query, (err,data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
})
    if (!data) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 2 * 60 * 1000 // 2 minutos
    })

    res.send({
        message: 'success'
    })
})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})

module.exports = router;
