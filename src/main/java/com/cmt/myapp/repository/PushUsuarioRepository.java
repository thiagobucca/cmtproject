package com.cmt.myapp.repository;

import com.cmt.myapp.domain.PushUsuario;
import com.cmt.myapp.domain.TipoOperacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Spring Data  repository for the TipoOperacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PushUsuarioRepository extends JpaRepository<PushUsuario, Long> {
    Page<PushUsuario> findAllByUsuarioId(Pageable pageable, Long usuarioId);
}
