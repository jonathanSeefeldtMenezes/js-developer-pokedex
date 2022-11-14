
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    abilities = [];
    stats = [];

    numberFormat() {
        return '#' + ("000" + this.number).slice(-3)
    }
}