package com.raab.authbackend.service;

import com.raab.authbackend.entity.User;
import com.raab.authbackend.repository.UserStore;
import com.raab.authbackend.util.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserStore userStore;

    @Autowired
    public UserService(UserStore userStore) {
        this.userStore = userStore;
    }

    public User registerUser(User user) throws IllegalArgumentException {
        if (userStore.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userStore.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        String salt = PasswordUtils.generateSalt();
        String hashedPassword = PasswordUtils.hashPassword(user.getPassword(), salt);

        user.setPassword(hashedPassword);
        user.setSalt(salt);

        return userStore.save(user);
    }

    public User loginUser(String username, String password) {
        Optional<User> userOpt = userStore.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        User user = userOpt.get();

        boolean isValid = PasswordUtils.verifyPassword(password, user.getPassword(), user.getSalt());

        if (!isValid) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return user;
    }

    public List<User> getAllUsers() {
        return userStore.findAll();
    }

    public Optional<User> findByUsername(String username) {
        return userStore.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userStore.findByEmail(email);
    }
}