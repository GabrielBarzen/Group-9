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
     * @param id The id of the route or location. Used as the folders name.
     * @param file The file to save to the server.
     * @param dirName The directory name where the file is going to be saved. Should be routes or locations.
     */
    public void createDirectoriesAndSaveFile(int id, MultipartFile file, String dirName){
        //Create file directory.
        File dir = new File("src/main/resources/static/files/"+dirName);
        if (!dir.exists()){
            dir.mkdirs();
        }

        //Create a directory for a route or location.
        File routeDir = new File("src/main/resources/static/files/"+dirName+"/" + id);
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
     * @param id The id of the route or location. Used as the folders name.
     * @param dirName The directory name where the file is going to be saved. Should be routes or locations.
     */
    public void deleteFileDirectory(int id, String dirName){
        File dirToDelete = new File("src/main/resources/static/files/"+dirName+"/" + id);
        try {
            FileUtils.deleteDirectory(dirToDelete);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Function to convert images from the HEIC format to PNG.
     * @param id The id of the route or location. Used as the folders name.
     * @param file The image that is going to be converted.
     * @param dirName The directory name where the file is going to be saved. Should be routes or locations.
     */
    public void heicToPng(int id, MultipartFile file, String dirName){
        String filePath = "src/main/resources/static/files/"+dirName+"/"+id+"/"+file.getOriginalFilename();
        String filePathNewFormat = "src/main/resources/static/files/"+dirName+"/"+id+"/"+file.getOriginalFilename().replace("heic", "png");
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
