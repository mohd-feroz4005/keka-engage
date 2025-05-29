function randomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomQuestion(prefix: string): string {
    return `${prefix} ${randomString(8)}?`;
}

function randomSurveyName(): string {
    return `Survey ${randomString(5)}`;
}

function randomSurveyDescription(): string {
    return `Description: ${randomString(20)}`;
}

export const TEST_SURVEY = {
    shortTextQuestion: randomQuestion("Short text question"),
    longTextQuestion: randomQuestion("Long text question"),
    multiSelectQuestion: randomQuestion("Multi-select question"),
    yesNoQuestion: randomQuestion("Yes/No question"),
    ratingScaleQuestion: randomQuestion("Rating scale question"),
    singleChoiceQuestion: randomQuestion("Single choice question"),
    surveyName: randomSurveyName(),
    surveyDescription: randomSurveyDescription(),
};
