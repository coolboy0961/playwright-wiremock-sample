import { Page } from '@playwright/test';
import { PORT_MAPPINGS, ParallelIndex } from './port-mappings';

export class ApiRouter {
  /**
   * パラレル実行のインデックスに基づいてAPIリクエストをリダイレクトするように設定
   * @param page Playwrightのページオブジェクト
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   */
  static async setupApiRedirect(page: Page, parallelIndex: number): Promise<void> {
    const targetPort = this.getPortForParallel(parallelIndex);

    await page.route('http://localhost:4200/api/**', async route => {
      const url = route.request().url();
      const newUrl = url.replace('localhost:4200', `localhost:${targetPort}`);
      console.log(`Redirecting request from ${url} to ${newUrl}`);
      await route.continue({
        url: newUrl,
      });
    });
  }

  /**
   * パラレル実行のインデックスに対応するポート番号を取得
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   * @returns ポート番号
   */
  private static getPortForParallel(parallelIndex: number): string {
    const port = PORT_MAPPINGS[parallelIndex as ParallelIndex];
    if (!port) {
      throw new Error(`Invalid parallel index: ${parallelIndex}. Valid indices are: ${Object.keys(PORT_MAPPINGS).join(', ')}`);
    }
    return port;
  }
} 