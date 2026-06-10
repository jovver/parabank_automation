import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../src/config/urls'

export class HomePage extends BasePage {
    readonly page: Page;
    private readonly url: string = ENV.homePageURL;
    readonly registerLink: Locator;
    readonly registerButton: Locator;
    readonly firstNameField: Locator;
    readonly firstNameFieldError: Locator;
    readonly lastNameFieldError: Locator;
    readonly addressFieldError: Locator;
    readonly cityFieldError: Locator;
    readonly stateFieldError: Locator;
    readonly zipCodeFieldError: Locator;
    readonly ssnFieldError: Locator;
    readonly userNameFieldError: Locator;
    readonly passwordFieldError: Locator;
    readonly confirmFieldError: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerLink = this.page.getByRole('link', { name: 'Register' });
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
        this.firstNameField = this.page.getByRole('textbox', { name: 'customer.firstName' });
        this.firstNameFieldError = this.page.locator(`[id="customer.firstName.errors"]`);
        this.lastNameFieldError = this.page.locator(`[id="customer.lastName.errors"]`);
        this.addressFieldError = this.page.locator(`[id="customer.address.street.errors"]`);
        this.cityFieldError = this.page.locator(`[id="customer.address.city.errors"]`);
        this.stateFieldError = this.page.locator(`[id="customer.address.state.errors"]`);
        this.zipCodeFieldError = this.page.locator(`[id="customer.address.zipCode.errors"]`);
        this.ssnFieldError = this.page.locator(`[id="customer.ssn.errors"]`);
        this.userNameFieldError = this.page.locator(`[id="customer.username.errors"]`);
        this.passwordFieldError = this.page.locator(`[id="customer.password.errors"]`);
        this.confirmFieldError = this.page.locator(`[id="repeatedPassword.errors"]`);
    }

    // Basic Methods

    async goto() {
        await this.navigate(this.url);
        await this.waitForFullPageLoad;
    }

    async clickRegisterLink() {
        await this.registerLink.click();
        return this;
    }

    async clickRegisterButton() {
        await this.registerButton.click();
        return this;
    }

    async fillFirstNameField(firstName: string) {
        await this.firstNameField.fill(firstName);
        return this;
    }

    async isFirstNameErrorVisible(): Promise<boolean> {
        return await this.firstNameFieldError.isVisible();
    }

    async getFirstNameError(): Promise<string> {
        return await this.firstNameFieldError.innerText();
    }

    async isLastNameErrorVisible(): Promise<boolean> {
        return await this.lastNameFieldError.isVisible();
    }

    async getLastNameError(): Promise<string> {
        return await this.lastNameFieldError.innerText();
    }

    async isAddressErrorVisible(): Promise<boolean> {
        return await this.addressFieldError.isVisible();
    }

    async getAddressError(): Promise<string> {
        return await this.addressFieldError.innerText();
    }

    async isCityErrorVisible(): Promise<boolean> {
        return await this.cityFieldError.isVisible();
    }

    async getCityError(): Promise<string> {
        return await this.cityFieldError.innerText();
    }

    async isStateErrorVisible(): Promise<boolean> {
        return await this.stateFieldError.isVisible();
    }

    async getStateError(): Promise<string> {
        return await this.stateFieldError.innerText();
    }

    async isZipCodeErrorVisible(): Promise<boolean> {
        return await this.zipCodeFieldError.isVisible();
    }

    async getZipCodeError(): Promise<string> {
        return await this.zipCodeFieldError.innerText();
    }

    async isSsnErrorVisible(): Promise<boolean> {
        return await this.ssnFieldError.isVisible();
    }

    async getSsnError(): Promise<string> {
        return await this.ssnFieldError.innerText();
    }

    async isUserNameErrorVisible(): Promise<boolean> {
        return await this.userNameFieldError.isVisible();
    }

    async getUserNameError(): Promise<string> {
        return await this.userNameFieldError.innerText();
    }

    async isPasswordErrorVisible(): Promise<boolean> {
        return await this.passwordFieldError.isVisible();
    }

    async getPasswordError(): Promise<string> {
        return await this.passwordFieldError.innerText();
    }

    async isConfirmErrorVisible(): Promise<boolean> {
        return await this.confirmFieldError.isVisible();
    }

    async getConfirmError(): Promise<string> {
        return await this.confirmFieldError.innerText();
    }

    // Combination Methods

    async areAllSignUpErrorsVisible(): Promise<boolean> {
        return await this.isFirstNameErrorVisible() &&
            await this.isLastNameErrorVisible() &&
            await this.isAddressErrorVisible() &&
            await this.isCityErrorVisible() &&
            await this.isStateErrorVisible() &&
            await this.isZipCodeErrorVisible() &&
            await this.isSsnErrorVisible() &&
            await this.isUserNameErrorVisible() &&
            await this.isPasswordErrorVisible() &&
            await this.isConfirmErrorVisible();
    }
}