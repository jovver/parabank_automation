import { Page } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string) {
        await this.page.goto(path);
    }

    async waitForFullPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

}