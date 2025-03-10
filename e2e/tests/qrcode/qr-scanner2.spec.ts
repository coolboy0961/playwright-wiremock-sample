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

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock11!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping11.json')  
    const expectedApiResponse = "Hello, WireMock11!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock12!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping12.json')  
    const expectedApiResponse = "Hello, WireMock12!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock13!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping13.json')  
    const expectedApiResponse = "Hello, WireMock13!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock14!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping14.json')  
    const expectedApiResponse = "Hello, WireMock14!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock15!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping15.json')  
    const expectedApiResponse = "Hello, WireMock15!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock16!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping16.json')  
    const expectedApiResponse = "Hello, WireMock16!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock17!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping17.json')  
    const expectedApiResponse = "Hello, WireMock17!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock18!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping18.json')  
    const expectedApiResponse = "Hello, WireMock18!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock19!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping19.json')  
    const expectedApiResponse = "Hello, WireMock19!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock20!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping20.json')  
    const expectedApiResponse = "Hello, WireMock20!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });
});
