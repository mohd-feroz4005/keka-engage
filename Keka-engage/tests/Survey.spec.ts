import { test, expect } from "@playwright/test";
import { KekaLoginPage } from "../pages/loginPage";
import { SurveyPage } from "../pages/surveyPage";
import { TEST_SURVEY } from "../TestData/SurveyData";

let surveyPage: SurveyPage;
let loginPage: KekaLoginPage;

test.describe("Keka Engage Survey Tests", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    surveyPage = new SurveyPage(page);

    await loginPage.navigateToLogin();
    await loginPage.loginAsAdmin();
  });

  test.describe("Positive Test Cases", () => {
    test("Create survey from scratch", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that a survey can be created from scratch.",
      });

      await surveyPage.navigateToSurvey();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("short", TEST_SURVEY.shortTextQuestion);
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    });

    test("Create survey with long text question", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that a survey can be created with a long text question.",
      });

      await surveyPage.navigateToSurvey();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("long", TEST_SURVEY.longTextQuestion);
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    });

    test("Create survey with mandatory question", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that a survey can be created with a mandatory question.",
      });

      await surveyPage.navigateToSurvey();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("short", TEST_SURVEY.shortTextQuestion);
      await surveyPage.markQuestionAsRequired();
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    });

    test("Create survey with maximum characters", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that a survey can be created with a character limit.",
      });

      await surveyPage.navigateToSurvey();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("short", TEST_SURVEY.shortTextQuestion);
      await surveyPage.setMaxCharacters(100);
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    });
    test("Create survey with Short and Special Questions", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that a survey can be created with short and special questions.",
      });

      await surveyPage.navigateToSurvey();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("short", TEST_SURVEY.shortTextQuestion);
      await surveyPage.markQuestionAsRequired();
      await surveyPage.addTextQuestion("long", TEST_SURVEY.longTextQuestion);
      await surveyPage.setMaxCharacters(100);
      await surveyPage.addSpecialQuestion("yesno", TEST_SURVEY.yesNoQuestion);
      await surveyPage.addSpecialQuestion("rating", TEST_SURVEY.ratingScaleQuestion);
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    });
  });
});
