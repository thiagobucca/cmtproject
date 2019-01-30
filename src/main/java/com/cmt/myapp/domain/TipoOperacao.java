package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.TipoLancamento;

/**
 * A TipoOperacao.
 */
@Entity
@Table(name = "tipo_operacao")
public class TipoOperacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_operacao")
    private String nomeOperacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_lancamento")
    private TipoLancamento tipoLancamento;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeOperacao() {
        return nomeOperacao;
    }

    public TipoOperacao nomeOperacao(String nomeOperacao) {
        this.nomeOperacao = nomeOperacao;
        return this;
    }

    public void setNomeOperacao(String nomeOperacao) {
        this.nomeOperacao = nomeOperacao;
    }

    public TipoLancamento getTipoLancamento() {
        return tipoLancamento;
    }

    public TipoOperacao tipoLancamento(TipoLancamento tipoLancamento) {
        this.tipoLancamento = tipoLancamento;
        return this;
    }

    public void setTipoLancamento(TipoLancamento tipoLancamento) {
        this.tipoLancamento = tipoLancamento;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public TipoOperacao bolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
        return this;
    }

    public void setBolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
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
        TipoOperacao tipoOperacao = (TipoOperacao) o;
        if (tipoOperacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoOperacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoOperacao{" +
            "id=" + getId() +
            ", nomeOperacao='" + getNomeOperacao() + "'" +
            ", tipoLancamento='" + getTipoLancamento() + "'" +
            ", bolAtivo='" + isBolAtivo() + "'" +
            "}";
    }
}
