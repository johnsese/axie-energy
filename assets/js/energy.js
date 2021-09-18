const ORIGINAL_ENERGY = 3;
const ORIGINAL_ROUND = 1;
const NEXT_ROUND_ENERGY = 2;
const MAX_ENERGY = 10;
const MIN_ENERGY = 0;

const KEYCODES = {
    space: 32,
    left: 37,
    right: 39,
    esc: 27
};


let doc = $(document);
let decrement_selector = $('.btnDecrement');
let increment_selector = $('.btnIncrement');
let next_selector = $('.btnNext');
let reset_selector = $('.btnReset');

let total_energy = ORIGINAL_ENERGY;
let current_round = ORIGINAL_ROUND;

// Decrement actions
decrement_selector.click(decrementEnergy);

// Increment actions
increment_selector.click(incrementEnergy);

// Move to next round actions
next_selector.click(moveToNextRound);

// Reset actions
reset_selector.click(resetEnergy);

// Using keyboard shortcut keys
$(document).on('keydown', function(event) {
    switch (event.keyCode) {
        case KEYCODES.space:
            moveToNextRound();
            break;
        case KEYCODES.left:
            decrementEnergy();
            break;
        case KEYCODES.right:
            incrementEnergy();
            break;
        case KEYCODES.esc:
            resetEnergy();
            break;
        default:
            break;
    }
});

/**
 * Set total energy count in current round
 * 
 * @param int iTotalEnergy 
 */
function setEnergyCount(iTotalEnergy) {
    let total_energy_selector = $('.energyCountNumber');

    iTotalEnergy = (iTotalEnergy >= 10) ? MAX_ENERGY : iTotalEnergy;
    iTotalEnergy = (iTotalEnergy <= 0) ? MIN_ENERGY : iTotalEnergy;

    total_energy = iTotalEnergy;

    if (total_energy === 10) {
        total_energy_selector.css('margin-left', '-50px');
    } else {
        total_energy_selector.css('margin-left', '-30px');
    }

    total_energy_selector.text(iTotalEnergy);
}

/**
 * Set round count
 * 
 * @param int iRound 
 */
function setRoundCount(iRound) {
    let round_selector = $('.roundCount');

    round_selector.text(iRound);
}

/**
 * Decrement energy by 1
 */
function decrementEnergy() {
    if (total_energy > 0) {
        $.notify('Enemy loses an energy', {
            autoHide: true,
            autoHideDelay: '2000',
            className: 'error',
            position: 'bottom right'
        });
    }

    total_energy--;
    setEnergyCount(total_energy);
}

/**
 * Increment energy by 1
 */
function incrementEnergy() {
    if (total_energy < 10) {
        $.notify('Enemy gains an energy', {
            autoHide: true,
            autoHideDelay: '2000',
            className: 'success',
            position: 'bottom right'
        });
    }

    total_energy++;
    setEnergyCount(total_energy);
}

/**
 * Move to the next round
 */
function moveToNextRound() {
    total_energy += NEXT_ROUND_ENERGY;
    current_round++;
    setEnergyCount(total_energy);
    setRoundCount(current_round);
    $.notify('Round: ' + current_round, {
        autoHide: true,
        autoHideDelay: '2000',
        className: 'info',
        position: 'bottom right'
    });
}

/**
 * Reset round
 */
function resetEnergy() {
    Swal.fire({
        title: 'Are you sure?',
        text: "Will reset the current round information",
        iconHtml: '<img src="./assets/images/slp_width.jpg" width="auto" height="120">',
        customClass: {
            icon: 'no-border'
        },
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#c82333',
        confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
        if (result.isConfirmed) {
            total_energy = ORIGINAL_ENERGY;
            current_round = ORIGINAL_ROUND;
            setEnergyCount(total_energy);
            setRoundCount(current_round);
            $.notify('Reset success', {
                autoHide: true,
                autoHideDelay: '2000',
                className: 'success',
                position: 'bottom right'
            });
        }
    })

}