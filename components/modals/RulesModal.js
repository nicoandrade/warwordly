import Modal from "./Modal";
import { Trans, useTranslation } from "next-i18next";

export default function RulesModal({ isOpen, setIsOpen }) {
    const { t } = useTranslation(["battle"]);

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="prose prose-sm sm:prose-base px-4 py-6 sm:p-8 lg:p-10">
                <h3>{t("rulesTitle")}</h3>
                <Trans i18nKey="rulesDescription" ns="battle" />

                <ul className="pl-0 list-none text-sm space-y-4">
                    <li className="flex items-center">
                        <span className="w-8 h-8 rounded-lg border-2 bg-gray-200 border-gray-300 inline-block mr-2 shrink-0" />
                        {t("rulesIncorrect")}
                    </li>
                    <li className="flex items-center">
                        <span className="w-8 h-8 rounded-lg border-2 bg-orange-200 border-orange-600 inline-block mr-2 shrink-0" />
                        {t("rulesWrongPosition")}
                    </li>
                    <li className="flex items-center">
                        <span className="w-8 h-8 rounded-lg border-2 bg-green-600 border-green-600 inline-block mr-2 shrink-0" />
                        {t("rulesCorrect")}
                    </li>
                </ul>
            </div>
        </Modal>
    );
}
