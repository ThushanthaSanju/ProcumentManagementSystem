import 'dart:convert';

class ItemModel {
  final String id;
  final String supplierName;
  final String itemName;
  final int quantity;
  final double price;
  final String avatar;
  final String cloudinary_id;

  ItemModel(
      {required this.id,
      required this.supplierName,
      required this.itemName,
      required this.quantity,
      required this.price,
      required this.avatar,
      required this.cloudinary_id});

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'supplierName': supplierName,
      'itemName': itemName,
      'quantity': quantity,
      'price': price,
      'avatar': avatar,
      'cloudinary_id': cloudinary_id,
    };
  }

  factory ItemModel.fromMap(Map<String, dynamic> map) {
    return ItemModel(
      id: map['id'] ?? '',
      supplierName: map['supplierName'] ?? '',
      itemName: map['itemName'] ?? '',
      quantity: map['quantity'] ?? 0,
      price: map['price']?.toDouble() ?? 0.0,
      avatar: map['avatar'] ?? '',
      cloudinary_id: map['cloudinary_id'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory ItemModel.fromJson(String source) =>
      ItemModel.fromMap(json.decode(source));

  // ItemModel.create(this.id, this.supplierName, this.itemName, this.quantity,
  //     this.price, this.avatar, this.cloudinary_id);

  // factory ItemModel.fromJson(Map<String, dynamic> json) {
  //   return ItemModel.create(json['_id'], json['supplierName'], json['itemName'],
  //       json['quantity'], json['price'], json['avatar'], json['cloudinary_id']);
  // }

  // Map<String, dynamic> toJson() => {
  //       '_id': id,
  //       'supplierName': supplierName,
  //       'itemName': itemName,
  //       'quantity': quantity,
  //       'price': price,
  //       'avatar': avatar,
  //       'cloudinary_id': cloudinary_id
  //     };

  // @override
  // toString() {
  //   return itemName.toString();
  // }
}
