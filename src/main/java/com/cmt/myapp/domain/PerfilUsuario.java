package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PerfilUsuario.
 */
@Entity
@Table(name = "perfil_usuario")
public class PerfilUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_perfil")
    private String nomePerfil;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomePerfil() {
        return nomePerfil;
    }

    public PerfilUsuario nomePerfil(String nomePerfil) {
        this.nomePerfil = nomePerfil;
        return this;
    }

    public void setNomePerfil(String nomePerfil) {
        this.nomePerfil = nomePerfil;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public PerfilUsuario bolAtivo(Boolean bolAtivo) {
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
        PerfilUsuario perfilUsuario = (PerfilUsuario) o;
        if (perfilUsuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perfilUsuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerfilUsuario{" +
            "id=" + getId() +
            ", nomePerfil='" + getNomePerfil() + "'" +
            ", bolAtivo='" + isBolAtivo() + "'" +
            "}";
    }
}
