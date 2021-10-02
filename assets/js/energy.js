const MAIN_ROUND = 1;
const MAIN_ENERGY = 3;
const MAX_ENERGY = 10;
const MIN_ENERGY = 0;
const NEXT_ROUND_ENERGY = 2;

const KEYCODES = {
    space: 32,
    left: 37,
    right: 39,
    esc: 27,
    backspace: 8
};

const MAIN_ROUND_DETAIL = {
    round: MAIN_ROUND,
    energy: MAIN_ENERGY
};

let roundDetails = [];

/**
 * On-click actions
 */
$('.btnDecrement').on('click', decrementEnergyAction);
$('.btnIncrement').on('click', incrementEnergyAction);
$('.btnNext').on('click', moveToNextRoundAction);
$('.btnReset').on('click', resetAction);
$('.btnUndo').on('click', undoAction);

/**
 * Using keyboard shortcut keys
 */
$(document).on('keyup', function(event) {
    switch (event.keyCode) {
        case KEYCODES.space:
            moveToNextRoundAction();
            break;
        case KEYCODES.left:
            decrementEnergyAction();
            break;
        case KEYCODES.right:
            incrementEnergyAction();
            break;
        case KEYCODES.esc:
            resetAction();
            break;
        case KEYCODES.backspace:
            undoAction();
            break;
        default:
            break;
    }
});

/**
 * Initialize round details
 * 
 * @param boolean reset
 */
function initRoundDetails(reset) {
    reset = reset || false;
    roundDetails = [];
    roundDetails.push(MAIN_ROUND_DETAIL);
    setRoundDetailsToDOM(reset);
}

/**
 * Set round details to DOM
 * 
 * @param boolean override
 */
function setRoundDetailsToDOM(override) {
    override = override || false;
    if (roundDetails.length > MAIN_ROUND || override) {
        setRoundCount();
        setEnergyCount();
    }
}

/**
 * Set round details to DOM
 */
function setRoundCount() {
    let round_selector = $('.roundCount');

    round_selector.text(roundDetails[roundDetails.length - 1].round);
}

/**
 * Set energy details to DOM
 */
function setEnergyCount() {
    let total_energy_selector = $('.energyCountNumber');
    let lastRoundEnergy = roundDetails[roundDetails.length - 1].energy;

    lastRoundEnergy = (lastRoundEnergy >= 10) ? MAX_ENERGY : lastRoundEnergy;

    if (lastRoundEnergy === 10) {
        total_energy_selector.css('margin-left', '-50px');
    } else {
        total_energy_selector.css('margin-left', '-30px');
    }

    total_energy_selector.text(lastRoundEnergy);
}

/**
 * Returns a new array of action details
 * 
 * @returns object
 */
function setActionDetails() {
    return {
        round: roundDetails[roundDetails.length - 1].round,
        energy: roundDetails[roundDetails.length - 1].energy
    };
}

/**
 * Undo action
 */
function undoAction() {
    if (roundDetails.length > MAIN_ROUND) {
        roundDetails.pop();
        setRoundDetailsToDOM(true);
        notification('An action has been undo', 'info');
    }
}

/**
 * Decrement energy action
 */
function decrementEnergyAction() {
    let lastRoundDetails = roundDetails[roundDetails.length - 1];
    if (lastRoundDetails.energy > MIN_ENERGY) {

        let newRoundDetails = setActionDetails();
        newRoundDetails.energy = newRoundDetails.energy - 1;
        roundDetails.push(newRoundDetails);

        setRoundDetailsToDOM();
        notification('Enemy loses an energy', 'error');
    }
}

/**
 * Increment energy action
 */
function incrementEnergyAction() {
    let lastRoundDetails = roundDetails[roundDetails.length - 1];
    if (lastRoundDetails.energy < MAX_ENERGY) {

        let newRoundDetails = setActionDetails();
        newRoundDetails.energy = newRoundDetails.energy + 1;
        roundDetails.push(newRoundDetails);

        setRoundDetailsToDOM();
        notification('Enemy gains an energy', 'success');
    }
}

/**
 * Move to the next round action
 */
function moveToNextRoundAction() {
    let lastRoundDetails = roundDetails[roundDetails.length - 1];
    let newRoundDetails = setActionDetails();
    newRoundDetails.round = newRoundDetails.round + 1;
    if (lastRoundDetails.energy < MAX_ENERGY) {
        let newEnergy = newRoundDetails.energy + NEXT_ROUND_ENERGY;
        newRoundDetails.energy = (newEnergy >= 10) ? MAX_ENERGY : newEnergy;
    }
    roundDetails.push(newRoundDetails);
    setRoundDetailsToDOM();
    notification('Round: ' + lastRoundDetails.round, 'info');
}

/**
 * Reset round action
 */
function resetAction() {
    confirmation(
        'Are you sure?',
        'Will reset the current round information',
        '<img src="./assets/images/slp.png" width="auto" height="120">', {
            icon: 'no-border'
        },
        'Yes, reset it!'
    ).then((result) => {
        if (result.isConfirmed) {
            initRoundDetails(true);
            notification('Reset success', 'success');
        }
    })

}

(() => {
    initRoundDetails();
})();