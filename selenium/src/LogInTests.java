import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LogInTests {
    // Test case: user log in with empty input
    public static boolean testEmptyInput(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with empty input...");
        driver.get("http://localhost:3000/login");

        // submit log in button
        WebElement logInButton = TestUtils.getElementByXPath(driver, "//*[@value='Log in']");
        assert logInButton != null;
        logInButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Email or password is not present";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with short password length
    public static boolean testShortPassword(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with short password length...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert emailField != null;
        emailField.sendKeys(TestUtils.TEST_EMAIL);

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert passwordField != null;
        passwordField.sendKeys("1");

        // submit log in button
        WebElement logInButton = TestUtils.getElementByXPath(driver, "//*[@value='Log in']");
        assert logInButton != null;
        logInButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Password must be at least 9 characters long";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with an invalid email address
    public static boolean testInvalidEmail(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with invalid email...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert emailField != null;
        emailField.sendKeys("testuser");

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert passwordField != null;
        passwordField.sendKeys(TestUtils.TEST_PASSWORD);

        // submit log in button
        WebElement logInButton = TestUtils.getElementByXPath(driver, "//*[@value='Log in']");
        assert logInButton != null;
        logInButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Email is invalid";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with incorrect password
    public static boolean testIncorrectPassword(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with incorrect password...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert emailField != null;
        emailField.sendKeys(TestUtils.TEST_EMAIL);

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert passwordField != null;
        passwordField.sendKeys("1234567890");

        // submit log in button
        WebElement logInButton = TestUtils.getElementByXPath(driver, "//*[@value='Log in']");
        assert logInButton != null;
        logInButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Email or password is incorrect";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with valid input
    // Precondition: account must already be registered
    public static boolean testValidInput(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with valid input...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert emailField != null;
        emailField.sendKeys(TestUtils.TEST_EMAIL);

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert passwordField != null;
        passwordField.sendKeys(TestUtils.TEST_PASSWORD);

        // submit log in button
        WebElement logInButton = TestUtils.getElementByXPath(driver, "//*[@value='Log in']");
        assert logInButton != null;
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/nav/ul/li/a");
        if(e == null) {
            System.out.println("Test case failed\n");
            return false;
        }
        String expected = "MY PROFILE";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }
}
