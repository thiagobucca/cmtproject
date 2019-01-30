package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.CategoriaEstabelecimento;
import com.cmt.myapp.repository.CategoriaEstabelecimentoRepository;
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
 * Test class for the CategoriaEstabelecimentoResource REST controller.
 *
 * @see CategoriaEstabelecimentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class CategoriaEstabelecimentoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    @Autowired
    private CategoriaEstabelecimentoRepository categoriaEstabelecimentoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCategoriaEstabelecimentoMockMvc;

    private CategoriaEstabelecimento categoriaEstabelecimento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriaEstabelecimentoResource categoriaEstabelecimentoResource = new CategoriaEstabelecimentoResource(categoriaEstabelecimentoRepository);
        this.restCategoriaEstabelecimentoMockMvc = MockMvcBuilders.standaloneSetup(categoriaEstabelecimentoResource)
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
    public static CategoriaEstabelecimento createEntity(EntityManager em) {
        CategoriaEstabelecimento categoriaEstabelecimento = new CategoriaEstabelecimento()
            .nome(DEFAULT_NOME)
            .bolAtivo(DEFAULT_BOL_ATIVO);
        return categoriaEstabelecimento;
    }

    @Before
    public void initTest() {
        categoriaEstabelecimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriaEstabelecimento() throws Exception {
        int databaseSizeBeforeCreate = categoriaEstabelecimentoRepository.findAll().size();

        // Create the CategoriaEstabelecimento
        restCategoriaEstabelecimentoMockMvc.perform(post("/api/categoria-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaEstabelecimento)))
            .andExpect(status().isCreated());

        // Validate the CategoriaEstabelecimento in the database
        List<CategoriaEstabelecimento> categoriaEstabelecimentoList = categoriaEstabelecimentoRepository.findAll();
        assertThat(categoriaEstabelecimentoList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaEstabelecimento testCategoriaEstabelecimento = categoriaEstabelecimentoList.get(categoriaEstabelecimentoList.size() - 1);
        assertThat(testCategoriaEstabelecimento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCategoriaEstabelecimento.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void createCategoriaEstabelecimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriaEstabelecimentoRepository.findAll().size();

        // Create the CategoriaEstabelecimento with an existing ID
        categoriaEstabelecimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaEstabelecimentoMockMvc.perform(post("/api/categoria-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaEstabelecimento)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaEstabelecimento in the database
        List<CategoriaEstabelecimento> categoriaEstabelecimentoList = categoriaEstabelecimentoRepository.findAll();
        assertThat(categoriaEstabelecimentoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCategoriaEstabelecimentos() throws Exception {
        // Initialize the database
        categoriaEstabelecimentoRepository.saveAndFlush(categoriaEstabelecimento);

        // Get all the categoriaEstabelecimentoList
        restCategoriaEstabelecimentoMockMvc.perform(get("/api/categoria-estabelecimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaEstabelecimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCategoriaEstabelecimento() throws Exception {
        // Initialize the database
        categoriaEstabelecimentoRepository.saveAndFlush(categoriaEstabelecimento);

        // Get the categoriaEstabelecimento
        restCategoriaEstabelecimentoMockMvc.perform(get("/api/categoria-estabelecimentos/{id}", categoriaEstabelecimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaEstabelecimento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoriaEstabelecimento() throws Exception {
        // Get the categoriaEstabelecimento
        restCategoriaEstabelecimentoMockMvc.perform(get("/api/categoria-estabelecimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriaEstabelecimento() throws Exception {
        // Initialize the database
        categoriaEstabelecimentoRepository.saveAndFlush(categoriaEstabelecimento);

        int databaseSizeBeforeUpdate = categoriaEstabelecimentoRepository.findAll().size();

        // Update the categoriaEstabelecimento
        CategoriaEstabelecimento updatedCategoriaEstabelecimento = categoriaEstabelecimentoRepository.findById(categoriaEstabelecimento.getId()).get();
        // Disconnect from session so that the updates on updatedCategoriaEstabelecimento are not directly saved in db
        em.detach(updatedCategoriaEstabelecimento);
        updatedCategoriaEstabelecimento
            .nome(UPDATED_NOME)
            .bolAtivo(UPDATED_BOL_ATIVO);

        restCategoriaEstabelecimentoMockMvc.perform(put("/api/categoria-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoriaEstabelecimento)))
            .andExpect(status().isOk());

        // Validate the CategoriaEstabelecimento in the database
        List<CategoriaEstabelecimento> categoriaEstabelecimentoList = categoriaEstabelecimentoRepository.findAll();
        assertThat(categoriaEstabelecimentoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaEstabelecimento testCategoriaEstabelecimento = categoriaEstabelecimentoList.get(categoriaEstabelecimentoList.size() - 1);
        assertThat(testCategoriaEstabelecimento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCategoriaEstabelecimento.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriaEstabelecimento() throws Exception {
        int databaseSizeBeforeUpdate = categoriaEstabelecimentoRepository.findAll().size();

        // Create the CategoriaEstabelecimento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriaEstabelecimentoMockMvc.perform(put("/api/categoria-estabelecimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaEstabelecimento)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaEstabelecimento in the database
        List<CategoriaEstabelecimento> categoriaEstabelecimentoList = categoriaEstabelecimentoRepository.findAll();
        assertThat(categoriaEstabelecimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoriaEstabelecimento() throws Exception {
        // Initialize the database
        categoriaEstabelecimentoRepository.saveAndFlush(categoriaEstabelecimento);

        int databaseSizeBeforeDelete = categoriaEstabelecimentoRepository.findAll().size();

        // Get the categoriaEstabelecimento
        restCategoriaEstabelecimentoMockMvc.perform(delete("/api/categoria-estabelecimentos/{id}", categoriaEstabelecimento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoriaEstabelecimento> categoriaEstabelecimentoList = categoriaEstabelecimentoRepository.findAll();
        assertThat(categoriaEstabelecimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaEstabelecimento.class);
        CategoriaEstabelecimento categoriaEstabelecimento1 = new CategoriaEstabelecimento();
        categoriaEstabelecimento1.setId(1L);
        CategoriaEstabelecimento categoriaEstabelecimento2 = new CategoriaEstabelecimento();
        categoriaEstabelecimento2.setId(categoriaEstabelecimento1.getId());
        assertThat(categoriaEstabelecimento1).isEqualTo(categoriaEstabelecimento2);
        categoriaEstabelecimento2.setId(2L);
        assertThat(categoriaEstabelecimento1).isNotEqualTo(categoriaEstabelecimento2);
        categoriaEstabelecimento1.setId(null);
        assertThat(categoriaEstabelecimento1).isNotEqualTo(categoriaEstabelecimento2);
    }
}
