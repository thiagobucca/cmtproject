package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Parametrizacao.
 */
@Entity
@Table(name = "parametrizacao")
public class Parametrizacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dia_cobranca_convenio")
    private Integer diaCobrancaConvenio;

    @Column(name = "dia_pagamento_loja")
    private Integer diaPagamentoLoja;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDiaCobrancaConvenio() {
        return diaCobrancaConvenio;
    }

    public Parametrizacao diaCobrancaConvenio(Integer diaCobrancaConvenio) {
        this.diaCobrancaConvenio = diaCobrancaConvenio;
        return this;
    }

    public void setDiaCobrancaConvenio(Integer diaCobrancaConvenio) {
        this.diaCobrancaConvenio = diaCobrancaConvenio;
    }

    public Integer getDiaPagamentoLoja() {
        return diaPagamentoLoja;
    }

    public Parametrizacao diaPagamentoLoja(Integer diaPagamentoLoja) {
        this.diaPagamentoLoja = diaPagamentoLoja;
        return this;
    }

    public void setDiaPagamentoLoja(Integer diaPagamentoLoja) {
        this.diaPagamentoLoja = diaPagamentoLoja;
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
        Parametrizacao parametrizacao = (Parametrizacao) o;
        if (parametrizacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parametrizacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parametrizacao{" +
            "id=" + getId() +
            ", diaCobrancaConvenio=" + getDiaCobrancaConvenio() +
            ", diaPagamentoLoja=" + getDiaPagamentoLoja() +
            "}";
    }
}
