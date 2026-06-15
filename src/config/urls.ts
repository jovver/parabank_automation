import dotenv from 'dotenv'
import { NavigationURL } from '../../utils/models/configModels'

dotenv.config();

function requireEnv(key: string): string {
    const value = process.env[key];
    if(!value) {
        throw new Error(`Missing required env variable: ${key}`);
    }
    return value
}

export const ENV: NavigationURL = {
    homePageURL: requireEnv('HOME_PAGE'),
    registrationPageURL: requireEnv('REGISTER_PAGE'),
}