package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.ContasPagarReceber;
import com.cmt.myapp.repository.ContasPagarReceberRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.cmt.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cmt.myapp.domain.enumeration.TipoLancamento;
import com.cmt.myapp.domain.enumeration.StatusLancamento;
/**
 * Test class for the ContasPagarReceberResource REST controller.
 *
 * @see ContasPagarReceberResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class ContasPagarReceberResourceIntTest {

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;

    private static final TipoLancamento DEFAULT_TIPO_LANCAMENTO = TipoLancamento.Credito;
    private static final TipoLancamento UPDATED_TIPO_LANCAMENTO = TipoLancamento.Debito;

    private static final StatusLancamento DEFAULT_STATUS_LANCAMENTO = StatusLancamento.Aberto;
    private static final StatusLancamento UPDATED_STATUS_LANCAMENTO = StatusLancamento.Baixado;

    @Autowired
    private ContasPagarReceberRepository contasPagarReceberRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContasPagarReceberMockMvc;

    private ContasPagarReceber contasPagarReceber;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContasPagarReceberResource contasPagarReceberResource = new ContasPagarReceberResource(contasPagarReceberRepository);
        this.restContasPagarReceberMockMvc = MockMvcBuilders.standaloneSetup(contasPagarReceberResource)
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
    public static ContasPagarReceber createEntity(EntityManager em) {
        ContasPagarReceber contasPagarReceber = new ContasPagarReceber()
            .data(DEFAULT_DATA)
            .valor(DEFAULT_VALOR)
            .tipoLancamento(DEFAULT_TIPO_LANCAMENTO)
            .statusLancamento(DEFAULT_STATUS_LANCAMENTO);
        return contasPagarReceber;
    }

    @Before
    public void initTest() {
        contasPagarReceber = createEntity(em);
    }

    @Test
    @Transactional
    public void createContasPagarReceber() throws Exception {
        int databaseSizeBeforeCreate = contasPagarReceberRepository.findAll().size();

        // Create the ContasPagarReceber
        restContasPagarReceberMockMvc.perform(post("/api/contas-pagar-recebers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contasPagarReceber)))
            .andExpect(status().isCreated());

        // Validate the ContasPagarReceber in the database
        List<ContasPagarReceber> contasPagarReceberList = contasPagarReceberRepository.findAll();
        assertThat(contasPagarReceberList).hasSize(databaseSizeBeforeCreate + 1);
        ContasPagarReceber testContasPagarReceber = contasPagarReceberList.get(contasPagarReceberList.size() - 1);
        assertThat(testContasPagarReceber.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testContasPagarReceber.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testContasPagarReceber.getTipoLancamento()).isEqualTo(DEFAULT_TIPO_LANCAMENTO);
        assertThat(testContasPagarReceber.getStatusLancamento()).isEqualTo(DEFAULT_STATUS_LANCAMENTO);
    }

    @Test
    @Transactional
    public void createContasPagarReceberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contasPagarReceberRepository.findAll().size();

        // Create the ContasPagarReceber with an existing ID
        contasPagarReceber.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContasPagarReceberMockMvc.perform(post("/api/contas-pagar-recebers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contasPagarReceber)))
            .andExpect(status().isBadRequest());

        // Validate the ContasPagarReceber in the database
        List<ContasPagarReceber> contasPagarReceberList = contasPagarReceberRepository.findAll();
        assertThat(contasPagarReceberList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContasPagarRecebers() throws Exception {
        // Initialize the database
        contasPagarReceberRepository.saveAndFlush(contasPagarReceber);

        // Get all the contasPagarReceberList
        restContasPagarReceberMockMvc.perform(get("/api/contas-pagar-recebers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contasPagarReceber.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].tipoLancamento").value(hasItem(DEFAULT_TIPO_LANCAMENTO.toString())))
            .andExpect(jsonPath("$.[*].statusLancamento").value(hasItem(DEFAULT_STATUS_LANCAMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getContasPagarReceber() throws Exception {
        // Initialize the database
        contasPagarReceberRepository.saveAndFlush(contasPagarReceber);

        // Get the contasPagarReceber
        restContasPagarReceberMockMvc.perform(get("/api/contas-pagar-recebers/{id}", contasPagarReceber.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contasPagarReceber.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.tipoLancamento").value(DEFAULT_TIPO_LANCAMENTO.toString()))
            .andExpect(jsonPath("$.statusLancamento").value(DEFAULT_STATUS_LANCAMENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContasPagarReceber() throws Exception {
        // Get the contasPagarReceber
        restContasPagarReceberMockMvc.perform(get("/api/contas-pagar-recebers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContasPagarReceber() throws Exception {
        // Initialize the database
        contasPagarReceberRepository.saveAndFlush(contasPagarReceber);

        int databaseSizeBeforeUpdate = contasPagarReceberRepository.findAll().size();

        // Update the contasPagarReceber
        ContasPagarReceber updatedContasPagarReceber = contasPagarReceberRepository.findById(contasPagarReceber.getId()).get();
        // Disconnect from session so that the updates on updatedContasPagarReceber are not directly saved in db
        em.detach(updatedContasPagarReceber);
        updatedContasPagarReceber
            .data(UPDATED_DATA)
            .valor(UPDATED_VALOR)
            .tipoLancamento(UPDATED_TIPO_LANCAMENTO)
            .statusLancamento(UPDATED_STATUS_LANCAMENTO);

        restContasPagarReceberMockMvc.perform(put("/api/contas-pagar-recebers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContasPagarReceber)))
            .andExpect(status().isOk());

        // Validate the ContasPagarReceber in the database
        List<ContasPagarReceber> contasPagarReceberList = contasPagarReceberRepository.findAll();
        assertThat(contasPagarReceberList).hasSize(databaseSizeBeforeUpdate);
        ContasPagarReceber testContasPagarReceber = contasPagarReceberList.get(contasPagarReceberList.size() - 1);
        assertThat(testContasPagarReceber.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testContasPagarReceber.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testContasPagarReceber.getTipoLancamento()).isEqualTo(UPDATED_TIPO_LANCAMENTO);
        assertThat(testContasPagarReceber.getStatusLancamento()).isEqualTo(UPDATED_STATUS_LANCAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingContasPagarReceber() throws Exception {
        int databaseSizeBeforeUpdate = contasPagarReceberRepository.findAll().size();

        // Create the ContasPagarReceber

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContasPagarReceberMockMvc.perform(put("/api/contas-pagar-recebers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contasPagarReceber)))
            .andExpect(status().isBadRequest());

        // Validate the ContasPagarReceber in the database
        List<ContasPagarReceber> contasPagarReceberList = contasPagarReceberRepository.findAll();
        assertThat(contasPagarReceberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContasPagarReceber() throws Exception {
        // Initialize the database
        contasPagarReceberRepository.saveAndFlush(contasPagarReceber);

        int databaseSizeBeforeDelete = contasPagarReceberRepository.findAll().size();

        // Get the contasPagarReceber
        restContasPagarReceberMockMvc.perform(delete("/api/contas-pagar-recebers/{id}", contasPagarReceber.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContasPagarReceber> contasPagarReceberList = contasPagarReceberRepository.findAll();
        assertThat(contasPagarReceberList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContasPagarReceber.class);
        ContasPagarReceber contasPagarReceber1 = new ContasPagarReceber();
        contasPagarReceber1.setId(1L);
        ContasPagarReceber contasPagarReceber2 = new ContasPagarReceber();
        contasPagarReceber2.setId(contasPagarReceber1.getId());
        assertThat(contasPagarReceber1).isEqualTo(contasPagarReceber2);
        contasPagarReceber2.setId(2L);
        assertThat(contasPagarReceber1).isNotEqualTo(contasPagarReceber2);
        contasPagarReceber1.setId(null);
        assertThat(contasPagarReceber1).isNotEqualTo(contasPagarReceber2);
    }
}
