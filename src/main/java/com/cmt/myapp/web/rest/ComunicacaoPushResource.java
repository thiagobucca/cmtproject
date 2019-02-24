package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.ComunicacaoPush;
import com.cmt.myapp.domain.ComunicacaoPushLoja;
import com.cmt.myapp.domain.SendNotification;
import com.cmt.myapp.domain.User;
import com.cmt.myapp.domain.enumeration.TipoPessoa;
import com.cmt.myapp.repository.ComunicacaoPushLojaRepository;
import com.cmt.myapp.repository.ComunicacaoPushRepository;
import com.cmt.myapp.repository.UserRepository;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import com.cmt.myapp.web.rest.util.RequestUtil;

import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing ComunicacaoPush.
 */
@RestController
@RequestMapping("/api")
public class ComunicacaoPushResource {

    private final Logger log = LoggerFactory.getLogger(ComunicacaoPushResource.class);

    private static final String ENTITY_NAME = "comunicacaoPush";

    private final ComunicacaoPushRepository comunicacaoPushRepository;

    private final ComunicacaoPushLojaRepository comunicacaoPushLojaRepository;

    private final UserRepository userRepository;

    public ComunicacaoPushResource(ComunicacaoPushRepository comunicacaoPushRepository, ComunicacaoPushLojaRepository comunicacaoPushLojaRepository, 
    UserRepository userRepository) {
        this.comunicacaoPushRepository = comunicacaoPushRepository;
        this.comunicacaoPushLojaRepository = comunicacaoPushLojaRepository;
        this.userRepository = userRepository;
    }

    /**
     * POST  /comunicacao-pushes : Create a new comunicacaoPush.
     *
     * @param comunicacaoPush the comunicacaoPush to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comunicacaoPush, or with status 400 (Bad Request) if the comunicacaoPush has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comunicacao-pushes")
    @Timed
    public ResponseEntity<ComunicacaoPush> createComunicacaoPush(@RequestBody ComunicacaoPush comunicacaoPush) throws URISyntaxException {
        log.debug("REST request to save ComunicacaoPush : {}", comunicacaoPush);
        if (comunicacaoPush.getId() != null) {
            throw new BadRequestAlertException("A new comunicacaoPush cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComunicacaoPush result = comunicacaoPushRepository.save(comunicacaoPush);



        return ResponseEntity.created(new URI("/api/comunicacao-pushes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comunicacao-pushes : Updates an existing comunicacaoPush.
     *
     * @param comunicacaoPush the comunicacaoPush to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comunicacaoPush,
     * or with status 400 (Bad Request) if the comunicacaoPush is not valid,
     * or with status 500 (Internal Server Error) if the comunicacaoPush couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comunicacao-pushes")
    @Timed
    public ResponseEntity<ComunicacaoPush> updateComunicacaoPush(@RequestBody ComunicacaoPush comunicacaoPush) throws URISyntaxException {
        log.debug("REST request to update ComunicacaoPush : {}", comunicacaoPush);
        if (comunicacaoPush.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ComunicacaoPush result = comunicacaoPushRepository.save(comunicacaoPush);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comunicacaoPush.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comunicacao-pushes : get all the comunicacaoPushes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of comunicacaoPushes in body
     */
    @GetMapping("/comunicacao-pushes")
    @Timed
    public ResponseEntity<List<ComunicacaoPush>> getAllComunicacaoPushes(Pageable pageable) {
        log.debug("REST request to get a page of ComunicacaoPushes");
        Page<ComunicacaoPush> page = comunicacaoPushRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comunicacao-pushes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /comunicacao-pushes/:id : get the "id" comunicacaoPush.
     *
     * @param id the id of the comunicacaoPush to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comunicacaoPush, or with status 404 (Not Found)
     */
    @GetMapping("/comunicacao-pushes/{id}")
    @Timed
    public ResponseEntity<ComunicacaoPush> getComunicacaoPush(@PathVariable Long id) {
        log.debug("REST request to get ComunicacaoPush : {}", id);
        Optional<ComunicacaoPush> comunicacaoPush = comunicacaoPushRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(comunicacaoPush);
    }

    /**
     * DELETE  /comunicacao-pushes/:id : delete the "id" comunicacaoPush.
     *
     * @param id the id of the comunicacaoPush to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comunicacao-pushes/{id}")
    @Timed
    public ResponseEntity<Void> deleteComunicacaoPush(@PathVariable Long id) {
        log.debug("REST request to delete ComunicacaoPush : {}", id);

        comunicacaoPushRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /comunicacao-pushes : get all the comunicacaoPushes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of comunicacaoPushes in body
     */
    @GetMapping("/comunicacao-pushes/tipoPessoa/{tipoPessoa}")
    @Timed
    public ResponseEntity<List<ComunicacaoPush>> getAllComunicacaoPushesByTipoPessoa(Pageable pageable, @PathVariable TipoPessoa tipoPessoa) {
        log.debug("REST request to get a page of ComunicacaoPushes");
        Page<ComunicacaoPush> page = comunicacaoPushRepository.findAllByTipoPessoa(pageable, tipoPessoa);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comunicacao-pushes/tipoPessoa");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * POST  /comunicacao-pushes : Create a new comunicacaoPush.
     *
     * @param comunicacaoPush the comunicacaoPush to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comunicacaoPush, or with status 400 (Bad Request) if the comunicacaoPush has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comunicacao-pushes/send")
    @Timed
    public ResponseEntity<String> sendComunicacaoPush(@PathVariable Long id)  throws URISyntaxException {
        log.debug("REST request to send ComunicacaoPush : {}");
        
        //ComunicacaoPush result = comunicacaoPushRepository.save(comunicacaoPush);

        Optional<ComunicacaoPush> comunicacaoPush = comunicacaoPushRepository.findById(id);
        Page<ComunicacaoPushLoja> lojas = comunicacaoPushLojaRepository.findAllByComunicacaoPushId(null, comunicacaoPush.get().getId());
        ArrayList<User> usuarios = new ArrayList<>();
        for(ComunicacaoPushLoja item : lojas){
            usuarios.addAll(userRepository.findAllByLojaMaconicaId(item.getLojaMaconicaId()));
            
        }

        if(comunicacaoPush.get().getTipoPessoa() != null){
            usuarios.addAll(userRepository.findAllByTipoPessoa(null, comunicacaoPush.get().getTipoPessoa()).getContent());
        }

        SendNotification notification = new SendNotification();

        if(!usuarios.isEmpty()){
            notification.setInclude_player_ids(new ArrayList<>());
            notification.getInclude_player_ids().addAll(usuarios.stream().map(User::getDeviceId).collect(Collectors.toList()));
        }else{
            notification.setIncluded_segments(new ArrayList<String>());
            notification.getIncluded_segments().add("Subscribed Users");
        }

        notification.setApp_id("1ee29f2c-4652-4629-ab1e-1d016cfad22e");
        notification.getContents().setEn(comunicacaoPush.get().getConteudoPush());

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("authorization", "Basic NjY1MGQ4MWQtN2EwMS00YTA4LWFhMTgtZjEzZDIwMTRhMjhk");

        HttpEntity<SendNotification> entity = new HttpEntity<SendNotification>(notification, headers);

        ResponseEntity<String> respEntity = restTemplate.exchange(new URI("https://onesignal.com/api/v1/notifications"), HttpMethod.POST, entity, String.class);

        String resp = respEntity.getBody();

        return ResponseEntity.created(new URI("/api/comunicacao-pushes/"))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, ""))
            .body(resp);
    }
}
