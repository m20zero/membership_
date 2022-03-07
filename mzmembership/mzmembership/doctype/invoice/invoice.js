// Copyright (c) 2021, M20Zero and contributors
// For license information, please see license.txt

frappe.ui.form.on('Invoice', {
	// refresh: function(frm) {

	// }
	setup: function(frm){
		frm.set_query("party_type", function(){
			return{
				query: "mzmembership.whitelisted.get_party"
			}
		});
	}
});

frappe.ui.form.on("Invoice Item", {
	qty: function(frm, cdt, cdn){
		let child = frappe.get_doc(cdt, cdn);
		frappe.model.set_value(child.doctype, child.name, "amount", child.qty*child.rate);
		update_amount(frm);
	},
	rate: function(frm, cdt, cdn){
		let child = frappe.get_doc(cdt, cdn);
		frappe.model.set_value(child.doctype, child.name, "amount", child.qty*child.rate);
		update_amount(frm);
	},
	items_remove: function(frm, cdt, cdn){
		update_amount(frm);
	},
	items_add: function(frm, cdt, cdn){
		update_amount(frm);
	}
});

function update_amount(frm){
	let table = frm.doc.items;
	let amount = 0;
	let qty = 0;
	for(let t in table){
		qty += table[t].qty;
		amount += table[t].amount;
	}

	cur_frm.set_value("total_qty", qty);
	cur_frm.set_value("total", amount);
}
