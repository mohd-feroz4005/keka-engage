import { test, expect } from "@playwright/test";
import { KekaLoginPage } from "../pages/loginPage";
import { SurveyPage } from "../pages/surveyPage";
import { TEST_SURVEY } from "../TestData/SurveyData";
import { Survey_published } from "../config/constants";

let surveyPage: SurveyPage;
let loginPage: KekaLoginPage;

test.describe("Keka Engage Survey Tests", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new KekaLoginPage(page);
    surveyPage = new SurveyPage(page);

    await loginPage.navigateToLogin();
    await loginPage.loginAsAdmin();
  });

  // test.describe("Positive Test Cases", () => {
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
    await surveyPage.addTextQuestion("short");
    await surveyPage.saveNewQuestion(TEST_SURVEY.shortTextQuestion);
    await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
  });

  test("Create survey with long text question", async ({}, testInfo) => {
    testInfo.annotations.push({
      type: "comment",
      description:
        "Verifies that a survey can be created with a long text question.",
    });

    await surveyPage.navigateToSurvey();
    await surveyPage.createSurveyFromScratch(
      TEST_SURVEY.surveyName,
      TEST_SURVEY.surveyDescription
    );
    await surveyPage.addTextQuestion("long");
    await surveyPage.saveNewQuestion(TEST_SURVEY.longTextQuestion);
    await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
  });

  test("Create survey with mandatory question", async ({}, testInfo) => {
    testInfo.annotations.push({
      type: "comment",
      description:
        "Verifies that a survey can be created with a mandatory question.",
    });

    await surveyPage.navigateToSurvey();
    await surveyPage.createSurveyFromScratch(
      TEST_SURVEY.surveyName,
      TEST_SURVEY.surveyDescription
    );
    await surveyPage.addTextQuestion("short");
    await surveyPage.markQuestionAsRequired();
    await surveyPage.saveNewQuestion(TEST_SURVEY.shortTextQuestion);
    await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
  });

  test("Create survey with maximum characters", async ({}, testInfo) => {
    testInfo.annotations.push({
      type: "comment",
      description:
        "Verifies that a survey can be created with a character limit.",
    });

    await surveyPage.navigateToSurvey();
    await surveyPage.createSurveyFromScratch(
      TEST_SURVEY.surveyName,
      TEST_SURVEY.surveyDescription
    );
    await surveyPage.addTextQuestion("short");
    await surveyPage.setMaxCharacters(100);
    await surveyPage.saveNewQuestion(TEST_SURVEY.shortTextQuestion);
    await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
  });
  test("Create survey with Survey Template", async ({}, testInfo) => {
    testInfo.annotations.push({
      type: "comment",
      description: "Verifies that a survey can be created using a template.",
    });
    const surveyTemplates = [
      "Net Promoter Score",
      "Employee Satisfaction Survey",
      "Employee Engagement Survey",
      "Manager Evaluation Survey",
      "Employee Retention Survey",
      "Employee Benefits Survey",
      "Team Performance Survey",
    ];

    // Select a random template
    const randomIndex = Math.floor(Math.random() * surveyTemplates.length);
    const selectedTemplate = surveyTemplates[randomIndex];
    await surveyPage.navigateToSurvey();
    await surveyPage.CreateSurveyFromTemplate(selectedTemplate);
    await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
    await surveyPage.verifyToastMessage(Survey_published);
  });
  test.describe("Employee Survey Participation", () => {
    test("Employee takes survey", async ({}, testInfo) => {
      testInfo.annotations.push({
        type: "comment",
        description: "Verifies that an employee can take a survey.",
      });

      await surveyPage.navigateToDashboard();
      await surveyPage.createSurveyFromScratch(
        TEST_SURVEY.surveyName,
        TEST_SURVEY.surveyDescription
      );
      await surveyPage.addTextQuestion("short");
      await surveyPage.markQuestionAsRequired();
      await surveyPage.saveNewQuestion(TEST_SURVEY.shortTextQuestion);
      await surveyPage.addTextQuestion("long");
      await surveyPage.setMaxCharacters(100);
      await surveyPage.saveNewQuestion(TEST_SURVEY.longTextQuestion);
      await surveyPage.addSpecialQuestion("yesno");
      await surveyPage.saveNewQuestion(TEST_SURVEY.yesNoQuestion);
      await surveyPage.addSpecialQuestion("rating");
      await surveyPage.saveNewQuestion(TEST_SURVEY.ratingScaleQuestion);
      await surveyPage.configureAndPublishSurvey({ isAnonymous: true });
      await surveyPage.takeSurvey();
    });
  });
});
