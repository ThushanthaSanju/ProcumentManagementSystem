import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';
import 'package:provider/provider.dart';

import '../constants/error_handling.dart';
import '../constants/global_variables.dart';
import '../constants/utils.dart';
import '../models/itemModel.dart';
import '../models/productModel.dart';
import '../models/supplierModel.dart';
import '../providers/user_provider.dart';

class ItemService {
  String apiURL = 'http://10.0.2.2:7070'; // VERIFY IP

  Future<List<Product>> fetchCategoryProducts({
    required BuildContext context,
    required String category,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    List<Product> productList = [];
    try {
      http.Response res = await http
          .get(Uri.parse('$uri/product/products?category=$category'), headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-auth-token': userProvider.user.token,
      });
      // log(res.body);

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          for (int i = 0; i < jsonDecode(res.body).length; i++) {
            productList.add(
              Product.fromJson(
                jsonEncode(
                  jsonDecode(res.body)[i],
                ),
              ),
            );
          }
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
      log(e.toString());
    }
    return productList;
  }

  // Future<List<ItemModel>> getAll() async {
  //   final response = await http.get(Uri.parse(apiURL + '/item/getAllItems'));

  //   if (response.statusCode == 200) {
  //     final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
  //     return parsed.map<ItemModel>((json) => ItemModel.fromJson(json)).toList();
  //   } else {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }

  // Future<List<ItemModel>> getItemAll(ItemModel item, String itemName) async {
  //   final response = await http.get(Uri.parse(
  //       apiURL + '/item/getItembyname/' + (item.itemName).toString()));

  //   if (response.statusCode == 200) {
  //     final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
  //     return parsed.map<ItemModel>((json) => ItemModel.fromJson(json)).toList();
  //   } else {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }

  // getItemssAll(ItemModel item) async {
  //   final response = await http.get(Uri.parse(
  //       apiURL + '/item/getItembyname/' + (item.itemName).toString()));

  //   if (response.statusCode == 200) {
  //     final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
  //     return parsed.map<ItemModel>((json) => ItemModel.fromJson(json)).toList();
  //   } else {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }

  // insertItems(ItemModel item) async {
  //   final response = await http.post(
  //     Uri.parse(apiURL + '/item/insert'),
  //     headers: <String, String>{
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //     body: jsonEncode(item.toJson()),
  //   );
  //   if (response.statusCode != 200) {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }

  // updateItems(ItemModel item) async {
  //   final response = await http.put(
  //     Uri.parse(apiURL + '/item/' + (item.id).toString()),
  //     headers: <String, String>{
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //     body: jsonEncode(item.toJson()),
  //   );
  //   if (response.statusCode != 200) {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }

  // deleteItems(ItemModel item) async {
  //   final response = await http.delete(
  //       Uri.parse(apiURL + '/item/' + (item.id).toString()),
  //       headers: <String, String>{
  //         'Content-Type': 'application/json; charset=UTF-8',
  //       });
  //   if (response.statusCode != 200) {
  //     throw Exception('Error in: ' + response.body);
  //   }
  // }
}

// class ItemsByService {
//   String apiURL = 'http://10.0.2.2:7070'; // VERIFY IP

//   Future<List<ItemModel>> getaAll() async {
//     final response = await http.get(Uri.parse(apiURL + '/item/getItembyId'));

//     if (response.statusCode == 200) {
//       final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
//       return parsed.map<ItemModel>((json) => ItemModel.fromJson(json)).toList();
//     } else {
//       throw Exception('Error in: ' + response.body);
//     }
//   }
// }

// class ItemsInsert {
//   String baseurl = "http://10.0.2.2:7070";
//   var log = Logger();
//   Future<dynamic> get(String url) async {
//     url = formaster(url);
//     var response = await http.get(Uri.parse(url));
//     log.i(response.body);
//     log.i(response.statusCode);
//   }

//   Future<dynamic> post(String url, Map<String, String> body) async {
//     url = formaster(url);
//     var response = await http.post(Uri.parse(url), body: body);
//     if (response.statusCode == 200 || response.statusCode == 201) {
//       log.i(response.body);
//       return response;
//     }
//   }

//   String formaster(String url) {
//     return baseurl + url;
//   }
// }

// ////////////////////////

// class SupplierService {
//   String apiURL = 'http://10.0.2.2:7070'; // VERIFY IP

//   Future<List<SupplierModel>> getAll() async {
//     final response =
//         await http.get(Uri.parse(apiURL + '/supplier/getAllSuppliers'));

//     if (response.statusCode == 200) {
//       final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
//       return parsed
//           .map<SupplierModel>((json) => SupplierModel.fromJson(json))
//           .toList();
//     } else {
//       throw Exception('Error in: ' + response.body);
//     }
//   }

//   insertSuppliers(SupplierModel supplierModel) async {
//     final response = await http.post(
//       Uri.parse(apiURL + '/supplier/insert'),
//       headers: <String, String>{
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
//       body: jsonEncode(supplierModel.toJson()),
//     );
//     if (response.statusCode != 200) {
//       throw Exception('Error in: ' + response.body);
//     }
//   }

//   updateSuppliers(SupplierModel supplierModel) async {
//     final response = await http.put(
//       Uri.parse(apiURL + '/supplier/' + (supplierModel.id).toString()),
//       headers: <String, String>{
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
//       body: jsonEncode(supplierModel.toJson()),
//     );
//     if (response.statusCode != 200) {
//       throw Exception('Error in: ' + response.body);
//     }
//   }

//   deleteSuppliers(SupplierModel supplierModel) async {
//     final response = await http.delete(
//         Uri.parse(apiURL + '/supplier/' + (supplierModel.id).toString()),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//         });
//     if (response.statusCode != 200) {
//       throw Exception('Error in: ' + response.body);
//     }
//   }
// }

// class SuppliersByID {
//   String apiURL = 'http://10.0.2.2:7070'; // VERIFY IP

//   Future<List<SupplierModel>> getaAll() async {
//     final response =
//         await http.get(Uri.parse(apiURL + '/supplier/getAllSuppliers'));

//     if (response.statusCode == 200) {
//       final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
//       return parsed
//           .map<SupplierModel>((json) => SupplierModel.fromJson(json))
//           .toList();
//     } else {
//       throw Exception('Error in: ' + response.body);
//     }
//   }
// }

// class SuppliersInsert {
//   String baseurl = "http://10.0.2.2:7070";
//   var log = Logger();
//   Future<dynamic> get(String url) async {
//     url = formaster(url);
//     var response = await http.get(Uri.parse(url));
//     log.i(response.body);
//     log.i(response.statusCode);
//   }

//   Future<dynamic> post(String url, Map<String, String> body) async {
//     url = formaster(url);
//     var response = await http.post(Uri.parse(url), body: body);
//     if (response.statusCode == 200 || response.statusCode == 201) {
//       log.i(response.body);
//       return response;
//     }
//   }

//   String formaster(String url) {
//     return baseurl + url;
//   }
// }
