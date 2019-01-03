package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AgendaEventos.
 */
@Entity
@Table(name = "agenda_eventos")
public class AgendaEventos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "data")
    private Instant data;

    @Column(name = "jhi_local")
    private String local;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    @OneToOne    @JoinColumn(unique = true)
    private LojaMaconica lojaMaconica;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public AgendaEventos titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Instant getData() {
        return data;
    }

    public AgendaEventos data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public String getLocal() {
        return local;
    }

    public AgendaEventos local(String local) {
        this.local = local;
        return this;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getDescricao() {
        return descricao;
    }

    public AgendaEventos descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public AgendaEventos bolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
        return this;
    }

    public void setBolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
    }

    public LojaMaconica getLojaMaconica() {
        return lojaMaconica;
    }

    public AgendaEventos lojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconica = lojaMaconica;
        return this;
    }

    public void setLojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconica = lojaMaconica;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AgendaEventos agendaEventos = (AgendaEventos) o;
        if (agendaEventos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agendaEventos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgendaEventos{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", data='" + getData() + "'" +
            ", local='" + getLocal() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", bolAtivo='" + isBolAtivo() + "'" +
            "}";
    }
}
