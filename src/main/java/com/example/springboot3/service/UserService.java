package com.example.springboot3.service;

import com.example.springboot3.entity.User;

import java.util.List;

public interface UserService {
    public void addUser(User user);
    public void updateUser(User user);
    public void removeUserById(long id);
    public User getUserById(long id);
    public List<User> getAllUsers();
    public User getUserByName(String username);
}
