package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.ContatoEstabelecimento;
import com.cmt.myapp.repository.ContatoEstabelecimentoRepository;
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
 * Test class for the ContatoEstabelecimentoResource REST controller.
 *
 * @see ContatoEstabelecimentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ContatoEstabelecimentoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Long DEFAULT_ESTABELECIMENTO_COMERCIAL_ID = 1L;
    private static final Long UPDATED_ESTABELECIMENTO_COMERCIAL_ID = 2L;

    @Autowired
    private ContatoEstabelecimentoRepository contatoEstabelecimentoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContatoEstabelecimentoMockMvc;

    private ContatoEstabelecimento contatoEstabelecimento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContatoEstabelecimentoResource contatoEstabelecimentoResource = new ContatoEstabelecimentoResource(contatoEstabelecimentoRepository);
        this.restContatoEstabelecimentoMockMvc = MockMvcBuilders.standaloneSetup(contatoEstabelecimentoResource)
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
    public static ContatoEstabelecimento createEntity(EntityManager em) {
        ContatoEstabelecimento contatoEstabelecimento = new ContatoEstabelecimento()
            .nome(DEFAULT_NOME)
            .telefone(DEFAULT_TELEFONE)
            .email(DEFAULT_EMAIL)
            .estabelecimentoComercialId(DEFAULT_ESTABELECIMENTO_COMERCIAL_ID);
        return contatoEstabelecimento;
    }

    @Before
    public void initTest() {
        contatoEstabelecimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createContatoEstabelecimento() throws Exception {
        int databaseSizeBeforeCreate = contatoEstabelecimentoRepository.findAll().size();

        // Create the ContatoEstabelecimento
        restContatoEstabelecimentoMockMvc.perform(post("/api/contato-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoEstabelecimento)))
            .andExpect(status().isCreated());

        // Validate the ContatoEstabelecimento in the database
        List<ContatoEstabelecimento> contatoEstabelecimentoList = contatoEstabelecimentoRepository.findAll();
        assertThat(contatoEstabelecimentoList).hasSize(databaseSizeBeforeCreate + 1);
        ContatoEstabelecimento testContatoEstabelecimento = contatoEstabelecimentoList.get(contatoEstabelecimentoList.size() - 1);
        assertThat(testContatoEstabelecimento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testContatoEstabelecimento.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testContatoEstabelecimento.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContatoEstabelecimento.getEstabelecimentoComercialId()).isEqualTo(DEFAULT_ESTABELECIMENTO_COMERCIAL_ID);
    }

    @Test
    @Transactional
    public void createContatoEstabelecimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contatoEstabelecimentoRepository.findAll().size();

        // Create the ContatoEstabelecimento with an existing ID
        contatoEstabelecimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContatoEstabelecimentoMockMvc.perform(post("/api/contato-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoEstabelecimento)))
            .andExpect(status().isBadRequest());

        // Validate the ContatoEstabelecimento in the database
        List<ContatoEstabelecimento> contatoEstabelecimentoList = contatoEstabelecimentoRepository.findAll();
        assertThat(contatoEstabelecimentoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContatoEstabelecimentos() throws Exception {
        // Initialize the database
        contatoEstabelecimentoRepository.saveAndFlush(contatoEstabelecimento);

        // Get all the contatoEstabelecimentoList
        restContatoEstabelecimentoMockMvc.perform(get("/api/contato-estabelecimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contatoEstabelecimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].estabelecimentoComercialId").value(hasItem(DEFAULT_ESTABELECIMENTO_COMERCIAL_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getContatoEstabelecimento() throws Exception {
        // Initialize the database
        contatoEstabelecimentoRepository.saveAndFlush(contatoEstabelecimento);

        // Get the contatoEstabelecimento
        restContatoEstabelecimentoMockMvc.perform(get("/api/contato-estabelecimentos/{id}", contatoEstabelecimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contatoEstabelecimento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.estabelecimentoComercialId").value(DEFAULT_ESTABELECIMENTO_COMERCIAL_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingContatoEstabelecimento() throws Exception {
        // Get the contatoEstabelecimento
        restContatoEstabelecimentoMockMvc.perform(get("/api/contato-estabelecimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContatoEstabelecimento() throws Exception {
        // Initialize the database
        contatoEstabelecimentoRepository.saveAndFlush(contatoEstabelecimento);

        int databaseSizeBeforeUpdate = contatoEstabelecimentoRepository.findAll().size();

        // Update the contatoEstabelecimento
        ContatoEstabelecimento updatedContatoEstabelecimento = contatoEstabelecimentoRepository.findById(contatoEstabelecimento.getId()).get();
        // Disconnect from session so that the updates on updatedContatoEstabelecimento are not directly saved in db
        em.detach(updatedContatoEstabelecimento);
        updatedContatoEstabelecimento
            .nome(UPDATED_NOME)
            .telefone(UPDATED_TELEFONE)
            .email(UPDATED_EMAIL)
            .estabelecimentoComercialId(UPDATED_ESTABELECIMENTO_COMERCIAL_ID);

        restContatoEstabelecimentoMockMvc.perform(put("/api/contato-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContatoEstabelecimento)))
            .andExpect(status().isOk());

        // Validate the ContatoEstabelecimento in the database
        List<ContatoEstabelecimento> contatoEstabelecimentoList = contatoEstabelecimentoRepository.findAll();
        assertThat(contatoEstabelecimentoList).hasSize(databaseSizeBeforeUpdate);
        ContatoEstabelecimento testContatoEstabelecimento = contatoEstabelecimentoList.get(contatoEstabelecimentoList.size() - 1);
        assertThat(testContatoEstabelecimento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testContatoEstabelecimento.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testContatoEstabelecimento.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContatoEstabelecimento.getEstabelecimentoComercialId()).isEqualTo(UPDATED_ESTABELECIMENTO_COMERCIAL_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingContatoEstabelecimento() throws Exception {
        int databaseSizeBeforeUpdate = contatoEstabelecimentoRepository.findAll().size();

        // Create the ContatoEstabelecimento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContatoEstabelecimentoMockMvc.perform(put("/api/contato-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contatoEstabelecimento)))
            .andExpect(status().isBadRequest());

        // Validate the ContatoEstabelecimento in the database
        List<ContatoEstabelecimento> contatoEstabelecimentoList = contatoEstabelecimentoRepository.findAll();
        assertThat(contatoEstabelecimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContatoEstabelecimento() throws Exception {
        // Initialize the database
        contatoEstabelecimentoRepository.saveAndFlush(contatoEstabelecimento);

        int databaseSizeBeforeDelete = contatoEstabelecimentoRepository.findAll().size();

        // Get the contatoEstabelecimento
        restContatoEstabelecimentoMockMvc.perform(delete("/api/contato-estabelecimentos/{id}", contatoEstabelecimento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContatoEstabelecimento> contatoEstabelecimentoList = contatoEstabelecimentoRepository.findAll();
        assertThat(contatoEstabelecimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContatoEstabelecimento.class);
        ContatoEstabelecimento contatoEstabelecimento1 = new ContatoEstabelecimento();
        contatoEstabelecimento1.setId(1L);
        ContatoEstabelecimento contatoEstabelecimento2 = new ContatoEstabelecimento();
        contatoEstabelecimento2.setId(contatoEstabelecimento1.getId());
        assertThat(contatoEstabelecimento1).isEqualTo(contatoEstabelecimento2);
        contatoEstabelecimento2.setId(2L);
        assertThat(contatoEstabelecimento1).isNotEqualTo(contatoEstabelecimento2);
        contatoEstabelecimento1.setId(null);
        assertThat(contatoEstabelecimento1).isNotEqualTo(contatoEstabelecimento2);
    }
}
