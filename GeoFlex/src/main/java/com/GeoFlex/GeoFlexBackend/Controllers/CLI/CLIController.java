package com.GeoFlex.GeoFlexBackend.Controllers.CLI;
import org.springframework.context.annotation.Configuration;

import java.util.Scanner;


/**
 * Class for executing command line instructions
 * @author Gabriel Modin Bärzén
 * @version 1.0
 */
@Configuration
public class CLIController {

    /**
     * Constructor, takes no arguments, start cli thread.
     */
    public CLIController(){
        start();
    }

    /**
     * Runner thread for command line interface.
     */
    class CLIThread implements Runnable {
        /**
         * String containing help information for ground level CLI
         */
        private final String help =
                "====Help====" + "\n"+
                "Available commands :"+"\n"+
                "database           , change&view database info"+ "\n"+
                "user               , change&view user information"+ "\n"+
                "clear              , clear the terminal"+ "\n"+
                "exit               , close server"+ "\n"+
                "============";



        Scanner scanner = new Scanner(System.in);

        /**
         * run method for runner class. Repeatedly scans input from stdin and delegates to {@link CLIDelegationController} objects.
         */
        @Override
        public void run() {
            while (running) {
                String input = scanner.nextLine();
                String[] inputSplitArray = input.split(" ");
                switch (inputSplitArray[0]) {
                    case "exit" -> {
                        System.out.println("shutting down now");
                        exit();
                    }
                    case "clear" -> {
                        for (int i = 0; i < 200; i++) {
                            System.out.println();
                        }
                    }
                    case "database" -> {
                        cliDataBaseController.runCommand(inputSplitArray);
                    }
                    case "user" -> {
                        cliUserController.runCommand(inputSplitArray);
                    }
                    default -> {
                        System.out.println(help);
                    }
                }
            }
        }
    }


    /**
     * CLI delegation controllers.
     * Takes input from cli controller and executes commands based on it.
     */
    CLIDelegationController cliDataBaseController = new CLIDataBaseController();
    CLIDelegationController cliUserController = new CLIUserController();


    /**
     * Exit method. Closes the program with System.exit(0)
     */
    private void exit() {
        running = false;
        System.exit(0);
    }


    Thread thread = null;
    boolean running = false;

    /**
     * Method for starting thread.
     * @return the state of the thread.
     */
    public boolean start() {
        if (!running) {
            thread = new Thread(new CLIThread());
            thread.start();
            running = true;
        } else {
            System.out.println("Already running");
        }
        return running;
    }

    /**
     * Method for stopping thread.
     * @return the state of the thread.
     */
    public boolean stop(){
        if (running) running = false;
        return running;
    }

    /**
     * Method for getting thread state.
     * @return the state of the thread.
     */
    public boolean isRunning(){
        return running;
    }

}

