package com.cmt.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.TipoPessoa;

/**
 * A ComunicacaoPush.
 */
@Entity
@Table(name = "comunicacao_push")
public class ComunicacaoPush implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "conteudo_push")
    private String conteudoPush;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @OneToMany(mappedBy = "comunicacaoPush")
    private Set<LojaMaconica> lojaMaconicas = new HashSet<>();
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

    public ComunicacaoPush titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudoPush() {
        return conteudoPush;
    }

    public ComunicacaoPush conteudoPush(String conteudoPush) {
        this.conteudoPush = conteudoPush;
        return this;
    }

    public void setConteudoPush(String conteudoPush) {
        this.conteudoPush = conteudoPush;
    }

    public TipoPessoa getTipoPessoa() {
        return tipoPessoa;
    }

    public ComunicacaoPush tipoPessoa(TipoPessoa tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
        return this;
    }

    public void setTipoPessoa(TipoPessoa tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public Set<LojaMaconica> getLojaMaconicas() {
        return lojaMaconicas;
    }

    public ComunicacaoPush lojaMaconicas(Set<LojaMaconica> lojaMaconicas) {
        this.lojaMaconicas = lojaMaconicas;
        return this;
    }

    public ComunicacaoPush addLojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconicas.add(lojaMaconica);
        lojaMaconica.setComunicacaoPush(this);
        return this;
    }

    public ComunicacaoPush removeLojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconicas.remove(lojaMaconica);
        lojaMaconica.setComunicacaoPush(null);
        return this;
    }

    public void setLojaMaconicas(Set<LojaMaconica> lojaMaconicas) {
        this.lojaMaconicas = lojaMaconicas;
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
        ComunicacaoPush comunicacaoPush = (ComunicacaoPush) o;
        if (comunicacaoPush.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comunicacaoPush.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComunicacaoPush{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", conteudoPush='" + getConteudoPush() + "'" +
            ", tipoPessoa='" + getTipoPessoa() + "'" +
            "}";
    }
}
