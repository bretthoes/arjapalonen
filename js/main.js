$(document).ready(function () {
    // Joe's Paintings
    $.each(joePaintings, function (i, e) {
        var id = joePaintings[i].id;
        var title = joePaintings[i].title;
        var filename = joePaintings[i].filename;
        var price = joePaintings[i].price;
        var painter = joePaintings[i].painter;
        var material = joePaintings[i].material;
        var height = joePaintings[i].height;
        var width = joePaintings[i].width;
        var frameHeight = joePaintings[i].frameHeight;
        var frameWidth = joePaintings[i].frameWidth;

        // Track current row
        var rowNumber = Math.floor(i / ROW_AMOUNT)
        var row = $('<div class="row row' + rowNumber + '">')

        // Add new row
        if (i % ROW_AMOUNT == 0) {
            $(".joesPaintings").append(row)
        }

        // Add painting content
        $(".row" + rowNumber).append(
            '<div class="col-sm-12 col-md-4 painting-container"><figure><a href="#img' + id + '" class="painting-link">'
            + '<img class="painting" src="img/paintings/' + painter + '/' + filename + '" loading="lazy" alt="' + title 
            + '"><div class="middle"><div class="text">Preview</div></div></a><figcaption class="caption">"' + title 
            + '"<br />' + price + '<br />' + material + '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' + height + ' x ' + width 
            + '&nbsp;&nbsp;&#183;&nbsp;&nbsp;' + frameHeight + ' x ' + frameWidth + ' FR</figcaption></figure>'
            + '<a href="#work" class="lightbox" id="img' + id + '"><span style="background-image: url(img/paintings/' 
            + painter + '/' + filename + ');"></span></a></div>')

        // End row
        if (i % ROW_AMOUNT == ROW_AMOUNT - 1) {
            $(".joesPaintings").append('</div>')
        }

    })
})

const ROW_AMOUNT = 3;

const joePaintings = [{
    id: 1,
    title: "Cabin in the Laurentians",
    filename: "(A-1) CABIN IN THE LAURENTIANS 20X24, OIL $750 FR 26X30.jpg",
    price: "$750.00",
    painter: "Arja",
    material: "Oil",
    height: 20,
    width: 24,
    frameHeight: 26,
    frameWidth: 30
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
    frameWidth: 30
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
    frameWidth: 26
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
    frameWidth: 28
},
{
    id: 5,
    title: "Lilies Mums",
    filename: "(A-5) LILIES _ MUMS 24X20, OIL $850 30X26 F.jpg",
    price: "$850.00",
    painter: "Arja",
    material: "Oil",
    height: 24,
    width: 20,
    frameHeight: 30,
    frameWidth: 26
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
    frameWidth: 30
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
    frameWidth: 30
}
]