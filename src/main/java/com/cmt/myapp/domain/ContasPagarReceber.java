package com.cmt.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.TipoLancamento;

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
    @Column(name = "tipo_lancamento")
    private TipoLancamento tipoLancamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_lancamento")
    private StatusLancamento statusLancamento;

    @OneToOne    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToOne    @JoinColumn(unique = true)
    private LojaMaconica lojaMaconica;

    @OneToOne    @JoinColumn(unique = true)
    private EstabelecimentoComercial estabelecimentoComercial;

    @OneToOne    @JoinColumn(unique = true)
    private TipoOperacao tipoOperacao;

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

    public TipoLancamento getTipoLancamento() {
        return tipoLancamento;
    }

    public ContasPagarReceber tipoLancamento(TipoLancamento tipoLancamento) {
        this.tipoLancamento = tipoLancamento;
        return this;
    }

    public void setTipoLancamento(TipoLancamento tipoLancamento) {
        this.tipoLancamento = tipoLancamento;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public ContasPagarReceber usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LojaMaconica getLojaMaconica() {
        return lojaMaconica;
    }

    public ContasPagarReceber lojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconica = lojaMaconica;
        return this;
    }

    public void setLojaMaconica(LojaMaconica lojaMaconica) {
        this.lojaMaconica = lojaMaconica;
    }

    public EstabelecimentoComercial getEstabelecimentoComercial() {
        return estabelecimentoComercial;
    }

    public ContasPagarReceber estabelecimentoComercial(EstabelecimentoComercial estabelecimentoComercial) {
        this.estabelecimentoComercial = estabelecimentoComercial;
        return this;
    }

    public void setEstabelecimentoComercial(EstabelecimentoComercial estabelecimentoComercial) {
        this.estabelecimentoComercial = estabelecimentoComercial;
    }

    public TipoOperacao getTipoOperacao() {
        return tipoOperacao;
    }

    public ContasPagarReceber tipoOperacao(TipoOperacao tipoOperacao) {
        this.tipoOperacao = tipoOperacao;
        return this;
    }

    public void setTipoOperacao(TipoOperacao tipoOperacao) {
        this.tipoOperacao = tipoOperacao;
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
            ", tipoLancamento='" + getTipoLancamento() + "'" +
            ", statusLancamento='" + getStatusLancamento() + "'" +
            "}";
    }
}
