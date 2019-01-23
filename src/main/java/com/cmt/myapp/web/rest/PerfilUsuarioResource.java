package com.cmt.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cmt.myapp.domain.PerfilUsuario;
import com.cmt.myapp.repository.PerfilUsuarioRepository;
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
 * REST controller for managing PerfilUsuario.
 */
@RestController
@RequestMapping("/api")
public class PerfilUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(PerfilUsuarioResource.class);

    private static final String ENTITY_NAME = "perfilUsuario";

    private final PerfilUsuarioRepository perfilUsuarioRepository;

    public PerfilUsuarioResource(PerfilUsuarioRepository perfilUsuarioRepository) {
        this.perfilUsuarioRepository = perfilUsuarioRepository;
    }

    /**
     * POST  /perfil-usuarios : Create a new perfilUsuario.
     *
     * @param perfilUsuario the perfilUsuario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perfilUsuario, or with status 400 (Bad Request) if the perfilUsuario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/perfil-usuarios")
    @Timed
    public ResponseEntity<PerfilUsuario> createPerfilUsuario(@RequestBody PerfilUsuario perfilUsuario) throws URISyntaxException {
        log.debug("REST request to save PerfilUsuario : {}", perfilUsuario);
        if (perfilUsuario.getId() != null) {
            throw new BadRequestAlertException("A new perfilUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerfilUsuario result = perfilUsuarioRepository.save(perfilUsuario);
        return ResponseEntity.created(new URI("/api/perfil-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /perfil-usuarios : Updates an existing perfilUsuario.
     *
     * @param perfilUsuario the perfilUsuario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perfilUsuario,
     * or with status 400 (Bad Request) if the perfilUsuario is not valid,
     * or with status 500 (Internal Server Error) if the perfilUsuario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/perfil-usuarios")
    @Timed
    public ResponseEntity<PerfilUsuario> updatePerfilUsuario(@RequestBody PerfilUsuario perfilUsuario) throws URISyntaxException {
        log.debug("REST request to update PerfilUsuario : {}", perfilUsuario);
        if (perfilUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerfilUsuario result = perfilUsuarioRepository.save(perfilUsuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perfilUsuario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /perfil-usuarios : get all the perfilUsuarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of perfilUsuarios in body
     */
    @GetMapping("/perfil-usuarios")
    @Timed
    public ResponseEntity<List<PerfilUsuario>> getAllPerfilUsuarios(Pageable pageable) {
        log.debug("REST request to get a page of PerfilUsuarios");
        Page<PerfilUsuario> page = perfilUsuarioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/perfil-usuarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /perfil-usuarios/:id : get the "id" perfilUsuario.
     *
     * @param id the id of the perfilUsuario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perfilUsuario, or with status 404 (Not Found)
     */
    @GetMapping("/perfil-usuarios/{id}")
    @Timed
    public ResponseEntity<PerfilUsuario> getPerfilUsuario(@PathVariable Long id) {
        log.debug("REST request to get PerfilUsuario : {}", id);
        Optional<PerfilUsuario> perfilUsuario = perfilUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(perfilUsuario);
    }

    /**
     * DELETE  /perfil-usuarios/:id : delete the "id" perfilUsuario.
     *
     * @param id the id of the perfilUsuario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/perfil-usuarios/{id}")
    @Timed
    public ResponseEntity<Void> deletePerfilUsuario(@PathVariable Long id) {
        log.debug("REST request to delete PerfilUsuario : {}", id);

        perfilUsuarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
