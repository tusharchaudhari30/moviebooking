package com.moviebooking.moviebookingapp.service;

import com.moviebooking.moviebookingapp.exception.UserCustomException;
import com.moviebooking.moviebookingapp.model.Movie;
import com.moviebooking.moviebookingapp.model.Ticket;
import com.moviebooking.moviebookingapp.model.User;
import com.moviebooking.moviebookingapp.repository.MovieRepository;
import com.moviebooking.moviebookingapp.repository.TicketRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest()
@ContextConfiguration()
public class MovieBookingServiceTest {

    @Autowired
    private MovieBookingService movieBookingService;

    @MockBean
    private MovieRepository movieRepository;

    @MockBean
    private TicketRepository ticketRepository;

    @MockBean
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        reset(movieRepository, ticketRepository, authenticationService);
    }

    @Test
    void viewAllMovies_ShouldReturnListOfMovies() {
        when(movieRepository.findAll()).thenReturn(Collections.emptyList());

        var movies = movieBookingService.viewAllMovies();

        assertNotNull(movies);
        assertTrue(movies.isEmpty());

        verify(movieRepository, times(1)).findAll();
    }

    @Test
    void searchMoviesByName_ShouldReturnMatchingMovies() {
        String movieName = "Inception";
        when(movieRepository.findByNameContainingIgnoreCase(movieName)).thenReturn(Collections.emptyList());
        var movies = movieBookingService.searchMoviesByName(movieName);
        assertNotNull(movies);
        assertTrue(movies.isEmpty());
        verify(movieRepository, times(1)).findByNameContainingIgnoreCase(movieName);
    }

    @Test
    void bookTicketsForMovie_ShouldBookTicketsSuccessfully() {
        String movieId = "1";
        Ticket ticket = new Ticket();
        ticket.setNumberOfTickets(2);
        String token = "valid-token";
        User user = new User();
        user.setId("user-1");

        // Mock authenticationService
        when(authenticationService.validate(token)).thenReturn(user);

        // Mock movieRepository
        Movie movie = new Movie(); // Create a mock Movie object
        movie.setPrice(10); // Set the price for the movie
        movie.setTicketBooked(50);
        movie.setTotalTicket(100);
        when(movieRepository.findById(movieId)).thenReturn(Optional.of(movie));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(new Ticket()); // Mock the save method
        var toastMessage = movieBookingService.bookTicketsForMovie(movieId, ticket, token);
        assertNotNull(toastMessage);
        assertEquals("Ticket Booked Successfully.", toastMessage.getMessage());
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, times(1)).findById(movieId);
        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    @Test
    void bookTicketsForMovie_ShouldThrowExceptionForInvalidNumberOfTickets() {
        String movieId = "1";
        Ticket ticket = new Ticket();
        String token = "valid-token";
        assertThrows(UserCustomException.class, () -> movieBookingService.bookTicketsForMovie(movieId, ticket, token));
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, never()).findById(movieId);
        verify(ticketRepository, never()).save(ticket);
    }

    @Test
    void updateTicketStatus_ShouldUpdateTicketDetails() {
        String movieId = "1";
        Integer newTotalTickets = 50;
        String token = "admin-token";
        User adminUser = new User();
        adminUser.setType("Admin");
        when(authenticationService.validate(token)).thenReturn(adminUser);
        when(movieRepository.findById(movieId)).thenReturn(Optional.of(new Movie()));
        var toastMessage = movieBookingService.updateTicketStatus(movieId, newTotalTickets, token);
        assertNotNull(toastMessage);
        assertEquals("Ticket Details updated.", toastMessage.getMessage());
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, times(1)).findById(movieId);
        verify(movieRepository, times(1)).save(any());
    }

    @Test
    void updateTicketStatus_ShouldThrowExceptionForNonAdminUser() {
        String movieId = "1";
        Integer newTotalTickets = 50;
        String token = "user-token";
        User regularUser = new User();
        regularUser.setType("User");
        when(authenticationService.validate(token)).thenReturn(regularUser);
        assertThrows(UserCustomException.class,
                () -> movieBookingService.updateTicketStatus(movieId, newTotalTickets, token));
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, never()).findById(movieId);
        verify(movieRepository, never()).save(any());
    }

    @Test
    void deleteMovie_ShouldDeleteMovieSuccessfully() {
        String movieId = "1";
        String token = "admin-token";
        User adminUser = new User();
        adminUser.setType("Admin");
        when(authenticationService.validate(token)).thenReturn(adminUser);
        var toastMessage = movieBookingService.deleteMovie(movieId, token);
        assertNotNull(toastMessage);
        assertEquals("Movie deleted successfully.", toastMessage.getMessage());
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, times(1)).deleteById(movieId);
    }

    @Test
    void deleteMovie_ShouldThrowExceptionForNonAdminUser() {
        String movieId = "1";
        String token = "user-token";
        User regularUser = new User();
        regularUser.setType("User");
        when(authenticationService.validate(token)).thenReturn(regularUser);
        assertThrows(UserCustomException.class, () -> movieBookingService.deleteMovie(movieId, token));
        verify(authenticationService, times(1)).validate(token);
        verify(movieRepository, never()).deleteById(movieId);
    }
}
