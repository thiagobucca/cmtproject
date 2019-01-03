package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.ContatoLojaMaconica;
import com.cmt.myapp.repository.ContatoLojaMaconicaRepository;
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
 * Test class for the ContatoLojaMaconicaResource REST controller.
 *
 * @see ContatoLojaMaconicaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ContatoLojaMaconicaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ContatoLojaMaconicaRepository contatoLojaMaconicaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContatoLojaMaconicaMockMvc;

    private ContatoLojaMaconica contatoLojaMaconica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContatoLojaMaconicaResource contatoLojaMaconicaResource = new ContatoLojaMaconicaResource(contatoLojaMaconicaRepository);
        this.restContatoLojaMaconicaMockMvc = MockMvcBuilders.standaloneSetup(contatoLojaMaconicaResource)
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
    public static ContatoLojaMaconica createEntity(EntityManager em) {
        ContatoLojaMaconica contatoLojaMaconica = new ContatoLojaMaconica()
            .nome(DEFAULT_NOME)
            .telefone(DEFAULT_TELEFONE)
            .email(DEFAULT_EMAIL);
        return contatoLojaMaconica;
    }

    @Before
    public void initTest() {
        contatoLojaMaconica = createEntity(em);
    }

    @Test
    @Transactional
    public void createContatoLojaMaconica() throws Exception {
        int databaseSizeBeforeCreate = contatoLojaMaconicaRepository.findAll().size();

        // Create the ContatoLojaMaconica
        restContatoLojaMaconicaMockMvc.perform(post("/api/contato-loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoLojaMaconica)))
            .andExpect(status().isCreated());

        // Validate the ContatoLojaMaconica in the database
        List<ContatoLojaMaconica> contatoLojaMaconicaList = contatoLojaMaconicaRepository.findAll();
        assertThat(contatoLojaMaconicaList).hasSize(databaseSizeBeforeCreate + 1);
        ContatoLojaMaconica testContatoLojaMaconica = contatoLojaMaconicaList.get(contatoLojaMaconicaList.size() - 1);
        assertThat(testContatoLojaMaconica.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testContatoLojaMaconica.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testContatoLojaMaconica.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createContatoLojaMaconicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contatoLojaMaconicaRepository.findAll().size();

        // Create the ContatoLojaMaconica with an existing ID
        contatoLojaMaconica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContatoLojaMaconicaMockMvc.perform(post("/api/contato-loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoLojaMaconica)))
            .andExpect(status().isBadRequest());

        // Validate the ContatoLojaMaconica in the database
        List<ContatoLojaMaconica> contatoLojaMaconicaList = contatoLojaMaconicaRepository.findAll();
        assertThat(contatoLojaMaconicaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContatoLojaMaconicas() throws Exception {
        // Initialize the database
        contatoLojaMaconicaRepository.saveAndFlush(contatoLojaMaconica);

        // Get all the contatoLojaMaconicaList
        restContatoLojaMaconicaMockMvc.perform(get("/api/contato-loja-maconicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contatoLojaMaconica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getContatoLojaMaconica() throws Exception {
        // Initialize the database
        contatoLojaMaconicaRepository.saveAndFlush(contatoLojaMaconica);

        // Get the contatoLojaMaconica
        restContatoLojaMaconicaMockMvc.perform(get("/api/contato-loja-maconicas/{id}", contatoLojaMaconica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contatoLojaMaconica.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContatoLojaMaconica() throws Exception {
        // Get the contatoLojaMaconica
        restContatoLojaMaconicaMockMvc.perform(get("/api/contato-loja-maconicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContatoLojaMaconica() throws Exception {
        // Initialize the database
        contatoLojaMaconicaRepository.saveAndFlush(contatoLojaMaconica);

        int databaseSizeBeforeUpdate = contatoLojaMaconicaRepository.findAll().size();

        // Update the contatoLojaMaconica
        ContatoLojaMaconica updatedContatoLojaMaconica = contatoLojaMaconicaRepository.findById(contatoLojaMaconica.getId()).get();
        // Disconnect from session so that the updates on updatedContatoLojaMaconica are not directly saved in db
        em.detach(updatedContatoLojaMaconica);
        updatedContatoLojaMaconica
            .nome(UPDATED_NOME)
            .telefone(UPDATED_TELEFONE)
            .email(UPDATED_EMAIL);

        restContatoLojaMaconicaMockMvc.perform(put("/api/contato-loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContatoLojaMaconica)))
            .andExpect(status().isOk());

        // Validate the ContatoLojaMaconica in the database
        List<ContatoLojaMaconica> contatoLojaMaconicaList = contatoLojaMaconicaRepository.findAll();
        assertThat(contatoLojaMaconicaList).hasSize(databaseSizeBeforeUpdate);
        ContatoLojaMaconica testContatoLojaMaconica = contatoLojaMaconicaList.get(contatoLojaMaconicaList.size() - 1);
        assertThat(testContatoLojaMaconica.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testContatoLojaMaconica.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testContatoLojaMaconica.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingContatoLojaMaconica() throws Exception {
        int databaseSizeBeforeUpdate = contatoLojaMaconicaRepository.findAll().size();

        // Create the ContatoLojaMaconica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContatoLojaMaconicaMockMvc.perform(put("/api/contato-loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoLojaMaconica)))
            .andExpect(status().isBadRequest());

        // Validate the ContatoLojaMaconica in the database
        List<ContatoLojaMaconica> contatoLojaMaconicaList = contatoLojaMaconicaRepository.findAll();
        assertThat(contatoLojaMaconicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContatoLojaMaconica() throws Exception {
        // Initialize the database
        contatoLojaMaconicaRepository.saveAndFlush(contatoLojaMaconica);

        int databaseSizeBeforeDelete = contatoLojaMaconicaRepository.findAll().size();

        // Get the contatoLojaMaconica
        restContatoLojaMaconicaMockMvc.perform(delete("/api/contato-loja-maconicas/{id}", contatoLojaMaconica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContatoLojaMaconica> contatoLojaMaconicaList = contatoLojaMaconicaRepository.findAll();
        assertThat(contatoLojaMaconicaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContatoLojaMaconica.class);
        ContatoLojaMaconica contatoLojaMaconica1 = new ContatoLojaMaconica();
        contatoLojaMaconica1.setId(1L);
        ContatoLojaMaconica contatoLojaMaconica2 = new ContatoLojaMaconica();
        contatoLojaMaconica2.setId(contatoLojaMaconica1.getId());
        assertThat(contatoLojaMaconica1).isEqualTo(contatoLojaMaconica2);
        contatoLojaMaconica2.setId(2L);
        assertThat(contatoLojaMaconica1).isNotEqualTo(contatoLojaMaconica2);
        contatoLojaMaconica1.setId(null);
        assertThat(contatoLojaMaconica1).isNotEqualTo(contatoLojaMaconica2);
    }
}
