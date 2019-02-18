package com.cmt.myapp.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ContatoLojaMaconica.
 */
@Entity
@Table(name = "contato_loja_maconica")
public class ContatoLojaMaconica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    @NotBlank(message = "Informe o nome do contato")
    private String nome;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    @NotBlank(message = "Informe o email do contato")
    private String email;

    @Column(name = "loja_maconica_id")
    @NotNull(message="Informe a loja maconica para vincular ao contato")
    private Long lojaMaconicaId;

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

    public ContatoLojaMaconica nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public ContatoLojaMaconica telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public ContatoLojaMaconica email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getLojaMaconicaId() {
        return lojaMaconicaId;
    }

    public ContatoLojaMaconica lojaMaconicaId(Long lojaMaconicaId) {
        this.lojaMaconicaId = lojaMaconicaId;
        return this;
    }

    public void setLojaMaconicaId(Long lojaMaconicaId) {
        this.lojaMaconicaId = lojaMaconicaId;
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
        ContatoLojaMaconica contatoLojaMaconica = (ContatoLojaMaconica) o;
        if (contatoLojaMaconica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contatoLojaMaconica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContatoLojaMaconica{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", email='" + getEmail() + "'" +
            ", lojaMaconicaId=" + getLojaMaconicaId() +
            "}";
    }
}
