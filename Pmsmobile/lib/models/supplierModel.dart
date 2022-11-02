class SupplierModel {
  late String? id;
  late String? supplierName;
  late String? address;
  late int? contact;

  SupplierModel();
  SupplierModel.create(this.id, this.supplierName, this.address, this.contact);

  factory SupplierModel.fromJson(Map<String, dynamic> json) {
    return SupplierModel.create(
        json['_id'], json['supplierName'], json['address'], json['contact']);
  }

  Map<String, dynamic> toJson() => {
        '_id': id,
        'supplierName': supplierName,
        'address': address,
        'contact': contact
      };

  @override
  toString() {
    return supplierName.toString();
  }
}
