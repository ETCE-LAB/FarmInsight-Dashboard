import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { getUserProfilesBySearchString } from "../useCase/getUserProfilesBySearchString";
import { UserProfile } from "../models/UserProfile";

interface SearchUserProfileProps {
    onUserSelected: (user: UserProfile) => void;
}

export const SearchUserProfile = ({ onUserSelected }: SearchUserProfileProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm) {
                getUserProfilesBySearchString(searchTerm).then((profiles) => {
                    if (profiles)
                        setUserProfiles(profiles);
                });
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <>
            <Input
                placeholder="Search User Profile"
                style={{ width: '100%', marginBottom: '15px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div style={{ marginTop: '10px' }}>
                {userProfiles.length > 0 ? (
                    userProfiles.map((profile, index) => (
                        <div
                            key={index}
                            onClick={() => onUserSelected(profile)} // Call `onUserSelected` when clicked
                            style={{
                                padding: '12px',
                                marginBottom: '8px',
                                border: '2px solid #105385',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                        >
                            <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                                {profile.name}
                            </p>
                            <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>
                                {profile.email}
                            </p>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888' }}>No user profiles found</p>
                )}
            </div>
        </>
    );
};
