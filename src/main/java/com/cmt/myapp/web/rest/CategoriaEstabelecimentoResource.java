package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.CategoriaEstabelecimento;
import com.cmt.myapp.repository.CategoriaEstabelecimentoRepository;
import com.cmt.myapp.service.dto.CategoriaEstabelecimentoDTO;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CategoriaEstabelecimento.
 */
@RestController
@RequestMapping("/api")
public class CategoriaEstabelecimentoResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaEstabelecimentoResource.class);

    private static final String ENTITY_NAME = "categoriaEstabelecimento";

    private final CategoriaEstabelecimentoRepository categoriaEstabelecimentoRepository;

    public CategoriaEstabelecimentoResource(CategoriaEstabelecimentoRepository categoriaEstabelecimentoRepository) {
        this.categoriaEstabelecimentoRepository = categoriaEstabelecimentoRepository;
    }

    /**
     * POST  /categoria-estabelecimentos : Create a new categoriaEstabelecimento.
     *
     * @param categoriaEstabelecimento the categoriaEstabelecimento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriaEstabelecimento, or with status 400 (Bad Request) if the categoriaEstabelecimento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categoria-estabelecimentos")
    @Timed
    public ResponseEntity<CategoriaEstabelecimento> createCategoriaEstabelecimento(@RequestBody CategoriaEstabelecimento categoriaEstabelecimento) throws URISyntaxException {
        log.debug("REST request to save CategoriaEstabelecimento : {}", categoriaEstabelecimento);
        if (categoriaEstabelecimento.getId() != null) {
            throw new BadRequestAlertException("A new categoriaEstabelecimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriaEstabelecimento result = categoriaEstabelecimentoRepository.save(categoriaEstabelecimento);
        return ResponseEntity.created(new URI("/api/categoria-estabelecimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categoria-estabelecimentos : Updates an existing categoriaEstabelecimento.
     *
     * @param categoriaEstabelecimento the categoriaEstabelecimento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriaEstabelecimento,
     * or with status 400 (Bad Request) if the categoriaEstabelecimento is not valid,
     * or with status 500 (Internal Server Error) if the categoriaEstabelecimento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categoria-estabelecimentos")
    @Timed
    public ResponseEntity<CategoriaEstabelecimento> updateCategoriaEstabelecimento(@RequestBody CategoriaEstabelecimento categoriaEstabelecimento) throws URISyntaxException {
        log.debug("REST request to update CategoriaEstabelecimento : {}", categoriaEstabelecimento);
        if (categoriaEstabelecimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriaEstabelecimento result = categoriaEstabelecimentoRepository.save(categoriaEstabelecimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriaEstabelecimento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categoria-estabelecimentos : get all the categoriaEstabelecimentos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of categoriaEstabelecimentos in body
     */
    @GetMapping("/categoria-estabelecimentos")
    @Timed
    public ResponseEntity<List<CategoriaEstabelecimento>> getAllCategoriaEstabelecimentos(Pageable pageable,
    @RequestParam( value = "bolAtivo", required = false) Boolean bolAtivo) {
        log.debug("REST request to get a page of CategoriaEstabelecimentos");
        Page<CategoriaEstabelecimento> page = null;


        if(pageable == null || pageable.getPageSize() ==20){
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        if(bolAtivo != null)
            page = categoriaEstabelecimentoRepository.findAllByBolAtivo(pageable, bolAtivo);
        else
            page = categoriaEstabelecimentoRepository.findAll(pageable);



        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/categoria-estabelecimentos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /categoria-estabelecimentos : get all the categoriaEstabelecimentos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of categoriaEstabelecimentos in body
     */
    @GetMapping("/categoria-estabelecimentos-app")
    @Timed
    public ResponseEntity<List<CategoriaEstabelecimentoDTO>> getAllCategoriaEstabelecimentos() {
        log.debug("REST request to get a page of CategoriaEstabelecimentos");
        Page<CategoriaEstabelecimento> page = null;
            List<CategoriaEstabelecimentoDTO> lista =  new ArrayList<>();
            CategoriaEstabelecimentoDTO todas = new CategoriaEstabelecimentoDTO();
            todas.setId(0l);
            todas.setNome("Todas");
            todas.setEstabelecimentos(0l);
            lista.add(todas);
             lista.addAll(categoriaEstabelecimentoRepository.findCategorias());

             lista.forEach(item -> {
                todas.setEstabelecimentos(todas.getEstabelecimentos()+item.getEstabelecimentos());
             });

            return ResponseEntity.ok().body(lista);
    }

    /**
     * GET  /categoria-estabelecimentos/:id : get the "id" categoriaEstabelecimento.
     *a
     * @param id the id of the categoriaEstabelecimento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriaEstabelecimento, or with status 404 (Not Found)
     */
    @GetMapping("/categoria-estabelecimentos/{id}")
    @Timed
    public ResponseEntity<CategoriaEstabelecimento> getCategoriaEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to get CategoriaEstabelecimento : {}", id);
        Optional<CategoriaEstabelecimento> categoriaEstabelecimento = categoriaEstabelecimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categoriaEstabelecimento);
    }

    /**
     * DELETE  /categoria-estabelecimentos/:id : delete the "id" categoriaEstabelecimento.
     *
     * @param id the id of the categoriaEstabelecimento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categoria-estabelecimentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoriaEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaEstabelecimento : {}", id);

        categoriaEstabelecimentoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
