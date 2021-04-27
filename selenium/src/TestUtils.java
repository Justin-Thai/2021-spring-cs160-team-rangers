import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestUtils {
    public static boolean testStrings(String expected, String actual) {
        System.out.println("Expected: " + expected);
        System.out.println("Actual: " + actual);
        if(expected.equals(actual)) {
            System.out.println("Test case passed\n");
        } else {
            System.out.println("Test case failed\n");
        }
        return expected.equals(actual);
    }

    public static WebElement getElementByXPath(WebDriver driver, String testXPath) {
        try {
            return (new WebDriverWait(driver, 5)).until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath(testXPath)));
        } catch(TimeoutException e) {
            System.out.println("Timed out\nTest case failed\n");
            return null;
        }
    }
}
