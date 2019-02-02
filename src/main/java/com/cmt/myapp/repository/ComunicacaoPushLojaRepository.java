package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ComunicacaoPushLoja;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComunicacaoPushLoja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComunicacaoPushLojaRepository extends JpaRepository<ComunicacaoPushLoja, Long> {

    public Page<ComunicacaoPushLoja> findAllByLojaMaconicaId(Pageable pageable,Long usualoja_maconica_idrio_id);

}
