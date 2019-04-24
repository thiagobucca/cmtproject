package com.cmt.myapp.repository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.cmt.myapp.domain.Grupo;
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
public interface GrupoRepository extends JpaRepository<Grupo, Long> {
    public Page<Grupo> findAllByBolAtivo(Pageable pageable, Boolean bolAtivo);
}


