const MFR = {
  'A': "American Home Food Products",
  'G': "General Mills",
  'K': "Kelloggs",
  'N': "Nabisco",
  'P': "Post",
  'Q': "Quaker Oats",
  'R': "Ralston Purina"
}

const TYPE = {
  'C': "Cold",
  'H': "Hot"
}
const cerealDL = document.getElementById("cerealsList");
const chosenCereal = document.getElementById("dropdown");
const stats = document.getElementById("stats")

d3.csv("./cereal.csv")
  .then(d => {

    const MAX = {
      "calories": 0,
      "carbo": 0,
      "fat": 0,
      "fiber": 0,
      "protein": 0,
      "rating": 0,
      "sugars": 0,
      "sodium": 0
    }

    // Define the bar height and its spacing and text offset
    const BAR_HEIGHT = 40;
    const BAR_SPACING = 85;
    const TEXT_OFFSET = 18;

    // Fill in cereal names
    d.forEach(c => {
      for (const key in MAX) {
        if (MAX[key] < parseInt(c[key])) {
          MAX[key] = parseInt(c[key])
        } 
      }
      cerealDL.innerHTML += `<option value="${c.name}">`
    })


    chosenCereal.addEventListener("input", e => {
      stats.innerHTML = ""
      const chosenCerealName = chosenCereal.value
      d.forEach(item => {
        if (item.name === chosenCerealName) {
          const mappedItem = []
          const maxKeys = Object.keys(MAX)
          maxKeys.forEach(k => mappedItem.push(parseInt(item[k])))
          const maxValues = Object.values(MAX)

          // selected item
          d3.select('svg#stats')
            .selectAll('rect')
            .data(mappedItem)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('height', BAR_HEIGHT)
            .attr('y', (val, idx) => idx * BAR_SPACING)
            .attr('width', (val, idx) => val * 10)
            .attr('fill', 'rgba(217, 113, 113, 0.3)');

          // add labels
          d3.select('svg#stats')
            .selectAll('text')
            .data(maxKeys)
            .enter()
            .append('text')
            .attr('x', 0)
            .attr('y', (val, idx) => idx * BAR_SPACING + BAR_HEIGHT + TEXT_OFFSET)
            .attr('color', 'black')
            .attr('font-size', '18px')
            .text((val, idx) => `${val}: ${item[maxKeys[idx]]}`);

          // MAX item
          d3.select('svg#stats')
            .selectAll('rect#diffs')
            .data(maxValues)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('height', BAR_HEIGHT)
            .attr('y', (val, idx) => idx * BAR_SPACING)
            .attr('width', (val, idx) => val * 10)
            .attr('fill', 'rgba(217, 150, 113, 0.3)');
        }
      })
    })
  })

