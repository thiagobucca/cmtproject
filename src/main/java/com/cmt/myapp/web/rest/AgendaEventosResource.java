package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.AgendaEventos;
import com.cmt.myapp.repository.AgendaEventosRepository;
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
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AgendaEventos.
 */
@RestController
@RequestMapping("/api")
public class AgendaEventosResource {

    private final Logger log = LoggerFactory.getLogger(AgendaEventosResource.class);

    private static final String ENTITY_NAME = "agendaEventos";

    private final AgendaEventosRepository agendaEventosRepository;

    public AgendaEventosResource(AgendaEventosRepository agendaEventosRepository) {
        this.agendaEventosRepository = agendaEventosRepository;
    }

    /**
     * POST  /agenda-eventos : Create a new agendaEventos.
     *
     * @param agendaEventos the agendaEventos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agendaEventos, or with status 400 (Bad Request) if the agendaEventos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agenda-eventos")
    @Timed
    public ResponseEntity<AgendaEventos> createAgendaEventos(@RequestBody AgendaEventos agendaEventos) throws URISyntaxException {
        log.debug("REST request to save AgendaEventos : {}", agendaEventos);
        if (agendaEventos.getId() != null) {
            throw new BadRequestAlertException("A new agendaEventos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendaEventos result = agendaEventosRepository.save(agendaEventos);
        return ResponseEntity.created(new URI("/api/agenda-eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agenda-eventos : Updates an existing agendaEventos.
     *
     * @param agendaEventos the agendaEventos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agendaEventos,
     * or with status 400 (Bad Request) if the agendaEventos is not valid,
     * or with status 500 (Internal Server Error) if the agendaEventos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agenda-eventos")
    @Timed
    public ResponseEntity<AgendaEventos> updateAgendaEventos(@RequestBody AgendaEventos agendaEventos) throws URISyntaxException {
        log.debug("REST request to update AgendaEventos : {}", agendaEventos);
        if (agendaEventos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendaEventos result = agendaEventosRepository.save(agendaEventos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agendaEventos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agenda-eventos : get all the agendaEventos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of agendaEventos in body
     */
    @GetMapping("/agenda-eventos")
    @Timed
    public ResponseEntity<List<AgendaEventos>> getAllAgendaEventos(Pageable pageable,
    @RequestParam( value = "bol_app", required = false) Boolean bolApp) {
        log.debug("REST request to get a page of AgendaEventos");
        Page<AgendaEventos> page = null;

        if(bolApp != null && bolApp){
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, -1);
            page = agendaEventosRepository.findAllByDataAfter(pageable, cal.getTime().toInstant());
        }else{
            page = agendaEventosRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/agenda-eventos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /agenda-eventos/:id : get the "id" agendaEventos.
     *
     * @param id the id of the agendaEventos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agendaEventos, or with status 404 (Not Found)
     */
    @GetMapping("/agenda-eventos/{id}")
    @Timed
    public ResponseEntity<AgendaEventos> getAgendaEventos(@PathVariable Long id) {
        log.debug("REST request to get AgendaEventos : {}", id);
        Optional<AgendaEventos> agendaEventos = agendaEventosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendaEventos);
    }

    /**
     * DELETE  /agenda-eventos/:id : delete the "id" agendaEventos.
     *
     * @param id the id of the agendaEventos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agenda-eventos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgendaEventos(@PathVariable Long id) {
        log.debug("REST request to delete AgendaEventos : {}", id);

        agendaEventosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
