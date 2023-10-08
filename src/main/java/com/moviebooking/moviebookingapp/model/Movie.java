package com.moviebooking.moviebookingapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;
    private String name;
    private String releaseDate;
    private String displayUrl;
    private String description;
    private String theatreName;
    private Integer ticketBooked;
    private Integer totalTicket;
    private Integer price;
}
