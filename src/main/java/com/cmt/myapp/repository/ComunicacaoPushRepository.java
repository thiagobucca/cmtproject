package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ComunicacaoPush;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComunicacaoPush entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComunicacaoPushRepository extends JpaRepository<ComunicacaoPush, Long> {

}
