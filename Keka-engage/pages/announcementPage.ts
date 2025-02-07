// src/pages/announcementPage.ts
import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { locators } from "../Locators/locators";

export class AnnouncementPage extends BasePage {
  // Element Locators
  private readonly locators = locators;

  async navigateToAnnouncements() {
    await this.page.goto("https://aarthi.kekastage.com/#/engage/announcements/list");
  }

  async navigateToDashboard() {
    await this.page.goto("https://aarthi.kekastage.com/#/home/dashboard");
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
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage("Success!Announcement published successfully.");
  }

  private async configureAndPublishForWall() {
    await this.page.click(this.locators.configurePublishBtn);
    await this.selectTodayDate();
    await this.page.click(this.locators.publishBtn);
    await this.verifyToastMessage("Success!Announcement published successfully.");
  }

  private async selectTodayDate() {
    await this.page.click(this.locators.chooseDateField);
    await this.page.waitForSelector("bs-datepicker-container", { state: "visible" });
    await this.page.locator(this.locators.todayDateCell).click();
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
    await this.verifyToastMessage("Success!!Announcement saved successfully.");
  }

  async updateDraftAnnouncement() {
    await this.page.click(this.locators.updateEllipsis);
    await this.page.click(this.locators.editLinkBtn);
    await this.configureAndPublish();
    await this.navigateToAnnouncements();
  }

  async deleteAnnouncement() {
    await this.page.click(this.locators.updateEllipsis);
    await this.page.click(this.locators.deleteAnnouncementBtn);
    await this.page.click(this.locators.deleteConfirmBtn);
    await this.verifyToastMessage("Success!!Announcement deleted successfully.");
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

  async createAnnouncementWithAcknowledgement(title: string, description: string) {
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
    await this.selectFutureDate();
    await this.configureAndPublish();
    await this.verifyToastMessage("Success!Announcement published successfully.");
  }

  async acknowledgeAnnouncement() {
    await this.page.click(this.locators.listAckBtn);
    await this.verifyToastMessage("Success!Announcement acknowledged successfully.");
  }
}
