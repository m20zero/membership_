// Copyright (c) 2022, M20Zero and contributors
// For license information, please see license.txt
frappe.ui.form.on("Payment Item", "outstanding",function(frm,cdt,cdn)
{
	var d = locals[cdt][cdn];
	d.outstanding =d.total-d.allocated;
	total=d.outstanding;
	frm.set_value("d.allocated",total);
	frm.refresh_field("items")
	cur_frm.refresh();
});
// frappe.ui.form.on("Payment Voucher",{
// 	verify: function(frm) {
// 		frappe.call({
// 			method: "frappe.client.get",
// 			callback: function(r) {
// 				cur_frm.set_value("paid_amount",r.message["allocated"]);
// 				frappe.model.add_child(cur_frm.doc, "Payment Item", "items");
// 				$.each(frm.doc.items || [], function(i, v) {
// 					frappe.model.set_value(v.doctype, v.name, "paid_amount", r.message[i].allocated)
// 				})
// 				frm.refresh_field('items');
// 			}
// 		})
// 	}
// })

// frappe.ui.form.on("Payment Item", "allocated", function(frm, cdt, cdn) {
//     var d = locals[cdt][cdn];
//         frappe.db.get_value("Payment Voucher", {"name": d.paid_amount}, "allocated", function(value) {
//             d.paid_amount = value.allocated;
			
//         });
// });

frappe.ui.form.on("Payment Voucher",{
	paid_amount: function(frm){
	if(frm.doc.paid_amount){
			if(frm.doc.items && !cur_frm.doc.items[0].allocated){
					frappe.model.set_value(cur_frm.doc.items[0].doctype, cur_frm.doc.items[0].name, "allocated", frm.doc.paid_amount);
			}
	}
}
});
