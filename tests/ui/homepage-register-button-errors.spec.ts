import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage';
import { homePageErrorMessages } from '../../src/data/homePageMessages'

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
})

test.describe('Homepage register button validation tests', () => {

    test(`should see all field validations when clicking 'Register' button immediately`, async ({ page }) => {
        // Arrange
        const homePage = new HomePage(page);
        let boolErrors: boolean;

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.clickRegisterButton());

        boolErrors = await homePage.areAllSignUpErrorsVisible();

        // Assert
        expect(boolErrors).toBeTruthy();

        expect(await homePage.getFirstNameError()).toBe(homePageErrorMessages.firstNameErrorMessage);
        
        expect(await homePage.getLastNameError()).toBe(homePageErrorMessages.lastNameErrorMessage);

        expect(await homePage.getAddressError()).toBe(homePageErrorMessages.addressFieldErrorMessage);

        expect(await homePage.getCityError()).toBe(homePageErrorMessages.cityFieldErrorMessage);

        expect(await homePage.getStateError()).toBe(homePageErrorMessages.stateFieldErrorMessage);

        expect(await homePage.getZipCodeError()).toBe(homePageErrorMessages.zipCodeFieldErrorMessage);

        expect(await homePage.getSsnError()).toBe(homePageErrorMessages.ssnFieldErrorMessage);

        expect(await homePage.getUserNameError()).toBe(homePageErrorMessages.userNameErrorMessage);

        expect(await homePage.getPasswordError()).toBe(homePageErrorMessages.passwordErrorMessage);

        expect(await homePage.getConfirmError()).toBe(homePageErrorMessages.confirmErrorMessage);

    })
})