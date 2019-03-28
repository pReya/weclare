import java.util.*;
import javax.tools.*;
import java.lang.*;
import java.lang.reflect.*;
import java.net.URLClassLoader;
import java.io.*;
import java.net.*;
import javax.tools.JavaCompiler.CompilationTask;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Loader {
  public static void main(String[] args) {
    System.out.println("Starting javac compiler...");
    // File dir = new File("/sys");
    // File dirHome = new File("/home");
    // File[] contents = dir.listFiles();
    // File[] contentsHome = dirHome.listFiles();
    // for (File object : contents) {
    // System.out.println(object);
    // }
    // for (File object : contentsHome) {
    // System.out.println(object);
    // }

    JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
    int result = compiler.run(null, null, null, "/tmp/App.java", "-verbose");
    System.out.println(result);
    if (result == 0) {
      try {
        File dir = new File("/tmp");
        File[] contents = dir.listFiles();
        for (File object : contents) {
          System.out.println(object);
        }
        System.out.println("Compilation successful");
        BufferedReader br = new BufferedReader(new FileReader("/tmp/App.java"));
        for (String line; (line = br.readLine()) != null;) {
          System.out.print(line);
        }
        br.close();
        URLClassLoader classLoader = new URLClassLoader(new URL[] { new File("/tmp/App.class").toURI().toURL() },
            ClassLoader.getSystemClassLoader());
        Class<?> c = classLoader.loadClass("App");
        Method m = c.getDeclaredMethod("main", String[].class);
        m.invoke(null, new Object[] {});
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      System.out.println("Could not compile");
    }

  }
}