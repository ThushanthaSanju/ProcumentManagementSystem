import 'package:flutter/material.dart';

String uri = 'http://10.0.2.2:7070';

class GlobalVariables {
  // COLORS
  static const appBarGradient = LinearGradient(
    colors: [
      Color.fromARGB(255, 201, 155, 29),
      Color.fromARGB(255, 126, 58, 2),
    ],
    stops: [0.5, 1.0],
  );

  static const secondaryColor = Color.fromRGBO(255, 153, 0, 1);
  static const backgroundColor = Colors.white;
  static const Color greyBackgroundCOlor = Color(0xffebecee);
  static var selectedNavBarColor = Colors.cyan[800]!;
  static const unselectedNavBarColor = Colors.black87;

  static const List<Map<String, String>> categoryImages = [
    {
      'itemName': 'GI Pipes',
      'image':
          'https://res.cloudinary.com/dz3ljnlvy/image/upload/v1667302645/y3cnnj4raprcrzkqffwg.jpg',
    },
    {
      'itemName': 'Bricks',
      'image':
          'https://4.imimg.com/data4/TC/IS/IMOB-43715702/images-8-1000x1000.jpg',
    },
    {
      'itemName': 'PlyWood',
      'image':
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Spruce_plywood.JPG',
    },
    {
      'itemName': 'Cements',
      'image': 'https://www.tradeford.com/pimages/l/4/1060754.jpg',
    },
    {
      'itemName': 'Sand',
      'image':
          'https://content.jdmagicbox.com/comp/bangalore/h3/pwfl1539156397d4e5h3/catalogue/sri-jai-anjaneya-river-sand-suppliers-maruthi-nagar-bangalore-m-sand-dealers-bvk09ips2q.jpg',
    },
    {
      'itemName': 'Structural Steel',
      'image':
          'https://cdn-cbpfc.nitrocdn.com/aUNzEupCvhBohxjguaoOPmlVOeQZXUgt/assets/static/optimized/rev-86cfb34/wp-content/uploads/2020/08/steel-products-pile-1536x894.jpg',
    },
  ];
}
