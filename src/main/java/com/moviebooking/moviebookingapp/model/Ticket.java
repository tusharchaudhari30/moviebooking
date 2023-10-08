package com.moviebooking.moviebookingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;
    private String userId;
    private String movieId;
    private String movieName;
    private String theatreName;
    private int numberOfTickets;
    private int price;
    private String displayUrl;
    private String bookingDate;

}
