package com.cmt.myapp.repository;

import com.cmt.myapp.domain.ContasPagarReceber;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContasPagarReceber entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContasPagarReceberRepository extends JpaRepository<ContasPagarReceber, Long> {

}
