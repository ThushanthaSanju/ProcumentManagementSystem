import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/homeScreen.dart';
import 'package:pmsmobile/Screens/itemScreen.dart';
import 'package:pmsmobile/Screens/login.dart';
import 'package:provider/provider.dart';

import '../Screens/home.dart';
import '../providers/user_provider.dart';

class NevigationDrawer extends StatelessWidget {
  final padding = EdgeInsets.symmetric(horizontal: 15);

  NevigationDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    final name = user.name;
    final email = user.email;
    final urlImage =
        'https://images.squarespace-cdn.com/content/v1/571114d145bf21108e6acc6f/1598559762695-NBTY0TCW2GPCINKXAY6T/aveda+men.jpg?format=2500w';

    return Drawer(
      child: Material(
        color: Color.fromARGB(255, 148, 89, 22),
        child: ListView(
          children: <Widget>[
            buildHeader(
              urlImage: urlImage,
              name: name,
              email: email,
              onClicked: () {},
            ),
            const SizedBox(height: 28),
            const Divider(color: Colors.white70),
            const SizedBox(height: 8),
            buildMenuItem(
                text: 'Home',
                icon: Icons.home,
                onClicked: () => selectedItem(context, 0)),
            const SizedBox(height: 16),
            buildMenuItem(
                text: 'Orders',
                icon: Icons.family_restroom,
                onClicked: () => selectedItem(context, 1)),
            const SizedBox(height: 16),
            buildMenuItem(
                text: 'Profile',
                icon: Icons.people,
                onClicked: () => selectedItem(context, 2)),
            const SizedBox(height: 6),
            const Divider(color: Colors.white70),
            const SizedBox(height: 30),
            buildMenuItem(
                text: 'Logout',
                icon: Icons.logout,
                onClicked: () => selectedItem(context, 3)),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget buildMenuItem({
    required String text,
    required IconData icon,
    VoidCallback? onClicked,
  }) {
    final color = Colors.white;
    final hoverColor = Colors.white70;

    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(text, style: TextStyle(color: color)),
      hoverColor: hoverColor,
      onTap: onClicked,
    );
  }

  Widget buildHeader({
    required String urlImage,
    required String name,
    required String email,
    required VoidCallback? onClicked,
  }) =>
      InkWell(
        onTap: onClicked,
        child: Container(
          padding: padding.add(EdgeInsets.symmetric(vertical: 40)),
          child: Row(children: [
            CircleAvatar(radius: 30, backgroundImage: NetworkImage(urlImage)),
            SizedBox(width: 30),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(fontSize: 20, color: Colors.white),
                ),
                const SizedBox(height: 4),
                Text(
                  email,
                  style: TextStyle(fontSize: 14, color: Colors.white),
                )
              ],
            ),
            const Spacer(),
          ]),
        ),
      );
}

void selectedItem(BuildContext context, int i) {
  switch (i) {
    case 0:
      Navigator.push(context, MaterialPageRoute(builder: (context) => Items()));
      break;
    //   case 1:
    //     Navigator.of(context).push(CustomPageRoute(
    //         child: FamilyIssues(), direction: AxisDirection.left));
    //     break;
    //   case 2:
    //     Navigator.of(context).push(CustomPageRoute(
    //         child: SocialIssuesAdmin(), direction: AxisDirection.left));
    //     break;
    //   case 3:
    //     Navigator.of(context).push(CustomPageRoute(
    //         child: HealthIssueAdmin(), direction: AxisDirection.left));
    //     break;
    //   case 4:
    //     Navigator.of(context).push(CustomPageRoute(
    //         child: FinancialIssuesAdmin(), direction: AxisDirection.left));
    //     break;
    case 5:
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const LoginPage()),
          (route) => false);
      break;
  }
}
