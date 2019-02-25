package com.cmt.myapp.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Objects;

/**
 * A EstabelecimentoComercial.
 */
@Entity
@Table(name = "estabelecimento_comercial")
public class EstabelecimentoComercial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bol_matriz")
    private Boolean bolMatriz;

    @Column(name = "cod_cnpj")
    @NotBlank(message="Informe o CPNJ.")
    private String codCnpj;

    @Column(name = "nome")
    @NotBlank(message = "Informe o nome do estabelecimento comercial")
    private String nome;

    @Column(name = "endereco")
    @NotBlank(message = "Informe o endereco do estabelecimento comercial")
    private String endereco;

    @Column(name = "telefone")
    @NotBlank(message = "Informe o telefone do estabelecimento")
    private String telefone;

    @Lob
    @Column(name = "logo")
    private String logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "taxa_convenio")
    @NotNull(message="Informe a taxa em % do convênio")
    private Double taxaConvenio;

    @Column(name = "bol_ativo")
    private Boolean bolAtivo;

    @Column(name = "categoria_estabelecimento_id")
    @NotNull(message="Informe a categoria do estabelecimento comercial")
    private Long categoriaEstabelecimentoId;
    
    //objeto categoria STEP 1 - CRIAR o relacionamento dos obejetos pelo coluna de FK
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_estabelecimento_id", insertable = false, updatable = false)
    private CategoriaEstabelecimento categoria;
    

    @Column(name = "estabelecimento_matriz_id")
    private Long estabelecimentoMatrizId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "estabelecimento_matriz_id", insertable = false, updatable = false, nullable = true)
    private EstabelecimentoComercial matriz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //STEP 2 - Criar o get do atributo que deseja retornar no json o nome fica igual ao da assinatura removendo o prefixo 'get'
    //getNome da categoria pro swagger
    public String getCategoria() {
        return  categoria == null ? null :
         categoria.getNome();
    }
    
    //STEP 3 - criar o set do objeto q vem no select do banco
    //set categoria do fetch do banco
    public EstabelecimentoComercial categoria(CategoriaEstabelecimento categoria) {
        this.categoria = categoria;
        return this;
    }
    
    public String getMatriz() {
    	if(matriz == null) return null;
        return matriz.getNome();
    }
    
    //STEP 3 - criar o set do objeto q vem no select do banco
    //set categoria do fetch do banco
    public EstabelecimentoComercial matriz(EstabelecimentoComercial matriz) {
        this.matriz = matriz;
        return this;
    }
    

    public Boolean isBolMatriz() {
        return bolMatriz;
    }

    public EstabelecimentoComercial bolMatriz(Boolean bolMatriz) {
        this.bolMatriz = bolMatriz;
        return this;
    }

    public void setBolMatriz(Boolean bolMatriz) {
        this.bolMatriz = bolMatriz;
    }

    public String getCodCnpj() {
        return codCnpj;
    }

    public EstabelecimentoComercial codCnpj(String codCnpj) {
        this.codCnpj = codCnpj;
        return this;
    }

    public void setCodCnpj(String codCnpj) {
        this.codCnpj = codCnpj;
    }

    public String getNome() {
        return nome;
    }

    public EstabelecimentoComercial nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public EstabelecimentoComercial endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public EstabelecimentoComercial telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getLogo() {
        return logo;
    }

    public EstabelecimentoComercial logo(String logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public EstabelecimentoComercial logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Double getTaxaConvenio() {
        return taxaConvenio;
    }

    public EstabelecimentoComercial taxaConvenio(Double taxaConvenio) {
        this.taxaConvenio = taxaConvenio;
        return this;
    }

    public void setTaxaConvenio(Double taxaConvenio) {
        this.taxaConvenio = taxaConvenio;
    }

    public Boolean isBolAtivo() {
        return bolAtivo;
    }

    public EstabelecimentoComercial bolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
        return this;
    }

    public void setBolAtivo(Boolean bolAtivo) {
        this.bolAtivo = bolAtivo;
    }

    public Long getCategoriaEstabelecimentoId() {
        return categoriaEstabelecimentoId;
    }

    public EstabelecimentoComercial categoriaEstabelecimentoId(Long categoriaEstabelecimentoId) {
        this.categoriaEstabelecimentoId = categoriaEstabelecimentoId;
        return this;
    }

    public void setCategoriaEstabelecimentoId(Long categoriaEstabelecimentoId) {
        this.categoriaEstabelecimentoId = categoriaEstabelecimentoId;
    }

    public Long getEstabelecimentoMatrizId() {
        return estabelecimentoMatrizId;
    }

    public EstabelecimentoComercial estabelecimentoMatrizId(Long estabelecimentoMatrizId) {
        this.estabelecimentoMatrizId = estabelecimentoMatrizId;
        return this;
    }

    public void setEstabelecimentoMatrizId(Long estabelecimentoMatrizId) {
        this.estabelecimentoMatrizId = estabelecimentoMatrizId;
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
        EstabelecimentoComercial estabelecimentoComercial = (EstabelecimentoComercial) o;
        if (estabelecimentoComercial.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estabelecimentoComercial.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EstabelecimentoComercial{" +
            "id=" + getId() +
            ", bolMatriz='" + isBolMatriz() + "'" +
            ", codCnpj='" + getCodCnpj() + "'" +
            ", nome='" + getNome() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", taxaConvenio=" + getTaxaConvenio() +
            ", bolAtivo='" + isBolAtivo() + "'" +
            ", categoriaEstabelecimentoId=" + getCategoriaEstabelecimentoId() +
            ", estabelecimentoMatrizId=" + getEstabelecimentoMatrizId() +
            "}";
    }
}
