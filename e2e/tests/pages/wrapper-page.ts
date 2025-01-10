import { type Page } from '@playwright/test';
import { TodoPage } from './todo-page';

export class WrapperPage {
  readonly page: Page;
  readonly todoPage: TodoPage;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.todoPage = new TodoPage(page, baseUrl);
  }

  async goto() {
    await this.todoPage.goto();
  }
}