package com.cmt.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A LojaMaconica.
 */
@Entity
@Table(name = "loja_maconica")
public class LojaMaconica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_cnpj")
    private String codCnpj;

    @Column(name = "nome")
    private String nome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    @OneToOne    @JoinColumn(unique = true)
    private ContatoLojaMaconica contato;

    @ManyToOne
    @JsonIgnoreProperties("lojaMaconicas")
    private ComunicacaoPush comunicacaoPush;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCnpj() {
        return codCnpj;
    }

    public LojaMaconica codCnpj(String codCnpj) {
        this.codCnpj = codCnpj;
        return this;
    }

    public void setCodCnpj(String codCnpj) {
        this.codCnpj = codCnpj;
    }

    public String getNome() {
        return nome;
    }

    public LojaMaconica nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public LojaMaconica endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public LojaMaconica telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getNumero() {
        return numero;
    }

    public LojaMaconica numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public LojaMaconica bolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
        return this;
    }

    public void setBolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
    }

    public ContatoLojaMaconica getContato() {
        return contato;
    }

    public LojaMaconica contato(ContatoLojaMaconica contatoLojaMaconica) {
        this.contato = contatoLojaMaconica;
        return this;
    }

    public void setContato(ContatoLojaMaconica contatoLojaMaconica) {
        this.contato = contatoLojaMaconica;
    }

    public ComunicacaoPush getComunicacaoPush() {
        return comunicacaoPush;
    }

    public LojaMaconica comunicacaoPush(ComunicacaoPush comunicacaoPush) {
        this.comunicacaoPush = comunicacaoPush;
        return this;
    }

    public void setComunicacaoPush(ComunicacaoPush comunicacaoPush) {
        this.comunicacaoPush = comunicacaoPush;
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
        LojaMaconica lojaMaconica = (LojaMaconica) o;
        if (lojaMaconica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lojaMaconica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LojaMaconica{" +
            "id=" + getId() +
            ", codCnpj='" + getCodCnpj() + "'" +
            ", nome='" + getNome() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", numero=" + getNumero() +
            ", bolAtivo='" + isBolAtivo() + "'" +
            "}";
    }
}
