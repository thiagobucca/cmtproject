package com.cmt.myapp.repository;

import com.cmt.myapp.domain.Cupom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cupom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {

}
