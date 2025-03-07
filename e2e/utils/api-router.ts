import { Page } from '@playwright/test';

export class ApiRouter {
  private static readonly PORT_MAPPINGS = {
    1: '8080',
    2: '8081',
    3: '8082'
  };

  /**
   * ワーカー番号に基づいてAPIリクエストをリダイレクトするように設定
   * @param page Playwrightのページオブジェクト
   * @param workerIndex ワーカーのインデックス（1から開始）
   */
  static async setupApiRedirect(page: Page, workerIndex: number): Promise<void> {
    const targetPort = this.PORT_MAPPINGS[workerIndex as keyof typeof ApiRouter.PORT_MAPPINGS];
    
    if (!targetPort) {
      throw new Error(`Invalid worker index: ${workerIndex}. Valid indices are: ${Object.keys(this.PORT_MAPPINGS).join(', ')}`);
    }

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
  static getPortForWorker(workerIndex: number): string {
    const port = this.PORT_MAPPINGS[workerIndex as keyof typeof ApiRouter.PORT_MAPPINGS];
    if (!port) {
      throw new Error(`Invalid worker index: ${workerIndex}. Valid indices are: ${Object.keys(this.PORT_MAPPINGS).join(', ')}`);
    }
    return port;
  }
} 