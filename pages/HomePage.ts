import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../src/config/urls'

export class HomePage extends BasePage {
    readonly page: Page;
    private readonly url: string = ENV.homePageURL;
    private readonly registerLink: Locator;
    private readonly aboutLink: Locator;
    private readonly contactLink: Locator;
    private readonly servicesLink: Locator;
    private readonly forgotLoginLink: Locator;
    private readonly logInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerLink = this.page.getByRole('link', { name: 'Register' });
        this.aboutLink = this.page.locator('#headerPanel').getByRole('link', { name: 'About Us' });
        this.contactLink = this.page.locator('#headerPanel').getByRole('link', { name: 'contact', exact: true });
        this.servicesLink = this.page.locator('#headerPanel').getByRole('link', { name: 'Services' });
        this.forgotLoginLink = this.page.getByRole('link', { name: 'Forgot login info?' });
        this.logInButton = this.page.getByRole('button', { name: 'Log In' });
    }

    // Basic Methods

    async goto(): Promise<this> {
        await this.navigate(this.url);
        await this.waitForFullPageLoad();
        return this;
    }

    async clickRegisterLink(): Promise<this> {
        await this.registerLink.click();
        return this;
    }

    async clickAboutLink(): Promise<this> {
        await this.aboutLink.click();
        return this;
    }

    async clickContactLink(): Promise<this> {
        await this.contactLink.click();
        return this;
    }

    async clickServicesLink(): Promise<this> {
        await this.servicesLink.click();
        return this;
    }

    async clickForgotLoginLink(): Promise<this> {
        await this.forgotLoginLink.click();
        return this;
    }

    async clickLogInButton(): Promise<this> {
        await this.logInButton.click();
        return this;
    }
}
