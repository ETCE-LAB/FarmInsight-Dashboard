import React, { useState } from "react";
import {
    Card,
    Modal,
    Table,
    Group,
    Button,
    Text,
    Flex,
    Paper,
    Grid,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
    IconCirclePlus,
    IconEdit,
    IconSeeding,
    IconInfoSquareRounded,
    IconSquareRoundedMinus,
} from "@tabler/icons-react";
import { GrowingCycleForm } from "./growingCycleForm";
import { GrowingCycle } from "../models/growingCycle";
import { removeGrowingCycle } from "../useCase/removeGrowingCycle";
import { changedGrowingCycle, deleteGrowingCycle } from "../state/GrowingCycleSlice";
import { useAppDispatch } from "../../../utils/Hooks";

import HarvestEntityList from "../../harvestEntity/ui/harvestEntityList";
import { HarvestEntityForm } from "../../harvestEntity/ui/harvestEntityForm";
import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { useAuth } from "react-oidc-context";

const truncateText = (text: string, limit: number): string => {
    if (text.length > limit) {
        return `${text.slice(0, limit)}...`;
    }
    return text;
};

const GrowingCycleList: React.FC<{ fpfId: string }> = ({ fpfId }) => {
    const [showGrowingCycleForm, setShowGrowingCycleForm] = useState(false);
    const { t } = useTranslation();
    const [activeModal, setActiveModal] = useState<"growingCycleForm" | "harvestForm" | "details" | "deleteConfirmation" | null>(null);
    const [toEditGrowingCycle, setToEditGrowingCycle] = useState<GrowingCycle | null>(null);
    const [cycleToDelete, setCycleToDelete] = useState<GrowingCycle | null>(null);
    const [selectedCycle, setSelectedCycle] = useState<GrowingCycle | null>(null);
    const dispatch = useAppDispatch();
    const growingCycles = useSelector((state: RootState) => state.growingCycle.growingCycles);
    const auth = useAuth();

    const closeAllModals = () => {
        setActiveModal(null);
        setToEditGrowingCycle(null);
        setCycleToDelete(null);
        setSelectedCycle(null);
    };

    const handleDelete = (cycle: GrowingCycle) => {
        setCycleToDelete(cycle);
        console.log(cycle)
        setActiveModal("deleteConfirmation");
    };

    const confirmDelete = () => {
        if (cycleToDelete) {
            removeGrowingCycle(cycleToDelete.id)
                .then((result) => {
                    if (result) {
                        dispatch(deleteGrowingCycle(cycleToDelete.id));
                        dispatch(changedGrowingCycle());
                        showNotification({
                            title: "Success",
                            message: `Growing cycle for ${cycleToDelete.plants} has been deleted successfully.`,
                            color: "green",
                        });
                    } else {
                        showNotification({
                            title: "Error",
                            message: "Failed to delete the growing cycle",
                            color: "red",
                        });
                    }
                })
                .catch(() => {
                    showNotification({
                        title: "Error",
                        message: "Failed to delete the growing cycle",
                        color: "red",
                    });
                })
                .finally(() => closeAllModals());
        }
    };

    return (
        <>
            <Modal
                opened={activeModal === "growingCycleForm"}
                onClose={closeAllModals}
                centered
                title={toEditGrowingCycle ? "Edit Growing Cycle" : "Add Growing Cycle"}
            >
                <GrowingCycleForm
                    fpfId={fpfId}
                    toEditGrowingCycle={toEditGrowingCycle}
                    closeForm={closeAllModals}
                />
            </Modal>

            {/* Modal for Harvest Entity Form */}
            <Modal
                opened={activeModal === "harvestForm"}
                onClose={() => setActiveModal("details")}
                title={t("harvestEntityForm.addHarvest")}
                centered
            >
                {selectedCycle && (
                    <HarvestEntityForm
                        growingCycleId={selectedCycle.id}
                        toEditHarvestEntity={null}
                        onSuccess={() => {
                            setActiveModal(null)
                            setActiveModal("details")
                            dispatch(changedGrowingCycle());
                        }}
                    />
                )}
            </Modal>

            <Modal
                opened={activeModal === "details"}
                onClose={closeAllModals}
                title={`${t("header.table.details")} ${selectedCycle?.plants}`}
                centered
            >
                {selectedCycle && (
                    <>
                        <Paper>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Text size="sm">
                                        <strong>{t("header.table.name")}</strong>
                                    </Text>
                                    <Text size="sm">{selectedCycle.plants}</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text size="sm">
                                        <strong>{t("header.table.planted")}</strong>
                                    </Text>
                                    <Text size="sm">
                                        {selectedCycle.startDate
                                            ? new Date(selectedCycle.startDate).toLocaleDateString()
                                            : "N/A"}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text size="sm">
                                        <strong>{t("header.table.notes")}</strong>
                                    </Text>
                                    <Text size="sm">{selectedCycle.note || "No notes available."}</Text>
                                </Grid.Col>
                            </Grid>
                        </Paper>

                        {selectedCycle.harvests && (
                            <HarvestEntityList growingCycleID={selectedCycle.id} />
                        )}
                    </>
                )}
            </Modal>

            {/* Modal for Delete Confirmation */}
            <Modal
                opened={activeModal === "deleteConfirmation"}
                onClose={closeAllModals}
                title="Are you sure you want to delete this growing cycle?"
                centered
            >
                <Text style={{ fontSize: "14px", textAlign: "center", marginBottom: "1rem" }}>
                    {t("header.confirmDialog")}
                </Text>
                <Group gap="center" justify={"center"}>
                    <Button color="red" onClick={confirmDelete}>
                        {t("header.yesDelete")}
                    </Button>
                    <Button variant="outline" onClick={closeAllModals}>
                        {t("header.cancel")}
                    </Button>
                </Group>
            </Modal>

            <Card radius="md" padding="md" style={{ height: "45vh", overflowY: "hidden" }}>
                <IconCirclePlus
                    size={25}
                    aria-disabled={!auth.user}
                    onClick={
                        auth.user
                            ? () => {
                                setActiveModal("growingCycleForm");
                                setToEditGrowingCycle(null);
                            }
                            : undefined
                    }
                    style={{
                        cursor: auth.user ? "pointer" : "not-allowed",
                        color: auth.user ? "#105385" : "#a1a1a1",
                    }}
                />
                <Flex>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th />
                                <Table.Th>{t("header.table.name")}</Table.Th>
                                <Table.Th>{t("header.table.planted")}</Table.Th>
                                <Table.Th>{t("header.totalHarvestAmount")}</Table.Th>
                                <Table.Th>{t("header.table.notes")}</Table.Th>
                                <Table.Th />
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {growingCycles.map((cycle) => (
                                <Table.Tr key={cycle.id}>
                                    <Table.Td>
                                        <IconSeeding
                                            style={{
                                                marginRight: "0.5rem",
                                                color: "green",
                                            }}
                                        />
                                    </Table.Td>
                                    <Table.Td>{truncateText(cycle.plants, 12)}</Table.Td>
                                    <Table.Td>
                                        {cycle.startDate
                                            ? new Date(cycle.startDate).toLocaleDateString()
                                            : ""}
                                    </Table.Td>
                                    <Table.Td>
                                        {(() => {
                                            const totalHarvest = cycle.harvests?.reduce((sum, harvest) => sum + harvest.amountInKg, 0) || 0;
                                            if (totalHarvest < 1) {
                                                const grams = totalHarvest * 1000; // Umrechnung in Gramm
                                                return `${grams} g`;
                                            } else {
                                                return `${totalHarvest} kg`;
                                            }
                                        })()}
                                    </Table.Td>
                                    <Table.Td>
                                        {cycle.note ? truncateText(cycle.note, 12) : ""}
                                    </Table.Td>
                                    <Table.Td>
                                        <IconSquareRoundedMinus
                                            onClick={() => handleDelete(cycle)}
                                            size={25}
                                            style={{ cursor: "pointer", color: "#a53737", marginRight: "1rem" }}
                                        />
                                        <IconEdit
                                            onClick={() => {
                                                setActiveModal("growingCycleForm");
                                                setToEditGrowingCycle(cycle);
                                            }}
                                            size={25}
                                            style={{ cursor: "pointer", color: "#105385"}}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <IconInfoSquareRounded
                                            onClick={() => {
                                                setSelectedCycle(cycle);
                                                setActiveModal("details");
                                            }}
                                            size={25}
                                            style={{ cursor: "pointer", color: "#2D6A4F" }}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Flex>
            </Card>
        </>
    );
};

export default GrowingCycleList;
