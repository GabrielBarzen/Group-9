package com.GeoFlex.GeoFlexBackend;

import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 */

@RestController
public class GeoFlexBackendController {
    @CrossOrigin
    @RequestMapping(value = "/test")
    public String helloWorld(){

        //Construct a JSON Object.
        /*ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();*/

        //Put the pirate text in the JSON object and return it.
        return "Hello World";
    }
}
