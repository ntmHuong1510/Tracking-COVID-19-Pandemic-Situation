// let formattedData: any = [];
// payloadCompare.forEach((country: any) => {
//   let tempData = {
//     country: country.country,
//     timeline: [],
//   };

//   Object.keys(country.timeline.cases).forEach((key) => {
//     const formattedDate = formatDate(key);
//     tempData.timeline.push({
//       //@ts-ignore
//       date: d3.timeParse("%Y-%m-%d")(formattedDate),
//       //@ts-ignore
//       cases: country.timeline.cases[key],
//       //@ts-ignore
//       deaths: country.timeline.deaths[key],
//     });
//   });

//   formattedData.push(tempData);
// });
// console.log(formattedData);
