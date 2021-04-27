import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LogInTests {
    // Test case: user log in with empty input
    public static boolean testEmptyInput(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with empty input...");
        driver.get("http://localhost:3000/login");

        // submit log in button
        WebElement logInButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Email or password is not present";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with short password length
    public static boolean testShortPassword(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with short password length...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        passwordField.sendKeys("1");

        // submit log in button
        WebElement logInButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Password must be at least 9 characters long";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with an invalid email address
    public static boolean testInvalidEmail(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with invalid email...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        emailField.sendKeys("testuser");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        passwordField.sendKeys("123456789");

        // submit log in button
        WebElement logInButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Email is invalid";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with incorrect password
    public static boolean testIncorrectPassword(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with incorrect password...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        passwordField.sendKeys("1234567890");

        // submit log in button
        WebElement logInButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/div/div[1]/form/h4");
        if(e == null) return false;
        String expected = "Email or password is incorrect";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }

    // Test case: user log in with valid input
    // Precondition: account must already be registered
    public static boolean testValidInput(WebDriver driver) {
        // go to log in page
        System.out.println("Testing log in with valid input...");
        driver.get("http://localhost:3000/login");

        // enter input
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        emailField.sendKeys("testuser@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        passwordField.sendKeys("123456789");

        // submit log in button
        WebElement logInButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        logInButton.submit();

        // evaluate response
        WebElement e = TestUtils.getElementByXPath(driver, "//*[@id=\"root\"]/nav/ul/li/a");
        if(e == null) return false;
        String expected = "MY PROFILE";
        String actual = e.getText();
        return TestUtils.testStrings(expected, actual);
    }
}
