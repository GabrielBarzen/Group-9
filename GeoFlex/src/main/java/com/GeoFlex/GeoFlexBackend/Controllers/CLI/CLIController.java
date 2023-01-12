package com.GeoFlex.GeoFlexBackend.Controllers.CLI;
import org.springframework.context.annotation.Configuration;

import java.util.Scanner;

@Configuration
public class CLIController {


    public CLIController(){
        start();
    }

    class CLIThread implements Runnable {
        private final String help =
                "====Help====" + "\n"+
                "Available commands :"+"\n"+
                "database           , change&view database info"+ "\n"+
                "user               , change&view user information"+ "\n"+
                "exit               , close server"+ "\n"+
                "============";



        Scanner scanner = new Scanner(System.in);

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


    ////CLI controllers
    CLIDataBaseController cliDataBaseController = new CLIDataBaseController();
    CLIUserController cliUserController = new CLIUserController();



    ////Threading Methods
    private void exit() {
        running = false;
        System.exit(0);
    }

    Thread thread = null;
    boolean running = false;

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
    public boolean stop(){
        if (running) running = false;
        return running;
    }

    public boolean isRunning(){
        return running;
    }

}

