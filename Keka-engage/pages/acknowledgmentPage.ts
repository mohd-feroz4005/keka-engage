// src/pages/acknowledgmentPage.ts
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class AcknowledgmentPage extends BasePage {
  private readonly ackButton = 'button:has-text("Acknowledge")';
  private readonly ackStatus = 'text="Acknowledged"';
  private readonly ackList = 'div.acknowledgment-list';

  async acknowledgeAnnouncement(title: string) {
    await this.page.click(`text=${title}`);
    await this.page.click(this.ackButton);
    await expect(this.page.locator(this.ackStatus)).toBeVisible();
  }

  async verifyAcknowledgment(user: string) {
    await this.page.click('text=View Acknowledgments');
    await expect(this.page.locator(this.ackList)).toContainText(user);
  }
}