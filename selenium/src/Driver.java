import org.apache.commons.lang3.time.StopWatch;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Driver  {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "chromedriver.exe");

        // Create new instance of Chrome driver
        WebDriver driver = new ChromeDriver();

        // Start stopwatch to record total time elapsed for test cases
        StopWatch stopwatch = new StopWatch();
        stopwatch.start();

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

        // Test deck page
        if(DeckTests.testEmptyInput(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(DeckTests.testValidInput(driver)) testCasesPassed++;
        else testCasesFailed++;

        // Test card page
        if(CardTests.testEmptyInput(driver)) testCasesPassed++;
        else testCasesFailed++;
        if(CardTests.testValidInput(driver)) testCasesPassed++;
        else testCasesFailed++;

        // Print final results
        stopwatch.stop();
        System.out.println("Test cases passed: " + testCasesPassed);
        System.out.println("Test cases failed: " + testCasesFailed);
        System.out.println("Total time elapsed for all test cases: " + stopwatch.toString());


        driver.quit();
    }
}