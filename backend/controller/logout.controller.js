export const logout = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None' 
    };
    try {
        return res.status(200).clearCookie("token", options).json({
            message: "Logout successfully!",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};