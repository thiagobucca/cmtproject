package com.cmt.myapp.domain;

import com.cmt.myapp.config.Constants;
import com.cmt.myapp.domain.enumeration.TipoPessoa;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.time.Instant;

/**
 * A user.
 */
@Entity
@Table(name = "jhi_user")

public class User extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String login;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 254)
    @Column(length = 254, unique = true)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    @Size(min = 2, max = 6)
    @Column(name = "lang_key", length = 6)
    private String langKey;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;


    @Column(name = "telefone")
    private String telefone;

    @Column(name = "placet")
    private String placet;

    @Column(name = "pessoa_dependente_id")
    private Long pessoaDependenteId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "pessoa_dependente_id", insertable = false, updatable = false, nullable = true)
	private User dependente;

    @Column(name = "loja_maconica_id")
    private Long lojaMaconicaId;
    
    @OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "loja_maconica_id", insertable = false, updatable = false, nullable = true)
	private LojaMaconica loja;

    @Column(name = "data_nascimento")
    private Instant dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @Column(name = "device_id")
    private String deviceId;

    @Column(name = "estabelecimento_comercial_id")
    private Long estabelecimentoComercialId;

    @Column(name = "grupo_id")
    private Long grupoId;

    @OneToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "estabelecimento_comercial_id", insertable = false, updatable = false, nullable = true)
	private EstabelecimentoComercial estabelecimento;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "jhi_user_authority",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})

    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    public void setLogin(String login) {
        this.login = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }
    
    public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Long getPessoaDependenteId() {
		return pessoaDependenteId;
	}

	public void setPessoaDependenteId(Long pessoaDependenteId) {
		this.pessoaDependenteId = pessoaDependenteId;
	}

	public Long getLojaMaconicaId() {
		return lojaMaconicaId;
	}

	public void setLojaMaconicaId(Long lojaMaconicaId) {
		this.lojaMaconicaId = lojaMaconicaId;
	}

	public Instant getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Instant dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public TipoPessoa getTipoPessoa() {
		return tipoPessoa == null ? null : tipoPessoa;
	}

	public void setTipoPessoa(TipoPessoa tipoPessoa) {
		this.tipoPessoa = tipoPessoa;
	}
	
	public String getLojaMaconica() {
		return loja == null ? null : loja.getNome();
	}

	public void setLoja(LojaMaconica loja) {
		this.loja = loja;
	}
	

    public String getDependente() {
    	return dependente == null ? null : dependente.getFirstName();
	}

	public void setDependente(User dependente) {
		this.dependente = dependente;
    }
    
    public Long getGrupoId() {
        return grupoId;
    }

    public void setGrupoId(Long grupoId) {
        this.grupoId = grupoId;
    }

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return !(user.getId() == null || getId() == null) && Objects.equals(getId(), user.getId());
    }

    

	@Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            ", placet='" + placet  + '\'' +
            ", estabelecimentoComercialId=" + getEstabelecimentoComercialId() +
            ", grupolId=" + getGrupoId() +
            "}";
    }

    /**
     * @return the placet
     */
    public String getPlacet() {
        return placet;
    }

    /**
     * @param placet the placet to set
     */
    public void setPlacet(String placet) {
        this.placet = placet;
    }

    /**
     * @return the EstabelecimentoComercialId
     */
    public Long getEstabelecimentoComercialId() {
        return estabelecimentoComercialId;
    }

    /**
     * @param estabelecimentoComercialId the EstabelecimentoComercialId to set
     */
    public void setEstabelecimentoComercialId(Long estabelecimentoComercialId) {
        this.estabelecimentoComercialId  = estabelecimentoComercialId;
    }

    public String getEstabelecimento() {
		return estabelecimento == null ? null : estabelecimento.getNome();
	}

	public void setEstabelecimento(EstabelecimentoComercial estabelecimento) {
		this.estabelecimento = estabelecimento;
	}
}
