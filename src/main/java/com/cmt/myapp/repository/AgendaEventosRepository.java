package com.cmt.myapp.repository;

import com.cmt.myapp.domain.AgendaEventos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgendaEventos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaEventosRepository extends JpaRepository<AgendaEventos, Long> {

}
