package com.GeoFlex.GeoFlexBackend.Process;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class FileHandler {

    /**
     * Function to create directories to store uploaded files to the server.
     * @param routeId The id of the route. Used as the folders name.
     * @param file The file to save to the server.
     */
    public void createDirectoriesAndSaveFile(int routeId, MultipartFile file){
        //Create file directory.
        File dir = new File("src/main/resources/static/files/routes");
        if (!dir.exists()){
            dir.mkdirs();
        }

        //Create a directory for a route.
        File routeDir = new File("src/main/resources/static/files/routes/" + routeId);
        if (!routeDir.exists()){
            routeDir.mkdirs();
        }

        //Clear all files in directory if it exists.
        try {
            FileUtils.cleanDirectory(routeDir);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //Write file to folder.
        Path filepath = Paths.get(String.valueOf(routeDir), file.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Function to delete a directory holding files for a route. To be called when a route is deleted.
     * @param routeId The id of the deleted route. Used to delete the appropriate folder.
     */
    public void deleteRouteFileDirectory(int routeId){
        File dirToDelete = new File("src/main/resources/static/files/routes/" + routeId);
        try {
            FileUtils.deleteDirectory(dirToDelete);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Function to convert images from the HEIC format to PNG.
     * @param routeId The id of the route. Used to locate the folder the file is in.
     * @param file The image that is going to be converted.
     */
    public void heicToPng(int routeId, MultipartFile file){
        String filePath = "src/main/resources/static/files/routes/"+routeId+"/"+file.getOriginalFilename();
        String filePathNewFormat = "src/main/resources/static/files/routes/"+routeId+"/"+file.getOriginalFilename().replace("heic", "png");
        String [] cmd = new String[3];
        cmd[0] = "src/main/java/com/GeoFlex/GeoFlexBackend/Process/ImageMagick/convert.exe";
        cmd[1] = filePath;
        cmd[2] = filePathNewFormat;
        try {
            Process p = Runtime.getRuntime().exec(cmd);
            p.waitFor();
            if (p.exitValue() != 0) System.out.println("ERROR with Image Magic Command exit value:" + p.exitValue()+  " " + Arrays.toString(cmd));
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        finally {
            File f = new File(filePath);
            f.delete();
        }
    }
}
