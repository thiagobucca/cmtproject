package com.cmt.myapp.repository;

import com.cmt.myapp.domain.TipoOperacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoOperacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoOperacaoRepository extends JpaRepository<TipoOperacao, Long> {

}
