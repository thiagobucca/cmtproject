package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.ComunicacaoPush;
import com.cmt.myapp.repository.ComunicacaoPushRepository;
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

import com.cmt.myapp.domain.enumeration.TipoPessoa;
/**
 * Test class for the ComunicacaoPushResource REST controller.
 *
 * @see ComunicacaoPushResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ComunicacaoPushResourceIntTest {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTEUDO_PUSH = "AAAAAAAAAA";
    private static final String UPDATED_CONTEUDO_PUSH = "BBBBBBBBBB";

    private static final TipoPessoa DEFAULT_TIPO_PESSOA = TipoPessoa.Macom;
    private static final TipoPessoa UPDATED_TIPO_PESSOA = TipoPessoa.Dependente;

    @Autowired
    private ComunicacaoPushRepository comunicacaoPushRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComunicacaoPushMockMvc;

    private ComunicacaoPush comunicacaoPush;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComunicacaoPushResource comunicacaoPushResource = new ComunicacaoPushResource(comunicacaoPushRepository);
        this.restComunicacaoPushMockMvc = MockMvcBuilders.standaloneSetup(comunicacaoPushResource)
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
    public static ComunicacaoPush createEntity(EntityManager em) {
        ComunicacaoPush comunicacaoPush = new ComunicacaoPush()
            .titulo(DEFAULT_TITULO)
            .conteudoPush(DEFAULT_CONTEUDO_PUSH)
            .tipoPessoa(DEFAULT_TIPO_PESSOA);
        return comunicacaoPush;
    }

    @Before
    public void initTest() {
        comunicacaoPush = createEntity(em);
    }

    @Test
    @Transactional
    public void createComunicacaoPush() throws Exception {
        int databaseSizeBeforeCreate = comunicacaoPushRepository.findAll().size();

        // Create the ComunicacaoPush
        restComunicacaoPushMockMvc.perform(post("/api/comunicacao-pushes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPush)))
            .andExpect(status().isCreated());

        // Validate the ComunicacaoPush in the database
        List<ComunicacaoPush> comunicacaoPushList = comunicacaoPushRepository.findAll();
        assertThat(comunicacaoPushList).hasSize(databaseSizeBeforeCreate + 1);
        ComunicacaoPush testComunicacaoPush = comunicacaoPushList.get(comunicacaoPushList.size() - 1);
        assertThat(testComunicacaoPush.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testComunicacaoPush.getConteudoPush()).isEqualTo(DEFAULT_CONTEUDO_PUSH);
        assertThat(testComunicacaoPush.getTipoPessoa()).isEqualTo(DEFAULT_TIPO_PESSOA);
    }

    @Test
    @Transactional
    public void createComunicacaoPushWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comunicacaoPushRepository.findAll().size();

        // Create the ComunicacaoPush with an existing ID
        comunicacaoPush.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComunicacaoPushMockMvc.perform(post("/api/comunicacao-pushes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPush)))
            .andExpect(status().isBadRequest());

        // Validate the ComunicacaoPush in the database
        List<ComunicacaoPush> comunicacaoPushList = comunicacaoPushRepository.findAll();
        assertThat(comunicacaoPushList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComunicacaoPushes() throws Exception {
        // Initialize the database
        comunicacaoPushRepository.saveAndFlush(comunicacaoPush);

        // Get all the comunicacaoPushList
        restComunicacaoPushMockMvc.perform(get("/api/comunicacao-pushes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comunicacaoPush.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].conteudoPush").value(hasItem(DEFAULT_CONTEUDO_PUSH.toString())))
            .andExpect(jsonPath("$.[*].tipoPessoa").value(hasItem(DEFAULT_TIPO_PESSOA.toString())));
    }
    
    @Test
    @Transactional
    public void getComunicacaoPush() throws Exception {
        // Initialize the database
        comunicacaoPushRepository.saveAndFlush(comunicacaoPush);

        // Get the comunicacaoPush
        restComunicacaoPushMockMvc.perform(get("/api/comunicacao-pushes/{id}", comunicacaoPush.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comunicacaoPush.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.conteudoPush").value(DEFAULT_CONTEUDO_PUSH.toString()))
            .andExpect(jsonPath("$.tipoPessoa").value(DEFAULT_TIPO_PESSOA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComunicacaoPush() throws Exception {
        // Get the comunicacaoPush
        restComunicacaoPushMockMvc.perform(get("/api/comunicacao-pushes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComunicacaoPush() throws Exception {
        // Initialize the database
        comunicacaoPushRepository.saveAndFlush(comunicacaoPush);

        int databaseSizeBeforeUpdate = comunicacaoPushRepository.findAll().size();

        // Update the comunicacaoPush
        ComunicacaoPush updatedComunicacaoPush = comunicacaoPushRepository.findById(comunicacaoPush.getId()).get();
        // Disconnect from session so that the updates on updatedComunicacaoPush are not directly saved in db
        em.detach(updatedComunicacaoPush);
        updatedComunicacaoPush
            .titulo(UPDATED_TITULO)
            .conteudoPush(UPDATED_CONTEUDO_PUSH)
            .tipoPessoa(UPDATED_TIPO_PESSOA);

        restComunicacaoPushMockMvc.perform(put("/api/comunicacao-pushes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComunicacaoPush)))
            .andExpect(status().isOk());

        // Validate the ComunicacaoPush in the database
        List<ComunicacaoPush> comunicacaoPushList = comunicacaoPushRepository.findAll();
        assertThat(comunicacaoPushList).hasSize(databaseSizeBeforeUpdate);
        ComunicacaoPush testComunicacaoPush = comunicacaoPushList.get(comunicacaoPushList.size() - 1);
        assertThat(testComunicacaoPush.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testComunicacaoPush.getConteudoPush()).isEqualTo(UPDATED_CONTEUDO_PUSH);
        assertThat(testComunicacaoPush.getTipoPessoa()).isEqualTo(UPDATED_TIPO_PESSOA);
    }

    @Test
    @Transactional
    public void updateNonExistingComunicacaoPush() throws Exception {
        int databaseSizeBeforeUpdate = comunicacaoPushRepository.findAll().size();

        // Create the ComunicacaoPush

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComunicacaoPushMockMvc.perform(put("/api/comunicacao-pushes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPush)))
            .andExpect(status().isBadRequest());

        // Validate the ComunicacaoPush in the database
        List<ComunicacaoPush> comunicacaoPushList = comunicacaoPushRepository.findAll();
        assertThat(comunicacaoPushList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComunicacaoPush() throws Exception {
        // Initialize the database
        comunicacaoPushRepository.saveAndFlush(comunicacaoPush);

        int databaseSizeBeforeDelete = comunicacaoPushRepository.findAll().size();

        // Get the comunicacaoPush
        restComunicacaoPushMockMvc.perform(delete("/api/comunicacao-pushes/{id}", comunicacaoPush.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComunicacaoPush> comunicacaoPushList = comunicacaoPushRepository.findAll();
        assertThat(comunicacaoPushList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComunicacaoPush.class);
        ComunicacaoPush comunicacaoPush1 = new ComunicacaoPush();
        comunicacaoPush1.setId(1L);
        ComunicacaoPush comunicacaoPush2 = new ComunicacaoPush();
        comunicacaoPush2.setId(comunicacaoPush1.getId());
        assertThat(comunicacaoPush1).isEqualTo(comunicacaoPush2);
        comunicacaoPush2.setId(2L);
        assertThat(comunicacaoPush1).isNotEqualTo(comunicacaoPush2);
        comunicacaoPush1.setId(null);
        assertThat(comunicacaoPush1).isNotEqualTo(comunicacaoPush2);
    }
}
