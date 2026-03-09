import argon2 from 'argon2'

export const employeeRegistrationPasswordHash = async (plainPassword) => {
    const hashPassword = await argon2.hash(plainPassword);
    return hashPassword;

}

export const employeeLoginPasswordVerification = async (plainPassword, hashedPassword) => {
    const isPasswordValid = await argon2.verify(hashedPassword, plainPassword);
    return isPasswordValid;
}