import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { locators } from "../Locators/Walllocators"
import { TEST_ANNOUNCEMENT } from "../TestData/AnnouncementTestdata";
import {Dashboard_URL, Survey_URL} from "../config/constants";


export class WallPage extends BasePage {
    // Element Locators
    private readonly locators = locators;
    
    async navigateToWall() {
        await this.page.goto(Dashboard_URL);
    }
    
   async postOnWall(taguser: string, tagusername: string) {
    // Click the placeholder to activate the editor
    const clicktoeditor = this.page.getByPlaceholder(this.locators.posteditor);
    await clicktoeditor.click();

    // Focus and type into the editor
    const editor = this.page.locator(this.locators.editor);
    await editor.click();
    await editor.fill(`${taguser}`);

    // Wait for the dropdown suggestion to appear
    const suggestion = this.page.locator(`text="${tagusername}"`);
    await suggestion.waitFor({ state: 'visible', timeout: 5000 });

    // Click the correct suggestion
    await suggestion.first().click();

    // Optionally verify the tag was inserted
    await expect(editor).toContainText(taguser);

    // Click the post button
    await this.page.locator(this.locators.postButton).click();
}

    

    
    async tagEmployee(taguser: string) {
       await this.page.click(this.locators.editor);
       await this.page.getByPlaceholder(this.locators.posteditor).fill(taguser);
       await this.page.getByTitle(locators.tagusername).click();
       await this.page.waitForSelector(this.locators.tagusername, { state: "visible" });
       await this.page.keyboard.press("Enter");
         await this.page.click(this.locators.postButton);
    }
    async addemoji() {
        await this.page.click(this.locators.emojiselect);
        await this.page.click(this.locators.postButton);
    }
    async verifyToastMessage(expectedText: string) {
    const toast = this.page.locator(this.locators.toastMessage);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(expectedText);
}}