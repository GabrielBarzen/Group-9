package com.GeoFlex.GeoFlexBackend;

import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 */

@RestController
public class GeoFlexBackendTestController {
    @CrossOrigin
    @RequestMapping(value = "/test")
    public String helloWorld(){

        //Construct a JSON Object.
        /*ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();*/

        //Put the text in the JSON object and return it.
        return "Hello World";
    }

    @CrossOrigin
    @RequestMapping(value = "/testCustom")
    //Use like this: http://localhost:8080/testCustom?test=asdddd
    public String returnCustomText(@RequestParam String test){

        //Construct a JSON Object.
        /*ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();*/

        //Put the text in the JSON object and return it.
        return test;
    }
}
