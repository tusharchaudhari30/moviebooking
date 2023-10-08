package com.moviebooking.moviebookingapp.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviebooking.moviebookingapp.model.Movie;
import com.moviebooking.moviebookingapp.model.Ticket;
import com.moviebooking.moviebookingapp.model.User;
import com.moviebooking.moviebookingapp.model.dto.ToastMessage;
import com.moviebooking.moviebookingapp.service.AuthenticationService;
import com.moviebooking.moviebookingapp.service.MovieBookingService;

import jakarta.websocket.server.PathParam;

@RequestMapping("/api/v1.0/moviebooking")
@Validated
@RestController
public class MovieBookingController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    MovieBookingService movieBookingService;

    @GetMapping("/verify")
    public ResponseEntity<User> verify(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(authenticationService.validate(token));
    }

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String loginId,
            @RequestParam String password) {
        return ResponseEntity.ok(authenticationService.login(loginId, password));
    }

    @PostMapping("/register")
    public ResponseEntity<ToastMessage> signUpUser(@RequestBody User user) {
        return ResponseEntity.ok(authenticationService.saveUser(user));
    }

    @GetMapping("/all")
    public List<Movie> viewAllMovies() {
        return movieBookingService.viewAllMovies();
    }

    @GetMapping("/movies/search/{moviename}")
    public List<Movie> searchMoviesByName(@PathVariable String moviename) {
        return movieBookingService.searchMoviesByName(moviename);
    }

    @PostMapping("/movie/{movieid}/add")
    public ToastMessage bookTicketsForMovie(@PathVariable String movieid, @RequestBody Ticket ticket,
            @RequestHeader("Authorization") String token) {
        return movieBookingService.bookTicketsForMovie(movieid, ticket, token);
    }

    @GetMapping("/movie/{id}")
    public Optional<Movie> getMoviesById(@PathVariable String id) {
        return movieBookingService.getMovieById(id);
    }

    @PostMapping("/movie")
    public List<Movie> updateMovie(@RequestBody Movie movie, @RequestHeader("Authorization") String token) {
        return movieBookingService.updateMovieDetails(movie, token);
    }

    @PutMapping("/{movieId}/update/{ticket}")
    public ToastMessage updateTicketStatus(@PathVariable String movieId, @PathVariable Integer ticket,
            @RequestHeader("Authorization") String token) {
        return movieBookingService.updateTicketStatus(movieId, ticket, token);
    }

    @DeleteMapping("/movie/delete/{id}")
    public ToastMessage deleteMovie(@PathVariable String id, @RequestHeader("Authorization") String token) {
        return movieBookingService.deleteMovie(id, token);
    }

}
