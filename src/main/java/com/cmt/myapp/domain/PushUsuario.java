package com.cmt.myapp.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A TipoOperacao.
 */
@Entity
@Table(name = "push_usuario ")
public class PushUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "push_id")
    private Long pushId;

    
    @Column(name = "usuario_id")
    private Long usuarioId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "push_id", insertable = false, updatable = false)
    private ComunicacaoPush comunicacaoPush;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPushId() {
        return pushId;
    }

    public PushUsuario pushId(Long push) {
        this.pushId = push;
        return this;
    }

    public void setPushId(Long push) {
        this.pushId = push;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public PushUsuario usuarioId(Long usuario) {
        this.usuarioId = usuario;
        return this;
    }

    public void setUsuarioId(Long usuario) {
        this.usuarioId = usuario;
    }


    public ComunicacaoPush getComunicacaoPush() {
        return comunicacaoPush;
    }
    
    //STEP 3 - criar o set do objeto q vem no select do banco
    //set categoria do fetch do banco
    public PushUsuario categoria(ComunicacaoPush comunicacaoPush) {
        this.comunicacaoPush = comunicacaoPush;
        return this;
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
        return "PushUsuario{" +
            "id=" + getId() +
            ", usuarioid='" + getUsuarioId() + "'" +
            ", pushid='" + getPushId()+ "'" +
            "}";
    }
}
