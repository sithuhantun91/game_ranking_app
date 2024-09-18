package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dao.RoleRepository;
import com.sithuhantun.game_ranking_system.dao.UserRepository;
import com.sithuhantun.game_ranking_system.model.Clan;
import com.sithuhantun.game_ranking_system.model.ClanRank;
import com.sithuhantun.game_ranking_system.model.Role;
import com.sithuhantun.game_ranking_system.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    //private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository
            , RoleRepository roleRepository
                           //, BCryptPasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        //this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public Page<List<User>> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAllByOrderByFirstNameAsc(pageable);
    }

    @Transactional(readOnly = true)
    public Page<List<User>> findAllByClanId(Long clanId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAllByClanIdOrderByClanRankIdAsc(clanId, pageable);
    }

    @Override
    public List<User> findAllByClanId(Long clanId) {
        return userRepository.findAllByClanIdOrderByClanRankIdAsc(clanId);
    }

    @Transactional(readOnly = true)
    public User findById(Long id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        }
        return user;
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User save(User user) {
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Role getRoleByUserId(Long userId) {
        return userRepository.findRoleByUserId(userId);
    }

    @Override
    public Clan getClanByUserId(Long userId) {
        return userRepository.findClanByUserId(userId);
    }

    @Override
    public ClanRank getClanRankByUserId(Long userId) {
        return userRepository.findClanRankByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Clan findClanByUserId(Long userId) {
        return userRepository.findClanByUserId(userId);
    }

    @Transactional(readOnly = true)
    public User findRandomUser(Long currentUserId){
        return userRepository.findRandomUser(currentUserId);
    }

    @Transactional(readOnly = true)
    public Page<List<User>> findUsersTopTen() {
        Pageable pageable = PageRequest.of(0, 10);
        return userRepository.findAllByOrderByTrophiesDesc(pageable);
    }

    @Override
    public Long getUserIdByEmailAndPassword(String email, String password) {
        return userRepository.getUserIdByEmailAndPassword(email, password);
    }

//    @Transactional(readOnly = true)
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(email);
//        if (user == null){
//            throw new UsernameNotFoundException("Invalid username or password.");
//        }
//        return new org.springframework.security.core.userdetails.User(user.getEmail(),
//                user.getPassword(),
//                mapRolesToAuthorities(user.getRoles()));
//    }
//
//    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
//        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
//    }
}
