package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.Cupom;
import com.cmt.myapp.repository.CupomRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.apache.commons.lang.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;

/**
 * REST controller for managing Cupom.
 */
@RestController
@RequestMapping("/api")
public class CupomResource {

    private final Logger log = LoggerFactory.getLogger(CupomResource.class);

    private static final String ENTITY_NAME = "cupom";

    private final CupomRepository cupomRepository;

    @Value("${spring.storageDir}")
    private String storageDir;

    @Autowired
    ServletContext context;

    public CupomResource(CupomRepository cupomRepository) {
        this.cupomRepository = cupomRepository;
    }

    /**
     * POST /cupoms : Create a new cupom.
     *
     * @param cupom the cupom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         cupom, or with status 400 (Bad Request) if the cupom has already an
     *         ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cupoms")
    @Timed
    public ResponseEntity<Cupom> createCupom(@RequestBody Cupom cupom) throws URISyntaxException {
        log.debug("REST request to save Cupom : {}", cupom);
        if (cupom.getId() != null) {
            throw new BadRequestAlertException("A new cupom cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Optional<Cupom> existingCupom = cupomRepository.findOneByDataAndValorAndNumeroAndEstabelecimentoComercialId(
                cupom.getData(), cupom.getValor(), cupom.getNumero(), cupom.getEstabelecimentoComercialId());

        if (existingCupom.isPresent()) {
            throw new BadRequestAlertException("Cupom ja cadastrado, favor informar um diferente", ENTITY_NAME,
                    "duplicate");
        }

        try {

          /*  if(cupom.getFoto().startsWith("/9j")){
                cupom.setFoto(cupom.getFoto().substring(4));
                log.debug("base64 -1:" + cupom.getFoto());
            }else if(cupom.getFoto().startsWith("/9/")){
                cupom.setFoto(cupom.getFoto().substring(3));
                log.debug("base64 -2:" + cupom.getFoto());
            }
*/

            
            String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8) + System.currentTimeMillis(),
                    "jpg");
            Files.createDirectories(Paths.get(storageDir + "cupom/" + cupom.getUsuarioId() + "/" + name).getParent());
            Files.write(Paths.get(storageDir + "cupom/" + cupom.getUsuarioId() + "/" + name),
                    Base64.getDecoder().decode(cupom.getFoto()));

            cupom.setFoto("http://cmtweb.ddns.net/resources/cupom/" + cupom.getUsuarioId() + "/" + name);

            Cupom result = cupomRepository.save(cupom);
            return ResponseEntity.created(new URI("/api/cupoms/" + result.getId()))
                    .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.debug("ex: "+ex);
            throw new BadRequestAlertException("Erro ao salvar imagem2", ENTITY_NAME, "idexists");
        }

    }

    /**
     * PUT /cupoms : Updates an existing cupom.
     *
     * @param cupom the cupom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         cupom, or with status 400 (Bad Request) if the cupom is not valid, or
     *         with status 500 (Internal Server Error) if the cupom couldn't be
     *         updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cupoms")
    @Timed
    public ResponseEntity<Cupom> updateCupom(@RequestBody Cupom cupom) throws URISyntaxException {
        log.debug("REST request to update Cupom : {}", cupom);
        if (cupom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Optional<Cupom> existingCupom = cupomRepository.findById(cupom.getId());

        if (!existingCupom.get().getData().equals(cupom.getData())
                || !existingCupom.get().getValor().equals(cupom.getValor())
                || !existingCupom.get().getNumero().equals(cupom.getNumero())
                || !existingCupom.get().getEstabelecimentoComercialId().equals(cupom.getEstabelecimentoComercialId())) 
        {
            
            existingCupom = cupomRepository.findOneByDataAndValorAndNumeroAndEstabelecimentoComercialId(cupom.getData(),
                    cupom.getValor(), cupom.getNumero(), cupom.getEstabelecimentoComercialId());

            if (existingCupom.isPresent()) {
                throw new BadRequestAlertException("Cupom ja cadastrado, favor informar um diferente", ENTITY_NAME,
                        "duplicate");
            }
        }
        
        

        try {

            if (!cupom.getFoto().contains("http://")) {

                String name = String.format("%s.%s",
                        RandomStringUtils.randomAlphanumeric(8) + System.currentTimeMillis(), "jpg");
                Files.createDirectories(
                        Paths.get(storageDir + "cupom/" + cupom.getUsuarioId() + "/" + name).getParent());
                Files.write(Paths.get(storageDir + "cupom/" + cupom.getUsuarioId() + "/" + name),
                        Base64.getDecoder().decode(cupom.getFoto()));

                cupom.setFoto("http://cmtweb.ddns.net/resources/cupom/" + cupom.getUsuarioId() + "/" + name);
            }

            Cupom result = cupomRepository.save(cupom);
            return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cupom.getId().toString())).body(result);

        } catch (Exception e) {
            throw new BadRequestAlertException("Erro ao salvar imagem", ENTITY_NAME, "idexists");
        }
    }

    /**
     * GET /cupoms : get all the cupoms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cupoms in
     *         body
     */
    @GetMapping("/cupoms")
    @Timed
    public ResponseEntity<List<Cupom>> getAllCupoms(Pageable pageable) {
        log.debug("REST request to get a page of Cupoms" + storageDir);
        Page<Cupom> page = cupomRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cupoms");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /cupoms/:id : get the "id" cupom.
     *
     * @param id the id of the cupom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cupom, or
     *         with status 404 (Not Found)
     */
    @GetMapping("/cupoms/{id}")
    @Timed
    public ResponseEntity<Cupom> getCupom(@PathVariable Long id) {
        log.debug("REST request to get Cupom : {}", id);
        Optional<Cupom> cupom = cupomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cupom);
    }

    /**
     * DELETE /cupoms/:id : delete the "id" cupom.
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

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/cupoms/usuario/{usuario_id}")
    @Timed
    public ResponseEntity<List<Cupom>> getAllUsersByTipo(@PathVariable Long usuario_id, Pageable pageable) {
        final Page<Cupom> page = cupomRepository.findAllByUsuarioId(pageable, usuario_id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cupoms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/cupoms/filter/")
    @Timed
    public ResponseEntity<List<Cupom>> getAllFilter(
            @RequestParam(value = "data_inicial") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicial,
            @RequestParam(value = "data_final") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal,
            @RequestParam(value = "estabelecimentoId", required = false) Long estabelecimentoId,
            @RequestParam(value = "lojaMaconicaId", required = false) Long lojaId, Pageable pageable) {
        dataFinal.setHours(23);
        dataFinal.setMinutes(59);
        dataFinal.setSeconds(59);
        Page<Cupom> page = null;

        if (estabelecimentoId != null)
            page = cupomRepository.findByDataBetweenAndEstabelecimentoComercialId(pageable, dataInicial.toInstant(),
                    dataFinal.toInstant(), estabelecimentoId);
        else if (lojaId != null)
            page = cupomRepository.findByDataBetweenAndUsuarioLojaMaconicaId(pageable, dataInicial.toInstant(),
                    dataFinal.toInstant(), lojaId);
        else
            page = cupomRepository.findByDataBetween(pageable, dataInicial.toInstant(), dataFinal.toInstant());

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cupoms/filter");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
