const generateJoinCode = () => {
    let joinCode = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789(){}!@#$%&*+-_=<>?";
    for (let i = 0; i < 8; i++) {
        joinCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log(joinCode);
    return joinCode;
};

module.exports = generateJoinCode;