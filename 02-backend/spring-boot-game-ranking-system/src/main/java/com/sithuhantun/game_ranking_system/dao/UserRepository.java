package com.sithuhantun.game_ranking_system.dao;

import com.sithuhantun.game_ranking_system.model.Clan;
import com.sithuhantun.game_ranking_system.model.ClanRank;
import com.sithuhantun.game_ranking_system.model.Role;
import com.sithuhantun.game_ranking_system.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "players", path = "players")
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    Page<List<User>> findAllByOrderByFirstNameAsc(Pageable pageable);

    Page<List<User>> findAllByClanIdOrderByClanRankIdAsc(Long clanId, Pageable pageable);

    List<User> findAllByClanIdOrderByClanRankIdAsc(Long clanId);

    @Query("SELECT u.role FROM User u WHERE u.id = :id")
    Role findRoleByUserId(@Param("id") Long id);

    @Query("SELECT u.clan FROM User u WHERE u.id = :id")
    Clan findClanByUserId(@Param("id") Long id);

    @Query("SELECT u.clanRank FROM User u WHERE u.id = :id")
    ClanRank findClanRankByUserId(@Param("id") Long id);

    @Query("SELECT u FROM User u WHERE u.id <> :currentUserId ORDER BY RAND() LIMIT 1")
    User findRandomUser(@Param("currentUserId")Long currentUserId);

    @Query("SELECT u.id FROM User u WHERE u.email = :email AND u.password = :password")
    Long getUserIdByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    Page<List<User>> findAllByOrderByTrophiesDesc(Pageable pageable);

//    @Query("UPDATE User u SET u.clan.id = :clanId WHERE u.id = :id")
//    User updateClanIdById(Long id, Long clanId);

    //hides the DELETE endpoint that automatically created by Spring Data REST
//    @RestResource(exported = false)
//    void deleteById(Long id);
}