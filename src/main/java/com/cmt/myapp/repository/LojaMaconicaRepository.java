package com.cmt.myapp.repository;

import com.cmt.myapp.domain.LojaMaconica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LojaMaconica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LojaMaconicaRepository extends JpaRepository<LojaMaconica, Long> {

}
