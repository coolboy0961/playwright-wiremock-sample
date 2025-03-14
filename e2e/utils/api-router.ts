import { Page } from '@playwright/test';
import { getPortForParallel } from './port-mappings';

export class ApiRouter {
  /**
   * パラレル実行のインデックスに基づいてAPIリクエストをリダイレクトするように設定
   * @param page Playwrightのページオブジェクト
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   */
  static async setupApiRedirect(page: Page, parallelIndex: number): Promise<void> {
    const targetPort = getPortForParallel(parallelIndex);

    await page.route('http://localhost:4200/api/**', async route => {
      const url = route.request().url();
      const newUrl = url.replace('localhost:4200', `localhost:${targetPort}`);
      console.log(`Redirecting request from ${url} to ${newUrl}`);
      await route.continue({
        url: newUrl,
      });
    });
  }
} 