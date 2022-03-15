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


frappe.ui.form.on("Expense Entry",{
	expense_head: function(frm){
	if(frm.doc.expense_head){
			if(frm.doc.items && !cur_frm.doc.items[0].expense_head){
					frappe.model.set_value(cur_frm.doc.items[0].doctype, cur_frm.doc.items[0].name, "expense_head", frm.doc.expense_head);
			}
	}
}
});
frappe.ui.form.on("Expense Entry Item",{
items_add: function(frm, cdt, cdn){
	if(frm.doc.expense_head){
			var child = frappe.get_doc(cdt, cdn);
			frappe.model.set_value(child.doctype, child.name, "expense_head", frm.doc.expense_head);
	}
},
});

