package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ContatoLojaMaconica;
import com.cmt.myapp.repository.ContatoLojaMaconicaRepository;
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
 * REST controller for managing ContatoLojaMaconica.
 */
@RestController
@RequestMapping("/api")
public class ContatoLojaMaconicaResource {

    private final Logger log = LoggerFactory.getLogger(ContatoLojaMaconicaResource.class);

    private static final String ENTITY_NAME = "contatoLojaMaconica";

    private final ContatoLojaMaconicaRepository contatoLojaMaconicaRepository;

    public ContatoLojaMaconicaResource(ContatoLojaMaconicaRepository contatoLojaMaconicaRepository) {
        this.contatoLojaMaconicaRepository = contatoLojaMaconicaRepository;
    }

    /**
     * POST  /contato-loja-maconicas : Create a new contatoLojaMaconica.
     *
     * @param contatoLojaMaconica the contatoLojaMaconica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contatoLojaMaconica, or with status 400 (Bad Request) if the contatoLojaMaconica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contato-loja-maconicas")
    @Timed
    public ResponseEntity<ContatoLojaMaconica> createContatoLojaMaconica(@RequestBody ContatoLojaMaconica contatoLojaMaconica) throws URISyntaxException {
        log.debug("REST request to save ContatoLojaMaconica : {}", contatoLojaMaconica);
        if (contatoLojaMaconica.getId() != null) {
            throw new BadRequestAlertException("A new contatoLojaMaconica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContatoLojaMaconica result = contatoLojaMaconicaRepository.save(contatoLojaMaconica);
        return ResponseEntity.created(new URI("/api/contato-loja-maconicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contato-loja-maconicas : Updates an existing contatoLojaMaconica.
     *
     * @param contatoLojaMaconica the contatoLojaMaconica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contatoLojaMaconica,
     * or with status 400 (Bad Request) if the contatoLojaMaconica is not valid,
     * or with status 500 (Internal Server Error) if the contatoLojaMaconica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contato-loja-maconicas")
    @Timed
    public ResponseEntity<ContatoLojaMaconica> updateContatoLojaMaconica(@RequestBody ContatoLojaMaconica contatoLojaMaconica) throws URISyntaxException {
        log.debug("REST request to update ContatoLojaMaconica : {}", contatoLojaMaconica);
        if (contatoLojaMaconica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContatoLojaMaconica result = contatoLojaMaconicaRepository.save(contatoLojaMaconica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contatoLojaMaconica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contato-loja-maconicas : get all the contatoLojaMaconicas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contatoLojaMaconicas in body
     */
    @GetMapping("/contato-loja-maconicas")
    @Timed
    public ResponseEntity<List<ContatoLojaMaconica>> getAllContatoLojaMaconicas(Pageable pageable) {
        log.debug("REST request to get a page of ContatoLojaMaconicas");
        Page<ContatoLojaMaconica> page = contatoLojaMaconicaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contato-loja-maconicas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /contato-loja-maconicas/:id : get the "id" contatoLojaMaconica.
     *
     * @param id the id of the contatoLojaMaconica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contatoLojaMaconica, or with status 404 (Not Found)
     */
    @GetMapping("/contato-loja-maconicas/{id}")
    @Timed
    public ResponseEntity<ContatoLojaMaconica> getContatoLojaMaconica(@PathVariable Long id) {
        log.debug("REST request to get ContatoLojaMaconica : {}", id);
        Optional<ContatoLojaMaconica> contatoLojaMaconica = contatoLojaMaconicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contatoLojaMaconica);
    }

    /**
     * DELETE  /contato-loja-maconicas/:id : delete the "id" contatoLojaMaconica.
     *
     * @param id the id of the contatoLojaMaconica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contato-loja-maconicas/{id}")
    @Timed
    public ResponseEntity<Void> deleteContatoLojaMaconica(@PathVariable Long id) {
        log.debug("REST request to delete ContatoLojaMaconica : {}", id);

        contatoLojaMaconicaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

               /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/contato-loja-maconicas/lojamaconica/{loja_maconica_id}")
    @Timed
    public ResponseEntity<List<ContatoLojaMaconica>> getAllUsersByTipo(@PathVariable Long loja_maconica_id, Pageable pageable) {
        final Page<ContatoLojaMaconica> page = contatoLojaMaconicaRepository.findAllByLojaMaconicaId(pageable, loja_maconica_id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contato-loja-maconicas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
