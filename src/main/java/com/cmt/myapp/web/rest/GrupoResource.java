package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.Grupo;
import com.cmt.myapp.repository.GrupoRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
 * REST controller for managing Grupo.
 */
@RestController
@RequestMapping("/api")
public class GrupoResource {

    private final Logger log = LoggerFactory.getLogger(GrupoResource.class);

    private static final String ENTITY_NAME = "grupo";

    private final GrupoRepository grupoRepository;

    public GrupoResource(GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    /**
     * POST /grupos : Create a new grupo.
     *
     * @param grupo the grupo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         grupo, or with status 400 (Bad Request) if the grupo has already an
     *         ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/grupos")
    @Timed
    public ResponseEntity<Grupo> createGrupo(@RequestBody Grupo grupo) throws URISyntaxException {
        log.debug("REST request to save Grupo : {}", grupo);
        if (grupo.getId() != null) {
            throw new BadRequestAlertException("A new grupo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Grupo result = grupoRepository.save(grupo);
        return ResponseEntity.created(new URI("/api/grupos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /grupos : Updates an existing grupo.
     *
     * @param grupo the grupo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         grupo, or with status 400 (Bad Request) if the grupo is not valid, or
     *         with status 500 (Internal Server Error) if the grupo couldn't be
     *         updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/grupos")
    @Timed
    public ResponseEntity<Grupo> updategrupo(@RequestBody Grupo grupo) throws URISyntaxException {
        log.debug("REST request to update Grupo : {}", grupo);
        if (grupo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Grupo result = grupoRepository.save(grupo);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, grupo.getId().toString()))
                .body(result);
    }

    /**
     * GET /grupos : get all the grupos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of grupos in
     *         body
     */
    @GetMapping("/grupos")
    @Timed
    public ResponseEntity<List<Grupo>> getAllGrupos(Pageable pageable,
            @RequestParam(value = "bolAtivo", required = false) Boolean bolAtivo) {

        log.debug("REST request to get a page of Grupos");
        Page<Grupo> page = null;

        if (pageable == null || pageable.getPageSize() == 20) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        if (bolAtivo != null)
            page = grupoRepository.findAllByBolAtivo(pageable, bolAtivo);
        else
            page = grupoRepository.findAll(pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/grupos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /grupos/:id : get the "id" grupo.
     *a
     * @param id the id of the grupo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the grupo, or with status 404 (Not Found)
     */
    @GetMapping("/grupos/{id}")
    @Timed
    public ResponseEntity<Grupo> getGrupo(@PathVariable Long id) {
        log.debug("REST request to get Grupo : {}", id);
        Optional<Grupo> grupo = grupoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupo);
    }

    /**
     * DELETE /grupos/:id : delete the "id" grupo.
     *
     * @param id the id of the grupo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/grupos/{id}")
    @Timed
    public ResponseEntity<Void> deletegrupo(@PathVariable Long id) {
        log.debug("REST request to delete Grupo : {}", id);

        grupoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
