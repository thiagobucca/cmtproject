package com.cmt.myapp.repository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.cmt.myapp.domain.Cupom;
import com.cmt.myapp.domain.enumeration.StatusCupom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cupom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {

    public Page<Cupom> findAllByUsuarioId(Pageable pageable,Long usuario_id);

    public Page<Cupom> findAllByUsuarioIdAndStatusCupomOrderByDataDesc(Pageable pageable,Long usuario_id,StatusCupom status);

    //@Query("SELECT e FROM Cupom e WHERE e.data BETWEEN :dataInicial AND :dataFinal")
    public Page<Cupom> findByDataBetween(Pageable pageable, Instant dataInicial, Instant dataFinal);

    public Page<Cupom> findByDataBetweenAndEstabelecimentoComercialId(Pageable pageable, Instant dataInicial, Instant dataFinal, Long estabelecimentoId);

    public Page<Cupom> findByDataBetweenAndUsuarioLojaMaconicaId(Pageable pageable, Instant dataInicial, Instant dataFinal, Long lojaMaconicaId);

    public Optional<Cupom> findOneByDataAndValorAndNumeroAndEstabelecimentoComercialId(Instant data, Number valor, String numero, Long estabelecimentoId);

    @Query(value = "select c from Cupom c INNER JOIN EstabelecimentoComercial e ON c.estabelecimentoComercialId = e.id  where e.grupoId = ?1 AND c.data between ?2 and ?3",
    countQuery = "select COUNT(c.id) from Cupom c INNER JOIN EstabelecimentoComercial e ON c.estabelecimentoComercialId = e.id  where e.grupoId = ?1 AND c.data between ?2 and ?3")
    public Page<Cupom> findByDataBetweenAndGrupo(Pageable pageable, Long grupoId, Instant dataInicio, Instant dataFim);
}


