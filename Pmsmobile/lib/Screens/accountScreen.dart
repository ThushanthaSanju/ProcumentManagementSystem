import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/widgets/below_app_bar.dart';
import 'package:pmsmobile/Screens/widgets/orders.dart';
import 'package:pmsmobile/Screens/widgets/top_buttons.dart';
import 'package:pmsmobile/common/navigationdrawer.dart';
import 'package:pmsmobile/constants/global_variables.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({Key? key}) : super(key: key);

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
              const IconThemeData(color: Color.fromARGB(255, 255, 255, 255)),
        ),
      ),
      body: Column(
        children: const [
          BelowAppBar(),
          SizedBox(height: 10),
          // TopButtons(),
          SizedBox(height: 20),
          Orders(),
        ],
      ),
    );
  }
}
