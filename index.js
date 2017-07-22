const Alexa = require("alexa-sdk");
const eslint = require("./src/eslint");

const states = {
    STARTMODE: "_STARTMODE", // Prompt the user to start or restart the game.
    ASKMODE: "_ASKMODE", // Alexa is asking user the questions.
};

const welcomeMessage = "Welcome to ESLint rule finder, are you ready to play?";
const repeatWelcomeMessage = "Say yes to start or no to quit.";
const promptToStartMessage = "Say yes to continue, or no to end.";
const helpMessage = "I will ask you some questions that will identify which rule you should use. Want to start now?";
const goodbyeMessage = "Ok, see you next time!";
const askRuleDescription = "Give an attribute you are looking for in a rule";
const askAgainRuleDescription = "Give another attribute you are looking for in a rule";

const errorCodes = [
    "ER_SUCCESS_MATCH",
    "ER_SUCCESS_NO_MATCH",
    "ER_ERROR_TIMEOUT",
    "ER_ERROR_EXCEPTION"
];

// --------------- Handlers -----------------------

const commonHandlers = {
    "AMAZON.NoIntent": function () {
        // Handle No intent.
        this.emit(":tell", goodbyeMessage);
    },
    "AMAZON.StopIntent": function () {
        this.emit(":tell", goodbyeMessage);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", goodbyeMessage);
    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = states.STARTMODE;
        this.emit(":ask", promptToStartMessage, promptToStartMessage);
    },
    "AMAZON.HelpIntent": function () {
        this.handler.state = states.STARTMODE;
        this.emit(":ask", helpMessage, helpMessage);
    },
    Unhandled() {
        console.log("***************************  unhandled  **********************************************");
        this.emit(":ask", promptToStartMessage, promptToStartMessage);
    }
};

const newSessionHandler = Object.assign({}, commonHandlers, {
    LaunchRequest() {
        console.log("***************************  1  **********************************************");
        this.handler.state = states.STARTMODE;
        this.attributes.descriptions = [];
        this.emit(":ask", welcomeMessage, repeatWelcomeMessage);
    }
});

const startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, Object.assign({}, commonHandlers, {
    "AMAZON.YesIntent": function () {
        console.log("***************************  2  **********************************************");
        this.handler.state = states.ASKMODE;
        this.emit(":ask", askRuleDescription, askRuleDescription);
    }
}));

const askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, Object.assign({}, commonHandlers, {
    RuleIntent() {
        console.log("***************************  RuleIntent  **********************************************");
        console.log(this.event.request.intent.slots.Description.value);
        console.log(this.event.request.intent.slots.Description.resolutions.resolutionsPerAuthority);

        const value = this.event.request.intent.slots.Description.value;

        if (typeof value === "string" && value !== "") {
            this.attributes.descriptions.push(value);
        }

        if (this.attributes.descriptions.length < 3) {
            this.emit(":ask", askAgainRuleDescription, askAgainRuleDescription);
        } else {
            const ruleFound = eslint.ruleFinder(this.attributes.descriptions);

            console.log(this.attributes.descriptions);
            console.log(ruleFound);
            this.emit(":tell", `You want to use ${ruleFound} rule`);
        }
    }
}));

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);

    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers);
    alexa.execute();
};
