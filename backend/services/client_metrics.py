def calcular_metricas(data):
    faturamento_mensal = data.faturamento_mensal
    clientes_ativos = data.clientes_ativos
    total_clientes = data.total_clientes
    funcionarios = data.numero_funcionarios
    preco_servico = data.preco_servico
    impostos_total = sum(c.cpa for c in data.clientes)

    faturamento_anual = faturamento_mensal * 12
    lucro_bruto = faturamento_mensal - (faturamento_mensal * 0.3)
    lucro_liquido = lucro_bruto - impostos_total
    lucro_anual = lucro_liquido * 12
    custo_impostos_anual = impostos_total * 12

    ltv_medio = preco_servico * 12
    ltv_total = ltv_medio * clientes_ativos

    valuation = faturamento_anual * 3  # exemplo simplificado

    return {
        "faturamento_anual": faturamento_anual,
        "lucro_anual": lucro_anual,
        "custo_impostos_anual": custo_impostos_anual,
        "clientes_ativos": clientes_ativos,
        "total_clientes": total_clientes,
        "valuation": valuation,
        "lucro_bruto": round(lucro_bruto, 2),
        "lucro_liquido": round(lucro_liquido, 2),
        "ltv_medio": ltv_medio,
        "ltv_total": ltv_total,
        "numero_funcionarios": funcionarios
    }
