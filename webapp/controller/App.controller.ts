import Controller from "sap/ui/core/mvc/Controller";
import { URLHelper } from "sap/m/library";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Currency from "sap/ui/model/type/Currency";

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
}