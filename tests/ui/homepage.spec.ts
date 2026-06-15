import { expect } from '@playwright/test';
import { homePageTitle, registrationPageTitle } from '../../src/data/pageTitles';
import { ENV } from '../../src/config/urls';
import { test } from '../../fixtures/index';

test.describe('Parabank - Home Page', () => {

    test('should display the correct page title on load', async ({ homePage }) => {
        // Arrange

        // Act

        // Assert
        expect(await homePage.getTitle()).toBe(homePageTitle.title);
    })

    test('should navigate to the registration page when clicking the Register link', async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink();

        // Assert
        expect(await homePage.getUrl()).toContain(ENV.registrationPageURL);
        expect(await homePage.getTitle()).toBe(registrationPageTitle.title);
    })

})
