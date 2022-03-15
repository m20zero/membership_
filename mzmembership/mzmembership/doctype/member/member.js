// Copyright (c) 2021, M20Zero and contributors
// For license information, please see license.txt

frappe.ui.form.on("Member", "validate", function(frm, cdt, cdn) { 
	var dt17 = frappe.get_doc(cdt,cdn);
			 if (frm.doc.date_of_birth){
				if (frm.doc.date_of_birth > frappe.datetime.get_today()){
				   frappe.msgprint(__("Enter a valid Date of Birth"));
				   frappe.validated = false;
				}
			}
});
frappe.ui.form.on("Member", "validate", function(frm, cdt, cdn) { 
	var dt17 = frappe.get_doc(cdt,cdn);
			 if (frm.doc.membership_expiry_date){
				if (frm.doc.membership_expiry_date < frm.doc.member_since ){
				   frappe.msgprint(__("Membership Expiry  must be greater tham member since"));
				   frappe.validated = false;
				}
			}
});