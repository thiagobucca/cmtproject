package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.TipoOperacao;
import com.cmt.myapp.repository.TipoOperacaoRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TipoOperacao.
 */
@RestController
@RequestMapping("/api")
public class TipoOperacaoResource {

    private final Logger log = LoggerFactory.getLogger(TipoOperacaoResource.class);

    private static final String ENTITY_NAME = "tipoOperacao";

    private final TipoOperacaoRepository tipoOperacaoRepository;

    public TipoOperacaoResource(TipoOperacaoRepository tipoOperacaoRepository) {
        this.tipoOperacaoRepository = tipoOperacaoRepository;
    }

    /**
     * POST  /tipo-operacaos : Create a new tipoOperacao.
     *
     * @param tipoOperacao the tipoOperacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoOperacao, or with status 400 (Bad Request) if the tipoOperacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-operacaos")
    @Timed
    public ResponseEntity<TipoOperacao> createTipoOperacao(@RequestBody TipoOperacao tipoOperacao) throws URISyntaxException {
        log.debug("REST request to save TipoOperacao : {}", tipoOperacao);
        if (tipoOperacao.getId() != null) {
            throw new BadRequestAlertException("A new tipoOperacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoOperacao result = tipoOperacaoRepository.save(tipoOperacao);
        return ResponseEntity.created(new URI("/api/tipo-operacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-operacaos : Updates an existing tipoOperacao.
     *
     * @param tipoOperacao the tipoOperacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoOperacao,
     * or with status 400 (Bad Request) if the tipoOperacao is not valid,
     * or with status 500 (Internal Server Error) if the tipoOperacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-operacaos")
    @Timed
    public ResponseEntity<TipoOperacao> updateTipoOperacao(@RequestBody TipoOperacao tipoOperacao) throws URISyntaxException {
        log.debug("REST request to update TipoOperacao : {}", tipoOperacao);
        if (tipoOperacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoOperacao result = tipoOperacaoRepository.save(tipoOperacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoOperacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-operacaos : get all the tipoOperacaos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tipoOperacaos in body
     */
    @GetMapping("/tipo-operacaos")
    @Timed
    public ResponseEntity<List<TipoOperacao>> getAllTipoOperacaos(Pageable pageable) {
        log.debug("REST request to get a page of TipoOperacaos");
        Page<TipoOperacao> page = tipoOperacaoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipo-operacaos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /tipo-operacaos/:id : get the "id" tipoOperacao.
     *
     * @param id the id of the tipoOperacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoOperacao, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-operacaos/{id}")
    @Timed
    public ResponseEntity<TipoOperacao> getTipoOperacao(@PathVariable Long id) {
        log.debug("REST request to get TipoOperacao : {}", id);
        Optional<TipoOperacao> tipoOperacao = tipoOperacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoOperacao);
    }

    /**
     * DELETE  /tipo-operacaos/:id : delete the "id" tipoOperacao.
     *
     * @param id the id of the tipoOperacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-operacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoOperacao(@PathVariable Long id) {
        log.debug("REST request to delete TipoOperacao : {}", id);

        tipoOperacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET /users : get all lojas-maconicas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/tipo-operacaos/status/{bolAtivo}")
    @Timed
    public ResponseEntity<List<TipoOperacao>> getAllUsersByStatus(@PathVariable boolean bolAtivo, Pageable pageable) {
        final Page<TipoOperacao> page = tipoOperacaoRepository.findAllByBolAtivo(pageable, bolAtivo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipo-operacaos/git/status/");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
