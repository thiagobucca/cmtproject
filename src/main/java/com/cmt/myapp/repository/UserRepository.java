package com.cmt.myapp.repository;

import com.cmt.myapp.domain.Authority;
import com.cmt.myapp.domain.User;
import com.cmt.myapp.domain.enumeration.TipoPessoa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.Instant;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);
    
    Page<User> findAllByTipoPessoa(Pageable pageable, TipoPessoa tipoPessoa);
    
    Page<User> findAllByActivated(Pageable pageable, boolean bolAtivo);

    Optional<User> findOneByTipoPessoaAndPlacet(TipoPessoa tipoPessoa, String placet);
    
    //List<User> findAllByLojaMaconicaId(Long lojaMaconicaId);
    
    Optional<User> findOneByIdAndPlacet(Long id, String placet);

    Page<User> findAllByLojaMaconicaId(Pageable pageable, Long lojaMaconicaId);

    List<User> findAllByLojaMaconicaId( Long lojaMaconicaId);


    @EntityGraph(attributePaths = "authorities")
    Page<User> findOneWithAuthoritiesByAuthoritiesIn(Pageable pageable, Set<Authority> auth);
    
}
