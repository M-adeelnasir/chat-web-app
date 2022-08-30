const formidable = require('formidable');
const validator = require('validator');
const User = require('../model/auth');
const fs = require('fs');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    try {
        const form = formidable()

        form.parse(req, async (err, fields, files) => {

            const { userName, email, password, confirmPassword } = fields
            const { image } = files



            const error = []

            if (!userName) {
                error.push("User name is required")
            }
            if (!email) {
                error.push("User name is required")
            }
            if (email && !validator.isEmail(email)) {
                error.push("Please provide a valid email")
            }

            if (!password) {
                error.push("password is required")
            }
            if (!confirmPassword) {
                error.push("password is required")
            }

            if (confirmPassword && password && password !== confirmPassword) {
                error.push("Password should match")
            }



            if (error.length > 0) {

                console.log("ERROR++>", [...error]);
            }
            if (error.length > 0) {
                return res.status(400).json({
                    error: {
                        error: message
                    }
                })
            }

            const fileName = image.originalFilename
            const RandomNum = Math.floor(Math.random() * 99999)
            const randomFileName = RandomNum + fileName

            image.originalFilename = randomFileName
            const newPath = __dirname + `../../../client/public/images/${image.originalFilename}`

            const existingUser = await User.findOne({ email: email })

            if (existingUser) {
                return res.status(400).json({
                    msg: "Email already exits"
                })
            }

            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if (err) {
                    return res.json({
                        msg: "image upload failed"
                    })
                }


            })

            const user = await User.create({ name: userName, password: password, email: email, image: image.originalFilename })


            const token = jwt.sign({
                id: user._id,
                email: user.email,
                userName: user.userName,
                image: user.image,
                registerTime: user.createdAt
            }, process.env.SECRET, {
                expiresIn: process.env.TOKEN_EXP
            });

            const options = { expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000) }

            console.log(user, token);

            res.status(201).cookie('authToken', token, options).json({
                successMessage: 'Your Register Successful', token
            })

        })



    } catch (err) {
        console.log(err);
        res.status(400).json({

            msg: "SERVER ERROR"
        })
    }
}