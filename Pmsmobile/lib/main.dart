import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/home.dart';
import 'package:pmsmobile/Screens/homeScreen.dart';
import 'package:pmsmobile/Screens/itemScreen.dart';
import 'package:pmsmobile/Screens/login.dart';
import 'package:pmsmobile/Screens/noted.dart';
import 'package:pmsmobile/router.dart';
import 'package:provider/provider.dart';

import 'Screens/signup.dart';
import 'common/bottom_bar.dart';
import 'providers/user_provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (context) => UserProvider(),
    ),
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PMS',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.brown,
      ),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: Provider.of<UserProvider>(context).user.token.isNotEmpty
          ? Provider.of<UserProvider>(context).user.type == 'user'
              ? const BottomBar()
              : const HomeScreen()
          : const LoginPage(),
    );
  }
}
