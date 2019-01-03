package com.cmt.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ContatoEstabelecimento.
 */
@Entity
@Table(name = "contato_estabelecimento")
public class ContatoEstabelecimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("contatoes")
    private EstabelecimentoComercial estabelecimentoComercial;

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

    public ContatoEstabelecimento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public ContatoEstabelecimento telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public ContatoEstabelecimento email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EstabelecimentoComercial getEstabelecimentoComercial() {
        return estabelecimentoComercial;
    }

    public ContatoEstabelecimento estabelecimentoComercial(EstabelecimentoComercial estabelecimentoComercial) {
        this.estabelecimentoComercial = estabelecimentoComercial;
        return this;
    }

    public void setEstabelecimentoComercial(EstabelecimentoComercial estabelecimentoComercial) {
        this.estabelecimentoComercial = estabelecimentoComercial;
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
        ContatoEstabelecimento contatoEstabelecimento = (ContatoEstabelecimento) o;
        if (contatoEstabelecimento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contatoEstabelecimento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContatoEstabelecimento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
