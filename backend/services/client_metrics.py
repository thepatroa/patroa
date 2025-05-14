def calcular_metricas(cliente):
    faturamento = cliente.faturamento_mensal
    custo = cliente.custo_operacional
    impostos = cliente.impostos

    lucro_bruto = faturamento - custo
    lucro_liquido = lucro_bruto - impostos
    ticket_medio = faturamento / cliente.clientes_ativos if cliente.clientes_ativos > 0 else 0
    taxa_ativacao = cliente.clientes_ativos / cliente.clientes_totais if cliente.clientes_totais > 0 else 0

    return {
        "lucro_bruto": lucro_bruto,
        "lucro_liquido": lucro_liquido,
        "ticket_medio": round(ticket_medio, 2),
        "taxa_ativacao": round(taxa_ativacao * 100, 2)
    }
