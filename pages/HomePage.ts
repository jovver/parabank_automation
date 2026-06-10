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

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerLink = this.page.getByRole( 'link', { name: 'Register' });
        this.registerButton = this.page.getByRole( 'button', { name: 'Register' });
        this.firstNameField = this.page.getByRole( 'textbox', { name: 'customer.firstName' });
        this.firstNameFieldError = this.page.locator(`[id="customer.firstName.errors"]`);
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

    // Combination Methods
}