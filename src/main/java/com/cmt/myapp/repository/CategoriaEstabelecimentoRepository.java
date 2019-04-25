package com.cmt.myapp.repository;

import java.util.List;

import com.cmt.myapp.domain.CategoriaEstabelecimento;
import com.cmt.myapp.service.dto.CategoriaEstabelecimentoDTO;

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

    public List<CategoriaEstabelecimento> findAllByBolAtivo(Boolean bolAtivo);

    @Query("select new com.cmt.myapp.service.dto.CategoriaEstabelecimentoDTO(a.id, a.nome, COUNT(c.id))  FROM CategoriaEstabelecimento a, EstabelecimentoComercial c WHERE c.categoriaEstabelecimentoId = a.id AND c.bolAtivo = true GROUP BY a.id, a.nome ")
    public List<CategoriaEstabelecimentoDTO> findCategorias();

}

