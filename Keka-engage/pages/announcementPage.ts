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
  private readonly acknowledgebtn = "//label[@for='acknowledgementToggle']";
  private readonly listackbtn = '//*[@id="acknowledgeButton"]/button';
  private readonly includeAllEmployeesCheckbox =
    '//label[@for="includeAllEmployees"]';
  private readonly chooseDateField = '[formcontrolname="endDate"]';
  private readonly datePickerDay = 'text:has-text("3")';
  private readonly publishBtn = '//button[text()="Publish"]';
  private readonly draftBtn = '//button[text()="Save as Draft"]';
  private readonly updateelipsis =
    '//*[@id="preload"]/xhr-app-root/div/app-reachout/div/div/reachout-announcements/reachout-announcements-list/div[4]/div[1]/div[1]/div/div/div[2]/div[2]/engage-announcement-actions/div';
  private readonly deleteannouncementbtn =
    '//a[@class="dropdown-item" and text()="Delete"]';
  private readonly deleteconfirmbtn = '//button[text()="Delete"]';
  private readonly Annbtnfromwall = "//a/div/span[contains(@class, 'ki ki-add')]";

  private readonly editlinkbtn =
    'a.dropdown-item[href*="engage/announcements/edit"]';
  async navigateToAnnouncements() {
    await this.page.goto(
      "https://aarthi.kekastage.com/#/engage/announcements/list"
    );
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
    await expect(toast).toHaveText(
      "Success!Announcement published successfully."
    );

    await this.waitForNetworkIdle();
  }

  async announcementdraft(title: string, description: string) {
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, title);
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, description);
    await this.page.click(this.draftBtn);
    const toast = this.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("Success!!Announcement saved successfully.");
  }
  async updatedraftannouce() {
    await this.page.click(this.updateelipsis);
    await this.page.click(this.editlinkbtn);
    await this.page.click(this.configurePublishBtn);
    await this.page.click(this.selectGrpups);
    await this.page.click(this.includeAllEmployeesCheckbox);
    await this.page.click(this.chooseDateField);
    await this.page.waitForSelector("bs-datepicker-container", {
      state: "visible",
    });
    const todayDateCell = this.page.locator("span.today-date-highlight");
    await todayDateCell.waitFor({ state: "visible" });
    await todayDateCell.click();
    await this.page.click(this.publishBtn);
    const toast = this.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(
      "Success!Announcement published successfully."
    );
    await this.navigateToAnnouncements();
  }
  async deleteannouncement() {
    await this.page.click(this.updateelipsis);
    await this.page.click(this.deleteannouncementbtn);
    await this.page.click(this.deleteconfirmbtn);
    const toast = this.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(
      "Success!!Announcement deleted successfully."
    );
  }

  async createaanouncementwithoutdescription(
    title: string,
    description: string
  ) {
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, title);
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, "");
    await this.page.click(this.configurePublishBtn);
  }
  async createaanouncementwithouttitle(title: string, description: string) {
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, "");
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, description);
    await this.page.click(this.configurePublishBtn);
  }
  async createannouncementwithacknowledgement(title: string, description: string) {
    await this.page.click(this.newAnnouncementBtn);
    await this.page.click(this.titleField);
    await this.page.fill(this.titleField, title);
    await this.page.click(this.descriptionField);
    await this.page.fill(this.descriptionField, description);
    await this.page.click(this.acknowledgebtn);
    await this.page.click(this.configurePublishBtn);
    await this.page.click(this.selectGrpups);
    await this.page.click(this.includeAllEmployeesCheckbox);  
    await this.page.click(this.chooseDateField);
    await this.page.waitForSelector("bs-datepicker-container", {
      state: "visible",
    });
    const todayDateCell = this.page.locator("span.today-date-highlight");
    await todayDateCell.waitFor({ state: "visible" });
    await todayDateCell.click();  
    await this.page.click(this.publishBtn);
    const toast = this.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("Success!Announcement published successfully.")
     
    const ackbtn = this.page.locator(this.listackbtn).first();
    await expect(ackbtn).toBeVisible();
    await expect(ackbtn).toHaveText("Acknowledge");
  }
 async createannouncementfromwall(title: string, description: string) {
  await this.page.click(this.Annbtnfromwall);
  await this.page.click(this.titleField);
  await this.page.fill(this.titleField, title);
  await this.page.click(this.descriptionField);
  await this.page.fill(this.descriptionField, description);
  await this.page.click(this.configurePublishBtn);
  await this.page.click(this.chooseDateField);
  await this.page.waitForSelector("bs-datepicker-container", {
    state: "visible",
  });
  const todayDateCell = this.page.locator("span.today-date-highlight");
  await todayDateCell.waitFor({ state: "visible" });
  await todayDateCell.click();
  await this.page.click(this.publishBtn);
  const toast = this.page.locator('//*[@id="toast-container"]');
  await expect(toast).toBeVisible();
  await expect(toast).toHaveText("Success!Announcement published successfully.");
  

 }
}
