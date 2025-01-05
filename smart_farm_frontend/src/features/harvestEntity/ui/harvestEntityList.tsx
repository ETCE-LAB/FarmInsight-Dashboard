import React, { useState } from "react";
import {
    Card,
    Modal,
    Table,
    Notification,
    Group,
    Button,
    Text,
    Flex,
    Paper,
    Grid,
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { IconCircleMinus, IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { HarvestEntityForm } from "./harvestEntityForm";
import { HarvestEntity } from "../models/harvestEntity";
import { deleteHarvestEntity } from "../useCase/deleteHarvestEntity";
import { changedHarvestEntity } from "../state/HarvestEntitySlice";
import { useAppDispatch } from "../../../utils/Hooks";
import { showNotification } from "@mantine/notifications";

const truncateText = (text: string, limit: number): string => {
    if (text.length > limit) {
        return `${text.slice(0, limit)}...`;
    }
    return text;
};

const HarvestEntityList: React.FC<{ growingCycleID: string; harvestEntities: HarvestEntity[] }> = ({ growingCycleID, harvestEntities }) => {
    const [showHarvestEntityForm, setShowHarvestEntityForm] = useState(false);
    const { t } = useTranslation();
    const [toEditHarvestEntity, setToEditHarvestEntity] = useState<HarvestEntity | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState<HarvestEntity | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<HarvestEntity | null>(null);

    const dispatch = useAppDispatch();

    const closeModal = () => {
        setShowHarvestEntityForm(false);
        setToEditHarvestEntity(null);
    };

    const handleDelete = (entity: HarvestEntity) => {
        setEntityToDelete(entity);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (entityToDelete) {
            deleteHarvestEntity(entityToDelete.id)
                .then(() => {
                    dispatch(changedHarvestEntity());
                    showNotification({
                        title: 'Success',
                        message: `Harvest entry for ${entityToDelete.date.toLocaleDateString()} has been deleted successfully.`,
                        color: 'green',
                    });
                })
                .catch(() => {
                    showNotification({
                        title: 'Error',
                        message: 'Failed to delete the harvest entry.',
                        color: 'red',
                    });
                })
                .finally(() => {
                    setShowDeleteConfirmation(false);
                    setEntityToDelete(null);
                });
        }
    };

    return (
        <>
            {/* Modal for Adding/Editing Harvest Entities */}
            <Modal
                opened={showHarvestEntityForm}
                onClose={closeModal}
                title={toEditHarvestEntity ? "Edit Harvest Entry" : "Add Harvest Entry"}
            >
                <HarvestEntityForm
                    growingCycleId={growingCycleID}
                    toEditHarvestEntity={toEditHarvestEntity}
                    onSuccess={(message, color) => {
                        closeModal();
                    }}
                />
            </Modal>

            {/* Modal for Harvest Entity Details */}
            <Modal
                opened={!!selectedEntity}
                onClose={() => setSelectedEntity(null)}
                title={`Harvest Entry Details`}
                centered
            >
                {selectedEntity && (
                    <Paper style={{ width: "100%" }}>
                        <Grid>
                            <Grid.Col span={6}>
                                <Text size="sm"><strong>Date:</strong></Text>
                                {selectedEntity.date ? new Date(selectedEntity.date).toLocaleDateString() : ""}
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text size="sm"><strong>Amount (kg):</strong></Text>
                                <Text size="sm">{selectedEntity.amountInKg}</Text>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Text size="sm"><strong>Notes:</strong></Text>
                                <Text size="sm">{selectedEntity.note || "No notes available."}</Text>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                )}
            </Modal>

            {/* Modal for Delete Confirmation */}
            <Modal
                opened={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                title="Are you sure you want to delete this harvest entry?"
                centered
            >
                <Text style={{ fontSize: "14px", textAlign: "center", marginBottom: "1rem" }}>
                    {t("headers.confirmDialog")}
                </Text>
                <Group gap="center" justify={"center"}>
                    <Button color="red" onClick={confirmDelete}>
                        {t("header.yesDelete")}
                    </Button>
                    <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
                        {t("header.cancel")}
                    </Button>
                </Group>
            </Modal>

            {/* Card Component */}
            <Card
                shadow="sm"
                padding="md"
                radius="md"
                style={{ marginTop: "1rem", width: "100%" }}
            >
                <Flex>
                    <Table striped highlightOnHover style={{ width: "100%" }}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>{t('header.table.date')}</Table.Th>
                                <Table.Th>{t('header.table.amount')}</Table.Th>
                                <Table.Th>{t('header.table.notes')}</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {harvestEntities.map((entity) => (
                                <Table.Tr key={entity.id}>
                                    <Table.Td
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setSelectedEntity(entity)}
                                    >
                                        {entity.date ? new Date(entity.date).toLocaleDateString() : ""}
                                    </Table.Td>
                                    <Table.Td>{entity.amountInKg}</Table.Td>
                                    <Table.Td>{truncateText(entity.note, 12)}</Table.Td>
                                    <Table.Td>
                                        <IconCircleMinus
                                            onClick={() => handleDelete(entity)}
                                            size={20}
                                            style={{ cursor: "pointer", color: "darkred" }}
                                        />
                                        <IconEdit
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowHarvestEntityForm(true);
                                                setToEditHarvestEntity(entity);
                                            }}
                                            size={20}
                                            style={{ cursor: "pointer", color: "#105385", marginLeft: "1rem" }}
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

export default HarvestEntityList;
