// src/tests/announcementAndAcknowledgment.spec.ts
import { test, expect } from '@playwright/test';
import { KekaLoginPage } from '../pages/loginPage';
import { AnnouncementPage } from '../pages/announcementPage';
import { TEST_ANNOUNCEMENT } from '../config/testData';

test.describe('Announcement and Acknowledgment Tests', () => {
  let loginPage: KekaLoginPage;
  let announcementPage: AnnouncementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    announcementPage = new AnnouncementPage(page);
    
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
    await expect(toast).toHaveText('Warning!!Title and Description are mandatory.');
  });

  test('Create announcement without title and verify error message', async () => {
    await announcementPage.createAnnouncementWithoutTitle(TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Warning!!Title and Description are mandatory.');
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
 });
