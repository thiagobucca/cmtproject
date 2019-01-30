package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ContatoEstabelecimento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContatoEstabelecimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContatoEstabelecimentoRepository extends JpaRepository<ContatoEstabelecimento, Long> {

}
