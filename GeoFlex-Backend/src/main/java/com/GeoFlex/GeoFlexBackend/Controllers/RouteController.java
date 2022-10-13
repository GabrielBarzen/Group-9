package com.GeoFlex.GeoFlexBackend.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 */

@RestController
public class RouteController {

    @RequestMapping(value = "/fetch_route", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetchRoute(@RequestParam int code) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT);
    }
    @RequestMapping(value = "/fetch_location_data", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetchLocationDataFromDB(@RequestParam int location_id, @RequestParam int route_id) {


        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT);
    }
}

