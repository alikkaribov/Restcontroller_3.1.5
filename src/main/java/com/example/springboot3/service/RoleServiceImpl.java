package com.example.springboot3.service;

import com.example.springboot3.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.springboot3.dao.RoleRepository;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;
    @Autowired
    public void setRoleDao(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;;
    }
    @Override
    public void addRole(Role role) {
        roleRepository.save(role);
    }
    @Override
    public void updateRole(Role role) {
        roleRepository.saveAndFlush(role);
    }
    @Override
    public void removeRoleById(long id) { roleRepository.deleteById(id); }
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    @Override
    public Role getRoleByName(String name) { return roleRepository.findByname(name); }
}
