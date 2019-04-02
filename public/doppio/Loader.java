import java.util.*;
import javax.tools.*;
import java.lang.*;
import java.lang.reflect.*;
import java.net.URLClassLoader;
import java.io.*;
import java.net.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class Loader {
  public static void main(String[] args) {
    long start = System.nanoTime();
    System.out.println("Starting javac compiler...");

    File output = new File("/tmp/App.class");
    output.delete();

    JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
    int result = compiler.run(null, null, null, "/tmp/App.java", "-d", "/tmp/");
    // System.out.println(result);
    if (result == 0) {
      try {
        // File dir = new File("/tmp");
        // File[] contents = dir.listFiles();
        // for (File object : contents) {
        // System.out.println(object);
        // }
        System.out.println("Compilation successful. Executing...");

        URLClassLoader classLoader = new URLClassLoader(new URL[] { new File("/tmp/App.class").toURI().toURL() },
            ClassLoader.getSystemClassLoader());
        Class<?> c = classLoader.loadClass("App");
        Method m = c.getDeclaredMethod("main", String[].class);
        m.invoke(null, new Object[] {});
        classLoader.close();
        long end = System.nanoTime();
        long elapsedTime = end - start;
        long convert = TimeUnit.SECONDS.convert(elapsedTime, TimeUnit.NANOSECONDS);
        System.out.println("Compilation and execution took " + convert + " seconds.");
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      System.out.println("Could not compile");
    }

  }
}