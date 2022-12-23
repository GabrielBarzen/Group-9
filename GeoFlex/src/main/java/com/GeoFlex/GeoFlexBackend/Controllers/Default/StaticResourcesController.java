package com.GeoFlex.GeoFlexBackend.Controllers.Default;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * This class overrides the default static resources folder and sets up a custom one in the C drive.
 */
@Configuration
public class StaticResourcesController extends WebMvcConfigurerAdapter {

    //Contains the default static folder values and the custom static folder located in the C drive.
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/", "file:///C:/files" };
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
    }
}
