import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { surveyLocators } from "../Locators/SurveyLocators";
import { TEST_SURVEY } from "../TestData/SurveyData";
import { Question_Added, Survey_Initialized, Survey_published } from "../config/constants";

export class SurveyPage extends BasePage {
    private readonly locators = surveyLocators;

    async navigateToSurvey() {
        await this.page.goto("https://aarthi.kekastage.com/#/engage/survey-revamp/survey-dashboard");
    }

    async createSurveyFromScratch(surveyName: string, surveyDescription: string) {
        await this.page.waitForSelector(this.locators.NewSurveyButton, { state: "visible" });
        await this.page.click(this.locators.NewSurveyButton);

        await this.page.waitForSelector(this.locators.CreateFromScratch, { state: "visible" });
        await this.page.click(this.locators.CreateFromScratch);

        await this.page.waitForSelector(this.locators.SurveyNameField, { state: "visible" });
        await this.page.fill(this.locators.SurveyNameField, surveyName);

        await this.page.waitForSelector(this.locators.SurveyDescriptionField, { state: "visible" });
        await this.page.fill(this.locators.SurveyDescriptionField, surveyDescription);

        await this.page.waitForSelector(this.locators.SurveyCreateButton, { state: "visible" });
        await this.page.click(this.locators.SurveyCreateButton);

        // Verify toast message for survey initialization
        await this.verifyToastMessage(Survey_Initialized);
    }

    async addShortTextQuestion(questionText: string) {
        await this.page.waitForSelector(this.locators.CreateNewQuestionButton, { state: "visible" });
        await this.page.click(this.locators.CreateNewQuestionButton);

        await this.page.waitForSelector(this.locators.ShortTextQuestion, { state: "visible" });
        await this.page.click(this.locators.ShortTextQuestion);

        await this.page.waitForSelector(this.locators.EnterQuestionNameField, { state: "visible" });
        await this.page.fill(this.locators.EnterQuestionNameField, questionText);

        await this.page.waitForSelector(this.locators.SaveQuestionButton, { state: "visible" });
        await this.page.click(this.locators.SaveQuestionButton);

        // Verify toast message for question added
        await this.verifyToastMessage(Question_Added);
    }

    async addLongTextQuestion(questionText: string) {
        await this.page.waitForSelector(this.locators.CreateNewQuestionButton, { state: "visible" });
        await this.page.click(this.locators.CreateNewQuestionButton);

        await this.page.waitForSelector(this.locators.LongTextQuestion, { state: "visible" });
        await this.page.click(this.locators.LongTextQuestion);

        await this.page.waitForSelector(this.locators.EnterQuestionNameField, { state: "visible" });
        await this.page.fill(this.locators.EnterQuestionNameField, questionText);

        await this.page.waitForSelector(this.locators.SaveQuestionButton, { state: "visible" });
        await this.page.click(this.locators.SaveQuestionButton);

        // Verify toast message for question added
        await this.verifyToastMessage(Question_Added);
    }

    async configureAndPublishSurvey() {
        await this.page.waitForSelector(this.locators.ConfigurePublishButton, { state: "visible" });
        await this.page.click(this.locators.ConfigurePublishButton);

        await this.page.waitForSelector(this.locators.SelectAllEmployeesRadioButton, { state: "visible" });
        await this.page.click(this.locators.SelectAllEmployeesRadioButton);

        // Set start date
        await this.page.waitForSelector(this.locators.StartDateField, { state: "visible" });
        await this.page.click(this.locators.StartDateField);
        await this.page.waitForSelector(this.locators.CurrentDate, { state: "visible" });
        await this.page.click(this.locators.CurrentDate);

        // Set end date
        await this.page.waitForSelector(this.locators.EndDateField, { state: "visible" });
        await this.page.click(this.locators.EndDateField);
        await this.page.waitForSelector(this.locators.CurrentDate, { state: "visible" });
        await this.page.click(this.locators.CurrentDate);

        // Make survey anonymous and publish
        await this.page.waitForSelector(this.locators.MakeAnnonymousToggle, { state: "visible" });
        await this.page.click(this.locators.MakeAnnonymousToggle);

        await this.page.waitForSelector(this.locators.SurveyPublishButton, { state: "visible" });
        await this.page.click(this.locators.SurveyPublishButton);

        // Verify toast message for survey published
        await this.verifyToastMessage(Survey_published);
    }
    // Mark the current question as required/mandatory
async markQuestionAsRequired() {
    await this.page.waitForSelector(this.locators.SettingRequiredQuestion, { state: "visible" });
    await this.page.click(this.locators.SettingRequiredQuestion);
    // Optionally save the question if needed
    if (this.locators.SaveQuestionButton) {
        await this.page.waitForSelector(this.locators.SaveQuestionButton, { state: "visible" });
        await this.page.click(this.locators.SaveQuestionButton);
    }
}

// Set the maximum character limit for the current question
async setMaxCharacters(limit: number) {
    await this.page.waitForSelector(this.locators.SettingMaxCharacters, { state: "visible" });
    await this.page.click(this.locators.SettingMaxCharacters);
    await this.page.fill(this.locators.CharacterLimitField, limit.toString());
    // Optionally save the question if needed
    if (this.locators.SaveQuestionButton) {
        await this.page.waitForSelector(this.locators.SaveQuestionButton, { state: "visible" });
        await this.page.click(this.locators.SaveQuestionButton);
    }
}
    // Toggle anonymous setting for the current question or survey and save
async toggleAnonymousAndSave() {
    await this.page.waitForSelector(this.locators.MakeAnnonymousToggle, { state: "visible" });
    await this.page.click(this.locators.MakeAnnonymousToggle)
}

    async verifyToastMessage(expectedText: string) {
        const toast = this.page.locator(this.locators.ToastMessage);
        await expect(toast).toBeVisible({ timeout: 5000 });
        await expect(toast).toHaveText(expectedText);
    }
}
