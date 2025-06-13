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

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestParam String username, @RequestParam String password) {
        if (userService.findByUsername(username) != null) {
            return ApiResponse.error(409, "用户名已存在");
        }
        userService.register(username, password);
        return ApiResponse.success("注册成功");
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestParam String username, @RequestParam String password) {
        if (userService.validateUser(username, password)) {
            String token = JwtUtil.generateToken(username);
            return ApiResponse.success(Map.of("token", token));
        } else {
            return ApiResponse.error(400, "用户名或密码错误");
        }
    }
}