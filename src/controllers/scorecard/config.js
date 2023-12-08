module.exports = {
    allowedUsers: [271, 342, 387, 60, 617, 236, 596, 295, 53, 186, 384, 331, 71, 100, 75, 69, 1124, 263, 3408, 280, 3261, 3516, 4709, 1339],
    questions : [
        {
            id : "1",
            value : "Were you happy about this week's contributions?",
            helptext : "Contributions include projects, engaging in events & workshops, helping others, even ideas",
            emoji : "left",
            type : "range",
            from : "Unhappy",
            to : "Very Much Happy",
            input_id : "clarityslider"
        },
        {
            id : "2",
            value : "How happy are you feeling with the efforts you put in this week?",
            helptext : "Celebrating efforts is more important than celebrating results",
            emoji : "right",
            type : "range",
            from : "Not great",
            to : "Great",
            input_id : "targetCloseness"
        },
        {
            id : "3",
            value : "Were you satisfied with yourself?",
            helptext : "You were able to contribute as per you planned or even went beyond",
            emoji : "left",
            type : "range",
            from : "Unsatisfied",
            to : "Very much satisfied",
            input_id : "happinessSlider"
        },
        {
            id : "4",
            value : "Which moment of this week, cheers you up?",
            helptext : " Understanding about the bigger picture we are going to create and contribute to!",
            type : "text",
            input_id : "weekMoment"
        },
        {
            id : "5",
            value : "How much you enjoyed your work?",
            emoji : "right",
            type : "range",
            from : "Not at all",
            to : "Enjoyed a lot",
            input_id : "enjoymentslider"
        },
        {
            id : "6",
            value : "Were you able to get help that you wanted?",
            emoji : "left",
            type : "range",
            from : "No",
            to : "Yes at the right time",
            input_id : "helpslider"
        },
        {
            id : "7",
            value : "How often were you able to put forth your ideas?",
            emoji : "right",
            type : "range",
            from : "Rarely",
            to : "Very Often",
            input_id : "ideationslider"
        },
        {
            id : "8",
            value : "Whom would you like to appreciate this week? Why?",
            type : "text",
            input_id : "appreciation"

        },
        {
            id : "9",
            value : "Did you come across any problem statements this week?",
            type : "options",
            options : [
                {
                    id : "Yes_1",
                    name : "Yes",
                    value : "Yes"
                },
                {
                    id : "No_2",
                    name : "No",
                    value : "No"
                }
            ],

        },
        {
            id : "10",
            value : "You may reflect on the problems you faced this week and feel free to share them with us.",
            type : "text",
            input_id : "overwhelmed"

        }
    ]
}
