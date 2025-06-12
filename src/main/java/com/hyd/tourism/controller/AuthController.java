package com.hyd.tourism.controller;

import com.hyd.tourism.dto.ApiResponse;
import com.hyd.tourism.service.UserService;
import com.hyd.tourism.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestParam String username, @RequestParam String password) {
        if (userService.validateUser(username, password)) {
            String token = JwtUtil.generateToken(username);
            return ApiResponse.success(Map.of("token", token));
        } else {
            return ApiResponse.error(400,"用户名或者密码错误");
        }
    }
}