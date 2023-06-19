package com.puc.project.rentify.controllers;

import com.puc.project.rentify.model.Endereco;
import com.puc.project.rentify.model.JoinEndereco;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.EnderecoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/enderecos")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Endereço", description = "API Endereço contendo todos os processos relacionado.")
public class EnderecoController {

    @Autowired
    private EnderecoRepository repository;

    @Operation(summary = "Listar Endereços")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Listagem de Endereços")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Endereco> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listagem de Endereços com joins")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Listagem de Endereços com joins")
    })
    @GetMapping("/listar_join")
    @ResponseStatus(HttpStatus.OK)
    public List<JoinEndereco> listar_join() throws IdNotFound, InterruptedException, ExecutionException {
        return repository.listar_join();
    }

    @Operation(summary = "Listar Endereço por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Endereço do respectivo ID"),
        @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Endereco listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Listar Endereço por ID com joins")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Endereço do respectivo ID com joins"),
        @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_join_id")
    @ResponseStatus(HttpStatus.OK)
    public JoinEndereco listar_join(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar_join(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Endereço")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Endereço criado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Endereco.class))}),
            @ApiResponse(responseCode = "400", description = "ID já está em uso", content = @Content),
            @ApiResponse(responseCode = "404", description = "ID Estrangeiro não encontrado", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Endereco obj) throws InterruptedException, ExecutionException {
        try {
            repository.adicionar(obj);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Criado");
            return new_response;
        } catch (IdAlreadyUsed e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        } catch (ForeignIdNotExists e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Alterar Endereço pelo ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Endereço alterado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Endereco.class))}),
        @ApiResponse(responseCode = "404", description = "ID / ID Estrangeiro não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Endereco obj) throws InterruptedException, ExecutionException {
        try {
            repository.alterar(obj);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Alterado");
            return new_response;
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        } catch (ForeignIdNotExists e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Deletar Endereço por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Endereço deletada"),
            @ApiResponse(responseCode = "400", description = "ID sendo usado em Tabelas Estrangeiras", content = @Content)
    })
    @DeleteMapping("/deletar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> deletar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            repository.deletar(id);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Deletado");
            return new_response;
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        } catch (IdInForeignObject e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        }
    }
}
