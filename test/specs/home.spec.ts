
describe('DemoBlaze - Home Page', () => {

    // TEST 1: Verify that the home page opens successfully
    it('should open the home page successfully', async () => {

        // Step 1: Navigate to the home page
        await browser.url('/index.html');

        // Step 2: Verify that the URL is correct
        await expect(browser).toHaveUrl(
            'https://www.demoblaze.com/index.html'
        );

        // Step 3: Verify that the logo is displayed
        await expect($('#nava')).toBeDisplayed();

        // Step 4: Verify that the navigation menu is displayed
        await expect($('#navbarExample')).toBeDisplayed();

        // Step 5: Verify that the products container is displayed
        await expect($('#tbodyid')).toBeDisplayed();

    });


    // TEST 2: Verify that the Home button is displayed
    it('should display Home button', async () => {

        // Step 1: Navigate to the home page
        await browser.url('/index.html');

        // Step 2: Find the Home button
        const homeButton = $('a=Home');

        // Step 3: Verify that the Home button is displayed
        await expect(homeButton).toBeDisplayed();

    });

});
