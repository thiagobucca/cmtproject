package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ContasPagarReceber;
import com.cmt.myapp.repository.ContasPagarReceberRepository;
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
 * REST controller for managing ContasPagarReceber.
 */
@RestController
@RequestMapping("/api")
public class ContasPagarReceberResource {

    private final Logger log = LoggerFactory.getLogger(ContasPagarReceberResource.class);

    private static final String ENTITY_NAME = "contasPagarReceber";

    private final ContasPagarReceberRepository contasPagarReceberRepository;

    public ContasPagarReceberResource(ContasPagarReceberRepository contasPagarReceberRepository) {
        this.contasPagarReceberRepository = contasPagarReceberRepository;
    }

    /**
     * POST  /contas-pagar-recebers : Create a new contasPagarReceber.
     *
     * @param contasPagarReceber the contasPagarReceber to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contasPagarReceber, or with status 400 (Bad Request) if the contasPagarReceber has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contas-pagar-recebers")
    @Timed
    public ResponseEntity<ContasPagarReceber> createContasPagarReceber(@RequestBody ContasPagarReceber contasPagarReceber) throws URISyntaxException {
        log.debug("REST request to save ContasPagarReceber : {}", contasPagarReceber);
        if (contasPagarReceber.getId() != null) {
            throw new BadRequestAlertException("A new contasPagarReceber cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContasPagarReceber result = contasPagarReceberRepository.save(contasPagarReceber);
        return ResponseEntity.created(new URI("/api/contas-pagar-recebers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contas-pagar-recebers : Updates an existing contasPagarReceber.
     *
     * @param contasPagarReceber the contasPagarReceber to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contasPagarReceber,
     * or with status 400 (Bad Request) if the contasPagarReceber is not valid,
     * or with status 500 (Internal Server Error) if the contasPagarReceber couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contas-pagar-recebers")
    @Timed
    public ResponseEntity<ContasPagarReceber> updateContasPagarReceber(@RequestBody ContasPagarReceber contasPagarReceber) throws URISyntaxException {
        log.debug("REST request to update ContasPagarReceber : {}", contasPagarReceber);
        if (contasPagarReceber.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContasPagarReceber result = contasPagarReceberRepository.save(contasPagarReceber);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contasPagarReceber.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contas-pagar-recebers : get all the contasPagarRecebers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contasPagarRecebers in body
     */
    @GetMapping("/contas-pagar-recebers")
    @Timed
    public List<ContasPagarReceber> getAllContasPagarRecebers() {
        log.debug("REST request to get all ContasPagarRecebers");
        return contasPagarReceberRepository.findAll();
    }

    /**
     * GET  /contas-pagar-recebers/:id : get the "id" contasPagarReceber.
     *
     * @param id the id of the contasPagarReceber to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contasPagarReceber, or with status 404 (Not Found)
     */
    @GetMapping("/contas-pagar-recebers/{id}")
    @Timed
    public ResponseEntity<ContasPagarReceber> getContasPagarReceber(@PathVariable Long id) {
        log.debug("REST request to get ContasPagarReceber : {}", id);
        Optional<ContasPagarReceber> contasPagarReceber = contasPagarReceberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contasPagarReceber);
    }

    /**
     * DELETE  /contas-pagar-recebers/:id : delete the "id" contasPagarReceber.
     *
     * @param id the id of the contasPagarReceber to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contas-pagar-recebers/{id}")
    @Timed
    public ResponseEntity<Void> deleteContasPagarReceber(@PathVariable Long id) {
        log.debug("REST request to delete ContasPagarReceber : {}", id);

        contasPagarReceberRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
