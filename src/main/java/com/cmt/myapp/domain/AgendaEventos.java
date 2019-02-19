package com.cmt.myapp.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AgendaEventos.
 */
@Entity
@Table(name = "agenda_eventos")
public class AgendaEventos implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "titulo")
	@NotBlank(message = "Informe o titulo do evento")
	private String titulo;

	@Column(name = "data")
	@NotNull(message="Informe a data para o evento")
	private Instant data;

	@Column(name = "jhi_local")
	@NotBlank(message = "Informe o local do evento")
	private String local;

	@Column(name = "descricao")
	@NotBlank(message = "Informe uma descricao para o evento")
	private String descricao;

	@Column(name = "bol_ativo")
	private Boolean bolAtivo;

	@Column(name = "loja_maconica_id")
	private Long lojaMaconicaId;

	@OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "loja_maconica_id", insertable = false, updatable = false, nullable = true)
	private LojaMaconica loja;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public AgendaEventos titulo(String titulo) {
		this.titulo = titulo;
		return this;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Instant getData() {
		return data;
	}

	public AgendaEventos data(Instant data) {
		this.data = data;
		return this;
	}

	public void setData(Instant data) {
		this.data = data;
	}

	public String getLocal() {
		return local;
	}

	public AgendaEventos local(String local) {
		this.local = local;
		return this;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getDescricao() {
		return descricao;
	}

	public AgendaEventos descricao(String descricao) {
		this.descricao = descricao;
		return this;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Boolean isBolAtivo() {
		return bolAtivo;
	}

	public AgendaEventos bolAtivo(Boolean bolAtivo) {
		this.bolAtivo = bolAtivo;
		return this;
	}

	public void setBolAtivo(Boolean bolAtivo) {
		this.bolAtivo = bolAtivo;
	}

	public Long getLojaMaconicaId() {
		return lojaMaconicaId;
	}

	public AgendaEventos lojaMaconicaId(Long lojaMaconicaId) {
		this.lojaMaconicaId = lojaMaconicaId;
		return this;
	}

	public void setLojaMaconicaId(Long lojaMaconicaId) {
		this.lojaMaconicaId = lojaMaconicaId;
	}

	public String getLojaMaconica() {
		return loja == null ? null : loja.getNome();
	}

	public AgendaEventos categoria(LojaMaconica loja) {
		this.loja = loja;
		return this;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		AgendaEventos agendaEventos = (AgendaEventos) o;
		if (agendaEventos.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), agendaEventos.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "AgendaEventos{" + "id=" + getId() + ", titulo='" + getTitulo() + "'" + ", data='" + getData() + "'"
				+ ", local='" + getLocal() + "'" + ", descricao='" + getDescricao() + "'" + ", bolAtivo='"
				+ isBolAtivo() + "'" + ", lojaMaconicaId=" + getLojaMaconicaId() + "}";
	}
}
