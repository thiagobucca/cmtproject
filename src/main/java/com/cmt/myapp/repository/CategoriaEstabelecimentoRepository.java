package com.cmt.myapp.repository;

import com.cmt.myapp.domain.CategoriaEstabelecimento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * Spring Data  repository for the CategoriaEstabelecimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaEstabelecimentoRepository extends JpaRepository<CategoriaEstabelecimento, Long> {
    public Page<CategoriaEstabelecimento> findAllByBolAtivo(Pageable pageable, Boolean bolAtivo);
}

