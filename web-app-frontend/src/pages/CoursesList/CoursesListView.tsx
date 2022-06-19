import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { PageContainer } from 'common/PageContainer/PageContainer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { mockCourseSummaryList } from 'utils/mocks';
import { TEACHER, WithRole } from 'utils/roles';
import { PageRoutes } from 'utils/routes';
import { CourseSummaryView } from './components/CourseSummaryView';

export const CoursesListView = () => {
    const [courseSummaryItems] = useState(mockCourseSummaryList);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <PageContainer
            header={
                <>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="div">
                            {t('myCourses.header')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <WithRole roles={[TEACHER]}>
                            <Button onClick={() => navigate(PageRoutes.CREATE_COURSE)}>
                                {t('myCourses.createCourseButton')}
                            </Button>
                        </WithRole>
                    </Grid>
                </>
            }
        >
            <Container>
                <Stack spacing={2} px={2}>
                    {courseSummaryItems.map((course) => (
                        <CourseSummaryView key={course.id} courseSummary={course} />
                    ))}
                </Stack>
                <Box sx={{ height: 1000 }} />
            </Container>
        </PageContainer>
    );
};