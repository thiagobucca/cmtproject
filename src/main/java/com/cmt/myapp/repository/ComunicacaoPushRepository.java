package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ComunicacaoPush;
import com.cmt.myapp.domain.enumeration.TipoPessoa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComunicacaoPush entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComunicacaoPushRepository extends JpaRepository<ComunicacaoPush, Long> {
    public Page<ComunicacaoPush> findAllByTipoPessoa(Pageable pageable, TipoPessoa tipoPessoa);
}
