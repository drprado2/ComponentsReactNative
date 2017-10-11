# ComponentsReactNative
Componentes React Native como por exemplo itens colapsáveis.

## Componente Item Colapsável
Exemplo de uso  
```js
            <ItemCollapsible
                itemHeight={50}
                openIcon={require('./../../img/flecha-baixo.png') 
                closeIcon={require('./../../img/flecha-direita.png')}
                title={'Cadastros Atualizado'}
                backgroundColor={'#e3f2fd'}
                borderColor={'#bbdefb'}
                fontColor='black'
                leftIcon={<Image source={require('./../../img/android.png')}
                                 style={{width: 30, height: 30, marginLeft: 5}}/>}
                childrensList={[
                    {
                        component: <ClientesItemMenu/>,
                        height: 50
                    },
                    {
                        component: <ClientesCadastroItemMenu/>,
                        height: 50
                    },
                    {
                        component: <ItemCollapsible
                            itemHeight={50}
                            openIcon={require('./../../img/flecha-baixo.png')}
                            closeIcon={require('./../../img/flecha-direita.png')}
                            title={'Cadastros Atualizado'}
                            backgroundColor={'#e3f2fd'}
                            borderColor={'#bbdefb'}
                            fontColor='black'
                            toggleCollapsible={this.toggleSubMenuA}
                            childrensList={[
                                {
                                    component: <Text>Teste</Text>,
                                    height: 50
                                },
                                {
                                    component: <Text>Teste</Text>,
                                    height: 50
                                }
                            ]}
                        />,
                        height: this.state.subMenuAEstaAberto ? 150 : 50
                    },
                ]}
            >
            </ItemCollapsible>
```
Propriedades | Explicação
------------ | ----------
itemHeight   | Propriedade onde deve ser informado a altura que o item colapsável deve ter (obrigatório)
openIcon     | Imagem que será apresentada quando o item estiver expandido (opcional)
closeIcon    | Imagem que será apresentada quando o item estiver retraído (opcional)
title        | Título que será apresentado no item (opcional)
backgroundColor| Cor de fundo do item (opcional)
borderColor  | Cor da borda inferior do item (opcional)
fontColor    | Cor da fonte do título do item (opcional)
leftIcon     | Ícone que será apresentado na esquerda, geralmente uma imagem (opcional)
childrensList | Essa é a propriedade mais importante e também mais complexa, cada item deve ser um objeto literal contendo o componente React que deve ser renderizado e a altura que aquele item deve tem, e no caso de sub itens colapsáveis devemos adicionar uma propriedade a mais toggleCollapsible que é uma função de callback que deve atualizar a altura que esse subitem terá do menu geral. Essa parte não está ideal mais infelizmente com o meu conhecimento atual foi a melhor maneira que consegui para resolver o problema de ter itens colapsáveis dentro de itens colapsáveis.  
toggleCollapsible | Essa propriedade deve ser usada apenas quando um dos itens filhos do item colapsável pai também é um item colapsável, nesse caso a altura desse item vária em relação ao item estar aberto ou fechado logo deverá ser passado uma função de callback que será evocada quando o items abrir ou fechar, e o componente pai deve atualizar a sua altura total.
