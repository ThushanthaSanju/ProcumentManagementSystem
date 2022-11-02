import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:pmsmobile/models/itemModel.dart';
import 'package:pmsmobile/models/productModel.dart';

import '../common/navigationdrawer.dart';
import '../services/ItemDetailsService.dart';
import 'widgets/custom_button.dart';

class NotePage extends StatefulWidget {
  static const String routeName = '/itemdetails';
  final Product product;
  const NotePage({Key? key, required this.product}) : super(key: key);

  @override
  State<NotePage> createState() => _NotePageState();
}

class _NotePageState extends State<NotePage> {
  final ItemDetailsServices itemDetailsServices = ItemDetailsServices();

  // String? itemName;
  // int? categoryId;

  @override
  void initState() {
    super.initState();
  }

  void addToCart() {
    itemDetailsServices.addToCart(
      context: context,
      product: widget.product,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NevigationDrawer(),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(80),
        child: AppBar(
          centerTitle: true,
          backgroundColor: Colors.brown,
          title: const Padding(
            padding: EdgeInsets.only(top: 0.0),
            child: Text('PMS'),
          ),
          iconTheme:
              const IconThemeData(color: Color.fromARGB(255, 247, 213, 255)),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    widget.product.id!,
                  ),
                ],
              ),
            ),
            Container(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 20,
                  horizontal: 10,
                ),
                child: Text(
                  widget.product.category,
                  style: const TextStyle(
                    fontSize: 25,
                  ),
                ),
              ),
            ),
            Image.network(
              widget.product.images[0],
              height: 250,
              width: 500,
            ),
            Container(
              color: Colors.black12,
              height: 5,
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: RichText(
                text: TextSpan(
                  text: 'Price: ',
                  style: const TextStyle(
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                  children: [
                    TextSpan(
                      text: 'Rs${widget.product.price}',
                      style: const TextStyle(
                        fontSize: 22,
                        color: Colors.red,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              // alignment: Alignment.topLeft,
              padding: const EdgeInsets.all(8.0),
              child: Text(
                widget.product.name,
                style: const TextStyle(
                  fontSize: 22,
                  color: Color.fromARGB(255, 117, 71, 2),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            Container(
              color: Colors.black12,
              height: 5,
            ),
            Container(
              alignment: Alignment.center,
              child: Text(
                'Available Quantity: ${widget.product.quantity}',
                style: const TextStyle(
                  fontSize: 22,
                  color: Color.fromARGB(255, 224, 183, 0),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            Container(
              color: Colors.black12,
              height: 5,
            ),
            // Padding(
            //   padding: const EdgeInsets.all(10),
            //   child: CustomButton(
            //     text: 'Buy Now',
            //     onTap: () {},
            //   ),
            // ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomButton(
                text: 'Add to Cart',
                onTap: addToCart,
                color: Color.fromARGB(255, 5, 168, 54),
              ),
            ),
            const SizedBox(height: 10),
            Container(
              color: Colors.black12,
              height: 5,
            ),
          ],
        ),
      ),
    );
  }
}
