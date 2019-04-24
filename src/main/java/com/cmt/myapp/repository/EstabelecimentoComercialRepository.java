package com.cmt.myapp.repository;

import com.cmt.myapp.domain.EstabelecimentoComercial;
import com.cmt.myapp.domain.LojaMaconica;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the EstabelecimentoComercial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstabelecimentoComercialRepository extends JpaRepository<EstabelecimentoComercial, Long> {

    Page<EstabelecimentoComercial> findAllByBolAtivo(Pageable pageable, boolean bolAtivo);
    Page<EstabelecimentoComercial> findByNomeContainingAndBolAtivo(Pageable pageable, String nome, Boolean bolAtivo);
    Page<EstabelecimentoComercial> findAllByCategoriaIdAndBolAtivo(Pageable pageable, Long categoria_id, Boolean bolAtivo);
    Optional<EstabelecimentoComercial> findOneByCodCnpj(String codCnpj);
    List<EstabelecimentoComercial> findByEstabelecimentoMatrizId(Long id);
    Page<EstabelecimentoComercial> findByGrupoId(Pageable pageable,Long grupoId, Boolean bolAtivo);
    
    
}
