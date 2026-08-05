package patternsforge.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Console logger with ANSI colors. Every line is also appended to a static buffer so
 * JUnit tests can assert on the execution order (e.g. reverse-order undo).
 */
public final class DeploymentLogger {

    public static final String RESET = "\u001B[0m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String RED = "\u001B[31m";
    public static final String CYAN = "\u001B[36m";
    public static final String GRAY = "\u001B[90m";
    public static final String BOLD = "\u001B[1m";

    private static final DateTimeFormatter TIME = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final List<String> BUFFER = new ArrayList<>();

    /** Clears the static buffer (call at the start of every test). */
    public static void clear() {
        BUFFER.clear();
    }

    public static List<String> buffer() {
        return List.copyOf(BUFFER);
    }

    public void log(String message) {
        println(GRAY, message);
    }

    public void ok(String message) {
        println(GREEN, message);
    }

    public void warn(String message) {
        println(YELLOW, message);
    }

    public void error(String message) {
        println(RED, message);
    }

    public void banner(String message) {
        println(BOLD + CYAN, message);
    }

    /** [STAGE] phase  detail — e.g. [BUILD] start compile sources. */
    public void stage(String stage, String phase, String detail) {
        println(GRAY, String.format("[%-9s] %-7s %s", stage, phase, detail));
    }

    private void println(String color, String message) {
        String line = "[" + LocalTime.now().format(TIME) + "] " + message;
        System.out.println(color + line + RESET);
        BUFFER.add(message);
    }
}
