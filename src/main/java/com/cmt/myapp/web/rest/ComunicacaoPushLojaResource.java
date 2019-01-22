package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ComunicacaoPushLoja;
import com.cmt.myapp.repository.ComunicacaoPushLojaRepository;
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
 * REST controller for managing ComunicacaoPushLoja.
 */
@RestController
@RequestMapping("/api")
public class ComunicacaoPushLojaResource {

    private final Logger log = LoggerFactory.getLogger(ComunicacaoPushLojaResource.class);

    private static final String ENTITY_NAME = "comunicacaoPushLoja";

    private final ComunicacaoPushLojaRepository comunicacaoPushLojaRepository;

    public ComunicacaoPushLojaResource(ComunicacaoPushLojaRepository comunicacaoPushLojaRepository) {
        this.comunicacaoPushLojaRepository = comunicacaoPushLojaRepository;
    }

    /**
     * POST  /comunicacao-push-lojas : Create a new comunicacaoPushLoja.
     *
     * @param comunicacaoPushLoja the comunicacaoPushLoja to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comunicacaoPushLoja, or with status 400 (Bad Request) if the comunicacaoPushLoja has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comunicacao-push-lojas")
    @Timed
    public ResponseEntity<ComunicacaoPushLoja> createComunicacaoPushLoja(@RequestBody ComunicacaoPushLoja comunicacaoPushLoja) throws URISyntaxException {
        log.debug("REST request to save ComunicacaoPushLoja : {}", comunicacaoPushLoja);
        if (comunicacaoPushLoja.getId() != null) {
            throw new BadRequestAlertException("A new comunicacaoPushLoja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComunicacaoPushLoja result = comunicacaoPushLojaRepository.save(comunicacaoPushLoja);
        return ResponseEntity.created(new URI("/api/comunicacao-push-lojas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comunicacao-push-lojas : Updates an existing comunicacaoPushLoja.
     *
     * @param comunicacaoPushLoja the comunicacaoPushLoja to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comunicacaoPushLoja,
     * or with status 400 (Bad Request) if the comunicacaoPushLoja is not valid,
     * or with status 500 (Internal Server Error) if the comunicacaoPushLoja couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comunicacao-push-lojas")
    @Timed
    public ResponseEntity<ComunicacaoPushLoja> updateComunicacaoPushLoja(@RequestBody ComunicacaoPushLoja comunicacaoPushLoja) throws URISyntaxException {
        log.debug("REST request to update ComunicacaoPushLoja : {}", comunicacaoPushLoja);
        if (comunicacaoPushLoja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ComunicacaoPushLoja result = comunicacaoPushLojaRepository.save(comunicacaoPushLoja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comunicacaoPushLoja.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comunicacao-push-lojas : get all the comunicacaoPushLojas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of comunicacaoPushLojas in body
     */
    @GetMapping("/comunicacao-push-lojas")
    @Timed
    public List<ComunicacaoPushLoja> getAllComunicacaoPushLojas() {
        log.debug("REST request to get all ComunicacaoPushLojas");
        return comunicacaoPushLojaRepository.findAll();
    }

    /**
     * GET  /comunicacao-push-lojas/:id : get the "id" comunicacaoPushLoja.
     *
     * @param id the id of the comunicacaoPushLoja to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comunicacaoPushLoja, or with status 404 (Not Found)
     */
    @GetMapping("/comunicacao-push-lojas/{id}")
    @Timed
    public ResponseEntity<ComunicacaoPushLoja> getComunicacaoPushLoja(@PathVariable Long id) {
        log.debug("REST request to get ComunicacaoPushLoja : {}", id);
        Optional<ComunicacaoPushLoja> comunicacaoPushLoja = comunicacaoPushLojaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(comunicacaoPushLoja);
    }

    /**
     * DELETE  /comunicacao-push-lojas/:id : delete the "id" comunicacaoPushLoja.
     *
     * @param id the id of the comunicacaoPushLoja to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comunicacao-push-lojas/{id}")
    @Timed
    public ResponseEntity<Void> deleteComunicacaoPushLoja(@PathVariable Long id) {
        log.debug("REST request to delete ComunicacaoPushLoja : {}", id);

        comunicacaoPushLojaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
