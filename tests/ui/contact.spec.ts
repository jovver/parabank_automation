import { expect } from '@playwright/test';
import { contactPageErrorMessages } from '../../src/data/contactPageMessages';
import { test } from '../../fixtures/index';

test.describe('Parabank - Contact Page', () => {

    test(`should see all field validations when clicking 'Send to Customer Care' button immediately`, async ({ contactPage }) => {
        // Arrange
        let boolErrors: boolean;

        // Act
        await contactPage.clickSendButton();

        boolErrors = await contactPage.areAllContactErrorsVisible();

        // Assert
        expect(boolErrors).toBeTruthy();

        expect(await contactPage.getNameError()).toBe(contactPageErrorMessages.nameErrorMessage);
        expect(await contactPage.getEmailError()).toBe(contactPageErrorMessages.emailErrorMessage);
        expect(await contactPage.getPhoneError()).toBe(contactPageErrorMessages.phoneErrorMessage);
        expect(await contactPage.getMessageError()).toBe(contactPageErrorMessages.messageErrorMessage);
    })

    test(`should show no error on the name field when it is filled`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillNameField('John Doe')
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isNameErrorVisible()).toBeFalsy();
    })

    test(`should not accept a numeric value in the name field`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillNameField('123')
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isNameErrorVisible()).toBeTruthy();
    })

    test(`should show no error on the email field when it is filled`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillEmailField('test@test.com')
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isEmailErrorVisible()).toBeFalsy();
    })

    test(`should not accept an invalid email format`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillNameField('John Doe')
            .then((_) => _.fillEmailField('notanemail'))
            .then((_) => _.fillPhoneField('1234567890'))
            .then((_) => _.fillMessageField('Hello, this is a test message.'))
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isEmailErrorVisible()).toBeTruthy();
    })

    test(`should show no error on the phone field when it is filled`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillPhoneField('1234567890')
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isPhoneErrorVisible()).toBeFalsy();
    })

    test(`should not accept alphabetic characters in the phone field`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillNameField('John Doe')
            .then((_) => _.fillEmailField('test@test.com'))
            .then((_) => _.fillPhoneField('abcdefghij'))
            .then((_) => _.fillMessageField('Hello, this is a test message.'))
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isPhoneErrorVisible()).toBeTruthy();
    })

    test(`should show no error on the message field when it is filled`, async ({ contactPage }) => {
        // Arrange

        // Act
        await contactPage.fillMessageField('Hello, this is a test message.')
            .then((_) => _.clickSendButton());

        // Assert
        expect(await contactPage.isMessageErrorVisible()).toBeFalsy();
    })

})
