import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SignUpTests {
    // Test case: user sign up with empty input
    public static boolean testEmptyInput(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with empty input...");
        driver.get("http://localhost:3000/signup");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Name is not valid";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with short password length
    public static boolean testShortPassword(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with short password length...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        nameField.sendKeys("Test User");
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[3]/input")));
        passwordField.sendKeys("1");
        WebElement confirmPasswordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[4]/input")));
        confirmPasswordField.sendKeys("1");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Password must be at least 9 characters long";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with an invalid email address
    public static boolean testInvalidEmail(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with invalid email...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        nameField.sendKeys("Test User");
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        emailField.sendKeys("testuser");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[3]/input")));
        passwordField.sendKeys("123456789");
        WebElement confirmPasswordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[4]/input")));
        confirmPasswordField.sendKeys("123456789");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Email is invalid";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with valid input
    // Precondition: account must not already be registered
    public static boolean testValidInput(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with valid input...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        nameField.sendKeys("Test User");
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[3]/input")));
        passwordField.sendKeys("123456789");
        WebElement confirmPasswordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[4]/input")));
        confirmPasswordField.sendKeys("123456789");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/nav/ul/li/a");
        if(e == null) return false;
        String expected = "MY PROFILE";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user sign up with already registered email address
    // Precondition: account must already be registered
    public static boolean testAlreadyRegisteredEmail(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with already registered email...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        nameField.sendKeys("Test User");
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[3]/input")));
        passwordField.sendKeys("123456789");
        WebElement confirmPasswordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[4]/input")));
        confirmPasswordField.sendKeys("123456789");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Email is already in use";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }
}
