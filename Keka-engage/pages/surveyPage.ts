import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { surveyLocators } from "../Locators/SurveyLocators";
import { TEST_SURVEY } from "../TestData/SurveyData";
import {
    Question_Added,
    Survey_Initialized,
    Survey_published,
    Survey_URL,
} from "../config/constants";

export class SurveyPage extends BasePage {
    private readonly locators = surveyLocators;

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

    async createSurveyFromScratch(surveyName: string, surveyDescription: string) {
        console.log("Creating a new survey...");
        await this.waitAndClick(this.locators.NewSurveyButton);
        await this.waitAndClick(this.locators.CreateFromScratch);
        await this.waitAndFill(this.locators.SurveyNameField, surveyName);
        await this.waitAndFill(this.locators.SurveyDescriptionField, surveyDescription);
        await this.waitAndClick(this.locators.SurveyCreateButton);
        await this.verifyToastMessage(Survey_Initialized);
    }

    async addTextQuestion(type: "short" | "long", questionText: string) {
        console.log(`Adding a ${type} text question...`);
        await this.waitAndClick(this.locators.CreateNewQuestionButton);
        const questionTypeSelector =
            type === "short" ? this.locators.ShortTextQuestion : this.locators.LongTextQuestion;
        await this.waitAndClick(questionTypeSelector);
        await this.waitAndFill(this.locators.EnterQuestionNameField, questionText);
        await this.waitAndClick(this.locators.SaveQuestionButton);
        await this.verifyToastMessage(Question_Added);
    }
    async addSpecialQuestion(type: "yesno" | "rating", questionText: string) {
        await this.waitAndClick(this.locators.CreateNewQuestionButton);

        const questionTypeSelector = {
            yesno: this.locators.YesNoQuestion,
            rating: this.locators.RatingScaleQuestion,
        }[type];

        if (!questionTypeSelector) {
            throw new Error(`Unsupported question type: ${type}`);
        }

        await this.waitAndClick(questionTypeSelector);
        await this.waitAndFill(this.locators.EnterQuestionNameField, questionText);
        await this.waitAndClick(this.locators.SaveQuestionButton);
        await this.verifyToastMessage(Question_Added);
    }


    async markQuestionAsRequired() {
        console.log("Marking question as required...");
        await this.waitAndClick(this.locators.SettingRequiredQuestion);
        if (this.locators.SaveQuestionButton) {
            await this.waitAndClick(this.locators.SaveQuestionButton);
        }
    }

    async setMaxCharacters(limit: number) {
        console.log(`Setting max character limit to ${limit}...`);
        await this.waitAndClick(this.locators.SettingMaxCharacters);
        await this.waitAndFill(this.locators.CharacterLimitField, limit.toString());
        if (this.locators.SaveQuestionButton) {
            await this.waitAndClick(this.locators.SaveQuestionButton);
        }
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
        await this.waitAndClick(this.locators.CurrentDate); // Replace with dynamic date logic if needed

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
        await expect(toast).toBeVisible({ timeout: 5000 });
        await expect(toast).toHaveText(expectedText);
    }
}
