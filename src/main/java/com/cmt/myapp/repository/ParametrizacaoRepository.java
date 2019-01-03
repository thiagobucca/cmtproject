package com.cmt.myapp.repository;

import com.cmt.myapp.domain.Parametrizacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Parametrizacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParametrizacaoRepository extends JpaRepository<Parametrizacao, Long> {

}
