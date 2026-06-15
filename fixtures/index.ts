import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';

type Fixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
};

export const test = base.extend<Fixtures>({
    homePage: async({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    },
    registrationPage: async({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
        await use(registrationPage);
    },
});

export { expect };
