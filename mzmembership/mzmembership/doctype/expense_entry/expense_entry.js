// Copyright (c) 2022, M20Zero and contributors
// For license information, please see license.txt

frappe.ui.form.on("Expense Entry Item", "rate",function(frm,cdt,cdn)
{
	var d = locals[cdt][cdn];
	d.amount = d.qty*d.rate;
	var table = frm.doc.items;
	var total = 0;

	for(var i in table) {
		total = total + Number(table[i].amount);
	}
 	frm.set_value("total",total);
	 frm.set_value("net_total",total);
	cur_frm.refresh();
 });
 frappe.ui.form.on("Expense Entry Item", "qty", function(frm, cdt, cdn) {

	var table = frm.doc.items;
	var total = 0;
	for(var i in table) {
		total = total + Number(table[i].qty);
	}
 
	 frm.set_value("total_quantity",total);
		 
 });
 frappe.ui.form.on("Expense Entry", {
	refresh: function(frm) {
		// make calculation on the fields
		var a = frm.doc.net_total - frm.doc.discount;
		frm.set_value("grand_total", a);
		frm.refresh_field("grand_total");
	}
});

