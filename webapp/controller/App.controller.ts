import Controller from "sap/ui/core/mvc/Controller";
import { URLHelper } from "sap/m/library";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Currency from "sap/ui/model/type/Currency";
import { ListBase$ItemPressEvent } from "sap/m/ListBase";
import ObjectAttribute from "sap/m/ObjectAttribute";
import Context from "sap/ui/model/Context";
import ObjectListItem from "sap/m/ObjectListItem";
import StandardListItem from "sap/m/StandardListItem";

/**
 * @namespace my.databinding.databinding.controller
 */
export default class App extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public formatMail(firstName: string, lastName: string): string {
        
        const bundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;

        return URLHelper.normalizeEmail(
            `${firstName}.${lastName}@example.com`,
            bundle.getText("mailSubject", [firstName]),
            bundle.getText("mailBody")
        );
    }

    public formatStockValue(fUnitPrice: number, iStockLevel: number, sCurrCode: string) {
        const oCurrency = new Currency();

        return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
    }

    public onItemSelected(event: ListBase$ItemPressEvent) {
        const selectedItem = event.getSource();
        const context = selectedItem.getBindingContext("products");
        let path = context?.getPath();
        const productDetailPanel = this.byId("productDetailsPanel");
        productDetailPanel?.bindElement({
            path: path ??= "",
            model: "products"
        });

    }

    public productListFactory(sId: string, oContext: Context) {

        let oUIControl: StandardListItem | ObjectListItem;

        // Decide based on the data which dependent to clone
        if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
            // The item is discontinued, so use a StandardListItem
            oUIControl = this.byId("productSimple")?.clone(sId) as StandardListItem;
        } else {
            // The item is available, so we will create an ObjectListItem
            oUIControl = this.byId("productExtended")?.clone(sId) as ObjectListItem;

            // The item is temporarily out of stock, so we will add a status
            if (oContext.getProperty("UnitsInStock") < 1) {
                oUIControl.addAttribute(new ObjectAttribute({
                    text : {
                        path: "i18n>outOfStock"
                    }
                }));
            }
        }

        return oUIControl;
    }
}