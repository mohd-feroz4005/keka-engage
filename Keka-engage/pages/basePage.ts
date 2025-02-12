// src/pages/basePage.ts
import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }

  async verifyUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text, "i"));
  }
}
