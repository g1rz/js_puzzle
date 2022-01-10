const widthOfOnePiece = 50;
const heightOfOnePiece = 50;
const numColsToCut = 9;
const numRowsToCut = 6;

let image = new Image();
image.src = 'puzzle.jpg';
image.onload = init;


function init() {

    let puzzleItems = getImagePieces();

    const $puzzleHash = document.getElementById('puzzle_hash');

    puzzleItems = puzzleItems.map(image => {
        let piece = document.createElement('img');
        piece.classList.add('puzzle__item');
        piece.src = image.src;
        piece.setAttribute('data-x', image.x);
        piece.setAttribute('data-y', image.y);
        piece.setAttribute('draggable', true);

        return piece;
    });

    shuffle(puzzleItems);

    puzzleItems.forEach(image => {
        $puzzleHash.append(image)
    })
}


// нарезает исходное изображение на массив объектов картинок для пазла, 
// где src - часть изображения, x и y - координаты пазла
function getImagePieces() {
    let imagePieces = [];

    for (let y = 0; y < numRowsToCut; y++) {
        for (let x = 0; x < numColsToCut; x++) {
            let canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            let context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, widthOfOnePiece, heightOfOnePiece);

            imagePieces.push({
                src: canvas.toDataURL(),
                x: x,
                y: y
            });
        }
    }
    return imagePieces;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}