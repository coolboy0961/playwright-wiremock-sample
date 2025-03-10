import { test, expect, type Page } from "@playwright/test";
import { WrapperPage } from "../pages/wrapper-page";
import { ApiRouter } from "../../utils/api-router";
import { WireMockRestClient } from "wiremock-rest-client";
import { WireMockClientUtil } from "../../utils/wiremock-client";

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

test.describe("Scan", () => {
  const baseUrl = "http://localhost:4200";
  let wireMock: WireMockRestClient;

  test.beforeEach(async ({ page }, testInfo) => {
    // パラレル番号に基づいてAPIリクエストをリダイレクト
    console.log(`testInfo.parallelIndex: ${testInfo.parallelIndex}`);
    await ApiRouter.setupApiRedirect(page, testInfo.parallelIndex);
  
    // WireMockクライアントを生成
    wireMock = WireMockClientUtil.createClient(testInfo.parallelIndex);
    await wireMock.mappings.resetAllMappings();
    
    const wrapperPage = new WrapperPage(page, baseUrl);
    await wrapperPage.goto();
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock21!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping21.json')  
    const expectedApiResponse = "Hello, WireMock21!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock22!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping22.json')  
    const expectedApiResponse = "Hello, WireMock22!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock23!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping23.json')  
    const expectedApiResponse = "Hello, WireMock23!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock24!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping24.json')  
    const expectedApiResponse = "Hello, WireMock24!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock25!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping25.json')  
    const expectedApiResponse = "Hello, WireMock25!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock26!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping26.json')  
    const expectedApiResponse = "Hello, WireMock26!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock27!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping27.json')  
    const expectedApiResponse = "Hello, WireMock27!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock28!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping28.json')  
    const expectedApiResponse = "Hello, WireMock28!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock29!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping29.json')  
    const expectedApiResponse = "Hello, WireMock29!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock30!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping30.json')  
    const expectedApiResponse = "Hello, WireMock30!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });
});
