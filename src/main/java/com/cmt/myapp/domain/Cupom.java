package com.cmt.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.cmt.myapp.domain.enumeration.StatusCupom;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Cupom.
 */
@Entity
@Table(name = "cupom")
public class Cupom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private Instant data;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "numero")
    private String numero;

    @Lob
    @Column(name = "foto")
    private String foto;

    @Column(name = "foto_content_type")
    private String fotoContentType;

    @NotNull(message = "Informe o estabelecimento")
    @Column(name = "estabelecimento_comercial_id")
    private Long estabelecimentoComercialId;

    @NotNull(message = "Informe o usuário")
    @Column(name = "usuario_id")
    private Long usuarioId;
    
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "estabelecimento_comercial_id", insertable = false, updatable = false, nullable = true)
    private EstabelecimentoComercial estabelecimento;

    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "usuario_id", insertable = false, updatable = false, nullable = true)
    private User usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    //@NotBlank(message = "Informe o status do cupom")
    private StatusCupom statusCupom;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getData() {
        return data;
    }

    public Cupom data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public Double getValor() {
        return valor;
    }

    public Cupom valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getNumero() {
        return numero;
    }

    public Cupom numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getFoto() {
        return foto;
    }

    public Cupom foto(String foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getFotoContentType() {
        return fotoContentType;
    }

    public Cupom fotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
        return this;
    }

    public void setFotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public Cupom usuarioId(Long usuarioid) {
        this.usuarioId = usuarioid;
        return this;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public StatusCupom getStatus() {
        statusCupom = statusCupom == null ? StatusCupom.Ativo : statusCupom;
        return statusCupom;
    }

    public Cupom status(StatusCupom statusCupom) {
        this.statusCupom = statusCupom;
        return this;
    }

    public void setStatus(StatusCupom statusCupom) {
        this.statusCupom = statusCupom;
    }

    public Long getEstabelecimentoComercialId() {
        return estabelecimentoComercialId;
    }

    public Cupom estabelecimentoComercialId(Long estabelecimentoComercialId) {
        this.estabelecimentoComercialId = estabelecimentoComercialId;
        return this;
    }

    public void setEstabelecimentoComercialId(Long estabelecimentoComercialId) {
        this.estabelecimentoComercialId = estabelecimentoComercialId;
    }
    
    public String getEstabelecimento() {
        return estabelecimento == null ? null : estabelecimento.getNome();
    }

    public Double getValorCMT() {
        return estabelecimento == null ? null : (this.valor * (this.estabelecimento.getTaxaConvenio()/100))/2;
    }

    public Double getValorLoja() {
        return estabelecimento == null ? null : (this.valor * (this.estabelecimento.getTaxaConvenio()/100))/2;
    }

    public Double getTaxaConvenio() {
        return estabelecimento == null ? null : this.estabelecimento.getTaxaConvenio();
    }

    public String getUsuario() {
        return usuario == null ? null : usuario.getFirstName();
    }
    
    public Cupom matriz(EstabelecimentoComercial estabelecimento) {
        this.estabelecimento = estabelecimento;
        return this;
    }

    public Cupom usuario(User usuario) {
        this.usuario = usuario;
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
        Cupom cupom = (Cupom) o;
        if (cupom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cupom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cupom{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", valor=" + getValor() +
            ", numero='" + getNumero() + "'" +
            ", foto='" + getFoto() + "'" +
            ", fotoContentType='" + getFotoContentType() + "'" +
            ", estabelecimentoComercialId=" + getEstabelecimentoComercialId() +
            ", usuarioId=" + getUsuarioId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
