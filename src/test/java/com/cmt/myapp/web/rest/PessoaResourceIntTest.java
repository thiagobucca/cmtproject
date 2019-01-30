package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.Pessoa;
import com.cmt.myapp.repository.PessoaRepository;
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

import com.cmt.myapp.domain.enumeration.TipoPessoa;
/**
 * Test class for the PessoaResource REST controller.
 *
 * @see PessoaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class PessoaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final TipoPessoa DEFAULT_TIPO_PESSOA = TipoPessoa.Macom;
    private static final TipoPessoa UPDATED_TIPO_PESSOA = TipoPessoa.Dependente;

    private static final String DEFAULT_SENHA = "AAAAAAAAAA";
    private static final String UPDATED_SENHA = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_NASCIMENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_NASCIMENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    private static final Long DEFAULT_PESSOA_DEPENDENTE_ID = 1L;
    private static final Long UPDATED_PESSOA_DEPENDENTE_ID = 2L;

    private static final Long DEFAULT_LOJA_MACONICA_ID = 1L;
    private static final Long UPDATED_LOJA_MACONICA_ID = 2L;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPessoaMockMvc;

    private Pessoa pessoa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PessoaResource pessoaResource = new PessoaResource(pessoaRepository);
        this.restPessoaMockMvc = MockMvcBuilders.standaloneSetup(pessoaResource)
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
    public static Pessoa createEntity(EntityManager em) {
        Pessoa pessoa = new Pessoa()
            .nome(DEFAULT_NOME)
            .telefone(DEFAULT_TELEFONE)
            .email(DEFAULT_EMAIL)
            .tipoPessoa(DEFAULT_TIPO_PESSOA)
            .senha(DEFAULT_SENHA)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .bolAtivo(DEFAULT_BOL_ATIVO)
            .pessoaDependenteId(DEFAULT_PESSOA_DEPENDENTE_ID)
            .lojaMaconicaId(DEFAULT_LOJA_MACONICA_ID);
        return pessoa;
    }

    @Before
    public void initTest() {
        pessoa = createEntity(em);
    }

    @Test
    @Transactional
    public void createPessoa() throws Exception {
        int databaseSizeBeforeCreate = pessoaRepository.findAll().size();

        // Create the Pessoa
        restPessoaMockMvc.perform(post("/api/pessoas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isCreated());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeCreate + 1);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPessoa.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testPessoa.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPessoa.getTipoPessoa()).isEqualTo(DEFAULT_TIPO_PESSOA);
        assertThat(testPessoa.getSenha()).isEqualTo(DEFAULT_SENHA);
        assertThat(testPessoa.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testPessoa.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
        assertThat(testPessoa.getPessoaDependenteId()).isEqualTo(DEFAULT_PESSOA_DEPENDENTE_ID);
        assertThat(testPessoa.getLojaMaconicaId()).isEqualTo(DEFAULT_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void createPessoaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pessoaRepository.findAll().size();

        // Create the Pessoa with an existing ID
        pessoa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPessoaMockMvc.perform(post("/api/pessoas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPessoas() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        // Get all the pessoaList
        restPessoaMockMvc.perform(get("/api/pessoas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pessoa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].tipoPessoa").value(hasItem(DEFAULT_TIPO_PESSOA.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA.toString())))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].pessoaDependenteId").value(hasItem(DEFAULT_PESSOA_DEPENDENTE_ID.intValue())))
            .andExpect(jsonPath("$.[*].lojaMaconicaId").value(hasItem(DEFAULT_LOJA_MACONICA_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getPessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        // Get the pessoa
        restPessoaMockMvc.perform(get("/api/pessoas/{id}", pessoa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pessoa.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.tipoPessoa").value(DEFAULT_TIPO_PESSOA.toString()))
            .andExpect(jsonPath("$.senha").value(DEFAULT_SENHA.toString()))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.pessoaDependenteId").value(DEFAULT_PESSOA_DEPENDENTE_ID.intValue()))
            .andExpect(jsonPath("$.lojaMaconicaId").value(DEFAULT_LOJA_MACONICA_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPessoa() throws Exception {
        // Get the pessoa
        restPessoaMockMvc.perform(get("/api/pessoas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();

        // Update the pessoa
        Pessoa updatedPessoa = pessoaRepository.findById(pessoa.getId()).get();
        // Disconnect from session so that the updates on updatedPessoa are not directly saved in db
        em.detach(updatedPessoa);
        updatedPessoa
            .nome(UPDATED_NOME)
            .telefone(UPDATED_TELEFONE)
            .email(UPDATED_EMAIL)
            .tipoPessoa(UPDATED_TIPO_PESSOA)
            .senha(UPDATED_SENHA)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .bolAtivo(UPDATED_BOL_ATIVO)
            .pessoaDependenteId(UPDATED_PESSOA_DEPENDENTE_ID)
            .lojaMaconicaId(UPDATED_LOJA_MACONICA_ID);

        restPessoaMockMvc.perform(put("/api/pessoas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPessoa)))
            .andExpect(status().isOk());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPessoa.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testPessoa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPessoa.getTipoPessoa()).isEqualTo(UPDATED_TIPO_PESSOA);
        assertThat(testPessoa.getSenha()).isEqualTo(UPDATED_SENHA);
        assertThat(testPessoa.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testPessoa.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
        assertThat(testPessoa.getPessoaDependenteId()).isEqualTo(UPDATED_PESSOA_DEPENDENTE_ID);
        assertThat(testPessoa.getLojaMaconicaId()).isEqualTo(UPDATED_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();

        // Create the Pessoa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaMockMvc.perform(put("/api/pessoas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeDelete = pessoaRepository.findAll().size();

        // Get the pessoa
        restPessoaMockMvc.perform(delete("/api/pessoas/{id}", pessoa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pessoa.class);
        Pessoa pessoa1 = new Pessoa();
        pessoa1.setId(1L);
        Pessoa pessoa2 = new Pessoa();
        pessoa2.setId(pessoa1.getId());
        assertThat(pessoa1).isEqualTo(pessoa2);
        pessoa2.setId(2L);
        assertThat(pessoa1).isNotEqualTo(pessoa2);
        pessoa1.setId(null);
        assertThat(pessoa1).isNotEqualTo(pessoa2);
    }
}
