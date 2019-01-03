package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CategoriaEstabelecimento.
 */
@Entity
@Table(name = "categoria_estabelecimento")
public class CategoriaEstabelecimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public CategoriaEstabelecimento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public CategoriaEstabelecimento bolAtivo(Boolean bolAtivo) {
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
        CategoriaEstabelecimento categoriaEstabelecimento = (CategoriaEstabelecimento) o;
        if (categoriaEstabelecimento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriaEstabelecimento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriaEstabelecimento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", bolAtivo='" + isBolAtivo() + "'" +
            "}";
    }
}
