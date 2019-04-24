package com.cmt.myapp.service.dto;

/**
 * A DTO representing a password change required data - current and new password.
 */
public class CategoriaEstabelecimentoDTO {
    private Long id;
    private String nome;
    private Long estabelecimentos;


    public CategoriaEstabelecimentoDTO() {
        // Empty constructor needed for Jackson.

    }


    public CategoriaEstabelecimentoDTO(Long id, String nome, Long estabelecimento) {
        // Empty constructor needed for Jackson.
        this.id = id;
        this.nome = nome;
        this.estabelecimentos = estabelecimento;
    }


    public String getNome() {

        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getEstabelecimentos() {
        return estabelecimentos;
    }

    public void setEstabelecimentos(Long estabelecimentos) {
        this.estabelecimentos = estabelecimentos;
    }
}
