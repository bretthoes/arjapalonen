$(function () {

    // Add all feather icons
    feather.replace();

    // Load paintings for each section
    paintings.forEach(loadPaintings);

    // 'Collapse' button functionality
    paintings.forEach(generateCollapseHandlers);

    // 'Load more' button functionality
    paintings.forEach(generateLoadMoreHandlers)

    // Lightbox functionality for all paintings
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
})

// Load paintings 
function loadPaintings(paintings) {
    var name = paintings.name;
    var category = paintings.category;
    $.each(paintings, function (i, e) {
        var id = paintings[i].id;
        var title = paintings[i].title;
        var filename = paintings[i].filename;
        var price = paintings[i].price;
        var painter = paintings[i].painter;
        var material = paintings[i].material;
        var height = paintings[i].height;
        var width = paintings[i].width;
        var frameHeight = paintings[i].frameHeight;
        var frameWidth = paintings[i].frameWidth;
        var sold = paintings[i].sold;

        // Track current row
        var rowNumber = Math.floor(i / PAINTINGS_PER_ROW)
        var row = $('<div class="row row' + category + ' row' + category + rowNumber + '"style="display:none;">')

        // Add new row
        if (i % PAINTINGS_PER_ROW == 0) {
            $("." + name).append(row)
        }

        // Check if framed or not
        var frameMessage = '';
        if (frameHeight && frameWidth) {
            frameMessage = frameHeight + ' x ' + frameWidth + ' FR';
        } else {
            frameMessage = 'Unframed';
        }

        // Check if painting is sold to update display
        if (sold) {
            price = "<strike>" + price + "</strike><span style='color:red;font-style:none;'>&nbsp;- SOLD</span>";
        }

        switch (category) {
            case 'misc':
                $(".row" + category + rowNumber).append(
                    '<div class="col-sm-12 col-md-4 painting-container"><figure><a data-toggle="lightbox" href="img/paintings/' +
                    category + '/' + filename + '" class="painting-link">' +
                    '<img class="painting" src="img/paintings/' + category + '/' + filename + '" loading="lazy" alt="' + title +
                    '"><div class="middle"><div class="text">Preview</div></div></a><figcaption class="caption">"' + title +
                    '"&nbsp;&nbsp;&#183;&nbsp;&nbsp;' + price + '<br />' + painter + '<br />' + material + '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' + height + ' x ' + width +
                    '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' +
                    frameMessage + '</figcaption></figure>')
                break;
            default:
                $(".row" + category + rowNumber).append(
                    '<div class="col-sm-12 col-md-4 painting-container"><figure><a data-toggle="lightbox" href="img/paintings/' +
                    category + '/' + filename + '" class="painting-link">' +
                    '<img class="painting" src="img/paintings/' + category + '/' + filename + '" loading="lazy" alt="' + title +
                    '"><div class="middle"><div class="text">Preview</div></div></a><figcaption class="caption">"' + title +
                    '"<br />' + price + '<br />' + material + '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' + height + ' x ' + width +
                    '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' +
                    frameMessage + '</figcaption></figure>')
                break;
        }

        // End row
        if (i % PAINTINGS_PER_ROW == PAINTINGS_PER_ROW - 1) {
            $("." + name).append('</div>')
        } else if (i = paintings.length - 1) {
            $("." + name).append('</div>')
        }
    })
    // Add load more button at end of content
    $("." + paintings.name).append('<a href="#" id="load-more-' + paintings.category +
        '" class="load-more">LOAD MORE (' + (INITIAL_ROWS_SHOWN * PAINTINGS_PER_ROW) + ' of ' + paintings.length + ')</a>')

}

// Functionality for collapsing painting sections
function generateCollapseHandlers(item, index) {
    $(document).on('shown.bs.collapse', '.' + item.name, function (e) {
        $(':parent h2 button .collapse-button-' + item.category).toggle();
    });

    $(document).on('hidden.bs.collapse', '.' + item.name, function (e) {
        $(':parent h2 button .collapse-button-' + item.category).toggle();
    });
}

// Functionality for 'load more' button in painting sections
function generateLoadMoreHandlers(item, index) {
    $(".row" + item.category).slice(0, ROWS_SHOWN_PER_LOAD).show();
    $("#load-more-" + item.category).on('click', function (e) {
        e.preventDefault();
        $("#load-more-" + item.category).html('LOAD MORE (' +
            ((($(".row" + item.category).length - $(".row" + item.category + ":hidden").length) * PAINTINGS_PER_ROW) + 6) +
            ' of ' + item.length + ')');
        $(".row" + item.category + ":hidden").slice(0, ROWS_SHOWN_PER_LOAD).slideDown();
        if ($(".row" + item.category + ":hidden").length == 0) {
            $("#load-more-" + item.category).fadeOut('slow');
        }
    });
}


// Declared constants
const PAINTINGS_PER_ROW = 3;
const INITIAL_ROWS_SHOWN = 2;
const ROWS_SHOWN_PER_LOAD = 2;

// Declare and populate arrays of paintings
const arjasPaintings = [{
        id: 1,
        title: "Cabin in the Laurentians",
        filename: "(A-1) CABIN IN THE LAURENTIANS 20X24, OIL $750 FR 26X30.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 24,
        frameHeight: 26,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 2,
        title: "Fall Reflections",
        filename: "(A-2) FALL REFLECTIONS 18X24, OIL $750 24X30 FR.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 3,
        title: "Fall Birches",
        filename: "(A-3) FALL BIRCHES 16X20, OIL $650 22X26 FR.jpg",
        price: "$650.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 4,
        title: "First Snowfall",
        filename: "(A-4) FIRST SNOWFALL 18X24, OIL $925 22X28 F.jpg",
        price: "$925.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 22,
        frameWidth: 28,
        sold: 0
    },
    {
        id: 5,
        title: "Lilies & Mums",
        filename: "(A-5) LILIES _ MUMS 24X20, OIL $850 30X26 F.jpg",
        price: "$850.00",
        painter: "Arja",
        material: "Oil",
        height: 24,
        width: 20,
        frameHeight: 30,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 6,
        title: "Queensboro Church",
        filename: "(A-6) QUEENSBORO CHURCH 18X24, OIL $750 FR 24X30.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 7,
        title: "Serenity",
        filename: "(A-7) SERENITY 20X24, OIL $750 FR 26X30.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 24,
        frameHeight: 26,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 8,
        title: "Fall's Glory",
        filename: "(A-8) FALL_S GLORY 18X24,OIL $750 24X30 F.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 9,
        title: "Lakeside Boulders",
        filename: "(A-9) LAKESIDE BOULDERS 18X24, OIL $750 FR 26X32.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 26,
        frameWidth: 32,
        sold: 0
    },
    {
        id: 10,
        title: "Quiet River Bend",
        filename: "(A-10) QUIET RIVER BEND 18X24, OIL $750 24X30 FR.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 11,
        title: "Quiet Summer Day",
        filename: "(A-11) QUIET SUMMER DAY 16X20, OIL $625 22X26 FRAMED.jpg",
        price: "$625.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 12,
        title: "Rock Reflections Algonquin Park",
        filename: "(A-12) ROCK REFLECTIONS ALGONQUIN PARK 16X20, OIL $675 22X26 FR.jpg",
        price: "$675.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 13,
        title: "Skootamata Rapids at Fall",
        filename: "(A-13) SKOOTAMATA RAPIDS AT FALL 16X20, OIL $650 22X26 FR.jpg",
        price: "$650.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 14,
        title: "Spring Thaw",
        filename: "(A-14) SPRING THAW 20X16,OIL $675 26X22 FR (2).jpg",
        price: "$675.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 16,
        frameHeight: 26,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 15,
        title: "Summer Boquet",
        filename: "(A-15) SUMMER BOQUET 20X16, OIL $725 26X22 FR.jpg",
        price: "$725.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 16,
        frameHeight: 26,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 16,
        title: "Twin Pines",
        filename: "(A-16) TWIN PINES 18X24, OIL $750 24X30 FR.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 17,
        title: "Summer's Gone",
        filename: "(A-17) SUMMER_S GONE 24X18, OIL $750 30X24 FR.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 24,
        width: 18,
        frameHeight: 30,
        frameWidth: 24,
        sold: 0
    },
    {
        id: 18,
        title: "Walk through the Woods",
        filename: "(A-18) WALK THROUGH THE WOODS 18X24,OIL $700 24X30 F.jpg",
        price: "$700.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 19,
        title: "Working Team",
        filename: "(A-19) WORKING TEAM 18X24, OIL $750 FR 24X30.jpg",
        price: "$750.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 20,
        title: "Flaming Maples",
        filename: "(A-20)FLAMING MAPLES, OIL 16X20 $600  22X26 F (2).jpg",
        price: "$600.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 21,
        title: "Billowing Sails",
        filename: "(A-21) BILLOWING SAILS 16X20, OIL $475 22X26 FR.jpg",
        price: "$475.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 1
    },
    {
        id: 22,
        title: "Bunch of Summer Flowers",
        filename: "(A-22) BUNCH OF SUMMER FLOWERS, OIL 20X16 $675 26X22 F (2).jpg",
        price: "$675.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 16,
        frameHeight: 26,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 23,
        title: "Lady in Blue",
        filename: "(A-23) LADY IN BLUE 20X24, OIL $500 26X30 FR.jpg",
        price: "$500.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 24,
        frameHeight: 26,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 24,
        title: "Lazy Afternoon Lake Couchicing",
        filename: "(A-24) LAZY AFTERNOON LAKE COUCHICING 16X20, OIL $650 22X26 FR.jpg",
        price: "$650.00",
        painter: "Arja",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 25,
        title: "Path to the Woods",
        filename: "(A-25) PATH TO THE WOODS 12X16, OIL $475M 16X22 FRAMED.jpg",
        price: "$475.00",
        painter: "Arja",
        material: "Oil",
        height: 12,
        width: 16,
        frameHeight: 16,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 26,
        title: "Tall & Majestic",
        filename: "(A-26) TALL _ MAJESTIC 24X18, OIL $775 30X24 F.jpg",
        price: "$775.00",
        painter: "Arja",
        material: "Oil",
        height: 24,
        width: 18,
        frameHeight: 30,
        frameWidth: 24,
        sold: 0
    },
    {
        id: 27,
        title: "Winding Stream",
        filename: "(A-27) WINDING STREAM 18X24, OIL $850 FR 24X30.jpg",
        price: "$850.00",
        painter: "Arja",
        material: "Oil",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 28,
        title: "In Algonquin Park",
        filename: "(A-28) IN ALGONQUIN PARK 24X30, OIL $975 FR 30X36.jpg",
        price: "$975.00",
        painter: "Arja",
        material: "Oil",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 29,
        title: "Allan the Artist Posing",
        filename: "(A-29) ALLAN THE ARTIST POSING 20X16, OIL $525 FR 26X22.jpg",
        price: "$525.00",
        painter: "Arja",
        material: "Oil",
        height: 20,
        width: 16,
        frameHeight: 26,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 30,
        title: "Floral Display",
        filename: "(A-30) FLORAL DISPLAY 10X14, WC $450 FR 16X20.jpg",
        price: "$450.00",
        painter: "Arja",
        material: "Oil",
        height: 10,
        width: 14,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 31,
        title: "Relaxing by Reading",
        filename: "(A-31) RELAXING BY READING 14X10, PASTEL $275 21X17  CANNOT SHIP GLASS.jpg",
        price: "$275.00",
        painter: "Arja",
        material: "Oil",
        height: 14,
        width: 10,
        frameHeight: 21,
        frameWidth: 17,
        sold: 0
    }
]
arjasPaintings.name = 'arjasPaintings';
arjasPaintings.category = 'arja';

const joesPaintings = [{
        id: 0,
        title: "The Bridge",
        filename: "(J-0) THE BRIDGE 22X28, ACRYLIC $900 28X34 FR.jpg",
        price: "$900.00",
        painter: "Joe",
        material: "Acrylic",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 1,
        title: "Black Rain",
        filename: "(J-1) BLACK RAIN 33X40, ACRYLIC $1,250 FR 39X46.jpg",
        price: "$1,250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 33,
        width: 40,
        frameHeight: 39,
        frameWidth: 46,
        sold: 0
    },
    {
        id: 2,
        title: "Blue Boxes",
        filename: "(J-2) BLUE BOXES 14X18, ACRYLIC $375 20X24 FR.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 18,
        frameHeight: 20,
        frameWidth: 24,
        sold: 0
    },
    {
        id: 3,
        title: "Focal Point",
        filename: "(J-3) FOCAL POINT 14X11, ACRYLIC $275 18X15 FR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 11,
        frameHeight: 18,
        frameWidth: 15,
        sold: 0
    },
    {
        id: 4,
        title: "Evening Shades",
        filename: "(J-4) EVENING SHADES 12X16, ACRYLIC $195 FR.jpg",
        price: "$195.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 16,
        frameHeight: 12,
        frameWidth: 16,
        sold: 0
    },
    {
        id: 5,
        title: "Ice Melt",
        filename: "(J-5) ICE MELT 23X31,  ACRYLIC $375 UF.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 23,
        width: 31,
        sold: 0
    },
    {
        id: 6,
        title: "Old Fence Post",
        filename: "(J-6) OLD FENCE POST 31X23, ACRYLIC $375 UF.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 31,
        width: 23,
        sold: 0
    },
    {
        id: 7,
        title: "Star Wars",
        filename: "(J-7) STAR WARS 24X36, ACRYLIC $1,200.jpg",
        price: "$1,200.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 36,
        frameHeight: 24,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 8,
        title: "Ski Run",
        filename: "(J-8) SKI RUN 16X20, ACRYLIC $225 FR.jpg",
        price: "$225.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 9,
        title: "Shades of Colour",
        filename: "(J-9) SHADES OF COLOUR 24X36,ACRYLIC $850 30X42 FR.jpg",
        price: "$850.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 36,
        frameHeight: 30,
        frameWidth: 42,
        sold: 0
    },
    {
        id: 10,
        title: "2nd Floor Going Up!",
        filename: "(J-10) 2ND FLOOR GOING UP! 36X48, ACRYLIC $1,250 UF.jpg",
        price: "$1,250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 36,
        width: 48,
        sold: 0
    },
    {
        id: 11,
        title: "Black Separations",
        filename: "(J-11) BLACK SEPERATIONS 18X24, ACRYLIC $500 24X30 FR.jpg",
        price: "$500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 12,
        title: "Colorful Mix",
        filename: "(J-12) COLORFUL MIX 12X9, ACRYLIC $225 FR.jpg",
        price: "$225.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 9,
        frameHeight: 12,
        frameWidth: 9,
        sold: 0
    },
    {
        id: 13,
        title: "Igloo",
        filename: "(J-13) IGLOO 20X16, ACRYLIC $250 UF.jpg",
        price: "$250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 26,
        sold: 0
    },
    {
        id: 14,
        title: "Colorful Bricks",
        filename: "(J-14) COLOURFUL BRICKS 24X30, ACRYLIC $650 30X36 FR.jpg",
        price: "$650.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 15,
        title: "Diamond Ring",
        filename: "(J-15) DIAMOND RING 20X16, ACRYLIC $275 UF.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        sold: 0
    },
    {
        id: 16,
        title: "Foundations",
        filename: "(J-16) FOUNDATIONS 30X36, ACRYLIC $1,150 36X42 FR PAGE 21 MY BOOK.jpg",
        price: "$1,250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 36,
        frameHeight: 36,
        frameWidth: 42,
        sold: 0
    },
    {
        id: 17,
        title: "Glittering Formations",
        filename: "(J-17) GLITTERING FORMATIONS 30X38, ACRYLIC $850 36X44 FR.jpg",
        price: "$850.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 38,
        frameHeight: 36,
        frameWidth: 44,
        sold: 0
    },
    {
        id: 18,
        title: "Antique Store",
        filename: "(J-18) ANTIQUE STORE 30X36, ACRYLIC $1,250 36X42 FR.jpg",
        price: "$1,250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 36,
        frameHeight: 36,
        frameWidth: 42,
        sold: 0
    },
    {
        id: 19,
        title: "Brick Collage",
        filename: "(J-19) BRICK COLLAGE 14X11, ACRYLIC $275 UF.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 11,
        sold: 0
    },
    {
        id: 20,
        title: "Arrowhead",
        filename: "(J-20) ARROWHEAD 12X10, ACRYLIC $250 18X16 FR.jpg",
        price: "$850.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 10,
        frameHeight: 18,
        frameWidth: 16,
        sold: 0
    },
    {
        id: 21,
        title: "Seventeen",
        filename: "(J-21) SEVENTEEN 30X38, ACRYLIC $975 38X46 FR.jpg",
        price: "$975.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 38,
        frameHeight: 38,
        frameWidth: 46,
        sold: 0
    },
    {
        id: 22,
        title: "Mexican Fiesta",
        filename: "(J-22)MEXICAN FIESTA 36X30, ACRYLIC $1,250 48X42 FRAMED.jpg",
        price: "$1,250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 36,
        width: 30,
        frameHeight: 48,
        frameWidth: 42,
        sold: 0
    },
    {
        id: 23,
        title: "Waterfalls",
        filename: "(J-23) WATERFALLS 18X14, ACRYLIC $275 FR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 14,
        frameHeight: 18,
        frameWidth: 14,
        sold: 0
    },
    {
        id: 24,
        title: "Up, Up and Away",
        filename: "(J-24) UP, UP AND AWAY 23X31, ACRYLIC $375 UF.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 23,
        width: 31,
        sold: 0
    },
    {
        id: 25,
        title: "Sea Creature",
        filename: "(J-25) SEA CREATURE 23X31, ACRYLIC $375 UNFR.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 23,
        width: 31,
        sold: 0
    },
    {
        id: 26,
        title: "Rhapsody in B Flat",
        filename: "(J-26) RHAPSODY IN B FLAT 47X31, ACRYLIC $1,150.jpg",
        price: "$1,150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 47,
        width: 31,
        sold: 0
    },
    {
        id: 27,
        title: "Red Hat",
        filename: "(J-27) RED HAT 16X20, ACRYLIC $325 FR.jpg",
        price: "$325.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 28,
        title: "Red Yellow Cones",
        filename: "(J-28) RED _ YELLOW CONES 14X18, ACRYLIC $375 19X23 FR.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 18,
        frameHeight: 19,
        frameWidth: 23,
        sold: 0
    },
    {
        id: 29,
        title: "Razzel Dazze",
        filename: "(J-29) RAZZEL DAZZLE 16X20, ACRYLIC $275 FR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 30,
        title: "Playing Around",
        filename: "(J-30) PLAYING AROUND 24X18, ACRYLIC $450 29X23 F.jpg",
        price: "$450.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 18,
        frameHeight: 29,
        frameWidth: 23,
        sold: 0
    },
    {
        id: 31,
        title: "Pieces",
        filename: "(J-31) PIECES 14X11, ACRYLIC $175 FR.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 11,
        frameHeight: 14,
        frameWidth: 21,
        sold: 0
    },
    {
        id: 32,
        title: "Pathway",
        filename: "(J-32) PATHWAY 18X24, ACRYLIC $300 NO FR.jpg",
        price: "$300.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        sold: 0
    },
    {
        id: 33,
        title: "Internal Organs",
        filename: "(J-33) INTERNAL ORGANS 20X16, ACRYLIC $395 FR 26X22.jpg",
        price: "$395.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        frameHeight: 26,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 34,
        title: "It's not a wall but a fence",
        filename: "(J-34) IT_S NOT A WALL BUT A FENCE 24X30, ACRYLIC $525 30X36 FR.jpg",
        price: "$525.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 35,
        title: "Mixed Emotions",
        filename: "(J-35) MIXED EMOTIONS 18X24, ACRYLIC $500 24X30 FR.jpg",
        price: "$500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 36,
        title: "Paraphernalia",
        filename: "(J-36) PARAPHERNALIA 12X16, ACRYLIC $245 17X21 FR.jpg",
        price: "$245.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 16,
        frameHeight: 17,
        frameWidth: 21,
        sold: 0
    },
    {
        id: 37,
        title: "Outerspace",
        filename: "(J-37) OUTERSPACE 20X16, ACRYLIC $275 UF.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        sold: 0
    },
    {
        id: 38,
        title: "Orange Key",
        filename: "(J-38) ORANGE KEY 20X16, ACRYLIC $325 FR.jpg",
        price: "$325.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        frameHeight: 20,
        frameWidth: 16,
        sold: 0
    },
    {
        id: 39,
        title: "Mystical Pooch",
        filename: "(J-39) MYSTICAL POOCH 32X48, ACRYLIC $850 UF.jpg",
        price: "$850.00",
        painter: "Joe",
        material: "Acrylic",
        height: 32,
        width: 48,
        sold: 0
    },
    {
        id: 40,
        title: "Musical Beat",
        filename: "(J-40) MUSICAL BEAT 10X8, ACRYLIC $150 16X14 FR.jpg",
        price: "$150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 14,
        frameHeight: 16,
        frameWidth: 14,
        sold: 0
    },
    {
        id: 41,
        title: "Meeting Place",
        filename: "(J-41) MEETING PLACE 11X14, ACRYLIC $225 FR.jpg",
        price: "$225.00",
        painter: "Joe",
        material: "Acrylic",
        height: 11,
        width: 14,
        frameHeight: 11,
        frameWidth: 14,
        sold: 0
    },
    {
        id: 42,
        title: "Little Falls",
        filename: "(J-42) LITTLE FALLS 14X11, ACRYLIC $175 FR.jpg",
        price: "$175.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 11,
        frameHeight: 14,
        frameWidth: 11,
        sold: 0
    },
    {
        id: 43,
        title: "Keyhole Tumblers",
        filename: "(J-43) KEYHOLE TUMBLERS 31X23, ACRYLIC $425 UF.jpg",
        price: "$425.00",
        painter: "Joe",
        material: "Acrylic",
        height: 31,
        width: 23,
        sold: 0
    },
    {
        id: 44,
        title: "Up Throttle",
        filename: "(J-44) UP THROTTLE 30X24, ACRYLIC $475 UF.jpg",
        price: "$475.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 24,
        sold: 0
    },
    {
        id: 45,
        title: "Under the Dock",
        filename: "(J-45) UNDER THE DOCK 16X20, ACRYLIC $375 UN.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        sold: 0
    },
    {
        id: 46,
        title: "The Bridge",
        filename: "(J-46) THE BRIDGE 16X20, ACRYLIC $375 FR.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 47,
        title: "Take the A Train",
        filename: "(J-47) TAKE THE A TRAIN 16X20, ACRYLIC $225 20X24 FRAMED.jpg",
        price: "$225.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 24,
        frameHeight: 20,
        frameWidth: 24,
        sold: 0
    },
    {
        id: 48,
        title: "Wired-Up",
        filename: "(J-48)WIRED-UP 30X48, ACRYLIC $950 UF.jpg",
        price: "$950.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 48,
        sold: 0
    },
    {
        id: 49,
        title: "Colours under Glass",
        filename: "(J-49) COLOURS UNDER GLASS 14X40, ACRYLIC $850 FRAMED-NICE PIECE BUT CANNOT BE SHIPPED.jpg",
        price: "$850.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 40,
        frameHeight: 14,
        frameWidth: 40,
        sold: 0
    },
    {
        id: 50,
        title: "Conductor's Baton",
        filename: "(J-50) CONDUCTORS BATON 12X16, ACRYLIC $300 18X22 FRAMED.jpg",
        price: "$300.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 22,
        frameHeight: 18,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 51,
        title: "Rickity Bridge",
        filename: "(J-51) RICKITY BRIDGE 11X14, ACRYLIC $225 UF.jpg",
        price: "$225.00",
        painter: "Joe",
        material: "Acrylic",
        height: 11,
        width: 14,
        sold: 0
    },
    {
        id: 52,
        title: "Screened In",
        filename: "(J-52) SCREENED IN 16X20, ACRYLIC $325 FR.jpg",
        price: "$325.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 53,
        title: "Guess Who's Colours",
        filename: "(J-53) GUESS WHO_S COLOURS 12X16, ACRYLIC $265 17X21 FRAMED.jpg",
        price: "$265.00",
        painter: "Joe",
        material: "Acrylic",
        height: 17,
        width: 21,
        frameHeight: 17,
        frameWidth: 21,
        sold: 0
    },
    {
        id: 54,
        title: "I See You",
        filename: "(J-54) I SEE YOU 16X20, ACRYLIC $175 FR.jpg",
        price: "$175.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 55,
        title: "Elusive Garden",
        filename: "(J-55) ELUSIVE GARDEN 16X20, ACRYLIC $275 FR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 56,
        title: "Golden Sunflower",
        filename: "(J-56) GOLDEN SUNFLOWER 20X16, ACRYLIC $135 UF.jpg",
        price: "$135.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        sold: 0
    },
    {
        id: 57,
        title: "Lake Driftwood",
        filename: "(J-57) LAKE DRIFTWOOD 12X12, ACRYLIC $175 UF.jpg",
        price: "$175.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 12,
        sold: 0
    },
    {
        id: 58,
        title: "Lawn Chair",
        filename: "(J-58) LAWN CHAIR 10X8, ACRYLIC $120 12X10 FR.jpg",
        price: "$120.00",
        painter: "Joe",
        material: "Acrylic",
        height: 10,
        width: 8,
        frameHeight: 10,
        frameWidth: 8,
        sold: 0
    },
    {
        id: 59,
        title: "Dice Explosion",
        filename: "(J-59) DICE EXPLOSION 32X48 , ACRYLIC $900 UF.jpg",
        price: "$900.00",
        painter: "Joe",
        material: "Acrylic",
        height: 32,
        width: 48,
        sold: 0
    },
    {
        id: 60,
        title: "Intersecting Twizzlers",
        filename: "(J-60) INTERSECTING TWIZZLERS 23X31, ACRYLIC $375 UF.jpg",
        price: "$375.00",
        painter: "Joe",
        material: "Acrylic",
        height: 23,
        width: 31,
        sold: 0
    },
    {
        id: 61,
        title: "Streak of Red",
        filename: "(J-61) STREAK OF RED 16X20, ACRYLIC $275 UNFR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        sold: 0
    },
    {
        id: 62,
        title: "Summer Splash",
        filename: "(J-62) SUMMER SPLASH 7X10, ACRYLIC $100 9X12 FR.jpg",
        price: "$100.00",
        painter: "Joe",
        material: "Acrylic",
        height: 7,
        width: 10,
        frameHeight: 9,
        frameWidth: 12,
        sold: 0
    },
    {
        id: 63,
        title: "Sun God",
        filename: "(J-63) SUN GOD 8X10, ACRYLIC $125 12X14 FR.jpg",
        price: "$125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 8,
        width: 10,
        frameHeight: 12,
        frameWidth: 14,
        sold: 1
    },
    {
        id: 64,
        title: "The Cleff",
        filename: "(J-64) THE CLEFF 12X9, ACRYLIC $150 UF.jpg",
        price: "$150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 9,
        sold: 0
    },
    {
        id: 65,
        title: "Balancing Act",
        filename: "(J-65) BALANCING ACT 8X10, ACRYLIC $125 11X13 FR.jpg",
        price: "$125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 8,
        width: 10,
        frameHeight: 11,
        frameWidth: 13,
        sold: 0
    },
    {
        id: 66,
        title: "Deep Dive",
        filename: "(J-66) DEEP DIVE 12X12, ACRYLIC $150 UF.jpg",
        price: "$150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 12,
        sold: 0
    },
    {
        id: 67,
        title: "Do You See it!",
        filename: "(J-67) DO YOU SEE IT! 12X16, ACRYLIC $250 18X22 FR.jpg",
        price: "$250.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 16,
        frameHeight: 18,
        frameWidth: 22,
        sold: 0
    },
    {
        id: 68,
        title: "Dominican Flair",
        filename: "(J-68) DOMINICAN FLAIR 10X8, ACRYLIC $125 12X10 FR.jpg",
        price: "125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 10,
        width: 8,
        frameHeight: 12,
        frameWidth: 10,
        sold: 0
    },
    {
        id: 69,
        title: "Forest Edge",
        filename: "(J-69) FOREST EDGE 10X8, ACRYLIC $125 12X10 FR.jpg",
        price: "$125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 10,
        width: 8,
        frameHeight: 12,
        frameWidth: 10,
        sold: 0
    },
    {
        id: 70,
        title: "Mask on Bourbon St. New Orleans",
        filename: "(J-70) MASK ON BOURBON ST. NEW ORLEANS 14X11, ACRYLIC $150 UNFR.jpg",
        price: "$150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 14,
        width: 11,
        sold: 0
    },
    {
        id: 71,
        title: "New Life",
        filename: "(J-71) NEW LIFE 10X8, ACRYLIC $125 14X12 FR.jpg",
        price: "125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 10,
        width: 8,
        frameHeight: 14,
        frameWidth: 12,
        sold: 0
    },
    {
        id: 72,
        title: "Red Gusto I",
        filename: "(J-72) RED GUSTO I 12X12, ACRYLIC $150 UF.jpg",
        price: "$150.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 12,
        sold: 0
    },
    {
        id: 73,
        title: "Red Gusto II",
        filename: "(J-73) RED GUSTO II 12X12, ACRYLIC $110 UF.jpg",
        price: "$110.00",
        painter: "Joe",
        material: "Acrylic",
        height: 12,
        width: 12,
        sold: 0
    },
    {
        id: 74,
        title: "Revolution",
        filename: "(J-74) REVOLUTION 8X10, ACRYLIC $125 10X12 FR.jpg",
        price: "$125.00",
        painter: "Joe",
        material: "Acrylic",
        height: 8,
        width: 10,
        frameHeight: 10,
        frameWidth: 12,
        sold: 0
    },
    {
        id: 75,
        title: "Tin-N-Man",
        filename: "(J-75) TIN-N-MAN 24X30, ACRYLIC $2,500 30X36 FR COVER OF MY BOOK.jpg",
        price: "$2,500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 76,
        title: "Tin-N-Man and Friend",
        filename: "(J-76) TIN-N-MAN AND FRIEND 30X40, ACRYLIC $1,750 FR 36X46 PAGE 8.jpg",
        price: "$1,750.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 40,
        frameHeight: 36,
        frameWidth: 46,
        sold: 0
    },
    {
        id: 77,
        title: "Animal Kingdom",
        filename: "(J-77) ANIMAL KINGDOM 26X30, ACRYLIC $950 FR 32X36 PAGE 6 MY BOOK.jpg",
        price: "$950.00",
        painter: "Joe",
        material: "Acrylic",
        height: 26,
        width: 30,
        frameHeight: 32,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 78,
        title: "Waters Edge",
        filename: "(J-78) WATERS EDGE 18X24, ACRYLIC $600 24X30 FR.jpg",
        price: "$600.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 79,
        title: "The Old Stump",
        filename: "(J-79) THE OLD STUMP 18X24, ACRYLIC $500  24X30 FR.jpg",
        price: "$500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 80,
        title: "Tin Pin",
        filename: "(J-80) TIN PIN 16X20, ACRYLIC $500 22X26 F.jpg",
        price: "$500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 81,
        title: "Tin-Rin",
        filename: "(J-81) TIN-RIN 16X20, ACRYLIC $595 IN THE BOOK 19X23 F.jpg",
        price: "$595.00",
        painter: "Joe",
        material: "Acrylic",
        height: 16,
        width: 20,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 82,
        title: "Tin-N-Man on Phone",
        filename: "(J-82) TIN-N-MAN ON PHONE 20X16, ACRYLIC $350 UF.jpg",
        price: "$350.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 16,
        sold: 0
    },
    {
        id: 83,
        title: "Setting Sun",
        filename: "(J-83) SETTING SUN 30X38, ACRYLIC $650 36X44 FR.jpg",
        price: "$650.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 38,
        frameHeight: 36,
        frameWidth: 44,
        sold: 0
    },
    {
        id: 84,
        title: "Blue Box",
        filename: "(J-84) BLUE BOX 20X28, ACRYLIC $595 FR 29X37 CANNOT SHIP.jpg",
        price: "$595.00",
        painter: "Joe",
        material: "Acrylic",
        height: 20,
        width: 28,
        frameHeight: 29,
        frameWidth: 37,
        sold: 0
    },
    {
        id: 85,
        title: "Tin Mobile",
        filename: "(J-85) TIN MOBILE 18X24, ACRYLIC $500 FR 24X30.jpg",
        price: "$500.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 86,
        title: "Peaks and Valleys",
        filename: "(J-86) PEAKS AND VALLEYS 22X28, ACRYLIC $900 28X34 FR.jpg",
        price: "$900.00",
        painter: "Joe",
        material: "Acrylic",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 87,
        title: "Black Magic",
        filename: "(J-87) BLACK MAGIC 18X14, ABSTRACT $325 24X20 FR.jpg",
        price: "$325.00",
        painter: "Joe",
        material: "Abstract",
        height: 18,
        width: 14,
        frameHeight: 24,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 88,
        title: "Fire Pot",
        filename: "(J-88) FIRE POT 18X14, ACRYLIC $275 24X20 FR.jpg",
        price: "$275.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 14,
        frameHeight: 24,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 89,
        title: "Abstract Motivation",
        filename: "(J-89) ABSTRACT MOTIVATION 9X12,ABSTRACT $135 15X18 FR.jpg",
        price: "$135.00",
        painter: "Joe",
        material: "Abstract",
        height: 9,
        width: 12,
        frameHeight: 15,
        frameWidth: 18,
        sold: 0
    },
    {
        id: 90,
        title: "Peek-A-Boo",
        filename: "(J-90) PEEK-A-BOO 23X31, ABSTRACT $475 (UF).jpg",
        price: "$475.00",
        painter: "Joe",
        material: "Abstract",
        height: 23,
        width: 31,
        sold: 0
    },
    {
        id: 91,
        title: "The Fence Gate",
        filename: "(J-91) THE FENCE GATE 11X14, ACRYLIC $175 17X20 FR.jpg",
        price: "$175.00",
        painter: "Joe",
        material: "Acrylic",
        height: 11,
        width: 14,
        frameHeight: 17,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 92,
        title: "The Peak",
        filename: "(J-92) THE PEAK 18X24, ACRYLIC $550 24X30 fr.jpg",
        price: "$550.00",
        painter: "Joe",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 93,
        title: "Forest Floor",
        filename: "(J-93) FOREST FLOOR 30X40, ACRYLIC $750 (UF).jpg",
        price: "$750.00",
        painter: "Joe",
        material: "Acrylic",
        height: 30,
        width: 40,
        sold: 0
    },
    {
        id: 94,
        title: "An Abstract Expression",
        filename: "(J-94) AN ABSTRACT EXPRESSION 36X30, ABSTRACT $1,200 38X32 FR.jpg",
        price: "$1,200.00",
        painter: "Joe",
        material: "Abstract",
        height: 36,
        width: 30,
        frameHeight: 38,
        frameWidth: 32,
        sold: 0
    }
]
joesPaintings.name = 'joesPaintings';
joesPaintings.category = 'joe';

const miscPaintings = [{
        id: 1,
        title: "At the Beach",
        filename: "(M) BARBARA WHELAN- AT THE BEACH 16X20, OIL $850 FR 22X26.jpg",
        price: "$850.00",
        painter: "Barbara Whelan",
        material: "Oil",
        height: 16,
        width: 20,
        frameHeight: 22,
        frameWidth: 26,
        sold: 0
    },
    {
        id: 2,
        title: "Still Life with Fruit",
        filename: "(M) BRIAN JONES- STILL LIFE WITH FRUIT 18X24, LITHO (ARTIST PROOF) $400 26X32 CANNOT SHIP.jpg",
        price: "$400.00",
        painter: "Brian Jones",
        material: "Litho",
        height: 18,
        width: 24,
        frameHeight: 26,
        frameWidth: 32,
        sold: 0
    },
    {
        id: 3,
        title: "Prince",
        filename: "(M) CARL HOSELTON-PRINCE 16X12, ACRYLIC $400 FR 22X18.jpg",
        price: "$400.00",
        painter: "Carl Hoselton",
        material: "Acrylic",
        height: 16,
        width: 12,
        frameHeight: 22,
        frameWidth: 18,
        sold: 0
    },
    {
        id: 4,
        title: "Millar Hills",
        filename: "(M) DON CAVIN -MILLAR HILLS 10X12, OIL $600 FR 16X18.jpg",
        price: "$600.00",
        painter: "Don Cavin",
        material: "Oil",
        height: 10,
        width: 12,
        frameHeight: 16,
        frameWidth: 18,
        sold: 0
    },
    {
        id: 5,
        title: "Acadium Autumn",
        filename: "(M) GEORGE SPECK-ACADIUM AUTUMN 24X30, ACRYLIC $750 FR 30X36.jpg",
        price: "$750.00",
        painter: "George Speck",
        material: "Acrylic",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 6,
        title: "Costa Del Sol",
        filename: "(M) GEORGE SPECK-COSTA DEL SOL 18X24, ACRYLIC $950 FR 24X30.jpg",
        price: "$950.00",
        painter: "George Speck",
        material: "Acrylic",
        height: 18,
        width: 24,
        frameHeight: 24,
        frameWidth: 30,
        sold: 0
    },
    {
        id: 7,
        title: "Around the Bend",
        filename: "(M) GRAHAM NORWELL- AROUND THE BEND 10X14, WC $1,000 FR 16X20.jpg",
        price: "$1,000.00",
        painter: "Graham Norwell",
        material: "Watercolour",
        height: 10,
        width: 14,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 8,
        title: "Portrait of Don Fraser",
        filename: "(M) GUTTORN OTTOS PORTRAIT OF DON FRASER 38X28, OIL $6,500  FR 44X34.jpg",
        price: "$6,500.00",
        painter: "Guttorn Ottos",
        material: "Oil",
        height: 38,
        width: 28,
        frameHeight: 44,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 9,
        title: "Vase of Flowers",
        filename: "(M) HARRY L. SMITH- VASE OF FLOWERS 12X9, OIL $600 FR 18X15.jpg",
        price: "$600.00",
        painter: "Harry L. Smith",
        material: "Oil",
        height: 12,
        width: 9,
        frameHeight: 18,
        frameWidth: 15,
        sold: 0
    },
    {
        id: 10,
        title: "Bedows Euclids Romance",
        filename: "(M) KEN NUTT, NEE ERIC BEDOWS EUCLIDS ROMANCE, PENCIL, GRAPHITE, ACRYLIC 64X44 $750.jpg",
        price: "$750.00",
        painter: "Ken Nut & Nee Eric",
        material: "Acrylic",
        height: 64,
        width: 44,
        sold: 0
    },
    {
        id: 11,
        category: "Misc",
        title: "Resting",
        filename: "(M) LASZLO SZILVASSY- RESTING 10X14, WC $225 FR 16X20.jpg",
        price: "$225.00",
        painter: "Laszlo Szilvassy",
        material: "Watercolour",
        height: 10,
        width: 14,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 12,
        title: "The Dressing Gown",
        filename: "(M) LASZLO SZILVASSY- THE DRESSING GOWN 10X14, WC $225 FR 16X20 (2).jpg",
        price: "$225.00",
        painter: "Laszlo Szilvassy",
        material: "Watercolour",
        height: 10,
        width: 14,
        frameHeight: 16,
        frameWidth: 20,
        sold: 0
    },
    {
        id: 13,
        title: "Still Life",
        filename: "(M) LUCILLE GILLING- STILL LIFE 7X5 LITHO $425 FR 13X11.jpg",
        price: "$425.00",
        painter: "Lucille Gilling",
        material: "Litho",
        height: 7,
        width: 5,
        frameHeight: 13,
        frameWidth: 11,
        sold: 0
    },
    {
        id: 14,
        title: "Heavy Snowfall",
        filename: "(M) RON LEONARD- HEAVY SNOWFALL 22X28, OIL $500 UNFRAMED.jpg",
        price: "$500.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 22,
        width: 28,
        sold: 0
    },
    {
        id: 15,
        title: "Perfect Day",
        filename: "(M) RON LEONARD- PERFECT DAY 36X48, OIL $1,700 UNFRAMED.jpg",
        price: "$1,700.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 36,
        width: 48,
        sold: 0
    },
    {
        id: 16,
        title: "Setting Sun",
        filename: "(M) RON LEONARD- SETTING SUN 24X30, OIL $1,100 FR 30X36.jpg",
        price: "$1,100.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36
    },
    {
        id: 17,
        title: "Snow on the Way",
        filename: "(M) RON LEONARD- SNOW ON THE WAY 24X30, OIL $1,000 FR 30X36.jpg",
        price: "$1,000.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 18,
        title: "Haliburton Morning",
        filename: "(M) RON LEONARD-HALIBURTON MORNING 24X30, OIL $1,000 FR 30X36.jpg",
        price: "$1,000.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 24,
        width: 30,
        frameHeight: 30,
        frameWidth: 36,
        sold: 0
    },
    {
        id: 19,
        title: "View from my House",
        filename: "(M) RON LEONARDS- VIEW FROM MY HOUSE 22X28, OIL $825 FR 28X34.jpg",
        price: "$825.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 20,
        title: "Green Mts Vermont",
        filename: "(M) RON LEONARDS-GREEN MTS VERMONT 22X28, OIL FR 28X34.jpg",
        price: "$825.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 21,
        title: "July Evening at the Saugeen",
        filename: "(M) RON LEONARDS-JULY EVENING AT THE SAUGEEN 22X28, OIL $975 FR 28X34.jpg",
        price: "$975.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 22,
        title: "Winter Light",
        filename: "(M) RON LEONARD-WINTER LIGHT 22X28, OIL $925 FR 28X34(1).jpg",
        price: "$925.00",
        painter: "Ron Leonard",
        material: "Oil",
        height: 22,
        width: 28,
        frameHeight: 28,
        frameWidth: 34,
        sold: 0
    },
    {
        id: 23,
        title: "Gadwell",
        filename: "(M) TERRY SHORT- GADWELL  8X10 SILKSCREEN $125 FR 14X16.jpg",
        price: "$125.00",
        painter: "Terry Short",
        material: "Silkscreen",
        height: 8,
        width: 10,
        frameHeight: 14,
        frameWidth: 16,
        sold: 0
    },
    {
        id: 24,
        title: "Peonies",
        filename: "(M)BARBARA WHELAN- PEONIES nr3   24X12, OIL $300 UNFRAMED.jpg",
        price: "$300.00",
        painter: "Barbara Whelan",
        material: "Oil",
        height: 24,
        width: 12,
        sold: 0
    }
]
miscPaintings.name = 'miscPaintings';
miscPaintings.category = 'misc';


// Add painting arrays to parent array
const paintings = [];
paintings.push(arjasPaintings);
paintings.push(joesPaintings);
paintings.push(miscPaintings);