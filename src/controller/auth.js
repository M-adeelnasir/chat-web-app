const formidable = require('formidable');
const validator = require('validator');
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


        })
        // console.log(req);
        console.log("auth route");
    } catch (err) {
        console.log(err);
    }
}