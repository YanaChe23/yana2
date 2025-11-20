theme: /TestExtend

    state: Start
        q!: $regex</start>
        script: $session.num = 6
        a: Начнём.

    state: 1
        q!: 1
        a: Реакции стейта 1. Часть 1
        # Идем выполнять реакции стейта 2
        extend: /TestExtend/2
        # Идем выполнять реакции стейта 4
        extend: /TestExtend/4
        a: Реакции стейта 1. Часть 3 

    state: 2
        if: $session.num > 3
            a: Реакции стейта 2. Внутри IF
            # Возвращаемся в стейт 1, чтобы выполнить Реакции стейта 1. Часть 3 
            stepBack
        elseif: $session.num < 1
            # Идем выполнять реакции стейта 3
            extend: /TestExtend/3
            # Возвращаемся в стейт 1, чтобы выполнить Реакции стейта 1. Часть 3 
            stepBack
        else:
            # Возвращаемся в стейт 1, чтобы выполнить Реакции стейта 1. Часть 3
            stepBack

    state: 3
        a: Реакции стейта 3
        # Возвращаемся в стейт 2, чтобы довыполнить реакции, указанные после extend: /TestExtend/3
        # То есть фактически, чтобы сделать stepBack в стейт 1 и выполнить Реакции стейта 1. Часть 3
        stepBack
        
    state: 4
        a: Реакции стейта 4
        # Возвращаемся в стейт 1, чтобы выполнить Реакции стейта 1. Часть 3
        stepBack

    state: 5 || noContext = true
        a: Реакции стейта 5
        extend: /TestExtend/4

    state: NoMatch
        event!: noMatch
        a: Я не понял. Вы сказали: {{$request.query}}