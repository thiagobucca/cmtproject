package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ComunicacaoPushLoja;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComunicacaoPushLoja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComunicacaoPushLojaRepository extends JpaRepository<ComunicacaoPushLoja, Long> {

}
