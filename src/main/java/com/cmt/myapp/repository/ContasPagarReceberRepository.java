package com.cmt.myapp.repository;

import java.time.Instant;

import com.cmt.myapp.domain.ContasPagarReceber;
import com.cmt.myapp.domain.enumeration.TipoLancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContasPagarReceber entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContasPagarReceberRepository extends JpaRepository<ContasPagarReceber, Long> {
    
    public Page<ContasPagarReceber> findByDataBetween(Pageable pageable, Instant dataInicial, Instant dataFinal);

    public Page<ContasPagarReceber> findByDataBetweenAndTipoOperacaoTipoLancamento(Pageable pageable, Instant dataInicial, Instant dataFinal, TipoLancamento tipoLancamento);

    public Page<ContasPagarReceber> findByDataBetweenAndTipoOperacaoId(Pageable pageable, Instant dataInicial, Instant dataFinal, Long tipoOperacao);
}
