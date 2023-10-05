package com.moviebooking.moviebookingapp.service;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moviebooking.moviebookingapp.exception.TokenValidationFailedException;
import com.moviebooking.moviebookingapp.exception.UserAlreadyExistException;
import com.moviebooking.moviebookingapp.exception.UserCustomException;
import com.moviebooking.moviebookingapp.exception.UserNotFoundException;
import com.moviebooking.moviebookingapp.model.User;
import com.moviebooking.moviebookingapp.model.dto.ToastMessage;
import com.moviebooking.moviebookingapp.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class AuthenticationService {

    final UserRepository userRepository;
    final

    JwtUtilService jwtUtilService;
    final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, JwtUtilService jwtUtilService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtilService = jwtUtilService;
        this.passwordEncoder = passwordEncoder;
    }

    public User validate(String token) {
        token = token.substring(7);
        try {
            User user = userRepository.findUserByLoginId(jwtUtilService.getSubjectFromToken(token));
            log.info("Successfully validated token for user {}", user.getEmail());
            return user;
        } catch (Exception e) {
            log.error("Error validating token for user with token {}: {}", token, e.getMessage(), e);
            throw new TokenValidationFailedException("Invalid token");
        }
    }

    public Map<String, String> login(String email, String password) {
        User user = userRepository.findUserByLoginId(email);
        if (Objects.isNull(user))
            throw new UserNotFoundException("User Not Found.");
        Map<String, String> token = new HashMap<>();
        if (passwordEncoder.matches(password, user.getPassword())) {
            token.put("token", jwtUtilService.generateToken(email));
            log.info("Successfully logged in user [{}]", email);
            return token;
        } else {
            log.error("Invalid password for user [{}]", user.getEmail());
            throw new UserCustomException("Invalid password");
        }
    }

    public ToastMessage saveUser(User user) {
        if (StringUtils.isAnyBlank(user.getFirstName(), user.getLastName(), user.getEmail(), user.getLoginId(),
                user.getPassword(), user.getType())) {
            log.error("Required fields are missing for user registration.");
            throw new UserCustomException("Required fields are missing for user registration.");
        }
        if ("Admin".equals(user.getType())) {
            throw new UserCustomException("Admin can't be created.");
        }
        User existingUser = userRepository.findUserByLoginId(user.getLoginId());
        if (existingUser != null) {
            log.error("User with loginId [{}] already exists.", user.getLoginId());
            throw new UserAlreadyExistException("User with the same loginId already exists.");
        }
        existingUser = userRepository.findUserByEmail(user.getEmail());
        if (existingUser != null) {
            log.error("User with email [{}] already exists.", user.getEmail());
            throw new UserAlreadyExistException("User with the same email already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        log.info("User [{}] registered successfully.", user.getEmail());
        return new ToastMessage("User registered successfully.");
    }
}
