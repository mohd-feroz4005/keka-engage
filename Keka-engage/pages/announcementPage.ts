// src/pages/announcementPage.ts
import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { TEST_ANNOUNCEMENT } from "../config/testData";
import { Anno_URL } from "../config/constants";

export class AnnouncementPage extends BasePage {
  // Element Locators
  private readonly listItemAnnouncements = 'listitem:has-text("Announcements")';
  private readonly newAnnouncementBtn = 'button:has-text("New Announcement")';
  private readonly titleField = '//input[@id="announcementTitle"]';
  private readonly descriptionField =
    'div.ql-editor.ql-blank[contenteditable="true"]';
  private readonly needsAcknowledgementCheckbox =
    'text:has-text("Needs Acknowledgement?")';
  private readonly configurePublishBtn =
    '//button[text()="Configure & Publish"]';
  private readonly selectEmpGroups = '//label[@for="employeeWise"]';
  private readonly selectGrpups = '//label[@for="groupWise"]';
  private readonly includeAllEmployeesCheckbox =
    '//label[@for="includeAllEmployees"]';
  private readonly chooseDateField = '[formcontrolname="endDate"]';
  private readonly datePickerDay = 'text:has-text("3")';
  private readonly publishBtn = '//button[text()="Publish"]';
  private readonly draftBtn = '//button[text()="Save as Draft"]';

  async navigateToAnnouncements() {
    await this.page.goto(Anno_URL);
    await this.verifyUrlContains("announcements");
  }

  async navigatetodashboard() {
    await this.page.goto("https://aarthi.kekastage.com/#/home/dashboard");
  }

  async createBasicAnnouncement(title: string, description: string) {
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, title);
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, description);
    await this.page.click(this.configurePublishBtn);
    await this.page.click(this.selectGrpups);
    await this.page.click(this.includeAllEmployeesCheckbox);
    await this.page.click(this.chooseDateField);

    // Wait for the date picker to be visible
    await this.page.waitForSelector("bs-datepicker-container", {
      state: "visible",
    });

    // Locate today's date using a locator (to prevent stale element issues)
    const todayDateCell = this.page.locator("span.today-date-highlight");

    // Ensure the element is visible and clickable before clicking
    await todayDateCell.waitFor({ state: "visible" });
    await todayDateCell.click();
    await this.page.click(this.publishBtn);

    // Wait for the toast message to appear
    // Locate the toast message (modify the selector as per your application)
  const toast = this.page.locator('//*[@id="toast-container"]');

  // Wait for the toast message to appear
  await expect(toast).toBeVisible();

  // Verify the toast message text
  await expect(toast).toHaveText('Success!Announcement published successfully.');
      
    
    await this.waitForNetworkIdle();
  }

  async announcementdraft(title: string, description:string){
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, title);
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, description);
    await this.page.click (this.draftBtn);


  }
  

 /*  async validateAnnouncementVisibility(title: string, shouldExist: boolean) {
    const card = this.page.locator(this.announcementCard(title));
    if (shouldExist) {
      await expect(card).toBeVisible();
    } else {
      await expect(card).not.toBeVisible();
    }
  }

  async validateFieldErrors() {
    await expect(this.page.locator('text="Title is required"')).toBeVisible();
  }
 */}
