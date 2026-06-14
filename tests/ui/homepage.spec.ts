import { expect } from '@playwright/test';
import { homePageErrorMessages } from '../../src/data/homePageMessages';
import { test } from '../../fixtures/index';

test.describe(`Homepage register button validation tests`, () => {

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

    test(`should show no errors when filling up the last name`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillLastNameField('Doe'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isLastNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the last name field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillLastNameField('123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isLastNameErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the address`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillAddressField('123 Main St'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isAddressErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric-only entry on the address field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillAddressField('12345'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isAddressErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the city`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillCityField('Los Angeles'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isCityErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the city field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillCityField('123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isCityErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the state`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillStateField('California'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isStateErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the state field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillStateField('123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isStateErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the zip code`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillZipCodeField('12345'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isZipCodeErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphabetic entry on the zip code field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillZipCodeField('ABCDE'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isZipCodeErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the SSN`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillSsnField('123456789'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isSsnErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphabetic entry on the SSN field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillSsnField('abc'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isSsnErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the username`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillUserNameField('testuser123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isUserNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow special character-only entry on the username field`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillUserNameField('!@#$%'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isUserNameErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the password`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillPasswordField('Password123!'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isPasswordErrorVisible()).toBeFalsy();
    })

    test(`should not accept a password that is too short`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillPasswordField('123'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isPasswordErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when the confirm password matches`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillPasswordField('Password123!'))
        .then((_) => _.fillConfirmField('Password123!'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isConfirmErrorVisible()).toBeFalsy();
    })

    test(`should show an error when the confirm password does not match`, async ({ homePage }) => {
        // Arrange

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillPasswordField('Password123!'))
        .then((_) => _.fillConfirmField('WrongPassword'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isConfirmErrorVisible()).toBeTruthy();
    })
})

test.describe(`Homepage positive flow tests`, () => {

})

test.describe('Homepage forgot password validation tests', () => {
    test
})