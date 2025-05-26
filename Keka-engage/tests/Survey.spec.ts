import { test, expect } from "@playwright/test";
import { KekaLoginPage } from "../pages/loginPage";
import { WallPage } from "../pages/WallPage";
import { TEST_SURVEY } from "../TestData/SurveyData";
import { SurveyPage } from "../pages/surveyPage";
let surveyPage: SurveyPage;

test.describe("Keka Engage Survey Tests", () => {
    test.beforeEach(async ({ page }) => {
       const loginPage = new KekaLoginPage(page);
         surveyPage = new SurveyPage(page);
   
       await loginPage.navigateToLogin();
       await loginPage.loginAsAdmin();
    });
    });

    test.describe("Positive Test Cases", () => {
        test("Create survey from scratch", async ({ }, testInfo) => {
            testInfo.annotations.push({ type: "comment", description: "Verifies that a survey can be created from scratch." });
            await surveyPage.navigateToSurvey();
            await surveyPage.createSurveyFromScratch(TEST_SURVEY.surveyName, TEST_SURVEY.surveyDescription);
            await surveyPage.addShortTextQuestion(TEST_SURVEY.shortTextQuestion);
            await surveyPage.configureAndPublishSurvey();

            //await surveyPage.verifyToastMessage("Success! Survey created successfully");
        });
        test("Create Survey with long question", async ({ }, testInfo) => {
            testInfo.annotations.push({ type: "comment", description: "Verifies that a survey can be created with a long text question." });
            await surveyPage.navigateToSurvey();
            await surveyPage.createSurveyFromScratch(TEST_SURVEY.surveyName, TEST_SURVEY.surveyDescription);
            await surveyPage.addLongTextQuestion(TEST_SURVEY.longTextQuestion);
            await surveyPage.configureAndPublishSurvey();


        });
        test("Create Survey with mandatory question", async ({ }, testInfo) => {
            testInfo.annotations.push({ type: "comment", description: "Verifies that a survey can be created with a mandatory question." });
            await surveyPage.navigateToSurvey();
            await surveyPage.createSurveyFromScratch(TEST_SURVEY.surveyName, TEST_SURVEY.surveyDescription);
            await surveyPage.addShortTextQuestion(TEST_SURVEY.shortTextQuestion);
            await surveyPage.markQuestionAsRequired();
            await surveyPage.configureAndPublishSurvey();

    });
    test ("Create Survey with maximum characters", async ({ }, testInfo) => {
        testInfo.annotations.push({ type: "comment", description: "Verifies that a survey can be created with a question that has maximum characters." });
        await surveyPage.navigateToSurvey();
        await surveyPage.createSurveyFromScratch(TEST_SURVEY.surveyName, TEST_SURVEY.surveyDescription);
        await surveyPage.addShortTextQuestion(TEST_SURVEY.shortTextQuestion);
        await surveyPage.setMaxCharacters(100);
        await surveyPage.configureAndPublishSurvey();
    });
});
