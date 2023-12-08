const signOffReflectionQuestions = [
    {id: 1, question: 'Why did you apply for this Role?'},
    {id: 2, question: 'After this observation, why do you want to take up this Role?'},
    {id: 3, question: 'What do you wish to learn through this Internship/Fellowship?'},
    {id: 4, question: 'How does this help you with your career?'},
    {id: 5, question: 'Write any 3 learnings from your observation days.'},
];

const defaultWhatsAppGroupURL = 'https://chat.whatsapp.com/JKYMbtOu2d5AXgwSOWcOAf';
const defaultYoutubeVideoURL = 'https://www.youtube.com/watch?v=Bm4UVpUe74Y&t=1440s';

// module.exports = {
//     noVideoReflection: ['home', 'why-observation', 'explore','faqs'],
//     noObservation: ['introduction', 'reflections', 'explore', 'leaderboard', 'events','faqs'],
//     newObservation: ['introduction', 'reflections', 'explore', 'leaderboard', 'events','faqs'],
//     // newObservation: ['reflections', 'take-a-tour', 'explore', 'leaderboard', 'events'],
//     observation: ['introduction', 'explore', 'reflections', 'report', 'leaderboard', 'events','faqs'],
//     signOff: ['introduction', 'sign-off', 'explore', 'report', 'leaderboard', 'events','faqs'],
//     thankYou: ['introduction', 'thank-you', 'explore', 'report', 'leaderboard', 'events','faqs'],
//     administrator: ['explore', 'reflections', 'leaderboard', 'events', 'admin',],

//     signOffReflectionQuestions, defaultWhatsAppGroupURL, defaultYoutubeVideoURL
// }

module.exports = {
    noVideoReflection: ['home', 'why-observation', 'explore','faqs'],
    noObservation: ['introduction', 'reflections', 'explore', 'events','faqs'],
    newObservation: ['introduction', 'reflections', 'explore', 'events','faqs'],
    // newObservation: ['reflections', 'take-a-tour', 'explore', 'events'],
    observation: ['introduction', 'explore', 'reflections', 'report', 'events','faqs'],
    signOff: ['introduction', 'sign-off', 'explore', 'report', 'events','faqs'],
    thankYou: ['introduction', 'thank-you', 'explore', 'report', 'events','faqs'],
    administrator: ['explore', 'reflections', 'events', 'admin',],

    signOffReflectionQuestions, defaultWhatsAppGroupURL, defaultYoutubeVideoURL
}