package com.cmt.myapp.repository;

import com.cmt.myapp.domain.PerfilUsuario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerfilUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerfilUsuarioRepository extends JpaRepository<PerfilUsuario, Long> {

}
