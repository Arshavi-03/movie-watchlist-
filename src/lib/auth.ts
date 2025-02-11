import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(12); // Using 12 rounds for good security/performance balance
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error securing password');
    }
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Error verifying password');
    }
}
