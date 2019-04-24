package com.cmt.myapp.web.rest;

import com.cmt.myapp.config.Constants;
import com.cmt.myapp.domain.Authority;
import com.cmt.myapp.domain.User;
import com.cmt.myapp.domain.enumeration.TipoPessoa;
import com.cmt.myapp.repository.UserRepository;
import com.cmt.myapp.security.AuthoritiesConstants;
import com.cmt.myapp.service.MailService;
import com.cmt.myapp.service.UserService;
import com.cmt.myapp.service.dto.UserDTO;
import com.cmt.myapp.web.rest.errors.BadRequestAlertException;
import com.cmt.myapp.web.rest.errors.EmailAlreadyUsedException;
import com.cmt.myapp.web.rest.errors.LoginAlreadyUsedException;
import com.cmt.myapp.web.rest.util.HeaderUtil;
import com.cmt.myapp.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring5.ISpringTemplateEngine;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    private final UserService userService;

    private final UserRepository userRepository;

    private final MailService mailService;

    public UserResource(UserService userService, UserRepository userRepository, MailService mailService) {

        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param userDTO the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws BadRequestAlertException 400 (Bad Request) if the login or email is already in use
     */
    @PostMapping("/users")
    @Timed
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", userDTO);

        if (userDTO.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } 
        else {
            if(userDTO.getTipoPessoa() == TipoPessoa.Dependente){

                    Optional<User> macom = userRepository.findOneByTipoPessoaAndPlacet(TipoPessoa.Macom, userDTO.getPlacet());

                    if(macom.isPresent()){
                        userDTO.setLojaMaconicaId(macom.get().getLojaMaconicaId());
                        userDTO.setPessoaDependenteId(macom.get().getId());
                    }else
                        throw new BadRequestAlertException("Não foi encontrado Maçom para o Placet informado", "userManagement", "idexists");
            }
            else
            {
                if(userRepository.findOneByTipoPessoaAndPlacet(TipoPessoa.Macom,userDTO.getPlacet()).isPresent()){
                    throw new BadRequestAlertException("Placet ja cadastrado, favor informar um diferente", "userManagement", "placetexists");
                }
            }

            User newUser = userService.createUser(userDTO);
            
            mailService.sendCreationEmail(newUser);
            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
                .headers(HeaderUtil.createAlert( "userManagement.created", newUser.getLogin()))
                .body(newUser);
        }
    }

    /**
     * PUT /users : Updates an existing User.
     *
     * @param userDTO the user to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already in use
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already in use
     */
    @PutMapping("/users")
    @Timed
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }

        //Consulta o cadastro do usuario antes da edicao
        existingUser = userRepository.findById(userDTO.getId());

        //Verifica se o usuario macom editou o campo PLACET
        if (userDTO.getTipoPessoa() == TipoPessoa.Macom && (userDTO.getPlacet() != existingUser.get().getPlacet()))
        {
            //Verifica se o numero do placet esta vinculado a outro macom
            if(userRepository.findOneByTipoPessoaAndPlacet(TipoPessoa.Macom,userDTO.getPlacet()).isPresent()){
                throw new BadRequestAlertException("Placet ja cadastrado, favor informar um diferente", "userManagement", "placetexists");
            }
            
        }

        //Verifica se o usuario trocou de tipo Pessoa (Macom )
        if (userDTO.getTipoPessoa() != existingUser.get().getTipoPessoa())
        {
            //Se trocou o tipo de pessoa para Dependente
            if(userDTO.getTipoPessoa() == TipoPessoa.Dependente && !userRepository.findOneByTipoPessoaAndPlacet(TipoPessoa.Macom,userDTO.getPlacet()).isPresent()){
                throw new BadRequestAlertException("Placet não encontrado, favor informar um valido", "userManagement", "idexists");
            }
            //Verifica se o numero do placet esta vinculado a outro macom
            else if(userDTO.getTipoPessoa() == TipoPessoa.Macom && userRepository.findOneByTipoPessoaAndPlacet(TipoPessoa.Macom,userDTO.getPlacet()).isPresent()){
                throw new BadRequestAlertException("Placet ja cadastrado, favor informar um diferente", "userManagement", "placetexists");
            }
            
        }

        Optional<UserDTO> updatedUser = userService.updateUser(userDTO);

        return ResponseUtil.wrapOrNotFound(updatedUser,
        HeaderUtil.createAlert("userManagement.updated", userDTO.getLogin()));
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users")
    @Timed
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable, @RequestParam( value = "roles", required = false)
    String roles,
    @RequestParam( value = "lojaMaconicaId", required = false)
    Long lojaMaconicaId) {
        if(roles == null)
            roles = "";
        
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable, roles, lojaMaconicaId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/authorities")
    @Timed
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\") or hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * GET /users/:login : get the "login" user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return ResponseUtil.wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }

    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param login the login of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        log.debug("REST request to delete User: {}", login);
        userService.deleteUser(login);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "userManagement.deleted", login)).build();
    }
    
    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users/tipo/{tipoPessoa}")
    @Timed
    public ResponseEntity<List<User>> getAllUsersByTipo(@PathVariable TipoPessoa tipoPessoa, Pageable pageable) {
        final Page<User> page = userRepository.findAllByTipoPessoa(pageable, tipoPessoa);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users/status/{bolAtivo}")
    @Timed
    public ResponseEntity<List<User>> getAllUsersByStatus(@PathVariable boolean bolAtivo, Pageable pageable) {
        final Page<User> page = userRepository.findAllByActivated(pageable, bolAtivo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users/lojaMaconica/{lojaMaconicaId}")
    @Timed
    public ResponseEntity<List<UserDTO>> getAllUsersByLojaMaconicaId(@PathVariable Long lojaMaconicaId, Pageable pageable) {

        final Page<UserDTO> page = userRepository.findAllWithAuthoritiesByLojaMaconicaId(pageable, lojaMaconicaId).map(UserDTO::new);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users/estabelecimentoComercial/{estabelecimentoComercialId}")
    @Timed
    public ResponseEntity<List<User>> getAllUsersByEstabelecimentoComercialId(@PathVariable Long estabelecimentoComercialId, Pageable pageable) {

        final Page<User> page = userRepository.findAllByEstabelecimentoComercialId(pageable, estabelecimentoComercialId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
