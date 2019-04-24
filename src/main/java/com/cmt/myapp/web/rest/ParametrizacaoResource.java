package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.Parametrizacao;
import com.cmt.myapp.repository.ParametrizacaoRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Parametrizacao.
 */
@RestController
@RequestMapping("/api")
public class ParametrizacaoResource {

    private final Logger log = LoggerFactory.getLogger(ParametrizacaoResource.class);

    private static final String ENTITY_NAME = "parametrizacao";

    private final ParametrizacaoRepository parametrizacaoRepository;

    public ParametrizacaoResource(ParametrizacaoRepository parametrizacaoRepository) {
        this.parametrizacaoRepository = parametrizacaoRepository;
    }

    /**
     * POST /parametrizacaos : Create a new parametrizacao.
     *
     * @param parametrizacao the parametrizacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         parametrizacao, or with status 400 (Bad Request) if the
     *         parametrizacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parametrizacaos")
    @Timed
    public ResponseEntity<Parametrizacao> createParametrizacao(@RequestBody Parametrizacao parametrizacao)
            throws URISyntaxException {
        log.debug("REST request to save Parametrizacao : {}", parametrizacao);
        if (parametrizacao.getId() != null) {
            throw new BadRequestAlertException("A new parametrizacao cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        try {
            Parametrizacao result = parametrizacaoRepository.save(parametrizacao);
            return ResponseEntity.created(new URI("/api/parametrizacaos/" + result.getId()))
                    .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
        } catch (Exception ex) {
            throw new BadRequestAlertException("Já existe uma parametrização com estas configurações", ENTITY_NAME,
                    "duplicate");
        }

    }

    /**
     * PUT /parametrizacaos : Updates an existing parametrizacao.
     *
     * @param parametrizacao the parametrizacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         parametrizacao, or with status 400 (Bad Request) if the
     *         parametrizacao is not valid, or with status 500 (Internal Server
     *         Error) if the parametrizacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parametrizacaos")
    @Timed
    public ResponseEntity<Parametrizacao> updateParametrizacao(@RequestBody Parametrizacao parametrizacao)
            throws URISyntaxException {
        log.debug("REST request to update Parametrizacao : {}", parametrizacao);
        if (parametrizacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        try {

            Parametrizacao result = parametrizacaoRepository.save(parametrizacao);
            return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parametrizacao.getId().toString()))
                    .body(result);

        } catch (Exception ex) {
            throw new BadRequestAlertException("Já existe uma parametrização com estas configurações", ENTITY_NAME,
                    "duplicate");
        }
    }

    /**
     * GET /parametrizacaos : get all the parametrizacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of
     *         parametrizacaos in body
     */
    @GetMapping("/parametrizacaos")
    @Timed
    public List<Parametrizacao> getAllParametrizacaos() {
        log.debug("REST request to get all Parametrizacaos");
        return parametrizacaoRepository.findAll();
    }

    /**
     * GET /parametrizacaos/:id : get the "id" parametrizacao.
     *
     * @param id the id of the parametrizacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         parametrizacao, or with status 404 (Not Found)
     */
    @GetMapping("/parametrizacaos/{id}")
    @Timed
    public ResponseEntity<Parametrizacao> getParametrizacao(@PathVariable Long id) {
        log.debug("REST request to get Parametrizacao : {}", id);
        Optional<Parametrizacao> parametrizacao = parametrizacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parametrizacao);
    }

    /**
     * DELETE /parametrizacaos/:id : delete the "id" parametrizacao.
     *
     * @param id the id of the parametrizacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parametrizacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteParametrizacao(@PathVariable Long id) {
        log.debug("REST request to delete Parametrizacao : {}", id);

        parametrizacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
