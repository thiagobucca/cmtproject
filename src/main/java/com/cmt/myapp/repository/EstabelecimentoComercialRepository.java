package com.cmt.myapp.repository;

import com.cmt.myapp.domain.EstabelecimentoComercial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstabelecimentoComercial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstabelecimentoComercialRepository extends JpaRepository<EstabelecimentoComercial, Long> {

}
