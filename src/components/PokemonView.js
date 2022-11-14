
class PokemonView extends HTMLElement {

    constructor(pokemon) {
        super(pokemon);

        var paramPokemon = pokemon;
        if (paramPokemon == undefined) {
            const pokemonNumber = this.getAttribute("number");
            paramPokemon = globalPokemonLoadedList.filter((el) => el.number == pokemonNumber)[0];
        }

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this._build(paramPokemon));
        shadow.appendChild(this._styles());
    }

    _build(pokemon) {

        const componentLi = document.createElement("li");
        componentLi.setAttribute("class", `pokemon ${pokemon.type}`);
        componentLi.setAttribute("onclick", `openModal(${pokemon.number});`);

        const componentSpanNumber = document.createElement("span");
        componentSpanNumber.setAttribute("class", "number");
        componentSpanNumber.textContent = pokemon.numberFormat();

        componentLi.appendChild(componentSpanNumber);

        const componentSpanName = document.createElement("span");
        componentSpanName.setAttribute("class", "name");
        componentSpanName.textContent = pokemon.name;

        componentLi.appendChild(componentSpanName);

        const componentDivDetail = document.createElement("div");
        componentDivDetail.setAttribute("class", "detail");

        const componentOlTypes = document.createElement("ol");
        componentOlTypes.setAttribute("class", "types");

        pokemon.types.map((type) => {
            componentOlTypes.appendChild(this._buildCreateLiTypes(type))
        });

        const componentImg = document.createElement("img");
        componentImg.src = pokemon.photo;
        componentImg.alt = pokemon.name;

        componentDivDetail.appendChild(componentOlTypes);
        componentDivDetail.appendChild(componentImg);

        componentLi.appendChild(componentDivDetail);

        return componentLi;
    }

    _buildCreateLiTypes(type) {
        const component = document.createElement("li");
        component.setAttribute("class", `type ${type}`);
        component.textContent = type;

        return component;
    }

    _styles() {
        const style = document.createElement("style");
        style.textContent = `
            .pokemon {
                margin: .5rem;
                padding: 2rem 1rem;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
            }
            
            .pokemon .number {
                color: #fff;
                text-align: right;
                font-size: .625rem;
            }
            
            .pokemon .name {
                color: white;
                margin: .25rem 0;
                margin-bottom: 0;
                text-transform: capitalize;
            }
            
            .pokemon .detail {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            
            .pokemon .detail .types {
                padding: 0;
                margin: 0;
                list-style: none;
            }
            
            .pokemon .detail .types .type {
                color: white;
                padding: .25rem .5rem;
                margin: .25rem 0;
                font-size: .625rem;
                border-radius: 1rem;
                filter: brightness(1.1);
                text-align: center;
            }
            
            .pokemon .detail img {
                max-width: 75%;
                height: 80px;
                align-self: flex-end;
            }
                        
            /* Cores dos Pokemons */
            .normal {
                background-color: #a6a877;
            }

            .grass {
                background-color: #77c850;
            }

            .fire {
                background-color: #ee7f30;
            }

            .water {
                background-color: #678fee;
            }

            .electric {
                background-color: #f7cf2e;
            }

            .ice {
                background-color: #98d5d7;
            }

            .ground {
                background-color: #dfbf69;
            }

            .flying {
                background-color: #a98ff0;
            }

            .poison {
                background-color: #a040a0;
            }

            .fighting {
                background-color: #bf3029;
            }

            .psychic {
                background-color: #f65687;
            }

            .dark {
                background-color: #725847;
            }

            .rock {
                background-color: #b8a137;
            }

            .bug {
                background-color: #a8b720;
            }

            .ghost {
                background-color: #6e5896;
            }

            .steel {
                background-color: #b9b7cf;
            }

            .dragon {
                background-color: #6f38f6;
            }

            .fairy {
                background-color: #f9aec7;
            }

            @media screen and (min-width: 400px) {
                .pokemons {
                    grid-template-columns: 1fr 1fr;
                }
            }
            
            @media screen and (min-width: 576px) {
                .pokemons {
                    grid-template-columns: 1fr 1fr 1fr;
                }
            }
            
            @media screen and (min-width: 992px) {
                .pokemons {
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                }
            }
        `;

        return style;
    }
}

customElements.define("pokemon-view", PokemonView);