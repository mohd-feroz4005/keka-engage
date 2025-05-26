import { test, expect } from "@playwright/test";
import { KekaLoginPage } from "../pages/loginPage";
import { WallPage } from "../pages/WallPage";
import { TEST_ANNOUNCEMENT } from "../TestData/AnnouncementTestdata";
test.describe("Keka Engage Wall Tests", () => {
    let loginPage: KekaLoginPage;
    let wallPage: WallPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new KekaLoginPage(page);
        wallPage = new WallPage(page);
    
        await loginPage.navigateToLogin();
        await loginPage.loginAsAdmin();
       // await wallPage.navigateToWall();
    });
    
    test.describe("Positive Test Cases", () => {
        test("Post on wall", async ({ }, testInfo) => {
        testInfo.annotations.push({ type: "comment", description: "Verifies that a post can be made on the wall." });

        await wallPage.postOnWall(TEST_ANNOUNCEMENT.taguser, TEST_ANNOUNCEMENT.tagusername);
        await wallPage.verifyToastMessage("Success!Post is created");
        });
        test("Tag employee in wall post", async ({ }, testInfo) => {
        testInfo.annotations.push({ type: "comment", description: "Verifies that an employee can be tagged in a wall post." });

        await wallPage.tagEmployee(TEST_ANNOUNCEMENT.taguser);
        await wallPage.verifyToastMessage("Success!Post is created");
        });
        test("Add emoji to wall post", async ({ }, testInfo) => {
            testInfo.annotations.push({ type: "comment", description: "Verifies that an emoji can be added to a wall post." });

            await wallPage.addemoji();
            await wallPage.verifyToastMessage("Success!Post is created");
        });
    });
});
