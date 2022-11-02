import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:pmsmobile/config/config.dart';
import 'package:pmsmobile/models/category.dart';

// final apiServices = Provider((ref) => APIServices());

class APIServices {
  static var client = http.Client();

  Future<List<Category>?> getCategory(page, pageSize) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    Map<String, String> queryString = {
      'page': page.toString(),
      'pageSize': pageSize.toString()
    };

    var url = Uri.http(Config.apiURL, Config.categoryAPI, queryString);
    var response = await client.get(url, headers: requestHeaders);

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return categoriesFromJson(data["data"]);
    } else {
      return null;
    }
  }
}
