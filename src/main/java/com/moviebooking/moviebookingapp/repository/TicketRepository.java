package com.moviebooking.moviebookingapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.moviebooking.moviebookingapp.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByUserId(String userId);
}
