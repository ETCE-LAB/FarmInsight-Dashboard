import React, { useState, useMemo, useEffect } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch } from "../../../utils/Hooks";
import { createHarvestEntity } from "../useCase/createHarvestEntity";
import { modifyHarvestEntity } from "../useCase/modifyHarvestEntity";
import { changedHarvestEntity } from "../state/HarvestEntitySlice";
import { HarvestEntity } from "../models/harvestEntity";

export const HarvestEntityForm: React.FC<{
    growingCycleId: string;
    toEditHarvestEntity: HarvestEntity | null;
    onSuccess: (message: string, color: string) => void;
}> = ({ growingCycleId, toEditHarvestEntity, onSuccess }) => {
    const { t } = useTranslation();
    const [harvestEntity, setHarvestEntity] = useState<HarvestEntity>({ growingCycleId: growingCycleId } as HarvestEntity);
    const dispatch = useAppDispatch();

    const handleInputChange = (field: string, value: any) => {
        setHarvestEntity((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (toEditHarvestEntity) {
            try {
                await modifyHarvestEntity(harvestEntity.id, harvestEntity);
                showNotification({
                    title: "Success",
                    message: "Harvest entity edited successfully!",
                    color: "green",
                });
                onSuccess("Harvest entity edited successfully!", "green");
            } catch (error) {
                showNotification({
                    title: "Failed to save the harvest entity",
                    message: `${error}`,
                    color: "red",
                });
            }
        } else {
            try {
                await createHarvestEntity(harvestEntity);
                showNotification({
                    title: "Success",
                    message: "Harvest entity created successfully!",
                    color: "green",
                });
                onSuccess("Harvest entity created successfully!", "green");
            } catch (error) {
                showNotification({
                    title: "Failed to save the harvest entity",
                    message: `${error}`,
                    color: "red",
                });
            }
        }
        dispatch(changedHarvestEntity());
    };

    const isFormValid = useMemo(() => {
        return harvestEntity.date && harvestEntity.amountInKg > 0;
    }, [harvestEntity]);

    useEffect(() => {
        if (toEditHarvestEntity) {
            setHarvestEntity(toEditHarvestEntity);
        }
    }, [toEditHarvestEntity]);

    return (
        <>
            <DateInput
                label={t("harvestEntityForm.dateLabel")}
                placeholder={t("harvestEntityForm.datePlaceholder")}
                required
                value={harvestEntity.date ? new Date(harvestEntity.date) : null}
                onChange={(date) => handleInputChange("date", date)}
                style={{ width: "100%", marginBottom: "15px" }}
            />
            <TextInput
                label={t("harvestEntityForm.amountLabel")}
                placeholder={t("harvestEntityForm.amountPlaceholder")}
                required
                type="number"
                value={harvestEntity.amountInKg || ""}
                onChange={(e) => handleInputChange("amountInKg", parseFloat(e.currentTarget.value))}
                style={{ width: "100%", marginBottom: "15px" }}
            />
            <TextInput
                label={t("harvestEntityForm.notesLabel")}
                placeholder={t("harvestEntityForm.notesPlaceholder")}
                value={harvestEntity.note || ""}
                onChange={(e) => handleInputChange("note", e.currentTarget.value)}
                style={{ width: "100%", marginBottom: "15px" }}
            />
            <Flex justify="flex-end">
                <Button
                    style={{ width: "30%", marginTop: "1rem" }}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    {t("harvestEntityForm.saveButton")}
                </Button>
            </Flex>
        </>
    );
};
