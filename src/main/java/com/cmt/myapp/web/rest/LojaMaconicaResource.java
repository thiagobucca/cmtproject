package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.LojaMaconica;
import com.cmt.myapp.domain.User;
import com.cmt.myapp.repository.LojaMaconicaRepository;
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
 * REST controller for managing LojaMaconica.
 */
@RestController
@RequestMapping("/api")
public class LojaMaconicaResource {

    private final Logger log = LoggerFactory.getLogger(LojaMaconicaResource.class);

    private static final String ENTITY_NAME = "lojaMaconica";

    private final LojaMaconicaRepository lojaMaconicaRepository;

    public LojaMaconicaResource(LojaMaconicaRepository lojaMaconicaRepository) {
        this.lojaMaconicaRepository = lojaMaconicaRepository;
    }

    /**
     * POST  /loja-maconicas : Create a new lojaMaconica.
     *
     * @param lojaMaconica the lojaMaconica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lojaMaconica, or with status 400 (Bad Request) if the lojaMaconica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/loja-maconicas")
    @Timed
    public ResponseEntity<LojaMaconica> createLojaMaconica(@RequestBody LojaMaconica lojaMaconica) throws URISyntaxException {
        log.debug("REST request to save LojaMaconica : {}", lojaMaconica);
        if (lojaMaconica.getId() != null) {
            throw new BadRequestAlertException("A new lojaMaconica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LojaMaconica result = lojaMaconicaRepository.save(lojaMaconica);
        return ResponseEntity.created(new URI("/api/loja-maconicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /loja-maconicas : Updates an existing lojaMaconica.
     *
     * @param lojaMaconica the lojaMaconica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lojaMaconica,
     * or with status 400 (Bad Request) if the lojaMaconica is not valid,
     * or with status 500 (Internal Server Error) if the lojaMaconica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/loja-maconicas")
    @Timed
    public ResponseEntity<LojaMaconica> updateLojaMaconica(@RequestBody LojaMaconica lojaMaconica) throws URISyntaxException {
        log.debug("REST request to update LojaMaconica : {}", lojaMaconica);
        if (lojaMaconica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LojaMaconica result = lojaMaconicaRepository.save(lojaMaconica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lojaMaconica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /loja-maconicas : get all the lojaMaconicas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lojaMaconicas in body
     */
    @GetMapping("/loja-maconicas")
    @Timed
    public ResponseEntity<List<LojaMaconica>> getAllLojaMaconicas(Pageable pageable) {
        log.debug("REST request to get a page of LojaMaconicas");
        Page<LojaMaconica> page = lojaMaconicaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/loja-maconicas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /loja-maconicas/:id : get the "id" lojaMaconica.
     *
     * @param id the id of the lojaMaconica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lojaMaconica, or with status 404 (Not Found)
     */
    @GetMapping("/loja-maconicas/{id}")
    @Timed
    public ResponseEntity<LojaMaconica> getLojaMaconica(@PathVariable Long id) {
        log.debug("REST request to get LojaMaconica : {}", id);
        Optional<LojaMaconica> lojaMaconica = lojaMaconicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lojaMaconica);
    }

    /**
     * DELETE  /loja-maconicas/:id : delete the "id" lojaMaconica.
     *
     * @param id the id of the lojaMaconica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/loja-maconicas/{id}")
    @Timed
    public ResponseEntity<Void> deleteLojaMaconica(@PathVariable Long id) {
        log.debug("REST request to delete LojaMaconica : {}", id);

        lojaMaconicaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * GET /users : get all lojas-maconicas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/loja-maconicas/status/{bolAtivo}")
    @Timed
    public ResponseEntity<List<LojaMaconica>> getAllUsersByStatus(@PathVariable boolean bolAtivo, Pageable pageable) {
        final Page<LojaMaconica> page = lojaMaconicaRepository.findAllByBolAtivo(pageable, bolAtivo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/loja-maconicas/status/");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
