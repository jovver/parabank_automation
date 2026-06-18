import { expect } from '@playwright/test';
import { registrationPageErrorMessages } from '../../src/data/registrationPageMessages';
import { test } from '../../fixtures/index';

test.describe('Parabank - Registration Page validation tests', () => {

    test(`should see all field validations when clicking 'Register' button immediately`, async ({ registrationPage }) => {
        // Arrange
        let boolErrors: boolean;

        // Act
        await registrationPage.clickRegisterButton();

        boolErrors = await registrationPage.areAllSignUpErrorsVisible();

        // Assert
        expect(boolErrors).toBeTruthy();

        expect(await registrationPage.getFirstNameError()).toBe(registrationPageErrorMessages.firstNameErrorMessage);
        expect(await registrationPage.getLastNameError()).toBe(registrationPageErrorMessages.lastNameErrorMessage);
        expect(await registrationPage.getAddressError()).toBe(registrationPageErrorMessages.addressFieldErrorMessage);
        expect(await registrationPage.getCityError()).toBe(registrationPageErrorMessages.cityFieldErrorMessage);
        expect(await registrationPage.getStateError()).toBe(registrationPageErrorMessages.stateFieldErrorMessage);
        expect(await registrationPage.getZipCodeError()).toBe(registrationPageErrorMessages.zipCodeFieldErrorMessage);
        expect(await registrationPage.getSsnError()).toBe(registrationPageErrorMessages.ssnFieldErrorMessage);
        expect(await registrationPage.getUserNameError()).toBe(registrationPageErrorMessages.userNameErrorMessage);
        expect(await registrationPage.getPasswordError()).toBe(registrationPageErrorMessages.passwordErrorMessage);
        expect(await registrationPage.getConfirmError()).toBe(registrationPageErrorMessages.confirmErrorMessage);
    })

    test(`should show no errors when filling up the first name`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillFirstNameField('test')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isFirstNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphanumeric entry on the first name field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillFirstNameField('123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isFirstNameErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the last name`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillLastNameField('Doe')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isLastNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the last name field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillLastNameField('123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isLastNameErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the address`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillAddressField('123 Main St')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isAddressErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric-only entry on the address field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillAddressField('12345')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isAddressErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the city`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillCityField('Los Angeles')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isCityErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the city field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillCityField('123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isCityErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the state`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillStateField('California')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isStateErrorVisible()).toBeFalsy();
    })

    test(`should not allow numeric entry on the state field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillStateField('123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isStateErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the zip code`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillZipCodeField('12345')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isZipCodeErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphabetic entry on the zip code field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillZipCodeField('ABCDE')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isZipCodeErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the SSN`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillSsnField('123456789')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isSsnErrorVisible()).toBeFalsy();
    })

    test(`should not allow alphabetic entry on the SSN field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillSsnField('abc')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isSsnErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the username`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillUserNameField('testuser123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isUserNameErrorVisible()).toBeFalsy();
    })

    test(`should not allow special character-only entry on the username field`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillUserNameField('!@#$%')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isUserNameErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when filling up the password`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillPasswordField('Password123!')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isPasswordErrorVisible()).toBeFalsy();
    })

    test(`should not accept a password that is too short`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillPasswordField('123')
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isPasswordErrorVisible()).toBeTruthy();
    })

    test(`should show no errors when the confirm password matches`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillPasswordField('Password123!')
            .then((_) => _.fillConfirmField('Password123!'))
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isConfirmErrorVisible()).toBeFalsy();
    })

    test(`should show an error when the confirm password does not match`, async ({ registrationPage }) => {
        // Arrange

        // Act
        await registrationPage.fillPasswordField('Password123!')
            .then((_) => _.fillConfirmField('WrongPassword'))
            .then((_) => _.clickRegisterButton());

        // Assert
        expect(await registrationPage.isConfirmErrorVisible()).toBeTruthy();
    })

})

test.describe('Parabank - Registration Page successful registration tests', () => {
    
    test('should be able to create a new user', async({ registrationPage }) => {
        // Arrange
        

        // Act

        // Assert
    })
})
