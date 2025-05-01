import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Avatar,
    IconButton,
    Typography,
    Container,
    CircularProgress,
    Snackbar,
    Alert,
    Paper
} from '@mui/material';
import { PhotoCamera, Edit } from '@mui/icons-material';
import axios from 'axios';

const styles = {
    wrapper: {
        minHeight: '100vh',
        background: '#111b21',
        color: '#e9edef'
    },
    container: {
        padding: '20px 0',
        backgroundColor: 'transparent'
    },
    header: {
        fontSize: '32px',
        color: '#e9edef',
        marginBottom: '30px',
        paddingLeft: '16px'
    },
    section: {
        backgroundColor: '#222e35',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '16px'
    },
    sectionTitle: {
        color: '#008069',
        fontSize: '14px',
        marginBottom: '14px',
        fontWeight: 500
    },
    avatarBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '24px',
        position: 'relative'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: '50%'
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: '50%',
        transform: 'translateX(50%)',
        backgroundColor: '#00a884',
        '&:hover': {
            backgroundColor: '#008069'
        }
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px',
        position: 'relative'
    },
    label: {
        color: '#008069',
        fontSize: '14px',
        marginBottom: '8px'
    },
    value: {
        color: '#e9edef',
        fontSize: '16px',
        padding: '8px 0',
        borderBottom: '1px solid #374045'
    },
    editButton: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8696a0'
    },
    helperText: {
        color: '#8696a0',
        fontSize: '14px',
        marginTop: '4px'
    }
};

function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        status: '',
        profileImage: null
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [previewImage, setPreviewImage] = useState(null);
    const [editMode, setEditMode] = useState({
        name: false,
        status: false
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/api/users/profile');
            if (response.data.success) {
                setUser(response.data.user);
                if (response.data.user.profileImage) {
                    setPreviewImage(`/uploads/profiles/${response.data.user.profileImage}`);
                }
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Failed to fetch profile'
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage({
                    type: 'error',
                    text: 'Image size should be less than 5MB'
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                handleSave('profileImage', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (field, value) => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (field === 'profileImage') {
                formData.append('profileImage', value);
            } else {
                formData.append(field, value);
            }

            const response = await axios.put('/api/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setUser(prev => ({ ...prev, [field]: value }));
                setMessage({
                    type: 'success',
                    text: 'Profile updated successfully'
                });
                setEditMode(prev => ({ ...prev, [field]: false }));
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Box sx={styles.wrapper}>
            <Container maxWidth="md" sx={styles.container}>
                <Typography variant="h1" sx={styles.header}>
                    Profile
                </Typography>

                <Box sx={styles.section}>
                    <Box sx={styles.avatarBox}>
                        <Avatar
                            src={previewImage || '/default-avatar.png'}
                            sx={styles.avatar}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="profile-image"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="profile-image">
                            <IconButton
                                color="primary"
                                component="span"
                                sx={styles.uploadButton}
                                disabled={loading}
                            >
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Box>

                    <Box sx={styles.field}>
                        <Typography sx={styles.label}>
                            Your name
                        </Typography>
                        {editMode.name ? (
                            <TextField
                                value={user.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onBlur={() => handleSave('name', user.name)}
                                autoFocus
                                fullWidth
                                variant="standard"
                                sx={{ input: { color: '#e9edef' } }}
                            />
                        ) : (
                            <>
                                <Typography sx={styles.value}>
                                    {user.name}
                                </Typography>
                                <IconButton
                                    sx={styles.editButton}
                                    onClick={() => setEditMode(prev => ({ ...prev, name: true }))}
                                >
                                    <Edit />
                                </IconButton>
                            </>
                        )}
                        <Typography sx={styles.helperText}>
                            This is not your username or PIN. This name will be visible to your WhatsApp contacts.
                        </Typography>
                    </Box>

                    <Box sx={styles.field}>
                        <Typography sx={styles.label}>
                            About
                        </Typography>
                        {editMode.status ? (
                            <TextField
                                value={user.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                onBlur={() => handleSave('status', user.status)}
                                autoFocus
                                fullWidth
                                variant="standard"
                                sx={{ input: { color: '#e9edef' } }}
                            />
                        ) : (
                            <>
                                <Typography sx={styles.value}>
                                    {user.status}
                                </Typography>
                                <IconButton
                                    sx={styles.editButton}
                                    onClick={() => setEditMode(prev => ({ ...prev, status: true }))}
                                >
                                    <Edit />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>

            <Snackbar
                open={!!message.text}
                autoHideDuration={6000}
                onClose={() => setMessage({ type: '', text: '' })}
            >
                <Alert 
                    severity={message.type} 
                    onClose={() => setMessage({ type: '', text: '' })}
                    sx={{ 
                        backgroundColor: message.type === 'success' ? '#008069' : '#ea0038',
                        color: '#e9edef'
                    }}
                >
                    {message.text}
                </Alert>
            </Snackbar>

            {loading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000
                    }}
                >
                    <CircularProgress sx={{ color: '#00a884' }} />
                </Box>
            )}
        </Box>
    );
}

export default UserProfile;