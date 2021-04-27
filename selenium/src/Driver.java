import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Driver  {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "chromedriver.exe");

        // Create new instance of Chrome driver
        WebDriver driver = new ChromeDriver();

        // Get website at localhost:3000
        driver.get("http://localhost:3000");

        int testCasesPassed = 0;
        int testCasesFailed = 0;

        // Check title of the page
        System.out.println("Testing page title...");
        String expectedTitle = "Flash Cards";
        String actualTitle = driver.getTitle();
        if(TestUtils.testStrings(expectedTitle, actualTitle)) testCasesPassed++;
        else testCasesFailed++;

        // Test sign up page
        if(SignUpTests.testEmptyInput(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(SignUpTests.testShortPassword(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(SignUpTests.testInvalidEmail(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(SignUpTests.testValidInput(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(SignUpTests.testAlreadyRegisteredEmail(driver)) testCasesPassed++;
        else testCasesFailed++;

        // Test log in page
        if(LogInTests.testEmptyInput(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(LogInTests.testShortPassword(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(LogInTests.testInvalidEmail(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(LogInTests.testIncorrectPassword(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(LogInTests.testValidInput(driver)) testCasesPassed++;
        else testCasesFailed++;

        // Print final results
        System.out.println("Test cases passed: " + testCasesPassed);
        System.out.println("Test cases failed: " + testCasesFailed);

        driver.quit();
    }
}