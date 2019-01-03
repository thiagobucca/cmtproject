package com.cmt.myapp.repository;

import com.cmt.myapp.domain.CategoriaEstabelecimento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriaEstabelecimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaEstabelecimentoRepository extends JpaRepository<CategoriaEstabelecimento, Long> {

}
