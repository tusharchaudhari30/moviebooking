package com.moviebooking.moviebookingapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.moviebooking.moviebookingapp.model.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
    List<Movie> findByNameContainingIgnoreCase(String name);

    List<Movie> findByName(String name);
}
