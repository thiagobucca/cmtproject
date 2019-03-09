package com.cmt.myapp.repository;

import java.util.Optional;

import com.cmt.myapp.domain.LojaMaconica;
import com.cmt.myapp.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LojaMaconica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LojaMaconicaRepository extends JpaRepository<LojaMaconica, Long> {
	

    Page<LojaMaconica> findAllByBolAtivoOrderByNome(Pageable pageable, boolean bolAtivo);
    Optional<LojaMaconica> findOneByCodCnpj(String codCnpj);

}
