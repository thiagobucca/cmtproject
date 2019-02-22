package com.cmt.myapp.repository;

import com.cmt.myapp.domain.TipoOperacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Spring Data  repository for the TipoOperacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoOperacaoRepository extends JpaRepository<TipoOperacao, Long> {
    Page<TipoOperacao> findAllByBolAtivo(Pageable pageable, boolean bolAtivo);
}
