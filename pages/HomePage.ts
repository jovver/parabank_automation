import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../src/config/urls'

export class HomePage extends BasePage {
    readonly page: Page;
    private readonly url: string = ENV.homePageURL;
    private readonly registerLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerLink = this.page.getByRole('link', { name: 'Register' });
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
}
