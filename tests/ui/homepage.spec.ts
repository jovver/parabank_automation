import { expect } from '@playwright/test';
import {
    homePageTitle,
    registrationPageTitle,
    aboutPageTitle,
    contactPageTitle,
    servicesPageTitle,
    lookupPageTitle,
    loginErrorPageTitle,
} from '../../src/data/pageTitles';
import { ENV } from '../../src/config/urls';
import { test } from '../../fixtures/index';

test.describe('Parabank - Home Page', () => {

    test('should display the correct page title on load', async ({ homePage }) => {
        // Arrange

        // Act

        // Assert
        expect(await homePage.getTitle()).toBe(homePageTitle.title);
    })
})

test.describe('Parabank - Home Page navigation tests', () => {
    
    test('should navigate to the registration page when clicking the Register link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.registrationPageURL);
        expect(await homePage.getTitle()).toBe(registrationPageTitle.title);
    })

    test('should navigate to the about page when clicking the About link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickAboutLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.aboutPageURL);
        expect(await homePage.getTitle()).toBe(aboutPageTitle.title);
    })

    test('should navigate to the contact page when clicking the Contact link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickContactLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.contactPageURL);
        expect(await homePage.getTitle()).toBe(contactPageTitle.title);
    })

    test('should navigate to the services page when clicking the Services link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickServicesLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.servicesPageURL);
        expect(await homePage.getTitle()).toBe(servicesPageTitle.title);
    })

    test('should navigate to the customer lookup page when clicking the Forgot Login Info link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickForgotLoginLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.lookupPageURL);
        expect(await homePage.getTitle()).toBe(lookupPageTitle.title);
    })

    test('should display an error page when clicking Log In without credentials', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickLogInButton();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.loginPageURL);
        expect(await homePage.getTitle()).toBe(loginErrorPageTitle.title);
    })
})
