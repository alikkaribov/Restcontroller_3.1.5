package com.example.springboot3.service;

import com.example.springboot3.dao.RoleRepository;
import com.example.springboot3.entity.Role;

import java.util.List;

public interface RoleService {
    public void setRoleDao(RoleRepository roleRepository);
    public void addRole(Role role);
    public void updateRole(Role role);
    public void removeRoleById(long id);
    public List<Role> getAllRoles();
    public Role getRoleByName(String name);
}
