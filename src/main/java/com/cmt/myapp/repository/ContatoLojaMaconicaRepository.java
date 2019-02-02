package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ContatoLojaMaconica;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContatoLojaMaconica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContatoLojaMaconicaRepository extends JpaRepository<ContatoLojaMaconica, Long> {

    public Page<ContatoLojaMaconica> findAllByLojaMaconicaId(Pageable pageable,Long loja_maconica_id);

}
