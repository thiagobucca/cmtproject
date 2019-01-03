package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.TipoOperacao;
import com.cmt.myapp.repository.TipoOperacaoRepository;
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

import com.cmt.myapp.domain.enumeration.TipoLancamento;
/**
 * Test class for the TipoOperacaoResource REST controller.
 *
 * @see TipoOperacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class TipoOperacaoResourceIntTest {

    private static final String DEFAULT_NOME_OPERACAO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_OPERACAO = "BBBBBBBBBB";

    private static final TipoLancamento DEFAULT_TIPO_LANCAMENTO = TipoLancamento.Credito;
    private static final TipoLancamento UPDATED_TIPO_LANCAMENTO = TipoLancamento.Debito;

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    @Autowired
    private TipoOperacaoRepository tipoOperacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoOperacaoMockMvc;

    private TipoOperacao tipoOperacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoOperacaoResource tipoOperacaoResource = new TipoOperacaoResource(tipoOperacaoRepository);
        this.restTipoOperacaoMockMvc = MockMvcBuilders.standaloneSetup(tipoOperacaoResource)
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
    public static TipoOperacao createEntity(EntityManager em) {
        TipoOperacao tipoOperacao = new TipoOperacao()
            .nomeOperacao(DEFAULT_NOME_OPERACAO)
            .tipoLancamento(DEFAULT_TIPO_LANCAMENTO)
            .bolAtivo(DEFAULT_BOL_ATIVO);
        return tipoOperacao;
    }

    @Before
    public void initTest() {
        tipoOperacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoOperacao() throws Exception {
        int databaseSizeBeforeCreate = tipoOperacaoRepository.findAll().size();

        // Create the TipoOperacao
        restTipoOperacaoMockMvc.perform(post("/api/tipo-operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoOperacao)))
            .andExpect(status().isCreated());

        // Validate the TipoOperacao in the database
        List<TipoOperacao> tipoOperacaoList = tipoOperacaoRepository.findAll();
        assertThat(tipoOperacaoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoOperacao testTipoOperacao = tipoOperacaoList.get(tipoOperacaoList.size() - 1);
        assertThat(testTipoOperacao.getNomeOperacao()).isEqualTo(DEFAULT_NOME_OPERACAO);
        assertThat(testTipoOperacao.getTipoLancamento()).isEqualTo(DEFAULT_TIPO_LANCAMENTO);
        assertThat(testTipoOperacao.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void createTipoOperacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoOperacaoRepository.findAll().size();

        // Create the TipoOperacao with an existing ID
        tipoOperacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoOperacaoMockMvc.perform(post("/api/tipo-operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoOperacao)))
            .andExpect(status().isBadRequest());

        // Validate the TipoOperacao in the database
        List<TipoOperacao> tipoOperacaoList = tipoOperacaoRepository.findAll();
        assertThat(tipoOperacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoOperacaos() throws Exception {
        // Initialize the database
        tipoOperacaoRepository.saveAndFlush(tipoOperacao);

        // Get all the tipoOperacaoList
        restTipoOperacaoMockMvc.perform(get("/api/tipo-operacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoOperacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeOperacao").value(hasItem(DEFAULT_NOME_OPERACAO.toString())))
            .andExpect(jsonPath("$.[*].tipoLancamento").value(hasItem(DEFAULT_TIPO_LANCAMENTO.toString())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTipoOperacao() throws Exception {
        // Initialize the database
        tipoOperacaoRepository.saveAndFlush(tipoOperacao);

        // Get the tipoOperacao
        restTipoOperacaoMockMvc.perform(get("/api/tipo-operacaos/{id}", tipoOperacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoOperacao.getId().intValue()))
            .andExpect(jsonPath("$.nomeOperacao").value(DEFAULT_NOME_OPERACAO.toString()))
            .andExpect(jsonPath("$.tipoLancamento").value(DEFAULT_TIPO_LANCAMENTO.toString()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoOperacao() throws Exception {
        // Get the tipoOperacao
        restTipoOperacaoMockMvc.perform(get("/api/tipo-operacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoOperacao() throws Exception {
        // Initialize the database
        tipoOperacaoRepository.saveAndFlush(tipoOperacao);

        int databaseSizeBeforeUpdate = tipoOperacaoRepository.findAll().size();

        // Update the tipoOperacao
        TipoOperacao updatedTipoOperacao = tipoOperacaoRepository.findById(tipoOperacao.getId()).get();
        // Disconnect from session so that the updates on updatedTipoOperacao are not directly saved in db
        em.detach(updatedTipoOperacao);
        updatedTipoOperacao
            .nomeOperacao(UPDATED_NOME_OPERACAO)
            .tipoLancamento(UPDATED_TIPO_LANCAMENTO)
            .bolAtivo(UPDATED_BOL_ATIVO);

        restTipoOperacaoMockMvc.perform(put("/api/tipo-operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoOperacao)))
            .andExpect(status().isOk());

        // Validate the TipoOperacao in the database
        List<TipoOperacao> tipoOperacaoList = tipoOperacaoRepository.findAll();
        assertThat(tipoOperacaoList).hasSize(databaseSizeBeforeUpdate);
        TipoOperacao testTipoOperacao = tipoOperacaoList.get(tipoOperacaoList.size() - 1);
        assertThat(testTipoOperacao.getNomeOperacao()).isEqualTo(UPDATED_NOME_OPERACAO);
        assertThat(testTipoOperacao.getTipoLancamento()).isEqualTo(UPDATED_TIPO_LANCAMENTO);
        assertThat(testTipoOperacao.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoOperacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoOperacaoRepository.findAll().size();

        // Create the TipoOperacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoOperacaoMockMvc.perform(put("/api/tipo-operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoOperacao)))
            .andExpect(status().isBadRequest());

        // Validate the TipoOperacao in the database
        List<TipoOperacao> tipoOperacaoList = tipoOperacaoRepository.findAll();
        assertThat(tipoOperacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoOperacao() throws Exception {
        // Initialize the database
        tipoOperacaoRepository.saveAndFlush(tipoOperacao);

        int databaseSizeBeforeDelete = tipoOperacaoRepository.findAll().size();

        // Get the tipoOperacao
        restTipoOperacaoMockMvc.perform(delete("/api/tipo-operacaos/{id}", tipoOperacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoOperacao> tipoOperacaoList = tipoOperacaoRepository.findAll();
        assertThat(tipoOperacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoOperacao.class);
        TipoOperacao tipoOperacao1 = new TipoOperacao();
        tipoOperacao1.setId(1L);
        TipoOperacao tipoOperacao2 = new TipoOperacao();
        tipoOperacao2.setId(tipoOperacao1.getId());
        assertThat(tipoOperacao1).isEqualTo(tipoOperacao2);
        tipoOperacao2.setId(2L);
        assertThat(tipoOperacao1).isNotEqualTo(tipoOperacao2);
        tipoOperacao1.setId(null);
        assertThat(tipoOperacao1).isNotEqualTo(tipoOperacao2);
    }
}
