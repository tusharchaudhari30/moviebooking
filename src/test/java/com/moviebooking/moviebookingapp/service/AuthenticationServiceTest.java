package com.moviebooking.moviebookingapp.service;

import com.moviebooking.moviebookingapp.exception.*;
import com.moviebooking.moviebookingapp.model.*;
import com.moviebooking.moviebookingapp.model.dto.ToastMessage;
import com.moviebooking.moviebookingapp.repository.UserRepository;
import com.moviebooking.moviebookingapp.service.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtilService jwtUtilService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void validate_ShouldReturnValidatedUser() {
        String token = "valid-token";
        String subject = "user123";
        User user = new User();
        user.setEmail("user@example.com");
        when(jwtUtilService.getSubjectFromToken(token)).thenReturn(subject);
        when(userRepository.findUserByLoginId(subject)).thenReturn(user);
        User validatedUser = authenticationService.validate("Bearer " + token);
        assertNotNull(validatedUser);
        assertEquals("user@example.com", validatedUser.getEmail());
    }

    @Test
    void login_ShouldReturnTokenForValidUser() {
        String email = "user@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        when(userRepository.findUserByLoginId(email)).thenReturn(user);
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);
        when(jwtUtilService.generateToken(email)).thenReturn("valid-token");
        Map<String, String> tokenResponse = authenticationService.login(email, password);
        assertNotNull(tokenResponse);
        assertTrue(tokenResponse.containsKey("token"));
    }

    @Test
    void saveUser_ShouldSaveUserSuccessfully() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setLoginId("john123");
        user.setPassword("password");
        user.setType("User");
        when(userRepository.findUserByLoginId(user.getLoginId())).thenReturn(null);
        when(userRepository.findUserByEmail(user.getEmail())).thenReturn(null);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encoded-password");
        ToastMessage toastMessage = authenticationService.saveUser(user);
        assertNotNull(toastMessage);
        assertEquals("User registered successfully.", toastMessage.getMessage());
    }

    @Test
    void validate_ShouldThrowTokenValidationFailedExceptionForInvalidToken() {
        String token = "invalid-token";
        when(jwtUtilService.getSubjectFromToken(token)).thenThrow(TokenValidationFailedException.class);
        assertThrows(TokenValidationFailedException.class, () -> authenticationService.validate(token));
    }

    @Test
    void login_ShouldThrowUserNotFoundExceptionForInvalidUser() {
        String email = "user@example.com";
        String password = "password";
        when(userRepository.findUserByLoginId(email)).thenReturn(null);
        assertThrows(UserNotFoundException.class, () -> authenticationService.login(email, password));
    }

    @Test
    void login_ShouldThrowUserCustomExceptionForInvalidPassword() {
        String email = "user@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("different-password"));
        when(userRepository.findUserByLoginId(email)).thenReturn(user);
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(false);
        assertThrows(UserCustomException.class, () -> authenticationService.login(email, password));
    }

    @Test
    void saveUser_ShouldThrowUserCustomExceptionForMissingFields() {
        User user = new User();
        user.setFirstName("John");
        user.setEmail("john@example.com");
        user.setLoginId("john123");
        user.setPassword("password");
        user.setType("User");
        assertThrows(UserCustomException.class, () -> authenticationService.saveUser(user));
    }

    @Test
    void saveUser_ShouldThrowUserCustomExceptionForAdminCreation() {
        User user = new User();
        user.setFirstName("Admin");
        user.setLastName("User");
        user.setEmail("admin@example.com");
        user.setLoginId("admin123");
        user.setPassword("adminpassword");
        user.setType("Admin");
        assertThrows(UserCustomException.class, () -> authenticationService.saveUser(user));
    }

    @Test
    void saveUser_ShouldThrowUserAlreadyExistExceptionForDuplicateLoginId() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setLoginId("john123");
        user.setPassword("password");
        user.setType("User");
        when(userRepository.findUserByLoginId(user.getLoginId())).thenReturn(user);
        assertThrows(UserAlreadyExistException.class, () -> authenticationService.saveUser(user));
    }

    @Test
    void saveUser_ShouldThrowUserAlreadyExistExceptionForDuplicateEmail() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setLoginId("john123");
        user.setPassword("password");
        user.setType("User");
        when(userRepository.findUserByLoginId(user.getLoginId())).thenReturn(null);
        when(userRepository.findUserByEmail(user.getEmail())).thenReturn(user);
        assertThrows(UserAlreadyExistException.class, () -> authenticationService.saveUser(user));
    }
}
