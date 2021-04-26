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
}
