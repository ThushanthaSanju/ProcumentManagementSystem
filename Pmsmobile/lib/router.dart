import 'package:flutter/material.dart';
import 'package:pmsmobile/Screens/address_screen.dart';
import 'package:pmsmobile/Screens/noted.dart';
import 'package:pmsmobile/Screens/order_details.dart';
import 'package:pmsmobile/Screens/signup.dart';
import 'package:pmsmobile/models/itemModel.dart';
import 'package:pmsmobile/models/order.dart';
import 'package:pmsmobile/models/productModel.dart';

import 'Screens/home.dart';
import 'Screens/itemScreen.dart';
import 'Screens/login.dart';
import 'common/bottom_bar.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case LoginPage.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const LoginPage(),
      );

    case Items.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => Items(),
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const BottomBar(),
      );
    case RegistrationPage.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => RegistrationPage(),
      );

    case ItemScreen.routeName:
      var category = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => ItemScreen(
          category: category,
        ),
      );
    // case SearchScreen.routeName:
    //   var searchQuery = routeSettings.arguments as String;
    //   return MaterialPageRoute(
    //     settings: routeSettings,
    //     builder: (_) => SearchScreen(
    //       searchQuery: searchQuery,
    //     ),
    //   );
    case NotePage.routeName:
      var product = routeSettings.arguments as Product;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => NotePage(
          product: product,
        ),
      );
    case AddressScreen.routeName:
      var totalAmount = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => AddressScreen(
          totalAmount: totalAmount,
        ),
      );
    case OrderDetailScreen.routeName:
      var order = routeSettings.arguments as Order;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => OrderDetailScreen(
          order: order,
        ),
      );
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(
            child: Text('Screen does not exist!'),
          ),
        ),
      );
  }
}
