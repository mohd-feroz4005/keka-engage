// src/pages/kekaLoginPage.ts
import { BasePage } from './basePage';
import { expect } from '@playwright/test';
import { Anno_URL, BASE_URL, CREDENTIALS } from '../config/constants';
import { loginLocators } from '../Locators/Loginlocators';

export class KekaLoginPage extends BasePage {
  private readonly usernameField = 'input[name="UserName"]';
  private readonly passwordField = 'input[name="Password"]';
  private readonly captchaField = 'input[id="captcha"]';
  private readonly submitButton = '.btn.btn-primary';
  private readonly homeIcon = '.ki-home';
  private readonly userProfileDropdown = 'div[id="top-nav"] span.ki-chevron-down';
  private readonly tenantSelect = 'text=aarthiiiiiii';
  private readonly logoutButton = 'a[href="#/logout"]';
  private readonly kekaPasswordBtn = 'button[onclick*="KekaLogin"]';
  private readonly kekaLoginContainer = '.login-content [onclick*="KekaLogin"], .login-content [action*="KekaLogin"]';
  private readonly invoicePopup = 'div.modal-header'; // Modal container
  private readonly closeInvoiceButton = 'span.ki-close.align-self-center'; // Close button (X icon)

  async navigateToLogin() {
    await this.page.goto(BASE_URL);
    await this.verifyUrlContains('login');
  }

  async loginAsAdmin() {
    await this.login(CREDENTIALS.admin.username, CREDENTIALS.admin.password);
  }

  async loginAsEmployee() {
    await this.login(CREDENTIALS.employee.username, CREDENTIALS.employee.password);
  }

  private async login(username: string, password: string) {
    if (await this.page.locator(this.kekaPasswordBtn).isVisible()) {
      await this.page.click(this.kekaPasswordBtn);
    }
    await this.page.fill(this.usernameField, username);
    await this.page.click(this.submitButton)
    await this.page.fill(this.passwordField, password);
    await this.addHiddenCaptchaBypass();
    await this.page.fill(this.captchaField, '12345');
    await this.page.click(this.submitButton);
    await this.page.click(this.tenantSelect);
   // await this.page.locator(this.invoicePopup).isVisible();
    //await this.page.locator(this.closeInvoiceButton).click();
    //await this.waitForNetworkIdle();
    if (await this.page.locator(this.homeIcon).isVisible()) {
      await this.page.goto(Anno_URL)
    }
  }

  async logout() {
    await this.waitForNetworkIdle();
    await this.page.click(this.userProfileDropdown);
    await this.page.click(this.logoutButton);
    await this.waitForNetworkIdle();
    await this.page.reload();
  }

  private async addHiddenCaptchaBypass() {
    await this.page.evaluate(() => {
      const targetElements = document.getElementsByClassName('login-form');
      if (targetElements.length > 0) {
        const targetElement = targetElements[0] as HTMLElement;
        const newElement = document.createElement('div');
        newElement.innerHTML = `
          <div class="form-floating mt-10">
            <input type="hidden" class="form-control" id="aWdub3JlY2FwdGNoYQ=="
              value="true" name="aWdub3JlY2FwdGNoYQ==">
          </div>
        `;
        targetElement.appendChild(newElement.firstElementChild!);
      } else {
        console.error('Target element not found');
      }
    });
  }
}
