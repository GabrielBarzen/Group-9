package com.GeoFlex.GeoFlexBackend.Controllers.Default;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This classes purpose is to load the starter page.
 */
@Controller
public class DefaultController {

    /**
     * Returns the default index.html page.
     * @return Starter page of the application.
     */
    @GetMapping("/")
    public String index(){
        return "index.html";
    }
}
