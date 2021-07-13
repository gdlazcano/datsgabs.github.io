const masonryLayout = (containerElem, itemsElems, columns) => {
    containerElem.classList.add('masonry-layout', `columns-${columns}`)
    let columnsElements = []
    
    for( let i = 1; i <= columns; i++){
        let column = document.createElement('div')
        column.classList.add('masonry-column', `column-${i}`)
        containerElem.appendChild(column)
        columnsElements.push(column)
    }
    
    for(let m = 0; m < Math.ceil(itemsElems.length / columns); m++){
        for(let n = 0; n < columns; n++){
            let item = itemsElems[ m * columns + n]
            if (item) {
                columnsElements[n].appendChild(item)
                item.classList.add('masonry-item')
            }
        }
    }
}


masonryLayout(document.querySelector('.listing'),
            document.querySelectorAll('.list-card'), 2)