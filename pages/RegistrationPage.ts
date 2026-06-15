import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../src/config/urls';

export class RegistrationPage extends BasePage {
    readonly page: Page;
    private readonly url: string = ENV.registrationPageURL;
    private readonly registerButton: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly addressField: Locator;
    private readonly cityField: Locator;
    private readonly stateField: Locator;
    private readonly zipCodeField: Locator;
    private readonly ssnField: Locator;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly confirmField: Locator;
    private readonly firstNameFieldError: Locator;
    private readonly lastNameFieldError: Locator;
    private readonly addressFieldError: Locator;
    private readonly cityFieldError: Locator;
    private readonly stateFieldError: Locator;
    private readonly zipCodeFieldError: Locator;
    private readonly ssnFieldError: Locator;
    private readonly userNameFieldError: Locator;
    private readonly passwordFieldError: Locator;
    private readonly confirmFieldError: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
        this.firstNameField = this.page.locator('[id="customer.firstName"]');
        this.lastNameField = this.page.locator('[id="customer.lastName"]');
        this.addressField = this.page.locator('[id="customer.address.street"]');
        this.cityField = this.page.locator('[id="customer.address.city"]');
        this.stateField = this.page.locator('[id="customer.address.state"]');
        this.zipCodeField = this.page.locator('[id="customer.address.zipCode"]');
        this.ssnField = this.page.locator('[id="customer.ssn"]');
        this.userNameField = this.page.locator('[id="customer.username"]');
        this.passwordField = this.page.locator('[id="customer.password"]');
        this.confirmField = this.page.locator('[id="repeatedPassword"]');
        this.firstNameFieldError = this.page.locator('[id="customer.firstName.errors"]');
        this.lastNameFieldError = this.page.locator('[id="customer.lastName.errors"]');
        this.addressFieldError = this.page.locator('[id="customer.address.street.errors"]');
        this.cityFieldError = this.page.locator('[id="customer.address.city.errors"]');
        this.stateFieldError = this.page.locator('[id="customer.address.state.errors"]');
        this.zipCodeFieldError = this.page.locator('[id="customer.address.zipCode.errors"]');
        this.ssnFieldError = this.page.locator('[id="customer.ssn.errors"]');
        this.userNameFieldError = this.page.locator('[id="customer.username.errors"]');
        this.passwordFieldError = this.page.locator('[id="customer.password.errors"]');
        this.confirmFieldError = this.page.locator('[id="repeatedPassword.errors"]');
    }

    // Basic Methods

    async goto(): Promise<this> {
        await this.navigate(this.url);
        return this;
    }

    async clickRegisterButton(): Promise<this> {
        await this.registerButton.click();
        return this;
    }

    async fillFirstNameField(firstName: string): Promise<this> {
        await this.firstNameField.fill(firstName);
        return this;
    }

    async fillLastNameField(lastName: string): Promise<this> {
        await this.lastNameField.fill(lastName);
        return this;
    }

    async fillAddressField(address: string): Promise<this> {
        await this.addressField.fill(address);
        return this;
    }

    async fillCityField(city: string): Promise<this> {
        await this.cityField.fill(city);
        return this;
    }

    async fillStateField(state: string): Promise<this> {
        await this.stateField.fill(state);
        return this;
    }

    async fillZipCodeField(zipCode: string): Promise<this> {
        await this.zipCodeField.fill(zipCode);
        return this;
    }

    async fillSsnField(ssn: string): Promise<this> {
        await this.ssnField.fill(ssn);
        return this;
    }

    async fillUserNameField(username: string): Promise<this> {
        await this.userNameField.fill(username);
        return this;
    }

    async fillPasswordField(password: string): Promise<this> {
        await this.passwordField.fill(password);
        return this;
    }

    async fillConfirmField(confirm: string): Promise<this> {
        await this.confirmField.fill(confirm);
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
