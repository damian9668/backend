import bCrypt from 'bcrypt';

export const passwordCrypt = async (password) => {
    const salt = await bCrypt.genSalt(10);
    return await bCrypt.hash(password, salt);
}

export const comparePassword = (password, hash) => {
    return bCrypt.compare(password, hash);
}