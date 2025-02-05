// src/tests/announcementAndAcknowledgment.spec.ts
import { test, expect } from '@playwright/test';
import { KekaLoginPage } from '../pages/loginPage';
import { AnnouncementPage } from '../pages/announcementPage';
import { AcknowledgmentPage } from '../pages/acknowledgmentPage';
import { TEST_ANNOUNCEMENT } from '../config/testData';
import { log } from 'console';

test.describe('Announcement and Acknowledgment Tests', () => {
  let loginPage: KekaLoginPage;
  let announcementPage: AnnouncementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    announcementPage = new AnnouncementPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginAsAdmin();
   // await announcementPage.navigatetodashboard();
   await announcementPage.navigateToAnnouncements();
  });

  test('Create basic announcement', async () => {
    await announcementPage.createBasicAnnouncement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
   // await announcementPage.validateAnnouncementVisibility(TEST_ANNOUNCEMENT.title, true);
  });

 /*  test('Create and save annoucement as draft', async () => {
    await announcementPage.announcementdraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
  });

  test('Create department-specific announcement', async () => {
    await announcementPage.createDetailedAnnouncement({
      title: TEST_ANNOUNCEMENT.title,
      audience: TEST_ANNOUNCEMENT.department
    });
    await announcementPage.validateAnnouncementVisibility(TEST_ANNOUNCEMENT.title, true);
  });

  test('Employee acknowledgment workflow', async ({ browser }) => {
    // Admin creates announcement
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const adminAnnouncement = new AnnouncementPage(adminPage);
    const adminLogin = new KekaLoginPage(adminPage);
    await adminLogin.navigateToLogin();
    await adminLogin.loginAsAdmin();
    await adminAnnouncement.createDetailedAnnouncement({
      title: TEST_ANNOUNCEMENT.title,
      requireAck: true
    });

    // Employee acknowledges
    const empContext = await browser.newContext();
    const empPage = await empContext.newPage();
    const empAck = new AcknowledgmentPage(empPage);
    const empLogin = new KekaLoginPage(empPage);
    await empLogin.navigateToLogin();
    await empLogin.loginAsEmployee();
    await empAck.acknowledgeAnnouncement(TEST_ANNOUNCEMENT.title);

    // Admin verifies acknowledgment
    await adminAnnouncement.navigateToAnnouncements();
    const ackPage = new AcknowledgmentPage(adminPage);
    await ackPage.verifyAcknowledgment('emp_user');
  });
 */});
