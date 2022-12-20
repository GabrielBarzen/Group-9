package com.GeoFlex.GeoFlexBackend.Controllers.Default;


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * This class manages the redirections to different urls in the application.
 */
@Controller
public class IndexController implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ModelAndView saveLeadQuery() {
        return new ModelAndView("forward:/");
    }

    public String getErrorPath() {
        return PATH;
    }
}