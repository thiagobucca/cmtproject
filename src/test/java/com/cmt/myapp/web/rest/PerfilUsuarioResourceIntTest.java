package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.PerfilUsuario;
import com.cmt.myapp.repository.PerfilUsuarioRepository;
import com.cmt.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.cmt.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PerfilUsuarioResource REST controller.
 *
 * @see PerfilUsuarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class PerfilUsuarioResourceIntTest {

    private static final String DEFAULT_NOME_PERFIL = "AAAAAAAAAA";
    private static final String UPDATED_NOME_PERFIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    @Autowired
    private PerfilUsuarioRepository perfilUsuarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPerfilUsuarioMockMvc;

    private PerfilUsuario perfilUsuario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerfilUsuarioResource perfilUsuarioResource = new PerfilUsuarioResource(perfilUsuarioRepository);
        this.restPerfilUsuarioMockMvc = MockMvcBuilders.standaloneSetup(perfilUsuarioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerfilUsuario createEntity(EntityManager em) {
        PerfilUsuario perfilUsuario = new PerfilUsuario()
            .nomePerfil(DEFAULT_NOME_PERFIL)
            .bolAtivo(DEFAULT_BOL_ATIVO);
        return perfilUsuario;
    }

    @Before
    public void initTest() {
        perfilUsuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerfilUsuario() throws Exception {
        int databaseSizeBeforeCreate = perfilUsuarioRepository.findAll().size();

        // Create the PerfilUsuario
        restPerfilUsuarioMockMvc.perform(post("/api/perfil-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilUsuario)))
            .andExpect(status().isCreated());

        // Validate the PerfilUsuario in the database
        List<PerfilUsuario> perfilUsuarioList = perfilUsuarioRepository.findAll();
        assertThat(perfilUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        PerfilUsuario testPerfilUsuario = perfilUsuarioList.get(perfilUsuarioList.size() - 1);
        assertThat(testPerfilUsuario.getNomePerfil()).isEqualTo(DEFAULT_NOME_PERFIL);
        assertThat(testPerfilUsuario.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void createPerfilUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perfilUsuarioRepository.findAll().size();

        // Create the PerfilUsuario with an existing ID
        perfilUsuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerfilUsuarioMockMvc.perform(post("/api/perfil-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilUsuario in the database
        List<PerfilUsuario> perfilUsuarioList = perfilUsuarioRepository.findAll();
        assertThat(perfilUsuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPerfilUsuarios() throws Exception {
        // Initialize the database
        perfilUsuarioRepository.saveAndFlush(perfilUsuario);

        // Get all the perfilUsuarioList
        restPerfilUsuarioMockMvc.perform(get("/api/perfil-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomePerfil").value(hasItem(DEFAULT_NOME_PERFIL.toString())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPerfilUsuario() throws Exception {
        // Initialize the database
        perfilUsuarioRepository.saveAndFlush(perfilUsuario);

        // Get the perfilUsuario
        restPerfilUsuarioMockMvc.perform(get("/api/perfil-usuarios/{id}", perfilUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perfilUsuario.getId().intValue()))
            .andExpect(jsonPath("$.nomePerfil").value(DEFAULT_NOME_PERFIL.toString()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPerfilUsuario() throws Exception {
        // Get the perfilUsuario
        restPerfilUsuarioMockMvc.perform(get("/api/perfil-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerfilUsuario() throws Exception {
        // Initialize the database
        perfilUsuarioRepository.saveAndFlush(perfilUsuario);

        int databaseSizeBeforeUpdate = perfilUsuarioRepository.findAll().size();

        // Update the perfilUsuario
        PerfilUsuario updatedPerfilUsuario = perfilUsuarioRepository.findById(perfilUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedPerfilUsuario are not directly saved in db
        em.detach(updatedPerfilUsuario);
        updatedPerfilUsuario
            .nomePerfil(UPDATED_NOME_PERFIL)
            .bolAtivo(UPDATED_BOL_ATIVO);

        restPerfilUsuarioMockMvc.perform(put("/api/perfil-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerfilUsuario)))
            .andExpect(status().isOk());

        // Validate the PerfilUsuario in the database
        List<PerfilUsuario> perfilUsuarioList = perfilUsuarioRepository.findAll();
        assertThat(perfilUsuarioList).hasSize(databaseSizeBeforeUpdate);
        PerfilUsuario testPerfilUsuario = perfilUsuarioList.get(perfilUsuarioList.size() - 1);
        assertThat(testPerfilUsuario.getNomePerfil()).isEqualTo(UPDATED_NOME_PERFIL);
        assertThat(testPerfilUsuario.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingPerfilUsuario() throws Exception {
        int databaseSizeBeforeUpdate = perfilUsuarioRepository.findAll().size();

        // Create the PerfilUsuario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerfilUsuarioMockMvc.perform(put("/api/perfil-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilUsuario in the database
        List<PerfilUsuario> perfilUsuarioList = perfilUsuarioRepository.findAll();
        assertThat(perfilUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerfilUsuario() throws Exception {
        // Initialize the database
        perfilUsuarioRepository.saveAndFlush(perfilUsuario);

        int databaseSizeBeforeDelete = perfilUsuarioRepository.findAll().size();

        // Get the perfilUsuario
        restPerfilUsuarioMockMvc.perform(delete("/api/perfil-usuarios/{id}", perfilUsuario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PerfilUsuario> perfilUsuarioList = perfilUsuarioRepository.findAll();
        assertThat(perfilUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerfilUsuario.class);
        PerfilUsuario perfilUsuario1 = new PerfilUsuario();
        perfilUsuario1.setId(1L);
        PerfilUsuario perfilUsuario2 = new PerfilUsuario();
        perfilUsuario2.setId(perfilUsuario1.getId());
        assertThat(perfilUsuario1).isEqualTo(perfilUsuario2);
        perfilUsuario2.setId(2L);
        assertThat(perfilUsuario1).isNotEqualTo(perfilUsuario2);
        perfilUsuario1.setId(null);
        assertThat(perfilUsuario1).isNotEqualTo(perfilUsuario2);
    }
}
