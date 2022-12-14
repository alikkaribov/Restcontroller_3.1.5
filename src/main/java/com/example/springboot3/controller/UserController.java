package com.example.springboot3.controller;

import com.example.springboot3.service.RoleService;
import com.example.springboot3.service.RoleServiceImpl;
import com.example.springboot3.service.UserService;
import com.example.springboot3.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.example.springboot3.entity.User;

@Controller
@RequestMapping(value = "/")
public class UserController {
    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @GetMapping("/admin/users")
    public String showAll(Model model) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        model.addAttribute("user", userService.getUserByName(name));
        model.addAttribute("users", userService.getAllUsers());
        return "all-user";
    }

    @GetMapping("/user")
    public String showUserById(Model model) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        model.addAttribute("user", userService.getUserByName(name));
        return "userPage";
    }
    @GetMapping("/default")
    public String redirectToUserID() {
        return "redirect:/user";
    }


    @GetMapping("/login")
    public String loginPage(){
        return "loginPage";
    }
}
