


exports.creatingUser = async (req, res) => {
    try {
        //validating body
        const body = req.body
        const {
            error
        } = user_validation(body)
        if (error)
            return res.send(formatResult({
                status: 400,
                message: error
            }))
        //confirming password
        if (req.body.password != req.body.confirmPassword)
            return res.send(formatResult({
                status: 400,
                message: "pasword doesn't match"
            }))
        //avoiding email repeatition
        const sameEmail = await User.findOne({
            email: body.email
        })
        if (sameEmail)
            return res.send(formatResult({
                status: 403,
                message: "user with the same email already exist"
            }))
        //avoiding display_name repeatition
        const sameDisplayName = await User.findOne({
            display_name: body.display_name
        })
        if (sameDisplayName)
            return res.send(formatResult({
                status: 403,
                message: "user with the same userName already exist"
            }))
        const saltRound = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, saltRound)
        body.password = hashedPassword
        //creating a user
        const newUser = new User(body)
        await newUser.save()
        return res.send(formatResult({
            status: 201,
            message: "user created",
            data: newUser
        }))
    } catch (error) {
        res.send(formatResult({
            status: 500,
            message: error
        }))
    }
}