import {ChatUI} from "./UIElements/ChatUI";
import {ChatViewState} from "./ViewStates/Chat";

export class UIController {
    constructor(game, inputController) {
        this.game = game;
        this.inputController = inputController;
        this.activeViewState = null;
        this.activeKeyMap = null;

        this.uiElements = {
            chatUI: new ChatUI(),
        };

        this.viewStates = {
            chat: new ChatViewState(game, this, inputController),
        };
    }

    async changeViewState(viewState) {
        console.log('current:' + (this.activeViewState ? this.activeViewState.constructor.name : "null") + ' new:' + ((viewState) ? viewState.constructor.name : "null"));

        if (this.activeViewState) {
            await this.activeViewState.disable();
        }

        if (viewState) {
            if (!viewState.isSetup) {
                await viewState.setup();
                viewState.isSetup = true;
            }
            await viewState.enable();
        }
        this.activeViewState = viewState;
    }

}