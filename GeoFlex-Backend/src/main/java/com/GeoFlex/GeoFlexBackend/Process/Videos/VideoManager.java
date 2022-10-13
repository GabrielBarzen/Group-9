package com.GeoFlex.GeoFlexBackend.Process.Videos;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

import java.io.IOException;


/**
 * This class manages video formats and scaling.
 */
public class VideoManager {

    /**
     * Declare variables.
     */

    //Read the instructions in src/main/resources/FFMPEG/HowToUse.txt.
    FFmpeg ffmpeg;
    FFprobe ffprobe;

    /**
     * Constructs the class and intializes the variables.
     * @throws IOException
     */
    public VideoManager() throws IOException {
        ffmpeg = new FFmpeg("src/main/resources/FFMPEG/ffmpeg.exe");
        ffprobe = new FFprobe("src/main/resources/FFMPEG/ffprobe.exe");
    }

    /**
     * Method to convert videos to the webm format.
     * @throws IOException
     */
    public void convertToWebm() throws IOException {
        String input = "src/main/java/com/GeoFlex/GeoFlexBackend/Process/Videos/mp4.mp4";
        String output = "src/main/java/com/GeoFlex/GeoFlexBackend/Process/Converted/mp4.webm";

        FFmpegBuilder builder = new FFmpegBuilder()

                .setInput(input)     // Filename, or a FFmpegProbeResult
                .overrideOutputFiles(true) // Override the output if it exists

                .addOutput(output)   // Filename for the destination
                .setFormat("webm")        // Format is inferred from filename, or can be set
                //.setTargetSize(250_000)  // Aim for a 250KB file

                //.disableSubtitle()       // No subtiles

                .setAudioChannels(1)         // Mono audio
                //.setAudioCodec("aac")        // using the aac codec
                .setAudioSampleRate(48_000)  // at 48KHz
                .setAudioBitRate(32768)      // at 32 kbit/s

                .setVideoCodec("libvpx")     // Video using libvpx
                .setVideoFrameRate(24, 1)     // at 24 frames per second
                .setVideoResolution(640, 480) // at 640x480 resolution

                .setStrict(FFmpegBuilder.Strict.EXPERIMENTAL) // Allow FFmpeg to use experimental specs
                .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);

        // Run a one-pass encode
         executor.createJob(builder).run();
    }
}
