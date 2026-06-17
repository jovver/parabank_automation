import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../src/config/urls';

export class ContactPage extends BasePage {
    private readonly url: string = ENV.contactPageURL;
    private readonly sendButton: Locator;
    private readonly nameField: Locator;
    private readonly emailField: Locator;
    private readonly phoneField: Locator;
    private readonly messageField: Locator;
    private readonly nameFieldError: Locator;
    private readonly emailFieldError: Locator;
    private readonly phoneFieldError: Locator;
    private readonly messageFieldError: Locator;

    constructor(page: Page) {
        super(page);
        this.sendButton = this.page.getByRole('button', { name: 'Send to Customer Care' });
        this.nameField = this.page.locator('#name');
        this.emailField = this.page.locator('#email');
        this.phoneField = this.page.locator('#phone');
        this.messageField = this.page.locator('#message');
        this.nameFieldError = this.page.locator('[id="name.errors"]');
        this.emailFieldError = this.page.locator('[id="email.errors"]');
        this.phoneFieldError = this.page.locator('[id="phone.errors"]');
        this.messageFieldError = this.page.locator('[id="message.errors"]');
    }

    // Basic Methods

    async goto(): Promise<this> {
        await this.navigate(this.url);
        await this.waitForFullPageLoad();
        return this;
    }

    async fillNameField(name: string): Promise<this> {
        await this.nameField.fill(name);
        return this;
    }

    async fillEmailField(email: string): Promise<this> {
        await this.emailField.fill(email);
        return this;
    }

    async fillPhoneField(phone: string): Promise<this> {
        await this.phoneField.fill(phone);
        return this;
    }

    async fillMessageField(message: string): Promise<this> {
        await this.messageField.fill(message);
        return this;
    }

    async clickSendButton(): Promise<this> {
        await this.sendButton.click();
        await this.waitForFullPageLoad();
        return this;
    }

    async isNameErrorVisible(): Promise<boolean> {
        return await this.nameFieldError.isVisible();
    }

    async getNameError(): Promise<string> {
        return await this.nameFieldError.innerText();
    }

    async isEmailErrorVisible(): Promise<boolean> {
        return await this.emailFieldError.isVisible();
    }

    async getEmailError(): Promise<string> {
        return await this.emailFieldError.innerText();
    }

    async isPhoneErrorVisible(): Promise<boolean> {
        return await this.phoneFieldError.isVisible();
    }

    async getPhoneError(): Promise<string> {
        return await this.phoneFieldError.innerText();
    }

    async isMessageErrorVisible(): Promise<boolean> {
        return await this.messageFieldError.isVisible();
    }

    async getMessageError(): Promise<string> {
        return await this.messageFieldError.innerText();
    }

    // Combination Methods

    async areAllContactErrorsVisible(): Promise<boolean> {
        return await this.isNameErrorVisible() &&
            await this.isEmailErrorVisible() &&
            await this.isPhoneErrorVisible() &&
            await this.isMessageErrorVisible();
    }
}
