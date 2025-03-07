import { WireMockRestClient } from 'wiremock-rest-client';
import { PORT_MAPPINGS, WorkerIndex } from './port-mappings';

export class WireMockClientUtil {
  /**
   * ワーカー番号に基づいてWireMockクライアントを生成
   * @param workerIndex ワーカーのインデックス（1から開始）
   * @returns WireMockRestClientのインスタンス
   */
  static createClient(workerIndex: number): WireMockRestClient {
    const port = this.getPortForWorker(workerIndex);
    return new WireMockRestClient(`http://localhost:${port}`);
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