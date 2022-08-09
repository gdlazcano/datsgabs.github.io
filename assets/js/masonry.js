const masonryLayout = (containerElem, itemsElems, columns) => {
  console.log(containerElem, itemsElems, columns);

  containerElem.classList.add("masonry-layout", `columns-${columns}`);
  let columnsElements = [];

  for (let i = 1; i <= columns; i++) {
    let column = document.createElement("ul");
    column.classList.add("masonry-column", `column-${i}`);
    containerElem.appendChild(column);
    columnsElements.push(column);
  }

  for (let m = 0; m < Math.ceil(itemsElems.length / columns); m++) {
    for (let n = 0; n < columns; n++) {
      let item = itemsElems[m * columns + n];
      if (item) {
        columnsElements[n].appendChild(item);
        item.classList.add("masonry-item");
      }
    }
  }
};

try {
  masonryLayout(
    document.querySelector(".list"),
    document.querySelectorAll(".list-card"),
    2
  );
} catch (error) {
  console.log(error);
}

try {
  masonryLayout(
    document.querySelector(".replies"),
    document.querySelectorAll(".reply"),
    2
  );
} catch (error) {
  console.log(error);
}
