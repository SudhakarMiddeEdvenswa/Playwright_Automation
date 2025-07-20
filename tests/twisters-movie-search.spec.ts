import { test, expect } from "@playwright/test";

test.describe("Movie Search - Twisters", () => {
  test("should search for TWISTERS, verify it appears in results, and take screenshot", async ({
    page,
  }) => {
    // Step 1: Navigate to the movies app
    await page.goto("https://debs-obrien.github.io/playwright-movies-app");

    // Verify page loaded correctly
    await expect(page).toHaveTitle("Popular Movies");

    // Step 2: Search for 'TWISTERS'
    // Click on the search input to activate it
    await page.getByRole("search").click();

    // Type the search term and submit
    const searchInput = page.getByRole("textbox", { name: "Search Input" });
    await searchInput.fill("TWISTERS");
    await searchInput.press("Enter");

    // Step 3: Wait for search results page and verify it loaded
    await page.waitForURL("**/search?searchTerm=TWISTERS*");
    await expect(page).toHaveTitle("TWISTERS - Search Results");

    // Verify search results page content
    await expect(
      page.getByRole("heading", { name: "TWISTERS", level: 1 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "search results" })
    ).toBeVisible();

    // Step 4: Verify the movie "Twisters" is in the search results
    const twistersMovie = page.getByRole("link", {
      name: /poster of Twisters/i,
    });
    await expect(twistersMovie).toBeVisible();

    // Verify the movie title heading
    const movieTitle = page.getByRole("heading", {
      name: "Twisters",
      level: 2,
    });
    await expect(movieTitle).toBeVisible();

    // Step 5: Take screenshot of the search results page since the movie exists
    const posterImage = page.getByRole("img", { name: /poster of Twisters/i });
    await expect(posterImage).toBeVisible();

    // Take a full page screenshot showing the search results
    await page.screenshot({
      path: "test-results/twisters-search-results.png",
      fullPage: true,
    });

    // Log success message
    console.log("✅ Test completed successfully:");
    console.log("  - Navigated to the movies app");
    console.log('  - Searched for "TWISTERS"');
    console.log('  - Verified "Twisters" movie appears in search results');
    console.log("  - Screenshot taken of the search results page");
  });
});
