package com.GeoFlex.GeoFlexBackend.Controllers;

import com.GeoFlex.GeoFlexBackend.PoJo.JsonManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class to recieve requests from the front-end.
 */

@RestController
@RequestMapping("/route/")
public class RouteController {

    /**
     * Get a route by code
     * @param code The access code of the quiz
     * @return Entire route from DB including access code and locations, excluding Image and video data. Image and video has to be fetched separately as the data is bulky.
     */
    @RequestMapping(value = "/fetch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetch(@RequestParam int code) {
        JsonManager jm = new JsonManager();
        String response = jm.getRouteFromDatabaseAsJson(code);
        jm.disconnectFromDatabase();
        if(response != null){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("{\"error\":\"INTERNAL SERVER ERROR\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a route from inputs,
     * @param title Title of the quiz
     * @param description Description for the quiz
     * @param type The type of quiz
     * @return id and code generated in DB.
     */
    @RequestMapping(value = "/create", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create (@RequestParam String title, @RequestParam String description, @RequestParam String type) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Requests new code access code from the database,
     * @param id Route id to generate new access code from
     * @return New code fetched from db after being generated
     */
    @RequestMapping(value = "/new_code", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> generateNewCode (@RequestParam int id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Method for deleting a route by its id in the database
     * @param id the id for the route being deleted
     * @return OK for success or other related error message
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> delete(@RequestParam int id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Method for uploading data for a location to the database.
     * @param data The image or video to be uploaded
     * @param location_id The id for the location, required.
     * @param route_id The id for the route, required.
     * @return Ok or Error
     */
    @RequestMapping(value = "/upload_location_data", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadLocationData(@RequestParam String data, @RequestParam int location_id, @RequestParam int route_id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Method for getting a specific location. Primarily used for editing the location.
     * @param location_id The id for the location, required.
     * @param route_id The id for the route, required.
     * @return Returns the location data.
     */
    @RequestMapping(value = "/fetch_location", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetchLocation(@RequestParam int location_id, @RequestParam int route_id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Used for fetching the video/images for a certain location.
     * @param location_id The id for the location, required.
     * @param route_id The id for the route, required.
     * @return returns the video or image for the location, video may be streamed.
     */
    @RequestMapping(value = "/fetch_location_data", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetchLocationData(@RequestParam int location_id, @RequestParam int route_id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }

    /**
     * Used for fetching location answers if quiz, used when modifying answers, otherwise fetched automatically when route type is quiz in the {@link RouteController#fetch(int) fetch} method
     * @param location_id The id for the location, required.
     * @param route_id The id for the route, required.
     * @return Returns the quiz answers for a location, or error if quiz type is INFO
     */
    @RequestMapping(value = "/fetch_location_content", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> fetchLocationContent(@RequestParam int location_id, @RequestParam int route_id) {

        return new ResponseEntity<>("{\"error\":\"Not implemented\"}", HttpStatus.I_AM_A_TEAPOT); //TODO plan & implement

    }
}

