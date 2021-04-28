import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class DeckTests {
    // Test case: create deck with empty input
    // Precondition: must be signed in
    public static boolean testEmptyInput(WebDriver driver) {
        // go to deck page
        System.out.println("Testing deck creation with empty input...");
        driver.get("http://localhost:3000");

        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        assert profileButton != null;
        profileButton.click();

        WebElement deckButton = TestUtils.getElementByXPath(driver, "//*[text()='My decks']");
        assert deckButton != null;
        deckButton.click();

        // create deck
        WebElement createButton = TestUtils.getElementByXPath(driver, "//*[text()='Create']");
        assert createButton != null;
        createButton.click();

        // save deck
        WebElement saveButton = TestUtils.getElementByXPath(driver, "//*[@value='Save']");
        assert saveButton != null;
        saveButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[2]/div/div[2]/form/div");
        String expected = "Name is not valid";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: create deck with valid input
    // Precondition: must be signed in
    public static boolean testValidInput(WebDriver driver) {
        // go to deck page
        System.out.println("Testing deck creation with valid input...");
        driver.get("http://localhost:3000");

        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        assert profileButton != null;
        profileButton.click();

        WebElement deckButton = TestUtils.getElementByXPath(driver, "//*[text()='My decks']");
        assert deckButton != null;
        deckButton.click();

        // create deck
        WebElement createButton = TestUtils.getElementByXPath(driver, "//*[text()='Create']");
        assert createButton != null;
        createButton.click();

        WebElement deckNameField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[2]/div/div[2]/form/div/input");
        assert deckNameField != null;
        deckNameField.sendKeys("Test Deck");

        // save deck
        WebElement saveButton = TestUtils.getElementByXPath(driver, "//*[@value='Save']");
        assert saveButton != null;
        saveButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[text()='Test Deck']");
        if(e != null) {
            System.out.println("Found created deck\nTest case passed\n");
            return true;
        }
        else {
            System.out.println("Unable to find created deck\nTest case failed\n");
            return false;
        }
    }
}
