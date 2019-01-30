package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.StatusLancamento;

/**
 * A ContasPagarReceber.
 */
@Entity
@Table(name = "contas_pagar_receber")
public class ContasPagarReceber implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private Instant data;

    @Column(name = "valor")
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_lancamento")
    private StatusLancamento statusLancamento;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "loja_maconica_id")
    private Long lojaMaconicaId;

    @Column(name = "estabelecimento_comercial_id")
    private Long estabelecimentoComercialId;

    @Column(name = "tipo_operacao_id")
    private Long tipoOperacaoId;

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

    public ContasPagarReceber data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public Double getValor() {
        return valor;
    }

    public ContasPagarReceber valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public StatusLancamento getStatusLancamento() {
        return statusLancamento;
    }

    public ContasPagarReceber statusLancamento(StatusLancamento statusLancamento) {
        this.statusLancamento = statusLancamento;
        return this;
    }

    public void setStatusLancamento(StatusLancamento statusLancamento) {
        this.statusLancamento = statusLancamento;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public ContasPagarReceber usuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
        return this;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getLojaMaconicaId() {
        return lojaMaconicaId;
    }

    public ContasPagarReceber lojaMaconicaId(Long lojaMaconicaId) {
        this.lojaMaconicaId = lojaMaconicaId;
        return this;
    }

    public void setLojaMaconicaId(Long lojaMaconicaId) {
        this.lojaMaconicaId = lojaMaconicaId;
    }

    public Long getEstabelecimentoComercialId() {
        return estabelecimentoComercialId;
    }

    public ContasPagarReceber estabelecimentoComercialId(Long estabelecimentoComercialId) {
        this.estabelecimentoComercialId = estabelecimentoComercialId;
        return this;
    }

    public void setEstabelecimentoComercialId(Long estabelecimentoComercialId) {
        this.estabelecimentoComercialId = estabelecimentoComercialId;
    }

    public Long getTipoOperacaoId() {
        return tipoOperacaoId;
    }

    public ContasPagarReceber tipoOperacaoId(Long tipoOperacaoId) {
        this.tipoOperacaoId = tipoOperacaoId;
        return this;
    }

    public void setTipoOperacaoId(Long tipoOperacaoId) {
        this.tipoOperacaoId = tipoOperacaoId;
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
        ContasPagarReceber contasPagarReceber = (ContasPagarReceber) o;
        if (contasPagarReceber.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contasPagarReceber.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContasPagarReceber{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", valor=" + getValor() +
            ", statusLancamento='" + getStatusLancamento() + "'" +
            ", usuarioId=" + getUsuarioId() +
            ", lojaMaconicaId=" + getLojaMaconicaId() +
            ", estabelecimentoComercialId=" + getEstabelecimentoComercialId() +
            ", tipoOperacaoId=" + getTipoOperacaoId() +
            "}";
    }
}
