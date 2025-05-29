import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { surveyLocators } from "../Locators/SurveyLocators";
import { TEST_SURVEY } from "../TestData/SurveyData";
import {
    Dashboard_URL,
    Question_Added,
    Question_Updated,
    Survey_Initialized,
    Survey_published,
    Survey_Submitted,
    Survey_URL,
} from "../config/constants";

export class SurveyPage extends BasePage {
    private readonly locators = surveyLocators;
   private surveyName: string | undefined;

    // Utility methods
    private async waitAndClick(selector: string) {
        await this.page.waitForSelector(selector, { state: "visible" });
        await this.page.click(selector);
    }

    private async waitAndFill(selector: string, value: string) {
        await this.page.waitForSelector(selector, { state: "visible" });
        await this.page.fill(selector, value);
    }

    async navigateToSurvey() {
        await this.page.goto(Survey_URL);
    }
    async navigateToDashboard() {
        await this.page.goto(Dashboard_URL);
    }

    async createSurveyFromScratch(surveyName: string, surveyDescription: string) {
        this.surveyName = surveyName; // Store the survey name
        console.log("Creating a new survey...");
        await this.waitAndClick(this.locators.NewSurveyButton);
        await this.waitAndClick(this.locators.CreateFromScratch);
        await this.waitAndFill(this.locators.SurveyNameField, surveyName);
        await this.waitAndFill(this.locators.SurveyDescriptionField, surveyDescription);
        await this.waitAndClick(this.locators.SurveyCreateButton);
        await this.verifyToastMessage(Survey_Initialized);
    }

    async addTextQuestion(type: "short" | "long") {
        console.log(`Adding a ${type} text question...`);
        await this.waitAndClick(this.locators.CreateNewQuestionButton);
        const questionTypeSelector =
            type === "short" ? this.locators.ShortTextQuestion : this.locators.LongTextQuestion;
        await this.waitAndClick(questionTypeSelector);
        
    }

    async addSpecialQuestion(type: "yesno" | "rating") {
        console.log(`Adding a ${type} question...`);
        await this.waitAndClick(this.locators.CreateNewQuestionButton);

        const questionTypeSelector = {
            yesno: this.locators.YesNoQuestion,
            rating: this.locators.RatingScaleQuestion,
        }[type];

        if (!questionTypeSelector) {
            throw new Error(`Unsupported question type: ${type}`);
        }

        await this.waitAndClick(questionTypeSelector);
    }

    async saveNewQuestion(questionText: string) {
        console.log("Saving a new question...");
        await this.waitAndFill(this.locators.EnterQuestionNameField, questionText);
        await this.waitAndClick(this.locators.SaveQuestionButton);
        await this.verifyToastMessage(Question_Added);
    }

    async updateExistingQuestion(updatedText: string) {
        console.log("Updating an existing question...");
        await this.waitAndFill(this.locators.EnterQuestionNameField, updatedText);
        await this.waitAndClick(this.locators.SaveQuestionButton);
        await this.verifyToastMessage(Question_Updated);
    }

    async markQuestionAsRequired() {
        console.log("Marking question as required...");
        await this.waitAndClick(this.locators.SettingRequiredQuestion);
    }

    async setMaxCharacters(limit: number) {
        console.log(`Setting max character limit to ${limit}...`);
        await this.waitAndClick(this.locators.SettingMaxCharacters);
        await this.waitAndFill(this.locators.CharacterLimitField, limit.toString());
    }

    async toggleAnonymousAndSave() {
        console.log("Toggling anonymous setting...");
        await this.waitAndClick(this.locators.MakeAnnonymousToggle);
    }

    async configureAndPublishSurvey({
        isAnonymous = true,
        startDate = "today",
        endDate = "today",
    }: {
        isAnonymous?: boolean;
        startDate?: string;
        endDate?: string;
    }) {
        console.log("Configuring and publishing survey...");
        await this.waitAndClick(this.locators.ConfigurePublishButton);
        await this.waitAndClick(this.locators.SelectAllEmployeesRadioButton);

        await this.waitAndClick(this.locators.StartDateField);
        await this.waitAndClick(this.locators.CurrentDate);

        await this.waitAndClick(this.locators.EndDateField);
        await this.waitAndClick(this.locators.CurrentDate);

        if (isAnonymous) {
            await this.waitAndClick(this.locators.MakeAnnonymousToggle);
        }

        await this.waitAndClick(this.locators.SurveyPublishButton);
        await this.verifyToastMessage(Survey_published);
    }

    async verifyToastMessage(expectedText: string) {
        const toast = this.page.locator(this.locators.ToastMessage);
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText(expectedText);
        //await this.page.waitForTimeout(5000); // Wait for toast to disappear
    }
    async takeSurvey() {
        if (!this.surveyName) {
            throw new Error("Survey name is not set. Please create or set the survey name before taking the survey.");
        }
        console.log(`Taking the survey: ${this.surveyName}...`);
        // Find the "Take Survey" button for the survey with the stored name
        const takeSurveyButton = this.page.locator(this.locators.TakeSurveyButton(this.surveyName));
        await takeSurveyButton.waitFor({ state: "visible", timeout: 5000 });
        await takeSurveyButton.click();

        await this.page.waitForTimeout(2000); // Wait for survey to load
        await this.waitAndClick(this.locators.ContinueSurveyButton);
        await this.page.waitForTimeout(2000); // Wait for continue button to be clickable
        await this.waitAndFill(this.locators.QuestionAnsInputField, "My answer");
        await this.waitAndClick(this.locators.ContinueSurveyButton); 
        await this.page.waitForTimeout(2000);
        await this.waitAndFill(this.locators.QuestionAnsInputField, "My answer");
        await this.waitAndClick(this.locators.ContinueSurveyButton); // Continue to next question
        await this.page.waitForTimeout(2000); // Wait for continue button to be clickable
        await this.waitAndClick(this.locators.YesAnswerButton); // Assuming a Yes/No question
        await this.waitAndClick(this.locators.ContinueSurveyButton);
        await this.waitAndClick(this.locators.RatingScaleStar); // Assuming a rating scale question
        // await this.waitAndClick(this.locators.ContinueSurveyButton);
        await this.waitAndClick(this.locators.SurveySubmitButton);
        await this.waitAndClick(this.locators.BackToKekaWallButton);
        console.log("Survey submitted successfully.");
        //await this.verifyToastMessage(Survey_Submitted);
        await this.page.context().close();
 
    }
    async CreateSurveyFromTemplate(templateTitle: string) {
    console.log(`Creating survey from template: ${templateTitle}...`);
    await this.waitAndClick(this.locators.NewSurveyButton);
    await this.waitAndClick(this.locators.CreateFromTemplate);
    // Wait for the template selection to be visible
    await this.page.waitForSelector(this.locators.SelectSurveyTemplate(templateTitle), { state: "visible", timeout: 5000 });
    const useTemplateBtn = this.page.locator(this.locators.SelectSurveyTemplate(templateTitle));
    await useTemplateBtn.waitFor({ state: "visible", timeout: 5000 });
    await useTemplateBtn.click();
    // Optionally, you can add more steps to fill in the survey name and description if needed
    // For example, if you want to set the survey name and description:
    await this.waitAndClick(this.locators.SurveyCreateButton);
    console.log(`Selected survey template: ${templateTitle}`);
}
}
