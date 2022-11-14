
class PokemonModalView extends HTMLElement {

    constructor() {
        super();

        const pokemonNumber = this.getAttribute("number");
        const pokemon = globalPokemonLoadedList.filter((el) => el.number == pokemonNumber)[0];

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this._build(pokemon));
        shadow.appendChild(this._style());
    }

    _build(pokemon) {

        const elDivContent = document.createElement("div");
        elDivContent.setAttribute("id", "modalContent");
        elDivContent.setAttribute("class", `pokemonDetailModalContent ${pokemon.type}`);

        const elClose = document.createElement("a");
        elClose.setAttribute("class", "modalClose");
        elClose.setAttribute("onclick", "closeModal();");
        elClose.href = "javascript:void(0);";
        elClose.title = "Fechar";
        elClose.textContent = "X";

        const elTitle = document.createElement("p");
        elTitle.setAttribute("class", "title");
        elTitle.textContent = pokemon.name;

        const elDivDetail = document.createElement("div");
        elDivDetail.setAttribute("class", "pokemonDetailModalContentBody");

        /* Abilities */
        const elDivAbilities = document.createElement("div");

        const elTitleAbilities = document.createElement("p");
        elTitleAbilities.setAttribute("class", "cap");
        elTitleAbilities.textContent = "Abilities";

        const elListAbilities = document.createElement("ol");

        pokemon.abilities.map((ability) => {
            elListAbilities.appendChild(this._buildAbilities(ability))
        });

        elDivAbilities.appendChild(elTitleAbilities);
        elDivAbilities.appendChild(elListAbilities);

        /* Stats */
        const elDivStats = document.createElement("div");
        elDivStats.setAttribute("class", "modalStats");

        const elTitleStats = document.createElement("p");
        elTitleStats.setAttribute("class", "cap");
        elTitleStats.textContent = "Stats";

        const elListStats = document.createElement("ol");

        pokemon.stats.map((stat) => {
            elListStats.appendChild(this._buildStats(stat.name_stat, stat.base_stat))
        });

        elDivStats.appendChild(elTitleStats);
        elDivStats.appendChild(elListStats);

        elDivDetail.appendChild(elDivAbilities);
        elDivDetail.appendChild(elDivStats);

        elDivContent.appendChild(elClose);
        elDivContent.appendChild(elTitle);
        elDivContent.appendChild(elDivDetail);

        return elDivContent;
    }

    _buildAbilities(ability) {
        const elAbility = document.createElement("li");
        elAbility.textContent = ability;
        return elAbility;
    }

    _buildStats(name, base) {
        const elLi = document.createElement("li");

        const elPNameStat = document.createElement("p");
        elPNameStat.style = "width: 60vw;";
        //elPNameStat.setAttribute("style", "width: 60vw");
        elPNameStat.textContent = name;

        const elPBaseStat = document.createElement("p");
        elPBaseStat.style = "width: 15vw;";
        //elPBaseStat.setAttribute("style", "width: 15vw");
        elPBaseStat.textContent = base;

        const elProgressBar = this._buildProgressBarBaseStat(base);

        elLi.appendChild(elPNameStat);
        elLi.appendChild(elPNameStat);
        elLi.appendChild(elProgressBar);

        return elLi;
    }

    _buildProgressBarBaseStat(base) {
        const elDiv = document.createElement("div");
        elDiv.setAttribute("class", "progress-bar");

        const elSpan = document.createElement("span");
        elSpan.setAttribute("class", "progress-bar-fill");
        elSpan.style = `width: ${(base * 100) / 255}%;`;

        elDiv.appendChild(elSpan);

        return elDiv;
    }

    _calcPercentBaseStats(baseStats) {
        return (baseStats * 100) / 255
    }

    _style() {
        const style = document.createElement("style");
        style.textContent = `
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
            
            .pokemonDetailModalContent {
                margin: 5% auto;
                padding-top: 10px;
                max-width: 600px;
                box-shadow: 0 0 2px #fff;
                border-radius: 1rem;
                list-style: none;
            }
            
            .pokemonDetailModalContent .title {
                font-size: 2rem;
                color: #fff;
                text-transform: capitalize;
                margin-left: 10px;
            }
            
            .pokemonDetailModalContentBody {
                border-radius: 1rem;
                background: #fff;
                padding: 10px;
            }
            
            .pokemonDetailModalContentBody .cap {
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .pokemonDetailModalContentBody ol {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            
            .pokemonDetailModalContentBody .modalStats li {
                height: 4vh;
                display: flex;
                flex-direction: row;
                grid-template-columns: 3fr;
                align-items: center;
            }
            
            /* Modal */
            .modalClose {
                padding: 5px;
                color: crimson;
                font-weight: bold;
                text-decoration: none;
            }
            
            /* ProgressBar Stats */
            .progress-bar {
                width: 100vw;
                height: 15px;
                background-color: #e0e0e0;
                padding: 1px;
                border-radius: 3px;
                box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
            }
            
            .progress-bar-fill {
                display: block;
                height: 13px;
                background-color: #659cef;
                border-radius: 3px;
            
                transition: width 500ms ease-in-out;
            }
        `;

        return style;
    }

}

customElements.define('pokemon-modal-view', PokemonModalView)