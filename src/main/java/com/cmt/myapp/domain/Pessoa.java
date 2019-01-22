package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.TipoPessoa;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
public class Pessoa implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @Column(name = "senha")
    private String senha;

    @Column(name = "data_nascimento")
    private Instant dataNascimento;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    @Column(name = "pessoa_dependente_id")
    private Long pessoaDependenteId;

    @Column(name = "loja_maconica_id")
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

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public Pessoa telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public Pessoa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TipoPessoa getTipoPessoa() {
        return tipoPessoa;
    }

    public Pessoa tipoPessoa(TipoPessoa tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
        return this;
    }

    public void setTipoPessoa(TipoPessoa tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public String getSenha() {
        return senha;
    }

    public Pessoa senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Instant getDataNascimento() {
        return dataNascimento;
    }

    public Pessoa dataNascimento(Instant dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(Instant dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public Pessoa bolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
        return this;
    }

    public void setBolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
    }

    public Long getPessoaDependenteId() {
        return pessoaDependenteId;
    }

    public Pessoa pessoaDependenteId(Long pessoaDependenteId) {
        this.pessoaDependenteId = pessoaDependenteId;
        return this;
    }

    public void setPessoaDependenteId(Long pessoaDependenteId) {
        this.pessoaDependenteId = pessoaDependenteId;
    }

    public Long getLojaMaconicaId() {
        return lojaMaconicaId;
    }

    public Pessoa lojaMaconicaId(Long lojaMaconicaId) {
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
        Pessoa pessoa = (Pessoa) o;
        if (pessoa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pessoa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", email='" + getEmail() + "'" +
            ", tipoPessoa='" + getTipoPessoa() + "'" +
            ", senha='" + getSenha() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", bolAtivo='" + isBolAtivo() + "'" +
            ", pessoaDependenteId=" + getPessoaDependenteId() +
            ", lojaMaconicaId=" + getLojaMaconicaId() +
            "}";
    }
}
