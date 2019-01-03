package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.EstabelecimentoComercial;
import com.cmt.myapp.repository.EstabelecimentoComercialRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static com.cmt.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EstabelecimentoComercialResource REST controller.
 *
 * @see EstabelecimentoComercialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class EstabelecimentoComercialResourceIntTest {

    private static final Boolean DEFAULT_BOL_MATRIZ = false;
    private static final Boolean UPDATED_BOL_MATRIZ = true;

    private static final String DEFAULT_COD_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_COD_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final Double DEFAULT_TAXA_CONVENIO = 1D;
    private static final Double UPDATED_TAXA_CONVENIO = 2D;

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    @Autowired
    private EstabelecimentoComercialRepository estabelecimentoComercialRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstabelecimentoComercialMockMvc;

    private EstabelecimentoComercial estabelecimentoComercial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstabelecimentoComercialResource estabelecimentoComercialResource = new EstabelecimentoComercialResource(estabelecimentoComercialRepository);
        this.restEstabelecimentoComercialMockMvc = MockMvcBuilders.standaloneSetup(estabelecimentoComercialResource)
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
    public static EstabelecimentoComercial createEntity(EntityManager em) {
        EstabelecimentoComercial estabelecimentoComercial = new EstabelecimentoComercial()
            .bolMatriz(DEFAULT_BOL_MATRIZ)
            .codCnpj(DEFAULT_COD_CNPJ)
            .nome(DEFAULT_NOME)
            .endereco(DEFAULT_ENDERECO)
            .telefone(DEFAULT_TELEFONE)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .taxaConvenio(DEFAULT_TAXA_CONVENIO)
            .bolAtivo(DEFAULT_BOL_ATIVO);
        return estabelecimentoComercial;
    }

    @Before
    public void initTest() {
        estabelecimentoComercial = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstabelecimentoComercial() throws Exception {
        int databaseSizeBeforeCreate = estabelecimentoComercialRepository.findAll().size();

        // Create the EstabelecimentoComercial
        restEstabelecimentoComercialMockMvc.perform(post("/api/estabelecimento-comercials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoComercial)))
            .andExpect(status().isCreated());

        // Validate the EstabelecimentoComercial in the database
        List<EstabelecimentoComercial> estabelecimentoComercialList = estabelecimentoComercialRepository.findAll();
        assertThat(estabelecimentoComercialList).hasSize(databaseSizeBeforeCreate + 1);
        EstabelecimentoComercial testEstabelecimentoComercial = estabelecimentoComercialList.get(estabelecimentoComercialList.size() - 1);
        assertThat(testEstabelecimentoComercial.isBolMatriz()).isEqualTo(DEFAULT_BOL_MATRIZ);
        assertThat(testEstabelecimentoComercial.getCodCnpj()).isEqualTo(DEFAULT_COD_CNPJ);
        assertThat(testEstabelecimentoComercial.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testEstabelecimentoComercial.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testEstabelecimentoComercial.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testEstabelecimentoComercial.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testEstabelecimentoComercial.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testEstabelecimentoComercial.getTaxaConvenio()).isEqualTo(DEFAULT_TAXA_CONVENIO);
        assertThat(testEstabelecimentoComercial.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void createEstabelecimentoComercialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estabelecimentoComercialRepository.findAll().size();

        // Create the EstabelecimentoComercial with an existing ID
        estabelecimentoComercial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstabelecimentoComercialMockMvc.perform(post("/api/estabelecimento-comercials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoComercial)))
            .andExpect(status().isBadRequest());

        // Validate the EstabelecimentoComercial in the database
        List<EstabelecimentoComercial> estabelecimentoComercialList = estabelecimentoComercialRepository.findAll();
        assertThat(estabelecimentoComercialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEstabelecimentoComercials() throws Exception {
        // Initialize the database
        estabelecimentoComercialRepository.saveAndFlush(estabelecimentoComercial);

        // Get all the estabelecimentoComercialList
        restEstabelecimentoComercialMockMvc.perform(get("/api/estabelecimento-comercials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estabelecimentoComercial.getId().intValue())))
            .andExpect(jsonPath("$.[*].bolMatriz").value(hasItem(DEFAULT_BOL_MATRIZ.booleanValue())))
            .andExpect(jsonPath("$.[*].codCnpj").value(hasItem(DEFAULT_COD_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].taxaConvenio").value(hasItem(DEFAULT_TAXA_CONVENIO.doubleValue())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEstabelecimentoComercial() throws Exception {
        // Initialize the database
        estabelecimentoComercialRepository.saveAndFlush(estabelecimentoComercial);

        // Get the estabelecimentoComercial
        restEstabelecimentoComercialMockMvc.perform(get("/api/estabelecimento-comercials/{id}", estabelecimentoComercial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estabelecimentoComercial.getId().intValue()))
            .andExpect(jsonPath("$.bolMatriz").value(DEFAULT_BOL_MATRIZ.booleanValue()))
            .andExpect(jsonPath("$.codCnpj").value(DEFAULT_COD_CNPJ.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.taxaConvenio").value(DEFAULT_TAXA_CONVENIO.doubleValue()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEstabelecimentoComercial() throws Exception {
        // Get the estabelecimentoComercial
        restEstabelecimentoComercialMockMvc.perform(get("/api/estabelecimento-comercials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstabelecimentoComercial() throws Exception {
        // Initialize the database
        estabelecimentoComercialRepository.saveAndFlush(estabelecimentoComercial);

        int databaseSizeBeforeUpdate = estabelecimentoComercialRepository.findAll().size();

        // Update the estabelecimentoComercial
        EstabelecimentoComercial updatedEstabelecimentoComercial = estabelecimentoComercialRepository.findById(estabelecimentoComercial.getId()).get();
        // Disconnect from session so that the updates on updatedEstabelecimentoComercial are not directly saved in db
        em.detach(updatedEstabelecimentoComercial);
        updatedEstabelecimentoComercial
            .bolMatriz(UPDATED_BOL_MATRIZ)
            .codCnpj(UPDATED_COD_CNPJ)
            .nome(UPDATED_NOME)
            .endereco(UPDATED_ENDERECO)
            .telefone(UPDATED_TELEFONE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .taxaConvenio(UPDATED_TAXA_CONVENIO)
            .bolAtivo(UPDATED_BOL_ATIVO);

        restEstabelecimentoComercialMockMvc.perform(put("/api/estabelecimento-comercials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstabelecimentoComercial)))
            .andExpect(status().isOk());

        // Validate the EstabelecimentoComercial in the database
        List<EstabelecimentoComercial> estabelecimentoComercialList = estabelecimentoComercialRepository.findAll();
        assertThat(estabelecimentoComercialList).hasSize(databaseSizeBeforeUpdate);
        EstabelecimentoComercial testEstabelecimentoComercial = estabelecimentoComercialList.get(estabelecimentoComercialList.size() - 1);
        assertThat(testEstabelecimentoComercial.isBolMatriz()).isEqualTo(UPDATED_BOL_MATRIZ);
        assertThat(testEstabelecimentoComercial.getCodCnpj()).isEqualTo(UPDATED_COD_CNPJ);
        assertThat(testEstabelecimentoComercial.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testEstabelecimentoComercial.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testEstabelecimentoComercial.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testEstabelecimentoComercial.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testEstabelecimentoComercial.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testEstabelecimentoComercial.getTaxaConvenio()).isEqualTo(UPDATED_TAXA_CONVENIO);
        assertThat(testEstabelecimentoComercial.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstabelecimentoComercial() throws Exception {
        int databaseSizeBeforeUpdate = estabelecimentoComercialRepository.findAll().size();

        // Create the EstabelecimentoComercial

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstabelecimentoComercialMockMvc.perform(put("/api/estabelecimento-comercials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoComercial)))
            .andExpect(status().isBadRequest());

        // Validate the EstabelecimentoComercial in the database
        List<EstabelecimentoComercial> estabelecimentoComercialList = estabelecimentoComercialRepository.findAll();
        assertThat(estabelecimentoComercialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstabelecimentoComercial() throws Exception {
        // Initialize the database
        estabelecimentoComercialRepository.saveAndFlush(estabelecimentoComercial);

        int databaseSizeBeforeDelete = estabelecimentoComercialRepository.findAll().size();

        // Get the estabelecimentoComercial
        restEstabelecimentoComercialMockMvc.perform(delete("/api/estabelecimento-comercials/{id}", estabelecimentoComercial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstabelecimentoComercial> estabelecimentoComercialList = estabelecimentoComercialRepository.findAll();
        assertThat(estabelecimentoComercialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstabelecimentoComercial.class);
        EstabelecimentoComercial estabelecimentoComercial1 = new EstabelecimentoComercial();
        estabelecimentoComercial1.setId(1L);
        EstabelecimentoComercial estabelecimentoComercial2 = new EstabelecimentoComercial();
        estabelecimentoComercial2.setId(estabelecimentoComercial1.getId());
        assertThat(estabelecimentoComercial1).isEqualTo(estabelecimentoComercial2);
        estabelecimentoComercial2.setId(2L);
        assertThat(estabelecimentoComercial1).isNotEqualTo(estabelecimentoComercial2);
        estabelecimentoComercial1.setId(null);
        assertThat(estabelecimentoComercial1).isNotEqualTo(estabelecimentoComercial2);
    }
}
