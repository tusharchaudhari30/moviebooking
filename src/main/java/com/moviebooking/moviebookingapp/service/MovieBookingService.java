package com.moviebooking.moviebookingapp.service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviebooking.moviebookingapp.exception.UserCustomException;
import com.moviebooking.moviebookingapp.model.Movie;
import com.moviebooking.moviebookingapp.model.Ticket;
import com.moviebooking.moviebookingapp.model.User;
import com.moviebooking.moviebookingapp.model.dto.ToastMessage;
import com.moviebooking.moviebookingapp.repository.MovieRepository;
import com.moviebooking.moviebookingapp.repository.TicketRepository;

@Service
@Slf4j
public class MovieBookingService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    AuthenticationService authenticationService;

    public List<Movie> viewAllMovies() {
        log.info("Fetching all movies.");
        return movieRepository.findAll();
    }

    public List<Movie> searchMoviesByName(String name) {
        log.info("Searching for movies by name: {}", name);
        return movieRepository.findByNameContainingIgnoreCase(name);
    }

    public ToastMessage bookTicketsForMovie(String movieId, Ticket ticket, String token) {
        User user = authenticationService.validate(token);
        if (Objects.isNull(ticket.getNumberOfTickets()) || ticket.getNumberOfTickets() == 0) {
            log.error("Invalid number of tickets provided.");
            throw new UserCustomException("Please Enter Number of tickets");
        }
        Optional<Movie> movie = movieRepository.findById(movieId);
        ticket.setUserId(user.getId());
        if (movie.isEmpty()) {
            log.error("Movie not found with ID: {}", movieId);
            throw new UserCustomException("Movie not Found :" + movieId);
        }
        ticket.setTheatreName(movie.get().getName());
        ticket.setMovieId(movie.get().getId());
        ticketRepository.save(ticket);
        log.info("Ticket booked successfully for movie: {}", movie.get().getName());
        return new ToastMessage("Ticket Booked Successfully.");
    }

    public ToastMessage updateTicketStatus(String movieId, Integer ticket, String token) {
        User user = authenticationService.validate(token);
        if (!"Admin".equals(user.getType())) {
            log.error("User is not admin. Access denied.");
            throw new UserCustomException("User is not admin");
        }
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            log.error("Movie not found with ID: {}", movieId);
            throw new UserCustomException("Movie not Found :" + movieId);
        }
        Movie movie2 = movie.get();
        movie2.setTotalTicket(ticket);
        movieRepository.save(movie2);
        log.info("Ticket details updated for movie: {}", movie2.getName());
        return new ToastMessage("Ticket Details updated.");
    }

    public ToastMessage deleteMovie(String id, String token) {
        User user = authenticationService.validate(token);
        if (!"Admin".equals(user.getType())) {
            log.error("User is not admin. Access denied.");
            throw new UserCustomException("User is not admin");
        }
        movieRepository.deleteById(id);
        log.info("Movie deleted with ID: {}", id);
        return new ToastMessage("Movie deleted successfully.");
    }
}
