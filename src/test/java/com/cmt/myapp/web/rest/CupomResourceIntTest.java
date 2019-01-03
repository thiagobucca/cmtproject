package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.Cupom;
import com.cmt.myapp.repository.CupomRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.cmt.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CupomResource REST controller.
 *
 * @see CupomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class CupomResourceIntTest {

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCupomMockMvc;

    private Cupom cupom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CupomResource cupomResource = new CupomResource(cupomRepository);
        this.restCupomMockMvc = MockMvcBuilders.standaloneSetup(cupomResource)
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
    public static Cupom createEntity(EntityManager em) {
        Cupom cupom = new Cupom()
            .data(DEFAULT_DATA)
            .valor(DEFAULT_VALOR)
            .numero(DEFAULT_NUMERO)
            .foto(DEFAULT_FOTO)
            .fotoContentType(DEFAULT_FOTO_CONTENT_TYPE);
        return cupom;
    }

    @Before
    public void initTest() {
        cupom = createEntity(em);
    }

    @Test
    @Transactional
    public void createCupom() throws Exception {
        int databaseSizeBeforeCreate = cupomRepository.findAll().size();

        // Create the Cupom
        restCupomMockMvc.perform(post("/api/cupoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cupom)))
            .andExpect(status().isCreated());

        // Validate the Cupom in the database
        List<Cupom> cupomList = cupomRepository.findAll();
        assertThat(cupomList).hasSize(databaseSizeBeforeCreate + 1);
        Cupom testCupom = cupomList.get(cupomList.size() - 1);
        assertThat(testCupom.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testCupom.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testCupom.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testCupom.getFoto()).isEqualTo(DEFAULT_FOTO);
        assertThat(testCupom.getFotoContentType()).isEqualTo(DEFAULT_FOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCupomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cupomRepository.findAll().size();

        // Create the Cupom with an existing ID
        cupom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCupomMockMvc.perform(post("/api/cupoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cupom)))
            .andExpect(status().isBadRequest());

        // Validate the Cupom in the database
        List<Cupom> cupomList = cupomRepository.findAll();
        assertThat(cupomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCupoms() throws Exception {
        // Initialize the database
        cupomRepository.saveAndFlush(cupom);

        // Get all the cupomList
        restCupomMockMvc.perform(get("/api/cupoms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cupom.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].fotoContentType").value(hasItem(DEFAULT_FOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO))));
    }
    
    @Test
    @Transactional
    public void getCupom() throws Exception {
        // Initialize the database
        cupomRepository.saveAndFlush(cupom);

        // Get the cupom
        restCupomMockMvc.perform(get("/api/cupoms/{id}", cupom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cupom.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.fotoContentType").value(DEFAULT_FOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.foto").value(Base64Utils.encodeToString(DEFAULT_FOTO)));
    }

    @Test
    @Transactional
    public void getNonExistingCupom() throws Exception {
        // Get the cupom
        restCupomMockMvc.perform(get("/api/cupoms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCupom() throws Exception {
        // Initialize the database
        cupomRepository.saveAndFlush(cupom);

        int databaseSizeBeforeUpdate = cupomRepository.findAll().size();

        // Update the cupom
        Cupom updatedCupom = cupomRepository.findById(cupom.getId()).get();
        // Disconnect from session so that the updates on updatedCupom are not directly saved in db
        em.detach(updatedCupom);
        updatedCupom
            .data(UPDATED_DATA)
            .valor(UPDATED_VALOR)
            .numero(UPDATED_NUMERO)
            .foto(UPDATED_FOTO)
            .fotoContentType(UPDATED_FOTO_CONTENT_TYPE);

        restCupomMockMvc.perform(put("/api/cupoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCupom)))
            .andExpect(status().isOk());

        // Validate the Cupom in the database
        List<Cupom> cupomList = cupomRepository.findAll();
        assertThat(cupomList).hasSize(databaseSizeBeforeUpdate);
        Cupom testCupom = cupomList.get(cupomList.size() - 1);
        assertThat(testCupom.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testCupom.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testCupom.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testCupom.getFoto()).isEqualTo(UPDATED_FOTO);
        assertThat(testCupom.getFotoContentType()).isEqualTo(UPDATED_FOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCupom() throws Exception {
        int databaseSizeBeforeUpdate = cupomRepository.findAll().size();

        // Create the Cupom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCupomMockMvc.perform(put("/api/cupoms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cupom)))
            .andExpect(status().isBadRequest());

        // Validate the Cupom in the database
        List<Cupom> cupomList = cupomRepository.findAll();
        assertThat(cupomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCupom() throws Exception {
        // Initialize the database
        cupomRepository.saveAndFlush(cupom);

        int databaseSizeBeforeDelete = cupomRepository.findAll().size();

        // Get the cupom
        restCupomMockMvc.perform(delete("/api/cupoms/{id}", cupom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cupom> cupomList = cupomRepository.findAll();
        assertThat(cupomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cupom.class);
        Cupom cupom1 = new Cupom();
        cupom1.setId(1L);
        Cupom cupom2 = new Cupom();
        cupom2.setId(cupom1.getId());
        assertThat(cupom1).isEqualTo(cupom2);
        cupom2.setId(2L);
        assertThat(cupom1).isNotEqualTo(cupom2);
        cupom1.setId(null);
        assertThat(cupom1).isNotEqualTo(cupom2);
    }
}
