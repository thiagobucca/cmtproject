package com.cmt.myapp.web.rest;

import com.cmt.myapp.CmtprojectApp;

import com.cmt.myapp.domain.AgendaEventos;
import com.cmt.myapp.repository.AgendaEventosRepository;
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

/**
 * Test class for the AgendaEventosResource REST controller.
 *
 * @see AgendaEventosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmtprojectApp.class)
public class AgendaEventosResourceIntTest {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LOCAL = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BOL_ATIVO = false;
    private static final Boolean UPDATED_BOL_ATIVO = true;

    private static final Long DEFAULT_LOJA_MACONICA_ID = 1L;
    private static final Long UPDATED_LOJA_MACONICA_ID = 2L;

    @Autowired
    private AgendaEventosRepository agendaEventosRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgendaEventosMockMvc;

    private AgendaEventos agendaEventos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgendaEventosResource agendaEventosResource = new AgendaEventosResource(agendaEventosRepository);
        this.restAgendaEventosMockMvc = MockMvcBuilders.standaloneSetup(agendaEventosResource)
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
    public static AgendaEventos createEntity(EntityManager em) {
        AgendaEventos agendaEventos = new AgendaEventos()
            .titulo(DEFAULT_TITULO)
            .data(DEFAULT_DATA)
            .local(DEFAULT_LOCAL)
            .descricao(DEFAULT_DESCRICAO)
            .bolAtivo(DEFAULT_BOL_ATIVO)
            .lojaMaconicaId(DEFAULT_LOJA_MACONICA_ID);
        return agendaEventos;
    }

    @Before
    public void initTest() {
        agendaEventos = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendaEventos() throws Exception {
        int databaseSizeBeforeCreate = agendaEventosRepository.findAll().size();

        // Create the AgendaEventos
        restAgendaEventosMockMvc.perform(post("/api/agenda-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendaEventos)))
            .andExpect(status().isCreated());

        // Validate the AgendaEventos in the database
        List<AgendaEventos> agendaEventosList = agendaEventosRepository.findAll();
        assertThat(agendaEventosList).hasSize(databaseSizeBeforeCreate + 1);
        AgendaEventos testAgendaEventos = agendaEventosList.get(agendaEventosList.size() - 1);
        assertThat(testAgendaEventos.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testAgendaEventos.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testAgendaEventos.getLocal()).isEqualTo(DEFAULT_LOCAL);
        assertThat(testAgendaEventos.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAgendaEventos.isBolAtivo()).isEqualTo(DEFAULT_BOL_ATIVO);
        assertThat(testAgendaEventos.getLojaMaconicaId()).isEqualTo(DEFAULT_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void createAgendaEventosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaEventosRepository.findAll().size();

        // Create the AgendaEventos with an existing ID
        agendaEventos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaEventosMockMvc.perform(post("/api/agenda-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendaEventos)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaEventos in the database
        List<AgendaEventos> agendaEventosList = agendaEventosRepository.findAll();
        assertThat(agendaEventosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgendaEventos() throws Exception {
        // Initialize the database
        agendaEventosRepository.saveAndFlush(agendaEventos);

        // Get all the agendaEventosList
        restAgendaEventosMockMvc.perform(get("/api/agenda-eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendaEventos.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].local").value(hasItem(DEFAULT_LOCAL.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].bolAtivo").value(hasItem(DEFAULT_BOL_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].lojaMaconicaId").value(hasItem(DEFAULT_LOJA_MACONICA_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getAgendaEventos() throws Exception {
        // Initialize the database
        agendaEventosRepository.saveAndFlush(agendaEventos);

        // Get the agendaEventos
        restAgendaEventosMockMvc.perform(get("/api/agenda-eventos/{id}", agendaEventos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agendaEventos.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.local").value(DEFAULT_LOCAL.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.bolAtivo").value(DEFAULT_BOL_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.lojaMaconicaId").value(DEFAULT_LOJA_MACONICA_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAgendaEventos() throws Exception {
        // Get the agendaEventos
        restAgendaEventosMockMvc.perform(get("/api/agenda-eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendaEventos() throws Exception {
        // Initialize the database
        agendaEventosRepository.saveAndFlush(agendaEventos);

        int databaseSizeBeforeUpdate = agendaEventosRepository.findAll().size();

        // Update the agendaEventos
        AgendaEventos updatedAgendaEventos = agendaEventosRepository.findById(agendaEventos.getId()).get();
        // Disconnect from session so that the updates on updatedAgendaEventos are not directly saved in db
        em.detach(updatedAgendaEventos);
        updatedAgendaEventos
            .titulo(UPDATED_TITULO)
            .data(UPDATED_DATA)
            .local(UPDATED_LOCAL)
            .descricao(UPDATED_DESCRICAO)
            .bolAtivo(UPDATED_BOL_ATIVO)
            .lojaMaconicaId(UPDATED_LOJA_MACONICA_ID);

        restAgendaEventosMockMvc.perform(put("/api/agenda-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendaEventos)))
            .andExpect(status().isOk());

        // Validate the AgendaEventos in the database
        List<AgendaEventos> agendaEventosList = agendaEventosRepository.findAll();
        assertThat(agendaEventosList).hasSize(databaseSizeBeforeUpdate);
        AgendaEventos testAgendaEventos = agendaEventosList.get(agendaEventosList.size() - 1);
        assertThat(testAgendaEventos.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testAgendaEventos.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testAgendaEventos.getLocal()).isEqualTo(UPDATED_LOCAL);
        assertThat(testAgendaEventos.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAgendaEventos.isBolAtivo()).isEqualTo(UPDATED_BOL_ATIVO);
        assertThat(testAgendaEventos.getLojaMaconicaId()).isEqualTo(UPDATED_LOJA_MACONICA_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendaEventos() throws Exception {
        int databaseSizeBeforeUpdate = agendaEventosRepository.findAll().size();

        // Create the AgendaEventos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaEventosMockMvc.perform(put("/api/agenda-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendaEventos)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaEventos in the database
        List<AgendaEventos> agendaEventosList = agendaEventosRepository.findAll();
        assertThat(agendaEventosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendaEventos() throws Exception {
        // Initialize the database
        agendaEventosRepository.saveAndFlush(agendaEventos);

        int databaseSizeBeforeDelete = agendaEventosRepository.findAll().size();

        // Get the agendaEventos
        restAgendaEventosMockMvc.perform(delete("/api/agenda-eventos/{id}", agendaEventos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgendaEventos> agendaEventosList = agendaEventosRepository.findAll();
        assertThat(agendaEventosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaEventos.class);
        AgendaEventos agendaEventos1 = new AgendaEventos();
        agendaEventos1.setId(1L);
        AgendaEventos agendaEventos2 = new AgendaEventos();
        agendaEventos2.setId(agendaEventos1.getId());
        assertThat(agendaEventos1).isEqualTo(agendaEventos2);
        agendaEventos2.setId(2L);
        assertThat(agendaEventos1).isNotEqualTo(agendaEventos2);
        agendaEventos1.setId(null);
        assertThat(agendaEventos1).isNotEqualTo(agendaEventos2);
    }
}
