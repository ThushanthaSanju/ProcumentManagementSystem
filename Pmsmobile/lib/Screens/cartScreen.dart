import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/address_screen.dart';
import 'package:pmsmobile/Screens/widgets/cart_product.dart';
import 'package:pmsmobile/Screens/widgets/cart_subtotal.dart';
import 'package:pmsmobile/Screens/widgets/custom_button.dart';
import 'package:pmsmobile/common/navigationdrawer.dart';
import 'package:pmsmobile/constants/global_variables.dart';
import 'package:pmsmobile/providers/user_provider.dart';
import 'package:provider/provider.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({Key? key}) : super(key: key);

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  void navigateToAddress(int sum) {
    Navigator.pushNamed(
      context,
      AddressScreen.routeName,
      arguments: sum.toString(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserProvider>().user;
    int sum = 0;
    user.cart
        .map((e) => sum += e['quantity'] * e['product']['price'] as int)
        .toList();

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
          children: [
            // const AddressBox(),
            const CartSubtotal(),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: CustomButton(
                text: 'Proceed to Buy (${user.cart.length} items)',
                onTap: () => navigateToAddress(sum),
                color: Colors.yellow[600],
              ),
            ),
            const SizedBox(height: 15),
            Container(
              color: Colors.black12.withOpacity(0.08),
              height: 1,
            ),
            const SizedBox(height: 5),
            ListView.builder(
              itemCount: user.cart.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return CartProduct(
                  index: index,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
