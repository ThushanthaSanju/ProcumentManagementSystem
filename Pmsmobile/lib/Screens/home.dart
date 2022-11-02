import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/itemScreen.dart';
import 'package:pmsmobile/models/itemModel.dart';

import '../common/navigationdrawer.dart';
import '../constants/global_variables.dart';
import '../services/apiService.dart';

class Items extends StatefulWidget {
  static const String routeName = '/home';
  Items({Key? key}) : super(key: key);

  final ItemService itemService = ItemService();

  @override
  _ItemsPageState createState() => _ItemsPageState();
}

class _ItemsPageState extends State<Items> {
  // List<ItemModel> items = [];

  // List<Cate> itemsc = [
  //   Cate(
  //       categoryId: 1,
  //       itemName: 'GI Pipes',
  //       urlAvatar:
  //           'https://res.cloudinary.com/dz3ljnlvy/image/upload/v1667302645/y3cnnj4raprcrzkqffwg.jpg'),
  //   Cate(
  //       categoryId: 2,
  //       itemName: 'Bricks',
  //       urlAvatar:
  //           'https://4.imimg.com/data4/TC/IS/IMOB-43715702/images-8-1000x1000.jpg'),
  //   Cate(
  //       categoryId: 3,
  //       itemName: 'PlyWood',
  //       urlAvatar:
  //           'https://upload.wikimedia.org/wikipedia/commons/f/fe/Spruce_plywood.JPG'),
  //   Cate(
  //       categoryId: 4,
  //       itemName: 'Cements',
  //       urlAvatar: 'https://www.tradeford.com/pimages/l/4/1060754.jpg'),
  //   Cate(
  //       categoryId: 5,
  //       itemName: 'Sand',
  //       urlAvatar:
  //           'https://content.jdmagicbox.com/comp/bangalore/h3/pwfl1539156397d4e5h3/catalogue/sri-jai-anjaneya-river-sand-suppliers-maruthi-nagar-bangalore-m-sand-dealers-bvk09ips2q.jpg'),
  //   Cate(
  //       categoryId: 6,
  //       itemName: 'Structural Steel',
  //       urlAvatar:
  //           'https://cdn-cbpfc.nitrocdn.com/aUNzEupCvhBohxjguaoOPmlVOeQZXUgt/assets/static/optimized/rev-86cfb34/wp-content/uploads/2020/08/steel-products-pile-1536x894.jpg'),
  // ];

  // @override
  // void initState() {
  //   super.initState();
  //   _getItems();
  // }

  // void _getItems() {
  //   widget.itemService.getAll().then((value) => {
  //         setState(() {
  //           items = value;
  //         })
  //       });
  // }

  // @override
  // void initState() {
  //   super.initState();
  //   _getSupbyItems(item, itemsc);
  // }

  // Future<void> _getSupbyItems(List<ItemModel> iteme, itemName) async {
  //   widget.itemService.getItemAll(iteme, itemName).then((value) => {
  //         setState(() {
  //           iteme = value;
  //         })
  //       });
  // }

  // void _selectSupplier(ItemModel item, String itemName) async {
  //   await Navigator.of(context).push(
  //     MaterialPageRoute(
  //         builder: (context) =>
  //             FamilyIssuesEditPage(item: item, itemName: itemName)),
  //   );
  //   _getSupbyItems(item, itemName);
  // }

  void navigateToCategoryPage(BuildContext context, String itemName) {
    Navigator.pushNamed(context, ItemScreen.routeName, arguments: itemName);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Scaffold(
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
        body: Container(
          // decoration: const BoxDecoration(
          //   color: Color.fromARGB(255, 207, 54, 54),
          //   image: DecorationImage(
          //       image: AssetImage('assets/images/issueback.jpg'),
          //       fit: BoxFit.cover),
          // ),
          child: Stack(
            children: [
              // Positioned(
              //     top: 470,
              //     left: 0,
              //     child: Container(
              //       width: 420,
              //       height: 220,
              //       decoration: const BoxDecoration(
              //         image: DecorationImage(
              //             image: AssetImage('assets/images/herso.png'),
              //             fit: BoxFit.fill),
              //       ),
              //     )),
              GridView.builder(
                padding: const EdgeInsets.only(
                    top: 45.0, left: 25.0, right: 25.0, bottom: 25.0),
                scrollDirection: Axis.vertical,
                itemCount: GlobalVariables.categoryImages.length,
                itemBuilder: (context, index) {
                  return Container(
                    child: Card(
                        color: Color.fromARGB(255, 196, 169, 138),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        elevation: 30,
                        margin: const EdgeInsets.all(10),
                        child: GestureDetector(
                            onTap: () => navigateToCategoryPage(
                                  context,
                                  GlobalVariables.categoryImages[index]
                                      ['itemName']!,
                                ),
                            //  {
                            //   Navigator.of(context).pushNamed(
                            //     "/supp",
                            //     arguments: {
                            //       'itemName': data.itemName,
                            //     },
                            //   );
                            // },
                            child: Stack(children: <Widget>[
                              Container(
                                margin: const EdgeInsets.only(
                                  top: 0,
                                ),
                                alignment: Alignment.topCenter,
                                child: SizedBox(
                                  height: 120,
                                  width: 150,
                                  child: Image.network(
                                      GlobalVariables.categoryImages[index]
                                          ['image']!,
                                      // height: 120,
                                      // width: 500,
                                      fit: BoxFit.fill),
                                ),
                              ),
                              Container(
                                  margin: const EdgeInsets.only(
                                    bottom: 5,
                                  ),
                                  alignment: Alignment.bottomCenter,
                                  child: Text(
                                    GlobalVariables.categoryImages[index]
                                        ['itemName']!,
                                    style: const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white),
                                  ))
                            ]))),
                  );
                  // children: items
                  //     .map((data) => SizedBox(
                  //           width: 100.0,
                  //           height: 100.0,
                  //           child: Card(
                  //             color: Color.fromARGB(255, 196, 169, 138),
                  //             shape: RoundedRectangleBorder(
                  //               borderRadius: BorderRadius.circular(10.0),
                  //             ),
                  //             elevation: 30,
                  //             child: ListTile(
                  //               leading: Image(
                  //                   // backgroundColor: Colors.white,
                  //                   // backgroundImage:
                  //                   image: NetworkImage('${data.avatar}')),
                  //               title: Text(data.itemName.toString()),
                  //             ),
                  //           ),
                  //         ))
                  //     .toList(),
                },
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// class Cate {
//   final int categoryId;
//   final String itemName;
//   final String urlAvatar;

//   Cate(
//       {required this.categoryId,
//       required this.itemName,
//       required this.urlAvatar});
// }
