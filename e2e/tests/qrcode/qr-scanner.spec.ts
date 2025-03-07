import { test, expect, type Page } from "@playwright/test";
import { WrapperPage } from "../pages/wrapper-page";

const baseUrl = "http://localhost:4200";

test.beforeEach(async ({ page }) => {
  const wrapperPage = new WrapperPage(page, baseUrl);
  await wrapperPage.goto();
});

test.use({
  launchOptions: {
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      // 画面録画で作った画像ファイルをffmpegでmjpegに変換したものを使う必要がある
      // ffmpeg -i qrcode.mov -vcodec mjpeg -q:v 2 -an qrcode.mjpeg
      "--use-file-for-fake-video-capture=tests/qrcode/qrcode.mjpeg",
    ],
  },
});

test.describe.only("Scan", () => {
  test("QRコードスキャナーでスキャンしたテキストが表示されているか確認", async ({
    page,
  }) => {
    // Arrange
    const expectedScanedText = "https://www.google.com"

    // Act
    // 自動的にスキャンが始まるため、何もしない

    // Assert
    // 「QRコードスキャナー」のテキストが表示されているか確認
    await expect(page.getByText("QRコードスキャナー")).toBeVisible();
    const expectedCameraCountText = "利用可能なカメラデバイスの数: 1";
    await expect(page.getByText(expectedCameraCountText)).toBeVisible();
    // スキャンしたテキストが表示されているか確認
    await expect(page.getByText(expectedScanedText)).toBeVisible({ timeout: 30000 });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock!が表示される", async ({
    page,
  }) => {
    // Arrange
    // APIレスポンスをモック
    await page.route('**/api/example', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Hello, Wiremock!' })
      });
    });

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText('Hello, Wiremock!', {
      timeout: 10000
    });
  });
});
