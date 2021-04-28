import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SignUpTests {
    // Test case: user sign up with empty input
    public static boolean testEmptyInput(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with empty input...");
        driver.get("http://localhost:3000/signup");

        // submit sign up button
        WebElement signUpButton = TestUtils.getElementByXPath(driver, "//*[@value='Sign up']");
        assert signUpButton != null;
        signUpButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Name is not valid";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with short password length
    public static boolean testShortPassword(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with short password length...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert nameField != null;
        nameField.sendKeys(TestUtils.TEST_NAME);

        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert emailField != null;
        emailField.sendKeys(TestUtils.TEST_EMAIL);

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[3]/input");
        assert passwordField != null;
        passwordField.sendKeys("1");

        WebElement confirmPasswordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[4]/input");
        assert confirmPasswordField != null;
        confirmPasswordField.sendKeys("1");

        // submit sign up button
        WebElement signUpButton = TestUtils.getElementByXPath(driver, "//*[@value='Sign up']");
        assert signUpButton != null;
        signUpButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Password must be at least 9 characters long";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with an invalid email address
    public static boolean testInvalidEmail(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with invalid email...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert nameField != null;
        nameField.sendKeys(TestUtils.TEST_NAME);

        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert emailField != null;
        emailField.sendKeys("testuser");

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[3]/input");
        assert passwordField != null;
        passwordField.sendKeys(TestUtils.TEST_PASSWORD);

        WebElement confirmPasswordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[4]/input");
        assert confirmPasswordField != null;
        confirmPasswordField.sendKeys(TestUtils.TEST_PASSWORD);

        // submit sign up button
        WebElement signUpButton = TestUtils.getElementByXPath(driver, "//*[@value='Sign up']");
        assert signUpButton != null;
        signUpButton.submit();

        // evaluate response
        WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        String expected = "Email is invalid";
        assert errorMessage != null;
        String actual = errorMessage.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with valid input
    public static boolean testValidInput(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with valid input...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[1]/input");
        assert nameField != null;
        nameField.sendKeys(TestUtils.TEST_NAME);

        WebElement emailField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[2]/input");
        assert emailField != null;
        emailField.sendKeys(TestUtils.TEST_EMAIL);

        WebElement passwordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[3]/input");
        assert passwordField != null;
        passwordField.sendKeys(TestUtils.TEST_PASSWORD);

        WebElement confirmPasswordField = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/div[4]/input");
        assert confirmPasswordField != null;
        confirmPasswordField.sendKeys(TestUtils.TEST_PASSWORD);

        // submit sign up button
        WebElement signUpButton = TestUtils.getElementByXPath(driver, "//*[@value='Sign up']");
        assert signUpButton != null;
        signUpButton.submit();

        // evaluate response
        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        if(profileButton == null) {
            // account has already been registered
            WebElement errorMessage = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
            if(errorMessage == null) {
                System.out.println("Test case failed");
                return false;
            }
            String expected = "Email is already in use";
            String actual = errorMessage.getText();
            return TestUtils.testStrings(expected, actual);
        }
        String expected = "MY PROFILE";
        String actual = profileButton.getText();
        return TestUtils.testStrings(expected, actual);
    }
}
