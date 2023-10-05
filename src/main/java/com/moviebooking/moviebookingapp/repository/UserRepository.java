package com.moviebooking.moviebookingapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.moviebooking.moviebookingapp.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findUserByLoginId(String loginId);

    User findUserByEmail(String email);
}
