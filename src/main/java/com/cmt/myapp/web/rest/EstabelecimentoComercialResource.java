package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.EstabelecimentoComercial;
import com.cmt.myapp.repository.EstabelecimentoComercialRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EstabelecimentoComercial.
 */
@RestController
@RequestMapping("/api")
public class EstabelecimentoComercialResource {

    private final Logger log = LoggerFactory.getLogger(EstabelecimentoComercialResource.class);

    private static final String ENTITY_NAME = "estabelecimentoComercial";

    private final EstabelecimentoComercialRepository estabelecimentoComercialRepository;

    public EstabelecimentoComercialResource(EstabelecimentoComercialRepository estabelecimentoComercialRepository) {
        this.estabelecimentoComercialRepository = estabelecimentoComercialRepository;
    }

    /**
     * POST  /estabelecimento-comercials : Create a new estabelecimentoComercial.
     *
     * @param estabelecimentoComercial the estabelecimentoComercial to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estabelecimentoComercial, or with status 400 (Bad Request) if the estabelecimentoComercial has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estabelecimento-comercials")
    @Timed
    public ResponseEntity<EstabelecimentoComercial> createEstabelecimentoComercial(@RequestBody EstabelecimentoComercial estabelecimentoComercial) throws URISyntaxException {
        log.debug("REST request to save EstabelecimentoComercial : {}", estabelecimentoComercial);
        if (estabelecimentoComercial.getId() != null) {
            throw new BadRequestAlertException("A new estabelecimentoComercial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstabelecimentoComercial result = estabelecimentoComercialRepository.save(estabelecimentoComercial);
        return ResponseEntity.created(new URI("/api/estabelecimento-comercials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estabelecimento-comercials : Updates an existing estabelecimentoComercial.
     *
     * @param estabelecimentoComercial the estabelecimentoComercial to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estabelecimentoComercial,
     * or with status 400 (Bad Request) if the estabelecimentoComercial is not valid,
     * or with status 500 (Internal Server Error) if the estabelecimentoComercial couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estabelecimento-comercials")
    @Timed
    public ResponseEntity<EstabelecimentoComercial> updateEstabelecimentoComercial(@RequestBody EstabelecimentoComercial estabelecimentoComercial) throws URISyntaxException {
        log.debug("REST request to update EstabelecimentoComercial : {}", estabelecimentoComercial);
        if (estabelecimentoComercial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstabelecimentoComercial result = estabelecimentoComercialRepository.save(estabelecimentoComercial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estabelecimentoComercial.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estabelecimento-comercials : get all the estabelecimentoComercials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estabelecimentoComercials in body
     */
    @GetMapping("/estabelecimento-comercials")
    @Timed
    public List<EstabelecimentoComercial> getAllEstabelecimentoComercials() {
        log.debug("REST request to get all EstabelecimentoComercials");
        return estabelecimentoComercialRepository.findAll();
    }

    /**
     * GET  /estabelecimento-comercials/:id : get the "id" estabelecimentoComercial.
     *
     * @param id the id of the estabelecimentoComercial to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estabelecimentoComercial, or with status 404 (Not Found)
     */
    @GetMapping("/estabelecimento-comercials/{id}")
    @Timed
    public ResponseEntity<EstabelecimentoComercial> getEstabelecimentoComercial(@PathVariable Long id) {
        log.debug("REST request to get EstabelecimentoComercial : {}", id);
        Optional<EstabelecimentoComercial> estabelecimentoComercial = estabelecimentoComercialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estabelecimentoComercial);
    }

    /**
     * DELETE  /estabelecimento-comercials/:id : delete the "id" estabelecimentoComercial.
     *
     * @param id the id of the estabelecimentoComercial to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estabelecimento-comercials/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstabelecimentoComercial(@PathVariable Long id) {
        log.debug("REST request to delete EstabelecimentoComercial : {}", id);

        estabelecimentoComercialRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
