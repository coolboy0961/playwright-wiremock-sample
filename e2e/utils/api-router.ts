import { Page } from '@playwright/test';
import { PORT_MAPPINGS, WorkerIndex } from './port-mappings';

export class ApiRouter {
  /**
   * ワーカー番号に基づいてAPIリクエストをリダイレクトするように設定
   * @param page Playwrightのページオブジェクト
   * @param workerIndex ワーカーのインデックス（1から開始）
   */
  static async setupApiRedirect(page: Page, workerIndex: number): Promise<void> {
    const targetPort = this.getPortForWorker(workerIndex);

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
   * ワーカー番号に対応するポート番号を取得
   * @param workerIndex ワーカーのインデックス（1から開始）
   * @returns ポート番号
   */
  private static getPortForWorker(workerIndex: number): string {
    const port = PORT_MAPPINGS[workerIndex as WorkerIndex];
    if (!port) {
      throw new Error(`Invalid worker index: ${workerIndex}. Valid indices are: ${Object.keys(PORT_MAPPINGS).join(', ')}`);
    }
    return port;
  }
} 