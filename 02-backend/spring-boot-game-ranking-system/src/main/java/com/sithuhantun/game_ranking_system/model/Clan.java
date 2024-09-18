package com.sithuhantun.game_ranking_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "clan")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Clan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "max_num_of_members")
    private int maxNumOfMembers;

    @Column(name = "required_trophies")
    private int requiredTrophies;

    @OneToMany(mappedBy = "clan",
            fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH})
    @JsonIgnore
    private List<User> playerList;

    public Clan(String name, int maxNumOfMembers, int requiredTrophies) {
        this.name = name;
        this.maxNumOfMembers = maxNumOfMembers;
        this.requiredTrophies = requiredTrophies;
    }
}
