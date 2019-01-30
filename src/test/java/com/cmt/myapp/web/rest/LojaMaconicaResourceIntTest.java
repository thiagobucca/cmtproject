package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.LojaMaconica;
import com.cmt.myapp.repository.LojaMaconicaRepository;
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
 * Test class for the LojaMaconicaResource REST controller.
 *
 * @see LojaMaconicaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class LojaMaconicaResourceIntTest {

    private static final String DEFAULT_COD_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_COD_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    @Autowired
    private LojaMaconicaRepository lojaMaconicaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLojaMaconicaMockMvc;

    private LojaMaconica lojaMaconica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LojaMaconicaResource lojaMaconicaResource = new LojaMaconicaResource(lojaMaconicaRepository);
        this.restLojaMaconicaMockMvc = MockMvcBuilders.standaloneSetup(lojaMaconicaResource)
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
    public static LojaMaconica createEntity(EntityManager em) {
        LojaMaconica lojaMaconica = new LojaMaconica()
            .codCnpj(DEFAULT_COD_CNPJ)
            .nome(DEFAULT_NOME)
            .endereco(DEFAULT_ENDERECO)
            .telefone(DEFAULT_TELEFONE)
            .numero(DEFAULT_NUMERO)
            .bolAtivo(DEFAULT_BOL_ATIVO);
        return lojaMaconica;
    }

    @Before
    public void initTest() {
        lojaMaconica = createEntity(em);
    }

    @Test
    @Transactional
    public void createLojaMaconica() throws Exception {
        int databaseSizeBeforeCreate = lojaMaconicaRepository.findAll().size();

        // Create the LojaMaconica
        restLojaMaconicaMockMvc.perform(post("/api/loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lojaMaconica)))
            .andExpect(status().isCreated());

        // Validate the LojaMaconica in the database
        List<LojaMaconica> lojaMaconicaList = lojaMaconicaRepository.findAll();
        assertThat(lojaMaconicaList).hasSize(databaseSizeBeforeCreate + 1);
        LojaMaconica testLojaMaconica = lojaMaconicaList.get(lojaMaconicaList.size() - 1);
        assertThat(testLojaMaconica.getCodCnpj()).isEqualTo(DEFAULT_COD_CNPJ);
        assertThat(testLojaMaconica.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testLojaMaconica.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testLojaMaconica.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testLojaMaconica.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testLojaMaconica.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void createLojaMaconicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lojaMaconicaRepository.findAll().size();

        // Create the LojaMaconica with an existing ID
        lojaMaconica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLojaMaconicaMockMvc.perform(post("/api/loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lojaMaconica)))
            .andExpect(status().isBadRequest());

        // Validate the LojaMaconica in the database
        List<LojaMaconica> lojaMaconicaList = lojaMaconicaRepository.findAll();
        assertThat(lojaMaconicaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLojaMaconicas() throws Exception {
        // Initialize the database
        lojaMaconicaRepository.saveAndFlush(lojaMaconica);

        // Get all the lojaMaconicaList
        restLojaMaconicaMockMvc.perform(get("/api/loja-maconicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lojaMaconica.getId().intValue())))
            .andExpect(jsonPath("$.[*].codCnpj").value(hasItem(DEFAULT_COD_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLojaMaconica() throws Exception {
        // Initialize the database
        lojaMaconicaRepository.saveAndFlush(lojaMaconica);

        // Get the lojaMaconica
        restLojaMaconicaMockMvc.perform(get("/api/loja-maconicas/{id}", lojaMaconica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lojaMaconica.getId().intValue()))
            .andExpect(jsonPath("$.codCnpj").value(DEFAULT_COD_CNPJ.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLojaMaconica() throws Exception {
        // Get the lojaMaconica
        restLojaMaconicaMockMvc.perform(get("/api/loja-maconicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLojaMaconica() throws Exception {
        // Initialize the database
        lojaMaconicaRepository.saveAndFlush(lojaMaconica);

        int databaseSizeBeforeUpdate = lojaMaconicaRepository.findAll().size();

        // Update the lojaMaconica
        LojaMaconica updatedLojaMaconica = lojaMaconicaRepository.findById(lojaMaconica.getId()).get();
        // Disconnect from session so that the updates on updatedLojaMaconica are not directly saved in db
        em.detach(updatedLojaMaconica);
        updatedLojaMaconica
            .codCnpj(UPDATED_COD_CNPJ)
            .nome(UPDATED_NOME)
            .endereco(UPDATED_ENDERECO)
            .telefone(UPDATED_TELEFONE)
            .numero(UPDATED_NUMERO)
            .bolAtivo(UPDATED_BOL_ATIVO);

        restLojaMaconicaMockMvc.perform(put("/api/loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLojaMaconica)))
            .andExpect(status().isOk());

        // Validate the LojaMaconica in the database
        List<LojaMaconica> lojaMaconicaList = lojaMaconicaRepository.findAll();
        assertThat(lojaMaconicaList).hasSize(databaseSizeBeforeUpdate);
        LojaMaconica testLojaMaconica = lojaMaconicaList.get(lojaMaconicaList.size() - 1);
        assertThat(testLojaMaconica.getCodCnpj()).isEqualTo(UPDATED_COD_CNPJ);
        assertThat(testLojaMaconica.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testLojaMaconica.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testLojaMaconica.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testLojaMaconica.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testLojaMaconica.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingLojaMaconica() throws Exception {
        int databaseSizeBeforeUpdate = lojaMaconicaRepository.findAll().size();

        // Create the LojaMaconica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLojaMaconicaMockMvc.perform(put("/api/loja-maconicas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lojaMaconica)))
            .andExpect(status().isBadRequest());

        // Validate the LojaMaconica in the database
        List<LojaMaconica> lojaMaconicaList = lojaMaconicaRepository.findAll();
        assertThat(lojaMaconicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLojaMaconica() throws Exception {
        // Initialize the database
        lojaMaconicaRepository.saveAndFlush(lojaMaconica);

        int databaseSizeBeforeDelete = lojaMaconicaRepository.findAll().size();

        // Get the lojaMaconica
        restLojaMaconicaMockMvc.perform(delete("/api/loja-maconicas/{id}", lojaMaconica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LojaMaconica> lojaMaconicaList = lojaMaconicaRepository.findAll();
        assertThat(lojaMaconicaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LojaMaconica.class);
        LojaMaconica lojaMaconica1 = new LojaMaconica();
        lojaMaconica1.setId(1L);
        LojaMaconica lojaMaconica2 = new LojaMaconica();
        lojaMaconica2.setId(lojaMaconica1.getId());
        assertThat(lojaMaconica1).isEqualTo(lojaMaconica2);
        lojaMaconica2.setId(2L);
        assertThat(lojaMaconica1).isNotEqualTo(lojaMaconica2);
        lojaMaconica1.setId(null);
        assertThat(lojaMaconica1).isNotEqualTo(lojaMaconica2);
    }
}
