package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.model.Clan;
import com.sithuhantun.game_ranking_system.model.ClanRank;
import com.sithuhantun.game_ranking_system.model.Role;
import com.sithuhantun.game_ranking_system.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.util.List;

//public interface UserService extends UserDetailsService {
public interface UserService {
    Page<List<User>> findAll(int page, int size);
    Page<List<User>> findAllByClanId(Long clanId, int page, int size);
    List<User> findAllByClanId(Long clanId);
    User findById(Long id);
    User findByEmail(String email);
    User save(User user);
    void deleteById(Long id);
    Role getRoleByUserId(Long userId);
    Clan getClanByUserId(Long userId);
    ClanRank getClanRankByUserId(Long userId);
    User findRandomUser(Long userId);
    Page<List<User>> findUsersTopTen();
    Long getUserIdByEmailAndPassword(String email, String password);
}
