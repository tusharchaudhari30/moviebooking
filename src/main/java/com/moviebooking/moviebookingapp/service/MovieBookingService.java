package com.moviebooking.moviebookingapp.service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.xml.validation.Validator;

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
        if (Objects.isNull(ticket.getNumberOfTickets()) || ticket.getNumberOfTickets() <= 0) {
            log.error("Invalid number of tickets provided.");
            throw new UserCustomException("Please Enter a valid number of tickets");
        }
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            log.error("Movie not found with ID: {}", movieId);
            throw new UserCustomException("Movie not Found: " + movieId);
        }
        int availableTickets = movie.get().getTotalTicket() - movie.get().getTicketBooked();

        if (ticket.getNumberOfTickets() > availableTickets) {
            log.error("Not enough tickets available for booking.");
            throw new UserCustomException("Not enough tickets available for booking.");
        }
        ticket.setUserId(user.getId());
        ticket.setPrice(movie.get().getPrice() * ticket.getNumberOfTickets());
        ticket.setTheatreName(movie.get().getTheatreName());
        ticket.setMovieId(movie.get().getId());
        ticket.setMovieName(movie.get().getName());
        ticket.setDisplayUrl(movie.get().getDisplayUrl());
        ticketRepository.save(ticket);
        Movie movie2 = movie.get();
        movie2.setTicketBooked(movie2.getTicketBooked() + ticket.getNumberOfTickets());
        movieRepository.save(movie2);
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

    public Optional<Movie> getMovieById(String id) {
        return movieRepository.findById(id);
    }

    public List<Movie> updateMovieDetails(Movie movie, String token) {
        User user = authenticationService.validate(token);
        if (!"Admin".equals(user.getType())) {
            log.error("User is not admin. Access denied.");
            throw new UserCustomException("User is not admin");
        }
        if (movie.getName() == null || movie.getName().isEmpty()) {
            throw new UserCustomException("Movie name is required.");
        }

        if (movie.getReleaseDate() == null || movie.getReleaseDate().isEmpty()) {
            throw new UserCustomException("Release date is required.");
        }

        if (movie.getDisplayUrl() == null || movie.getDisplayUrl().isEmpty()) {
            throw new UserCustomException("Display URL is required.");
        }

        if (movie.getDescription() == null || movie.getDescription().isEmpty()) {
            throw new UserCustomException("Description is required.");
        }

        if (movie.getTheatreName() == null || movie.getTheatreName().isEmpty()) {
            throw new UserCustomException("Theatre name is required.");
        }

        if (movie.getTicketBooked() == null) {
            throw new UserCustomException("Ticket booked count is required.");
        }

        if (movie.getTotalTicket() == null) {
            throw new UserCustomException("Total ticket count is required.");
        }

        if (movie.getPrice() == null) {
            throw new UserCustomException("Price is required.");
        }
        movieRepository.save(movie);
        return movieRepository.findAll();
    }

    public List<Ticket> getTicketListByUser(String token) {
        User user = authenticationService.validate(token);
        if ("Admin".equals(user.getType())) {
            log.error("User is admin. Access denied.");
            throw new UserCustomException("User is admin.");
        }
        return ticketRepository.findByUserId(user.getId());
    }

}
