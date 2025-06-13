package com.hyd.tourism.service;

import com.hyd.tourism.model.User;

public interface UserService {
    boolean validateUser(String username, String password);
    void register(String username, String password);
    User findByUsername(String username);
}