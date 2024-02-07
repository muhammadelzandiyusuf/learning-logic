export const testCase1 = [[[9, 12], [14, 16]], [[10, 12], [15, 17]], [[11, 13], [16, 18]]];
export const testCase2 = [[8, 10], [12, 14], [9, 11]];

function generateCommonSlot(meetings) {
  let times = [];

  // Generate range for person
  meetings.forEach((person) => {
    person.forEach((item, position) => {
      if (item.length > 1) {
        item.forEach((number, index) => {
          const isMod = (index + 1) % 2;
          if (isMod !== 0) {
            const start = number;
            const end = item[index + 1];
            for (let i = start; i <= end; i++) {
                times.push(i);
            }
          }
        })
      } else {
        const isMod = (position + 1) % 2;
        if (isMod !== 0) {
          const start = item;
          const end = person[position + 1];
          for (let i = start; i <= end; i++) {
              times.push(i);
          }
        }
      }
    })
  })

  return times;
}

export default function findCommonSlot(meetings) {
  const data = generateCommonSlot(meetings);
  let finalResult = [];
  if (data) {
    let results = data.filter((item, index) => data.indexOf(item) !== index);
    if (results.length > 2) {
      results = results.filter((item, index) => results.indexOf(item) !== index);
    }
    results.forEach((item) => {
      const validate = data.filter((slot) => slot === item);
      if (validate?.length >= 3) {
        finalResult.push(item);
      }
    })
  }

  return finalResult;
}
