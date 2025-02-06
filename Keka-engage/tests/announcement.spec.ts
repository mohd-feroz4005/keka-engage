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
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Success!Announcement published successfully.');
  });

  test('Create and save annoucement as draft', async () => {
    await announcementPage.announcementdraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Success!!Announcement saved successfully.');
  });

  test('Update draft announcement and published', async () => {
   await announcementPage.announcementdraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
   await announcementPage.updatedraftannouce();
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Success!Announcement published successfully.');
  });
 test('create annoucement and save as draft then delete the annoucement', async () => {
    await announcementPage.announcementdraft(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
    
    await announcementPage.deleteannouncement();
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Success!!Announcement deleted successfully.');
  });
 test('Create announcement without description and verify error message', async () => {
 await announcementPage.createaanouncementwithoutdescription(TEST_ANNOUNCEMENT.title, '');
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Warning!!Title and Description are mandatory.');
  
 });

 test ('create annoucement without title  and verify error message', async () => {
await announcementPage.createaanouncementwithouttitle('',TEST_ANNOUNCEMENT.description);
    const toast = announcementPage.page.locator('//*[@id="toast-container"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText('Warning!!Title and Description are mandatory.');
  });

 test ('create announcement with acknowledgement', async () => {
 await announcementPage.createannouncementwithacknowledgement(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);

 })
test('create annoucement from wall for organization', async () => {

await announcementPage.navigatetodashboard();
  await announcementPage.createannouncementfromwall(TEST_ANNOUNCEMENT.title, TEST_ANNOUNCEMENT.description);
});

});