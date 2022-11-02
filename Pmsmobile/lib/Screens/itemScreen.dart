import 'package:flutter/material.dart';

import '../common/loader.dart';
import '../common/navigationdrawer.dart';
import '../models/productModel.dart';
import '../services/apiService.dart';
import 'noted.dart';

class ItemScreen extends StatefulWidget {
  static const String routeName = '/categoryItem';
  final String category;
  const ItemScreen({Key? key, required this.category}) : super(key: key);

  @override
  State<ItemScreen> createState() => _ItemScreenState();
}

class _ItemScreenState extends State<ItemScreen> {
  List<Product>? productList;
  final ItemService homeServices = ItemService();

  @override
  void initState() {
    super.initState();
    fetchCategoryProducts();
  }

  fetchCategoryProducts() async {
    productList = await homeServices.fetchCategoryProducts(
      context: context,
      category: widget.category,
    );
    setState(() {});
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
      body: productList == null
          ? const Loader()
          : Column(
              children: [
                Container(
                  padding: const EdgeInsets.only(
                      top: 15.0, left: 25.0, right: 25.0, bottom: 25.0),
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Suppliers for ${widget.category}',
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                SizedBox(
                  height: 600,
                  child: Container(
                    child: GridView.builder(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.all(15),
                      itemCount: productList!.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 3,
                      ),
                      itemBuilder: (context, index) {
                        final product = productList![index];
                        return GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              NotePage.routeName,
                              arguments: product,
                            );
                          },
                          child: Card(
                            color: Color.fromARGB(255, 196, 169, 138),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            elevation: 30,
                            margin: const EdgeInsets.all(10),
                            child: Column(
                              children: [
                                SizedBox(
                                  height: 120,
                                  width: 150,
                                  child: DecoratedBox(
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: Colors.blueGrey,
                                        width: 0.1,
                                      ),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: Image.network(
                                        product.images[0],
                                      ),
                                    ),
                                  ),
                                ),
                                Row(
                                  children: [
                                    Container(
                                      // alignment: Alignment.topLeft,
                                      padding: const EdgeInsets.only(
                                        left: 10,
                                        top: 5,
                                        // right: 15,
                                      ),
                                      child: Text(
                                        product.name,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                    Container(
                                      // alignment: Alignment.topRight,
                                      padding: const EdgeInsets.only(
                                        left: 20,
                                        top: 5,
                                        right: 15,
                                      ),
                                      child: Text(
                                        'Rs.' + product.price.toString(),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
