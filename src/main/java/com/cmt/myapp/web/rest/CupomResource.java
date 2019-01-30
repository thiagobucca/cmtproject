package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.Cupom;
import com.cmt.myapp.repository.CupomRepository;
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
 * REST controller for managing Cupom.
 */
@RestController
@RequestMapping("/api")
public class CupomResource {

    private final Logger log = LoggerFactory.getLogger(CupomResource.class);

    private static final String ENTITY_NAME = "cupom";

    private final CupomRepository cupomRepository;

    public CupomResource(CupomRepository cupomRepository) {
        this.cupomRepository = cupomRepository;
    }

    /**
     * POST  /cupoms : Create a new cupom.
     *
     * @param cupom the cupom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cupom, or with status 400 (Bad Request) if the cupom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cupoms")
    @Timed
    public ResponseEntity<Cupom> createCupom(@RequestBody Cupom cupom) throws URISyntaxException {
        log.debug("REST request to save Cupom : {}", cupom);
        if (cupom.getId() != null) {
            throw new BadRequestAlertException("A new cupom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cupom result = cupomRepository.save(cupom);
        return ResponseEntity.created(new URI("/api/cupoms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cupoms : Updates an existing cupom.
     *
     * @param cupom the cupom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cupom,
     * or with status 400 (Bad Request) if the cupom is not valid,
     * or with status 500 (Internal Server Error) if the cupom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cupoms")
    @Timed
    public ResponseEntity<Cupom> updateCupom(@RequestBody Cupom cupom) throws URISyntaxException {
        log.debug("REST request to update Cupom : {}", cupom);
        if (cupom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cupom result = cupomRepository.save(cupom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cupom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cupoms : get all the cupoms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cupoms in body
     */
    @GetMapping("/cupoms")
    @Timed
    public ResponseEntity<List<Cupom>> getAllCupoms(Pageable pageable) {
        log.debug("REST request to get a page of Cupoms");
        Page<Cupom> page = cupomRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cupoms");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /cupoms/:id : get the "id" cupom.
     *
     * @param id the id of the cupom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cupom, or with status 404 (Not Found)
     */
    @GetMapping("/cupoms/{id}")
    @Timed
    public ResponseEntity<Cupom> getCupom(@PathVariable Long id) {
        log.debug("REST request to get Cupom : {}", id);
        Optional<Cupom> cupom = cupomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cupom);
    }

    /**
     * DELETE  /cupoms/:id : delete the "id" cupom.
     *
     * @param id the id of the cupom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cupoms/{id}")
    @Timed
    public ResponseEntity<Void> deleteCupom(@PathVariable Long id) {
        log.debug("REST request to delete Cupom : {}", id);

        cupomRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
