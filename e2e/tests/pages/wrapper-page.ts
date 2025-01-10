import { type Page } from '@playwright/test';
import { TodoPage } from './todo-page';

export class WrapperPage {
  readonly page: Page;
  readonly todoPage: TodoPage;

  constructor(page: Page) {
    this.page = page;
    this.todoPage = new TodoPage(page);
  }

  async goto() {
    await this.todoPage.goto();
  }
}