// src/pages/announcementPage.ts
import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { locators } from "../Locators/Announcementlocators";
import {
  Acknowledged_toaster,
  Anno_URL,
  Dashboard_URL,
  Deleted_toaster,
  Draft_toaster,
  Published_toaster,
  Role_updated,
  Schedule_toaster,
} from "../config/constants";
import { TEST_ANNOUNCEMENT} from "../config/testData";


export class AnnouncementPage extends BasePage {
  // Element Locators
  private readonly locators = locators;

  async navigateToAnnouncements() {
    await this.page.goto(Anno_URL);
  }

  async navigateToDashboard() {
    await this.page.goto(Dashboard_URL);
  }

  private async fillAnnouncementDetails(title: string, description: string) {
    await this.page.fill(this.locators.titleField, title);
    await this.page.fill(this.locators.descriptionField, description);
  }

  private async configureAndPublish() {
    await this.page.click(this.locators.configurePublishBtn);
    await this.page.click(this.locators.selectGroups);
    await this.page.click(this.locators.includeAllEmployeesCheckbox);
    await this.selectTodayDate();
    //await this.page.frameLocator(this.locators.iframe).locator(this.locators.publishBtn).click();
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage(Published_toaster);
  }

  async configureAndPublishForWall() {
    
    await this.page.click(this.locators.configurePublishBtn);
    await this.selectTodayDate();
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage(Published_toaster);
  }

  private async selectTodayDate() {
    await this.page.click(this.locators.chooseEndDateField);
    await this.page.waitForSelector("bs-datepicker-container", {
      state: "visible",
    });
    await this.page.locator(this.locators.todayDateCell).click();
  }

  private async selectpublishDate() {
    await this.page.click(this.locators.publishLater);
    await this.page.click(this.locators.chooseStartDateField);
    await this.page.waitForSelector("bs-datepicker-container", {
      state: "visible",
    });
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    const day = tomorrow.getDate();
    await this.page
    .locator(`.bs-datepicker-container td:has-text("${day}")`)
    .click();
    await this.page.click(this.locators.chooseEndDateField); // <-- Replace with actual locator
await this.page.waitForSelector("bs-datepicker-container", { state: "visible" });

const closeDate = new Date();
closeDate.setDate(closeDate.getDate() + 3);
const closeDay = closeDate.getDate();

await this.page
  .locator(`.bs-datepicker-container td:has-text("${closeDay}")`)
  .click();
  }

  private async verifyToastMessage(expectedText: string) {
    const toast = this.page.locator(this.locators.toastMessage);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(expectedText);
  }

  async createBasicAnnouncement(title: string, description: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(title, description);
    await this.configureAndPublish();
    await this.waitForNetworkIdle();
  }

  async saveAnnouncementAsDraft(title: string, description: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(title, description);
    await this.page.click(this.locators.draftBtn);
    await this.verifyToastMessage(Draft_toaster);
  }

  async updateDraftAnnouncement() {
    await this.page.click(this.locators.updateEllipsis);
    await this.page.click(this.locators.editLinkBtn);
    await this.configureAndPublish();
    await this.navigateToAnnouncements();
  }

  async deleteAnnouncement() {
    await this.page.waitForTimeout(5000);
    await this.page.click(this.locators.updateEllipsis);
    await this.page.click(this.locators.deleteAnnouncementBtn);
    await this.page.click(this.locators.deleteConfirmBtn);
    await this.verifyToastMessage(Deleted_toaster);
  }

  async createAnnouncementWithoutDescription(title: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.page.fill(this.locators.titleField, title);
    await this.page.click(this.locators.configurePublishBtn);
  }

  async createAnnouncementWithoutTitle(description: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.page.fill(this.locators.descriptionField, description);
    await this.page.click(this.locators.configurePublishBtn);
  }

  async createAnnouncementWithAcknowledgement(
    title: string,
    description: string
  ) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(title, description);
    await this.page.click(this.locators.acknowledgeBtn);
    await this.configureAndPublish();
    const ackBtn = this.page.locator(this.locators.listAckBtn).first();
    await expect(ackBtn).toBeVisible();
    await expect(ackBtn).toHaveText("Acknowledge");
  }

  async createAnnouncementFromWall(title: string, description: string) {
    await this.page.click(this.locators.annBtnFromWall);
    await this.fillAnnouncementDetails(title, description);
    await this.configureAndPublishForWall();
  }

  async createAnnouncementWithFutureDate(title: string, description: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(title, description);
    await this.page.click(this.locators.configurePublishBtn);
    await this.page.click(this.locators.selectGroups);
    await this.page.click(this.locators.includeAllEmployeesCheckbox);
    await this.page.click(this.locators.publishLater);
    await this.page.click(this.locators.chooseEndDateField)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    const futureDay = futureDate.getDate();
    await this.page.locator(`.bs-datepicker-container td:has-text("${futureDay}")`).click();
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage(Schedule_toaster);
  }
  
  async createAnnouncementwithpublishlater(title: string, description: string) {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(title, description);
    await this.page.click(this.locators.configurePublishBtn);
    await this.page.click(this.locators.selectGroups);
    await this.page.click(this.locators.includeAllEmployeesCheckbox);
    await this.selectpublishDate();
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage(Schedule_toaster);
    //await this.selectFutureDate();
  
  }

  async acknowledgeAnnouncement() {
    await this.page.click(this.locators.listAckBtn);
    await this.verifyToastMessage(Acknowledged_toaster);
  }

  async removeManageAnnouncementPermission() {
    await this.page.click(this.locators.settingsBtn);
    await this.page.click(this.locators.rolesandpermissionbtn);
    await this.page.click(this.locators.hrManagerRole);
    await this.page.click(this.locators.featureEngage);
    const isChecked = await this.page.isChecked(
      this.locators.manageAnnouncement
    );
    if (isChecked) {
      await this.page.uncheck(this.locators.manageAnnouncement); // Uncheck if checked
    }

    // Proceed with update and navigate
    await this.page.click(this.locators.updateBtnPermissions);
    await this.navigateToAnnouncements();
    await this.verifyToastMessage(Role_updated);
  }

  async CreateAnnoucementwithattachment() {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    await this.page.click(this.locators.addAttachmentBtn);
    
    // Ensure the file input field is correctly targeted
    const fileInput = this.page.locator(this.locators.addAttachmentBtn);
    await fileInput.setInputFiles("C:\\Users\\mohammed.feroz\\Desktop\\images");
    
    await this.configureAndPublish();
    
  }
 
  async CreateAnnouncementwithpixelimage() {
    await this.page.click(this.locators.newAnnouncementBtn);
    await this.fillAnnouncementDetails(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    await this.page.getByText('Get from Pexels').click();
    await this.page.locator('div.modal-content img.border-radius-4.object-fit-cover').first().click();
    await this.page.click('text=Save image');
    await this.configureAndPublish();
    await this.verifyToastMessage(Published_toaster);
}
 async createAnnouncementfromwall() {
  await this.page.locator('span.ki-add').click();
  await this.fillAnnouncementDetails(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  await this.configureAndPublishForWall();
 }

 async saveAnnouncementsettings() {
  await this.page.getByText('Save Settings').click();
  await this.verifyToastMessage("Success!Settings saved successfully.");
}
}
