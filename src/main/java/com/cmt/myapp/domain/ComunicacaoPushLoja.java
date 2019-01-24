package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ComunicacaoPushLoja.
 */
@Entity
@Table(name = "comunicacao_push_loja")
public class ComunicacaoPushLoja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comunicacao_push_id")
    private Long comunicacaoPushId;

    @Column(name = "loja_maconica_id")
    private Long lojaMaconicaId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getComunicacaoPushId() {
        return comunicacaoPushId;
    }

    public ComunicacaoPushLoja comunicacaoPushId(Long comunicacaoPushId) {
        this.comunicacaoPushId = comunicacaoPushId;
        return this;
    }

    public void setComunicacaoPushId(Long comunicacaoPushId) {
        this.comunicacaoPushId = comunicacaoPushId;
    }

    public Long getLojaMaconicaId() {
        return lojaMaconicaId;
    }

    public ComunicacaoPushLoja lojaMaconicaId(Long lojaMaconicaId) {
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
        ComunicacaoPushLoja comunicacaoPushLoja = (ComunicacaoPushLoja) o;
        if (comunicacaoPushLoja.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comunicacaoPushLoja.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ComunicacaoPushLoja{" +
            "id=" + getId() +
            ", comunicacaoPushId=" + getComunicacaoPushId() +
            ", lojaMaconicaId=" + getLojaMaconicaId() +
            "}";
    }
}
