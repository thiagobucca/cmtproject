package com.cmt.myapp.repository;

import java.time.Instant;

import com.cmt.myapp.domain.AgendaEventos;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgendaEventos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaEventosRepository extends JpaRepository<AgendaEventos, Long> {

    public Page<AgendaEventos> findAllByDataAfter(Instant data);

}
