const ORIGINAL_ENERGY = 3;
const ORIGINAL_ROUND = 1;
const NEXT_ROUND_ENERGY = 2;
const MAX_ENERGY = 10;
const MIN_ENERGY = 0;


let decrement_selector = $('.btnDecrement');
let increment_selector = $('.btnIncrement');
let next_selector = $('.btnNext');
let reset_selector = $('.btnReset');

let total_energy = ORIGINAL_ENERGY;

decrement_selector.click(() => {
    total_energy--;
    setEnergyCount(total_energy);
});

increment_selector.click(() => {
    total_energy++;
    setEnergyCount(total_energy);
});

next_selector.click(() => {
    total_energy += NEXT_ROUND_ENERGY;
    setEnergyCount(total_energy);
});

reset_selector.click(() => {
    total_energy = ORIGINAL_ENERGY;
    setEnergyCount(total_energy);
});

function setEnergyCount(iTotalEnergy) {
    let total_energy_selector = $('.energyCountNumber');

    iTotalEnergy = (iTotalEnergy >= 10) ? 10 : iTotalEnergy;
    iTotalEnergy = (iTotalEnergy <= 0) ? 0 : iTotalEnergy;

    total_energy = iTotalEnergy;

    total_energy_selector.text(iTotalEnergy);
}