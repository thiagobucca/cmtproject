package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ContasPagarReceber;
import com.cmt.myapp.domain.enumeration.TipoLancamento;
import com.cmt.myapp.repository.ContasPagarReceberRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
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
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contasPagarRecebers in body
     */
    @GetMapping("/contas-pagar-recebers")
    @Timed
    public ResponseEntity<List<ContasPagarReceber>> getAllContasPagarRecebers(Pageable pageable) {
        log.debug("REST request to get a page of ContasPagarRecebers");
        Page<ContasPagarReceber> page = contasPagarReceberRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contas-pagar-recebers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/contas-pagar-recebers/filter/")
    @Timed
    public ResponseEntity<List<ContasPagarReceber>> getAllFilter(@RequestParam(value="data_inicial") @DateTimeFormat(pattern="yyyy-MM-dd") Date dataInicial,
     @RequestParam(value="data_final")  @DateTimeFormat(pattern="yyyy-MM-dd") Date dataFinal,
     @RequestParam( value = "tipoOperacaoId", required = false) Long tipoOperacaoId,
     @RequestParam( value = "tipoLancamento", required = false) TipoLancamento tipoLancamento, Pageable pageable) {
        dataFinal.setHours(23);
        dataFinal.setMinutes(59);
        dataFinal.setSeconds(59);
        Page<ContasPagarReceber> page=  null;


        if(tipoOperacaoId != null)
            page = contasPagarReceberRepository.findByDataBetweenAndTipoOperacaoId(pageable, dataInicial.toInstant(),
                                dataFinal.toInstant(), tipoOperacaoId);
        else if(tipoLancamento != null)
            page = contasPagarReceberRepository.findByDataBetweenAndTipoOperacaoTipoLancamento(pageable, dataInicial.toInstant(), dataFinal.toInstant(), tipoLancamento);
        else                            
            page = contasPagarReceberRepository.findByDataBetween(pageable, dataInicial.toInstant(), dataFinal.toInstant());

        
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contas-pagar-recebers/filter");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
