import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ContactPage } from '../pages/ContactPage';

type Fixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
    contactPage: ContactPage;
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
    contactPage: async({ page }, use) => {
        const contactPage = new ContactPage(page);
        await contactPage.goto();
        await use(contactPage);
    },
});

export { expect };
