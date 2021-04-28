import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestUtils {
    public static final String TEST_NAME = "Test User";
    public static final String TEST_EMAIL = "testuser@gmail.com";
    public static final String TEST_PASSWORD = "123456789";

    public static final int TIMEOUT = 2; // number of seconds before timing out

    public static boolean testStrings(String expected, String actual) {
        System.out.println("Expected: " + expected + "\nActual: " + actual);
        if(expected.equals(actual)) {
            System.out.println("Test case passed\n");
        } else {
            System.out.println("Test case failed\n");
        }
        return expected.equals(actual);
    }

    public static WebElement getElementByXPath(WebDriver driver, String testXPath) {
        try {
            return (new WebDriverWait(driver, TIMEOUT)).until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath(testXPath)));
        } catch(TimeoutException timeoutException) {
            return null;
        }
    }

    // If driver is logged in, then sigh out
    public static void signOut(WebDriver driver) {
        driver.get("http://localhost:3000");
        WebElement profileButton = TestUtils.getElementByXPath(driver, "//*[text()='My Profile']");
        if (profileButton != null) {
            profileButton.click();
            WebElement signOutButton = TestUtils.getElementByXPath(driver, "//*[text()='Sign out']");
            assert signOutButton != null;
            signOutButton.click();
        }

    }
}
