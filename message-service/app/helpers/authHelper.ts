import bcrypt from "bcrypt";
import app_config from "@configs/app_config";

/**
 * Hashes given String
 * @param {string} password 
 * @returns {string}
 */
export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, app_config.recommended_bycrypt_rounds);
}

/**
 * Checks if given password matches with hashed
 * @param {string} given 
 * @param {string} hashed 
 * @returns {boolean} true if matched
 */
export function comparePassword(given: string, hashed: string): boolean {
    return bcrypt.compareSync(given, hashed);
}