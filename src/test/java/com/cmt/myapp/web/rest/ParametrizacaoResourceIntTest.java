package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.Parametrizacao;
import com.cmt.myapp.repository.ParametrizacaoRepository;
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
 * Test class for the ParametrizacaoResource REST controller.
 *
 * @see ParametrizacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ParametrizacaoResourceIntTest {

    private static final Integer DEFAULT_DIA_COBRANCA_CONVENIO = 1;
    private static final Integer UPDATED_DIA_COBRANCA_CONVENIO = 2;

    private static final Integer DEFAULT_DIA_PAGAMENTO_LOJA = 1;
    private static final Integer UPDATED_DIA_PAGAMENTO_LOJA = 2;

    @Autowired
    private ParametrizacaoRepository parametrizacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParametrizacaoMockMvc;

    private Parametrizacao parametrizacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParametrizacaoResource parametrizacaoResource = new ParametrizacaoResource(parametrizacaoRepository);
        this.restParametrizacaoMockMvc = MockMvcBuilders.standaloneSetup(parametrizacaoResource)
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
    public static Parametrizacao createEntity(EntityManager em) {
        Parametrizacao parametrizacao = new Parametrizacao()
            .diaCobrancaConvenio(DEFAULT_DIA_COBRANCA_CONVENIO)
            .diaPagamentoLoja(DEFAULT_DIA_PAGAMENTO_LOJA);
        return parametrizacao;
    }

    @Before
    public void initTest() {
        parametrizacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createParametrizacao() throws Exception {
        int databaseSizeBeforeCreate = parametrizacaoRepository.findAll().size();

        // Create the Parametrizacao
        restParametrizacaoMockMvc.perform(post("/api/parametrizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parametrizacao)))
            .andExpect(status().isCreated());

        // Validate the Parametrizacao in the database
        List<Parametrizacao> parametrizacaoList = parametrizacaoRepository.findAll();
        assertThat(parametrizacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Parametrizacao testParametrizacao = parametrizacaoList.get(parametrizacaoList.size() - 1);
        assertThat(testParametrizacao.getDiaCobrancaConvenio()).isEqualTo(DEFAULT_DIA_COBRANCA_CONVENIO);
        assertThat(testParametrizacao.getDiaPagamentoLoja()).isEqualTo(DEFAULT_DIA_PAGAMENTO_LOJA);
    }

    @Test
    @Transactional
    public void createParametrizacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parametrizacaoRepository.findAll().size();

        // Create the Parametrizacao with an existing ID
        parametrizacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParametrizacaoMockMvc.perform(post("/api/parametrizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parametrizacao)))
            .andExpect(status().isBadRequest());

        // Validate the Parametrizacao in the database
        List<Parametrizacao> parametrizacaoList = parametrizacaoRepository.findAll();
        assertThat(parametrizacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParametrizacaos() throws Exception {
        // Initialize the database
        parametrizacaoRepository.saveAndFlush(parametrizacao);

        // Get all the parametrizacaoList
        restParametrizacaoMockMvc.perform(get("/api/parametrizacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parametrizacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].diaCobrancaConvenio").value(hasItem(DEFAULT_DIA_COBRANCA_CONVENIO)))
            .andExpect(jsonPath("$.[*].diaPagamentoLoja").value(hasItem(DEFAULT_DIA_PAGAMENTO_LOJA)));
    }
    
    @Test
    @Transactional
    public void getParametrizacao() throws Exception {
        // Initialize the database
        parametrizacaoRepository.saveAndFlush(parametrizacao);

        // Get the parametrizacao
        restParametrizacaoMockMvc.perform(get("/api/parametrizacaos/{id}", parametrizacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parametrizacao.getId().intValue()))
            .andExpect(jsonPath("$.diaCobrancaConvenio").value(DEFAULT_DIA_COBRANCA_CONVENIO))
            .andExpect(jsonPath("$.diaPagamentoLoja").value(DEFAULT_DIA_PAGAMENTO_LOJA));
    }

    @Test
    @Transactional
    public void getNonExistingParametrizacao() throws Exception {
        // Get the parametrizacao
        restParametrizacaoMockMvc.perform(get("/api/parametrizacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParametrizacao() throws Exception {
        // Initialize the database
        parametrizacaoRepository.saveAndFlush(parametrizacao);

        int databaseSizeBeforeUpdate = parametrizacaoRepository.findAll().size();

        // Update the parametrizacao
        Parametrizacao updatedParametrizacao = parametrizacaoRepository.findById(parametrizacao.getId()).get();
        // Disconnect from session so that the updates on updatedParametrizacao are not directly saved in db
        em.detach(updatedParametrizacao);
        updatedParametrizacao
            .diaCobrancaConvenio(UPDATED_DIA_COBRANCA_CONVENIO)
            .diaPagamentoLoja(UPDATED_DIA_PAGAMENTO_LOJA);

        restParametrizacaoMockMvc.perform(put("/api/parametrizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParametrizacao)))
            .andExpect(status().isOk());

        // Validate the Parametrizacao in the database
        List<Parametrizacao> parametrizacaoList = parametrizacaoRepository.findAll();
        assertThat(parametrizacaoList).hasSize(databaseSizeBeforeUpdate);
        Parametrizacao testParametrizacao = parametrizacaoList.get(parametrizacaoList.size() - 1);
        assertThat(testParametrizacao.getDiaCobrancaConvenio()).isEqualTo(UPDATED_DIA_COBRANCA_CONVENIO);
        assertThat(testParametrizacao.getDiaPagamentoLoja()).isEqualTo(UPDATED_DIA_PAGAMENTO_LOJA);
    }

    @Test
    @Transactional
    public void updateNonExistingParametrizacao() throws Exception {
        int databaseSizeBeforeUpdate = parametrizacaoRepository.findAll().size();

        // Create the Parametrizacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametrizacaoMockMvc.perform(put("/api/parametrizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parametrizacao)))
            .andExpect(status().isBadRequest());

        // Validate the Parametrizacao in the database
        List<Parametrizacao> parametrizacaoList = parametrizacaoRepository.findAll();
        assertThat(parametrizacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParametrizacao() throws Exception {
        // Initialize the database
        parametrizacaoRepository.saveAndFlush(parametrizacao);

        int databaseSizeBeforeDelete = parametrizacaoRepository.findAll().size();

        // Get the parametrizacao
        restParametrizacaoMockMvc.perform(delete("/api/parametrizacaos/{id}", parametrizacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Parametrizacao> parametrizacaoList = parametrizacaoRepository.findAll();
        assertThat(parametrizacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parametrizacao.class);
        Parametrizacao parametrizacao1 = new Parametrizacao();
        parametrizacao1.setId(1L);
        Parametrizacao parametrizacao2 = new Parametrizacao();
        parametrizacao2.setId(parametrizacao1.getId());
        assertThat(parametrizacao1).isEqualTo(parametrizacao2);
        parametrizacao2.setId(2L);
        assertThat(parametrizacao1).isNotEqualTo(parametrizacao2);
        parametrizacao1.setId(null);
        assertThat(parametrizacao1).isNotEqualTo(parametrizacao2);
    }
}
