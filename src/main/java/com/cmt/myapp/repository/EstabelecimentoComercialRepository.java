package com.cmt.myapp.repository;

import com.cmt.myapp.domain.EstabelecimentoComercial;
import com.cmt.myapp.domain.LojaMaconica;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the EstabelecimentoComercial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstabelecimentoComercialRepository extends JpaRepository<EstabelecimentoComercial, Long> {

    Page<EstabelecimentoComercial> findAllByBolAtivo(Pageable pageable, boolean bolAtivo);
    Page<EstabelecimentoComercial> findByNomeContaining(Pageable pageable, String nome);
    Page<EstabelecimentoComercial> findAllByCategoriaId(Pageable pageable, Long categoria_id);
    Optional<EstabelecimentoComercial> findOneByCodCnpj(String codCnpj);
    
}
