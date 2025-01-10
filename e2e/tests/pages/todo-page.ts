import { type Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/todomvc`);
  }
}