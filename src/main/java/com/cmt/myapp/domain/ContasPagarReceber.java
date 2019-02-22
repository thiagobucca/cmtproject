package com.cmt.myapp.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cmt.myapp.domain.enumeration.StatusLancamento;
import com.cmt.myapp.domain.enumeration.TipoLancamento;

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
    @NotNull(message="Informe a data do evento contas/pagar receber")
    private Instant data;

    @Column(name = "valor")
    @NotNull(message="Informe o valor do evento contas/pagar receber")
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_lancamento")
    //@NotBlank(message = "Informe o status do lancamento do evento contas/pagar receber")
    private StatusLancamento statusLancamento;

    @Column(name = "usuario_id")
    @NotNull(message="Informe o usuario para criacao do evento contas/pagar receber")
    private Long usuarioId;

    @OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "usuario_id", insertable = false, updatable = false, nullable = true)
	private User user;

    @Column(name = "loja_maconica_id")
    private Long lojaMaconicaId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "loja_maconica_id", insertable = false, updatable = false, nullable = true)
	private LojaMaconica loja;

    @Column(name = "estabelecimento_comercial_id")
    private Long estabelecimentoComercialId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "estabelecimento_comercial_id", insertable = false, updatable = false, nullable = true)
    private EstabelecimentoComercial estabelecimento;

    @Column(name = "tipo_operacao_id")
    @NotNull(message="Informe o tipo de operacao do evento contas/pagar receber")
    private Long tipoOperacaoId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "tipo_operacao_id", insertable = false, updatable = false, nullable = true)
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
    
    public String getEstabelecimento() {
        return estabelecimento == null ? null : estabelecimento.getNome();
    }
    
    public ContasPagarReceber matriz(EstabelecimentoComercial estabelecimento) {
        this.estabelecimento = estabelecimento;
        return this;
    }
    
    public String getLojaMaconica() {
		return loja == null ? null : loja.getNome();
	}

	public ContasPagarReceber loja(LojaMaconica loja) {
		this.loja = loja;
		return this;
	}
	
	public String getTipoOperacao() {
		return tipoOperacao == null ? null : tipoOperacao.getNomeOperacao();
    }
    
    public TipoLancamento getTipoLancamento() {
		return tipoOperacao == null ? null : tipoOperacao.getTipoLancamento();
	}


	public ContasPagarReceber categoria(TipoOperacao tipoOperacao) {
		this.tipoOperacao = tipoOperacao;
		return this;
    }
    
    public String getUsuario() {
		return user == null ? null : user.getFirstName();
	}

	public ContasPagarReceber user(User user) {
		this.user = user;
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
