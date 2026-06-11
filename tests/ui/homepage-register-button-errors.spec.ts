import { expect } from '@playwright/test';
import { homePageErrorMessages } from '../../src/data/homePageMessages';
import { test } from '../../fixtures/index';

test.describe('Homepage register button validation tests', () => {

    test(`should see all field validations when clicking 'Register' button immediately`, async ({ homePage }) => {
        // Arrange
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

    test(`should show no errors when filling up the first name`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillFirstNameField('test'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isFirstNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphanumeric entry on the first name field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillFirstNameField('123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isFirstNameErrorVisible()).toBeTruthy();
    })
})