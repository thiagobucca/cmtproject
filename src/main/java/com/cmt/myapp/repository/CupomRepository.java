package com.cmt.myapp.repository;

import java.time.OffsetDateTime;
import java.util.List;

import com.cmt.myapp.domain.Cupom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cupom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {

    public Page<Cupom> findAllByUsuarioId(Pageable pageable,Long usuario_id);

    public Page<Cupom> findByDataAfter(Pageable pageable, OffsetDateTime  dataInicial);

    
}
