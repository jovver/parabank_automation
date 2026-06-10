import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
})

test.describe('Homepage Tests', () => {

    test('should see all field validations when registering', async ({ page }) => {
        // Arrange
        const homePage = new HomePage(page);

        // Act
        await homePage.clickRegisterLink();

        // Assert
        expect(homePage.isFirstNameErrorVisible).toBeTruthy();

    })
})