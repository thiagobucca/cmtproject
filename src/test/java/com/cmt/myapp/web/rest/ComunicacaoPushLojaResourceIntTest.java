package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.ComunicacaoPushLoja;
import com.cmt.myapp.repository.ComunicacaoPushLojaRepository;
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
 * Test class for the ComunicacaoPushLojaResource REST controller.
 *
 * @see ComunicacaoPushLojaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ComunicacaoPushLojaResourceIntTest {

    private static final Long DEFAULT_COMUNICACAO_PUSH_ID = 1L;
    private static final Long UPDATED_COMUNICACAO_PUSH_ID = 2L;

    private static final Long DEFAULT_LOJA_MACONICA_ID = 1L;
    private static final Long UPDATED_LOJA_MACONICA_ID = 2L;

    @Autowired
    private ComunicacaoPushLojaRepository comunicacaoPushLojaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComunicacaoPushLojaMockMvc;

    private ComunicacaoPushLoja comunicacaoPushLoja;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComunicacaoPushLojaResource comunicacaoPushLojaResource = new ComunicacaoPushLojaResource(comunicacaoPushLojaRepository);
        this.restComunicacaoPushLojaMockMvc = MockMvcBuilders.standaloneSetup(comunicacaoPushLojaResource)
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
    public static ComunicacaoPushLoja createEntity(EntityManager em) {
        ComunicacaoPushLoja comunicacaoPushLoja = new ComunicacaoPushLoja()
            .comunicacaoPushId(DEFAULT_COMUNICACAO_PUSH_ID)
            .lojaMaconicaId(DEFAULT_LOJA_MACONICA_ID);
        return comunicacaoPushLoja;
    }

    @Before
    public void initTest() {
        comunicacaoPushLoja = createEntity(em);
    }

    @Test
    @Transactional
    public void createComunicacaoPushLoja() throws Exception {
        int databaseSizeBeforeCreate = comunicacaoPushLojaRepository.findAll().size();

        // Create the ComunicacaoPushLoja
        restComunicacaoPushLojaMockMvc.perform(post("/api/comunicacao-push-lojas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPushLoja)))
            .andExpect(status().isCreated());

        // Validate the ComunicacaoPushLoja in the database
        List<ComunicacaoPushLoja> comunicacaoPushLojaList = comunicacaoPushLojaRepository.findAll();
        assertThat(comunicacaoPushLojaList).hasSize(databaseSizeBeforeCreate + 1);
        ComunicacaoPushLoja testComunicacaoPushLoja = comunicacaoPushLojaList.get(comunicacaoPushLojaList.size() - 1);
        assertThat(testComunicacaoPushLoja.getComunicacaoPushId()).isEqualTo(DEFAULT_COMUNICACAO_PUSH_ID);
        assertThat(testComunicacaoPushLoja.getLojaMaconicaId()).isEqualTo(DEFAULT_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void createComunicacaoPushLojaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comunicacaoPushLojaRepository.findAll().size();

        // Create the ComunicacaoPushLoja with an existing ID
        comunicacaoPushLoja.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComunicacaoPushLojaMockMvc.perform(post("/api/comunicacao-push-lojas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPushLoja)))
            .andExpect(status().isBadRequest());

        // Validate the ComunicacaoPushLoja in the database
        List<ComunicacaoPushLoja> comunicacaoPushLojaList = comunicacaoPushLojaRepository.findAll();
        assertThat(comunicacaoPushLojaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComunicacaoPushLojas() throws Exception {
        // Initialize the database
        comunicacaoPushLojaRepository.saveAndFlush(comunicacaoPushLoja);

        // Get all the comunicacaoPushLojaList
        restComunicacaoPushLojaMockMvc.perform(get("/api/comunicacao-push-lojas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comunicacaoPushLoja.getId().intValue())))
            .andExpect(jsonPath("$.[*].comunicacaoPushId").value(hasItem(DEFAULT_COMUNICACAO_PUSH_ID.intValue())))
            .andExpect(jsonPath("$.[*].lojaMaconicaId").value(hasItem(DEFAULT_LOJA_MACONICA_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getComunicacaoPushLoja() throws Exception {
        // Initialize the database
        comunicacaoPushLojaRepository.saveAndFlush(comunicacaoPushLoja);

        // Get the comunicacaoPushLoja
        restComunicacaoPushLojaMockMvc.perform(get("/api/comunicacao-push-lojas/{id}", comunicacaoPushLoja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comunicacaoPushLoja.getId().intValue()))
            .andExpect(jsonPath("$.comunicacaoPushId").value(DEFAULT_COMUNICACAO_PUSH_ID.intValue()))
            .andExpect(jsonPath("$.lojaMaconicaId").value(DEFAULT_LOJA_MACONICA_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingComunicacaoPushLoja() throws Exception {
        // Get the comunicacaoPushLoja
        restComunicacaoPushLojaMockMvc.perform(get("/api/comunicacao-push-lojas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComunicacaoPushLoja() throws Exception {
        // Initialize the database
        comunicacaoPushLojaRepository.saveAndFlush(comunicacaoPushLoja);

        int databaseSizeBeforeUpdate = comunicacaoPushLojaRepository.findAll().size();

        // Update the comunicacaoPushLoja
        ComunicacaoPushLoja updatedComunicacaoPushLoja = comunicacaoPushLojaRepository.findById(comunicacaoPushLoja.getId()).get();
        // Disconnect from session so that the updates on updatedComunicacaoPushLoja are not directly saved in db
        em.detach(updatedComunicacaoPushLoja);
        updatedComunicacaoPushLoja
            .comunicacaoPushId(UPDATED_COMUNICACAO_PUSH_ID)
            .lojaMaconicaId(UPDATED_LOJA_MACONICA_ID);

        restComunicacaoPushLojaMockMvc.perform(put("/api/comunicacao-push-lojas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComunicacaoPushLoja)))
            .andExpect(status().isOk());

        // Validate the ComunicacaoPushLoja in the database
        List<ComunicacaoPushLoja> comunicacaoPushLojaList = comunicacaoPushLojaRepository.findAll();
        assertThat(comunicacaoPushLojaList).hasSize(databaseSizeBeforeUpdate);
        ComunicacaoPushLoja testComunicacaoPushLoja = comunicacaoPushLojaList.get(comunicacaoPushLojaList.size() - 1);
        assertThat(testComunicacaoPushLoja.getComunicacaoPushId()).isEqualTo(UPDATED_COMUNICACAO_PUSH_ID);
        assertThat(testComunicacaoPushLoja.getLojaMaconicaId()).isEqualTo(UPDATED_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingComunicacaoPushLoja() throws Exception {
        int databaseSizeBeforeUpdate = comunicacaoPushLojaRepository.findAll().size();

        // Create the ComunicacaoPushLoja

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComunicacaoPushLojaMockMvc.perform(put("/api/comunicacao-push-lojas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comunicacaoPushLoja)))
            .andExpect(status().isBadRequest());

        // Validate the ComunicacaoPushLoja in the database
        List<ComunicacaoPushLoja> comunicacaoPushLojaList = comunicacaoPushLojaRepository.findAll();
        assertThat(comunicacaoPushLojaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComunicacaoPushLoja() throws Exception {
        // Initialize the database
        comunicacaoPushLojaRepository.saveAndFlush(comunicacaoPushLoja);

        int databaseSizeBeforeDelete = comunicacaoPushLojaRepository.findAll().size();

        // Get the comunicacaoPushLoja
        restComunicacaoPushLojaMockMvc.perform(delete("/api/comunicacao-push-lojas/{id}", comunicacaoPushLoja.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ComunicacaoPushLoja> comunicacaoPushLojaList = comunicacaoPushLojaRepository.findAll();
        assertThat(comunicacaoPushLojaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComunicacaoPushLoja.class);
        ComunicacaoPushLoja comunicacaoPushLoja1 = new ComunicacaoPushLoja();
        comunicacaoPushLoja1.setId(1L);
        ComunicacaoPushLoja comunicacaoPushLoja2 = new ComunicacaoPushLoja();
        comunicacaoPushLoja2.setId(comunicacaoPushLoja1.getId());
        assertThat(comunicacaoPushLoja1).isEqualTo(comunicacaoPushLoja2);
        comunicacaoPushLoja2.setId(2L);
        assertThat(comunicacaoPushLoja1).isNotEqualTo(comunicacaoPushLoja2);
        comunicacaoPushLoja1.setId(null);
        assertThat(comunicacaoPushLoja1).isNotEqualTo(comunicacaoPushLoja2);
    }
}
