// src/tests/announcementAndAcknowledgment.spec.ts
import { test, expect } from '@playwright/test';
import { KekaLoginPage } from '../pages/loginPage';
import { AnnouncementPage } from '../pages/announcementPage';
import { TEST_ANNOUNCEMENT } from '../config/testData';
import { Missing_title, Published_toaster } from '../config/constants';

test.describe('Announcement and Acknowledgment Tests', () => {
  let loginPage: KekaLoginPage;
  let announcementPage: AnnouncementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    announcementPage = new AnnouncementPage(page);
    
   // If wanted to run in full screen mode
    //await page.setViewportSize({ width: 1920, height: 1080 });
    await loginPage.navigateToLogin();
    await loginPage.loginAsAdmin();
    await announcementPage.navigateToAnnouncements();
  });

  test('Create and publish a basic announcement', async () => {
    await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });

  test('Create and save announcement as draft', async () => {
    await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });

  test('Update draft announcement and publish', async () => {
    await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    await announcementPage.updateDraftAnnouncement();
  });

  test('Create announcement as draft and then delete', async () => {
    await announcementPage.saveAnnouncementAsDraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    await announcementPage.deleteAnnouncement();
  });

  test('Create announcement without description and verify error message', async () => {
    await announcementPage.createAnnouncementWithoutDescription(TEST_ANNOUNCEMENT.title);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Missing_title);
  });

  test('Create announcement without title and verify error message', async () => {
    await announcementPage.createAnnouncementWithoutTitle(TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Missing_title);
  });

  test('Create announcement with acknowledgment', async () => {
    await announcementPage.createAnnouncementWithAcknowledgement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });

  test('Create announcement from wall for organization', async () => {
    await announcementPage.navigateToDashboard();
    await announcementPage.createAnnouncementFromWall(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });
test ('Create announcement with future date', async () => {
    await announcementPage.createAnnouncementWithFutureDate(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });
  test('Create announcement with publish later', async () => {
    await announcementPage.createAnnouncementwithpublishlater(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Published_toaster);
    
  });

  test('Create announcement with special characters in title', async () => {
    await announcementPage.createBasicAnnouncement('!@#$%^&*()', TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Published_toaster);
  });

  test('Create announcement with maximum title length', async () => {
    const longTitle = 'A'.repeat(255);
    await announcementPage.createBasicAnnouncement(longTitle, TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Published_toaster);
  });

  test('Create announcement with maximum description length', async () => {
    const longDescription = 'A'.repeat(1000);
    await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, longDescription);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(Published_toaster);
  });

  test('Verify announcement appears on dashboard after publishing', async () => {
    await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    await announcementPage.navigateToDashboard();
    const announcement = announcementPage.page.locator(`text=${TEST_ANNOUNCEMENT.title}`);
    await expect(announcement).toBeVisible();
  });
  test ('Disable manage announcement permission for HR Manager', async () => {
    await announcementPage.removeManageAnnouncementPermission();


  });
 });
