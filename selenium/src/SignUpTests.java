import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SignUpTests {
    // Test case: user sign up with insufficient password length
    public static boolean testShortPassword(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with insufficient password length...");
        driver.get("http://localhost:3000/signup");

        // enter input
        WebElement nameField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[1]/input")));
        nameField.sendKeys("User1");
        WebElement emailField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[2]/input")));
        emailField.sendKeys("user1@gmail.com");
        WebElement passwordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[3]/input")));
        passwordField.sendKeys("a");
        WebElement confirmPasswordField = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/div[4]/input")));
        confirmPasswordField.sendKeys("a");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/h4")));
        String expectedResponse = "Password must be at least 9 characters long";
        String actualResponse = e.getText();
        return TestUtils.testStrings(expectedResponse, actualResponse);
    }


    // Test case: user sign up with empty input
    public static boolean testEmptyInput(WebDriver driver) {
        // go to sign up page
        System.out.println("Testing sign up with empty input...");
        driver.get("http://localhost:3000/signup");

        // submit sign up button
        WebElement signUpButton = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/input")));
        signUpButton.submit();

        // evaluate response
        WebElement e = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[1]/form/h4")));
        String expectedResponse = "Name is not valid";
        String actualResponse = e.getText();
        return TestUtils.testStrings(expectedResponse, actualResponse);
    }
// TO-DO
//    // Test case: user sign up with an invalid email address
//    public static boolean testInvalidEmail(WebDriver driver) {
//
//    }
//    // Test case: user sign up with already registered email address
//    public static boolean testAlreadyRegisteredEmail(WebDriver driver) {
//
//    }
//    // Test case: user sign up with all valid inputs
//    public static boolean testValidInput(WebDriver driver) {
//
//    }
}
