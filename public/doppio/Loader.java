import javax.tools.*;
import java.lang.reflect.*;
import java.io.*;
import java.net.*;
import java.util.concurrent.TimeUnit;

public class Loader {
  public static void deleteFile(String filePath) {
    File file = new File(filePath);
    file.delete();
  }

  public static void main(String[] args) {
    long start = System.nanoTime();
    if (args.length == 0) {
      System.out.println("No class was found.");
      System.exit(1);
    }
    String className = args[0];
    String sourceFile = "/tmp/" + className + ".java";
    String classFile = "/tmp/" + className + ".class";

    System.out.println("Compiling found class '" + className + "'...");

    JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
    int result = compiler.run(null, null, null, sourceFile, "-d", "/tmp/");

    if (result == 0) {
      try {
        System.out.println("Compilation successful. Executing...");
        System.out.println("---");

        URLClassLoader classLoader = new URLClassLoader(
            new URL[] {new File(classFile).toURI().toURL()}, ClassLoader.getSystemClassLoader());
        Class<?> c = classLoader.loadClass(className);
        Method m = c.getDeclaredMethod("main", String[].class);
        m.invoke(null, new Object[] {});
        classLoader.close();
        Loader.deleteFile(classFile);
        Loader.deleteFile(sourceFile);
        long end = System.nanoTime();
        long elapsedTime = end - start;
        long convert = TimeUnit.SECONDS.convert(elapsedTime, TimeUnit.NANOSECONDS);
        System.out.println("---");
        System.out.println("Compilation and execution took " + convert + " seconds.");
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      System.out.println("Could not compile");
    }

  }
}
