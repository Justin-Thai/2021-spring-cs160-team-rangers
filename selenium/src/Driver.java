import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Driver  {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "chromedriver.exe");

        // Create new instance of Chrome driver
        WebDriver driver = new ChromeDriver();

        // Get website at localhost:3000
        driver.get("http://localhost:3000");

        // Check title of the page
        System.out.println("Page title found: " + driver.getTitle());

        // Find login button
        // Wait for elements to load
        WebElement loginButton =(new WebDriverWait(driver, 10))
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"root\"]/nav/ul/li/a")));
        System.out.println("Login button found: " + loginButton.getText());

        driver.quit();
    }
}