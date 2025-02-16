import { User } from "../model/user.model.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }

        let user;

        try {
            user = await User.findOne({ email })
        } catch (error) {
            return res.status(501).json({ message: "Error occured in finding user", success: false })
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Password change succesfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}