const Error_Handlor = async(error, req, res, next) => {
    const message = error.message || "Somthing Waight Wrong"
    return res.status(500).json({
        success: false,
        message
    });

}

module.exports = Error_Handlor;