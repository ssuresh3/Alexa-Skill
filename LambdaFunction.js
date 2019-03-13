var https = require('https')

exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`)
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to Change for Change! Please state your request.", true), {}
                    )
                )
                break;

            case "IntentRequest":

                switch (event.request.intent.name) {

                    case "MoneyRaised":
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                // var data = JSON.parse(body)
                                // var subscriberCount = data.items[0].statistics.subscriberCount
                                context.succeed(
                                    generateResponse(
                                        // buildSpeechletResponse(`The amount of money you have raised is ${subscriberCount}`, true),
                                        {}
                                    )
                                )
                            })
                        })
                        break;

                    case "Welcome":
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                // var data = JSON.parse(body)
                                // var viewCount = data.items[0].statistics.viewCount
                                context.succeed(
                                    generateResponse(
                                        // buildSpeechletResponse(`Sure, here is a question you can answer, ...`, true),
                                        {}
                                    )
                                )
                            })
                        })
                        break;

                    case "Goodbye":
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`Ok, thank you for using Change for Change!`, true), {}
                                    )
                                )
                            })
                        })
                        break;

                    case "response":
                        const slots = event.request.intent.slots;
                        const answer = slots['ans'].value;
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`You said: ${answer}. Your answer has been recorded`, true), {}
                            )
                        )
                        break;

                    case "DonatingTo":
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                // var data = JSON.parse(body)
                                // var subscriberCount = data.items[0].statistics.subscriberCount
                                context.succeed(
                                    generateResponse(
                                        // buildSpeechletResponse(`You will be donating to...`, true),
                                        {}
                                    )
                                )
                            })
                        })
                        break;

                    case "SurveysCompleted":
                        var endpoint = "https://us-central1-cruzhacks-5f76c.cloudfunctions.net/getUserAmount" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                var data = JSON.parse(body)
                                var userAmount = data.questionsAns
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`You have completed ${userAmount} surveys.`, true), {}
                                    )
                                )
                            })
                        })
                        break;

                    case "GiveSurvey":
                        var endpoint = "https://us-central1-cruzhacks-5f76c.cloudfunctions.net/getQuestion" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                var data = JSON.parse(body)
                                var question = data.question
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`Sure, here is a question: ${question}`, true), {}
                                    )
                                )
                            })
                        })
                        break;

                    case "MoneyRaisedSinceDate":
                        console.log(event.request.intent.slots.SinceDate.value)
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                // var data = JSON.parse(body)
                                // var viewCount = data.items[0].statistics.viewCount
                                context.succeed(
                                    generateResponse(
                                        // buildSpeechletResponse(`The money raised since said date is ${viewCount}`, true),
                                        {}
                                    )
                                )
                            })
                        })
                        break;

                    case "SurveysCompletedSinceDate":
                        console.log(event.request.intent.slots.SinceDate.value)
                        var endpoint = "" // ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                // var data = JSON.parse(body)
                                // var viewCount = data.items[0].statistics.viewCount
                                context.succeed(
                                    generateResponse(
                                        // buildSpeechletResponse(`The surveys completed since said date is ${viewCount}`, true),
                                        {}
                                    )
                                )
                            })
                        })
                        break;

                    default:
                        throw "Invalid intent"
                }

                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`)
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

        }

    }
    catch (error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}
