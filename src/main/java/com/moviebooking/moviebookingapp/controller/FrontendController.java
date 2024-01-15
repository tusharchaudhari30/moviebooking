package com.moviebooking.moviebookingapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    @RequestMapping(value = { "/", "/bookings" })
    public String indexHtml() {
        return "index";
    }

    @RequestMapping("/movie/{movieid}")
    public String getMovie(@PathVariable String movieid) {
        return "index";
    }
}