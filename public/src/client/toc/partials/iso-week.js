// function getISOWeekNumber (date){
//     let fixeddate = new Date(date);
//     // Set the target date to Monday of the current week
//     let target = new Date(fixeddate.getTime());

//     target.setDate(target.getDate() - target.getDay() + 1);

//     // Get the year and week number of the target date
//     let year = target.getFullYear();
//     let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

//     // Adjust the week number if necessary (week 1 might belong to the previous year)
//     if (weekNumber === 0) {
//         year--;
//         weekNumber = getISOWeekNumber(new Date(year, 11, 31));
//     } else if (weekNumber > 52) {
//         year++;
//         weekNumber = 1;
//     }

//     // Return the year and week number as a string
//     return year + '-W' + weekNumber.toString().padStart(2, '0');
// }