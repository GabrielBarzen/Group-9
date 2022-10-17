package com.GeoFlex.GeoFlexBackend.Controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class to recieve requests from the front-end.
 */

@RestController(value = "/admin/")
public class AdminController {

    /**
     * Create an empty route from the admin panel.
     * @param body Json object
     * @return
     */
    @RequestMapping(value = "/create_route_admin", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create (@RequestBody String body) {

        System.out.println(body);
        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }
}
