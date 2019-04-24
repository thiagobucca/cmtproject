package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ContatoEstabelecimento;
import com.cmt.myapp.repository.ContatoEstabelecimentoRepository;
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
 * REST controller for managing ContatoEstabelecimento.
 */
@RestController
@RequestMapping("/api")
public class ContatoEstabelecimentoResource {

    private final Logger log = LoggerFactory.getLogger(ContatoEstabelecimentoResource.class);

    private static final String ENTITY_NAME = "contatoEstabelecimento";

    private final ContatoEstabelecimentoRepository contatoEstabelecimentoRepository;

    public ContatoEstabelecimentoResource(ContatoEstabelecimentoRepository contatoEstabelecimentoRepository) {
        this.contatoEstabelecimentoRepository = contatoEstabelecimentoRepository;
    }

    /**
     * POST  /contato-estabelecimentos : Create a new contatoEstabelecimento.
     *
     * @param contatoEstabelecimento the contatoEstabelecimento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contatoEstabelecimento, or with status 400 (Bad Request) if the contatoEstabelecimento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contato-estabelecimentos")
    @Timed
    public ResponseEntity<ContatoEstabelecimento> createContatoEstabelecimento(@RequestBody ContatoEstabelecimento contatoEstabelecimento) throws URISyntaxException {
        log.debug("REST request to save ContatoEstabelecimento : {}", contatoEstabelecimento);
        if (contatoEstabelecimento.getId() != null) {
            throw new BadRequestAlertException("A new contatoEstabelecimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContatoEstabelecimento result = contatoEstabelecimentoRepository.save(contatoEstabelecimento);
        return ResponseEntity.created(new URI("/api/contato-estabelecimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contato-estabelecimentos : Updates an existing contatoEstabelecimento.
     *
     * @param contatoEstabelecimento the contatoEstabelecimento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contatoEstabelecimento,
     * or with status 400 (Bad Request) if the contatoEstabelecimento is not valid,
     * or with status 500 (Internal Server Error) if the contatoEstabelecimento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contato-estabelecimentos")
    @Timed
    public ResponseEntity<ContatoEstabelecimento> updateContatoEstabelecimento(@RequestBody ContatoEstabelecimento contatoEstabelecimento) throws URISyntaxException {
        log.debug("REST request to update ContatoEstabelecimento : {}", contatoEstabelecimento);
        if (contatoEstabelecimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContatoEstabelecimento result = contatoEstabelecimentoRepository.save(contatoEstabelecimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contatoEstabelecimento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contato-estabelecimentos : get all the contatoEstabelecimentos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contatoEstabelecimentos in body
     */
    @GetMapping("/contato-estabelecimentos")
    @Timed
    public ResponseEntity<List<ContatoEstabelecimento>> getAllContatoEstabelecimentos(Pageable pageable) {
        log.debug("REST request to get a page of ContatoEstabelecimentos");
        Page<ContatoEstabelecimento> page = contatoEstabelecimentoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contato-estabelecimentos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /contato-estabelecimentos/:id : get the "id" contatoEstabelecimento.
     *
     * @param id the id of the contatoEstabelecimento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contatoEstabelecimento, or with status 404 (Not Found)
     */
    @GetMapping("/contato-estabelecimentos/{id}")
    @Timed
    public ResponseEntity<ContatoEstabelecimento> getContatoEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to get ContatoEstabelecimento : {}", id);
        Optional<ContatoEstabelecimento> contatoEstabelecimento = contatoEstabelecimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contatoEstabelecimento);
    }

    /**
     * DELETE  /contato-estabelecimentos/:id : delete the "id" contatoEstabelecimento.
     *
     * @param id the id of the contatoEstabelecimento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contato-estabelecimentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteContatoEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to delete ContatoEstabelecimento : {}", id);

        contatoEstabelecimentoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

               /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/contato-estabelecimentos/estabelecimento/{estabelecimento_comercial_id}")
    @Timed
    public ResponseEntity<List<ContatoEstabelecimento>> getAllUsersByTipo(@PathVariable Long estabelecimento_comercial_id, Pageable pageable) {
        final Page<ContatoEstabelecimento> page = contatoEstabelecimentoRepository.findAllByEstabelecimentoComercialId(pageable, estabelecimento_comercial_id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contato-estabelecimentos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
