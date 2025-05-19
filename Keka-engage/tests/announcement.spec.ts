// src/tests/announcementAndAcknowledgment.spec.ts
import { test, expect } from "@playwright/test";
import { KekaLoginPage } from "../pages/loginPage";
import { AnnouncementPage } from "../pages/announcementPage";
import { TEST_ANNOUNCEMENT } from "../config/testData";

test.describe("Keka Engage Announcement Tests", () => {
  let loginPage: KekaLoginPage;
  let announcementPage: AnnouncementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    announcementPage = new AnnouncementPage(page);

    await loginPage.navigateToLogin();
    await loginPage.loginAsAdmin();
    await announcementPage.navigateToAnnouncements();
  });

  test.describe("Positive Test Cases", () => {
    test("Create and publish a basic announcement", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an admin can create and publish an announcement." });

      await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Create and save announcement as draft", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be saved as a draft." });

      await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Update draft announcement and publish", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that a draft announcement can be updated and published." });

      await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
      await announcementPage.updateDraftAnnouncement();
    });

    test("Create announcement with acknowledgment", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be created with acknowledgment required." });

      await announcementPage.createAnnouncementWithAcknowledgement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement from wall for organization", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be created from the company wall." });

      await announcementPage.navigateToDashboard();
      await announcementPage.createAnnouncementFromWall(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement with future date", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be scheduled for a future date." });

      await announcementPage.createAnnouncementWithFutureDate(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement with publish later", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be scheduled to publish later." });

      await announcementPage.createAnnouncementwithpublishlater(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement with pixel image upload", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement can be created with a pixel image." });

      await announcementPage.CreateAnnouncementwithpixelimage();
    });

   
    test("Verify announcement appears on dashboard after publishing", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Ensures that a published announcement appears on the dashboard." });

      await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
      await announcementPage.navigateToDashboard();

      const announcement = announcementPage.page.locator(`text=${TEST_ANNOUNCEMENT.title}`);
      await expect(announcement).toBeVisible();
    });
  });

  test.describe("Negative Test Cases", () => {
    test("Create announcement without description and verify error message", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an error message is displayed when creating an announcement without a description." });

      await announcementPage.createAnnouncementWithoutDescription(TEST_ANNOUNCEMENT.title);
    });

    test("Create announcement without title and verify error message", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an error message is displayed when creating an announcement without a title." });

      await announcementPage.createAnnouncementWithoutTitle(TEST_ANNOUNCEMENT.description);
    });


    test("Create announcement with special characters in title", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies the system's handling of special characters in the announcement title." });

      await announcementPage.createBasicAnnouncement("!@#$%^&*()", TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement with maximum title length", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement title cannot exceed the maximum character limit." });

      const longTitle = "A".repeat(255);
      await announcementPage.createBasicAnnouncement(longTitle, TEST_ANNOUNCEMENT.description);
    });

    test("Create announcement with maximum description length", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that an announcement description cannot exceed the maximum character limit." });

      const longDescription = "A".repeat(1000);
      await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, longDescription);
    });

    test("Create announcement as draft and then delete", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Verifies that a draft announcement can be successfully deleted." });

      await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
      await announcementPage.deleteAnnouncement();
    });

    test("Disable manage announcement permission for HR Manager", async ({ }, testInfo) => {
      testInfo.annotations.push({ type: "comment", description: "Ensures that an HR Manager cannot manage announcements when the permission is disabled." });

      await announcementPage.removeManageAnnouncementPermission();
    });
  });
});
