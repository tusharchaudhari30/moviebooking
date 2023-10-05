package com.moviebooking.moviebookingapp.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class JwtUtilServiceTest {

    @Autowired
    private JwtUtilService jwtUtilService;

    @Autowired
    private Algorithm algorithm;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void generateToken_ShouldGenerateTokenWithSubject() {
        String subject = "user123";
        String token = jwtUtilService.generateToken(subject);

        assertNotNull(token);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("moviebooking")
                .build();
        DecodedJWT decodedJWT = verifier.verify(token);

        assertEquals("user123", decodedJWT.getSubject());
        assertNotNull(decodedJWT.getIssuedAt());
        assertNotNull(decodedJWT.getExpiresAt());
    }

    @Test
    void getSubjectFromToken_ShouldExtractSubjectFromToken() {
        String subject = "user123";
        String token = JWT.create().withIssuer("moviebooking")
                .withSubject(subject)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .withJWTId(UUID.randomUUID().toString())
                .sign(algorithm);

        String extractedSubject = jwtUtilService.getSubjectFromToken(token);

        assertEquals(subject, extractedSubject);
    }
}
