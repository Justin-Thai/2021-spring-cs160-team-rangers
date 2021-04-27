import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class CardTests {
    // Test case: create card with empty input
    // Precondition: must be signed in, deck must have been created
    public static boolean testEmptyInput(WebDriver driver) {
        // go to card page
        System.out.println("Testing card creation with invalid input...");
        driver.get("http://localhost:3000");

        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        assert profileButton != null;
        profileButton.click();

        WebElement deckButton = TestUtils.getElementByXPath(driver, "//*[text()='My decks']");
        assert deckButton != null;
        deckButton.click();

        WebElement deck = TestUtils.getElementByXPath(driver, "//*[text()='Test Deck']");
        assert deck != null;
        deck.click();

        // create card
        WebElement createButton = TestUtils.getElementByXPath(driver, "//*[text()='Create']");
        assert createButton != null;
        createButton.click();

        // save card
        WebElement saveButton = TestUtils.getElementByXPath(driver, "//*[text()='Save']");
        assert saveButton != null;
        saveButton.click();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[2]/div/div[2]/div[1]");
        String expected = "Front side is not valid";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: create card with valid input
    // Precondition: must be signed in, deck must have been created
    public static boolean testValidInput(WebDriver driver) {
        // go to card page
        System.out.println("Testing card creation with valid input...");
        driver.get("http://localhost:3000");

        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        assert profileButton != null;
        profileButton.click();

        WebElement deckButton = TestUtils.getElementByXPath(driver, "//*[text()='My decks']");
        assert deckButton != null;
        deckButton.click();

        WebElement deck = TestUtils.getElementByXPath(driver, "//*[text()='Test Deck']");
        assert deck != null;
        deck.click();

        // create card
        WebElement createButton = TestUtils.getElementByXPath(driver, "//*[text()='Create']");
        assert createButton != null;
        createButton.click();

        WebElement frontSideField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[2]/div/div[2]/div[1]/input");
        assert frontSideField != null;
        frontSideField.sendKeys("Test Front Side");

        WebElement backSideField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[2]/div/div[2]/div[2]/div/div/div[2]/div[1]");
        assert backSideField != null;
        backSideField.sendKeys("Test Back Side");

        // save card
        WebElement saveButton = TestUtils.getElementByXPath(driver, "//*[text()='Save']");
        assert saveButton != null;
        saveButton.click();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[text()='Test Front Side']");
        if(e != null) {
            System.out.println("Found created card\nTest case passed\n");
            return true;
        }
        else {
            System.out.println("Unable to find created card\nTest case failed\n");
            return false;
        }
    }
}
