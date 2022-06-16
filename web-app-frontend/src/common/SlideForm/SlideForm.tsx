import { Box, Divider, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { PageContainer } from 'common/PageContainer/PageContainer';
import { FormikProps } from 'formik';
import _ from 'lodash';
import { PropsWithChildren, Ref } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    titlePath: string;
    slidesPath: string;
    buttons: JSX.Element;
    slideCount: number;
    currentSlide: number;
};

export type SlideProps<T> = {
    formRef: Ref<FormikProps<T>>;
    initialValues: T;
    setValues: (values: T) => void;
};

export const SlideForm = ({
    titlePath,
    slidesPath,
    buttons,
    slideCount,
    currentSlide,
    children,
}: PropsWithChildren<Props>) => {
    const { t } = useTranslation();

    return (
        // no idea what overwrites this padding bottom, but couldnt find another way
        <PageContainer
            sx={{ paddingBottom: '0px !important' }}
            header={
                <>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div">
                            {t(titlePath)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stepper sx={{ mt: 2 }} activeStep={currentSlide} alternativeLabel>
                            {_.range(slideCount).map((_, idx) => (
                                <Step key={idx}>
                                    <StepLabel>{t(`${slidesPath}.${idx}.title`)}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                </>
            }
        >
            <Box sx={{ px: 2, mt: 4, mb: 4, marginX: '5%' }}>{children}</Box>

            <Divider />

            <Box sx={{ p: 1 }}>{buttons}</Box>
        </PageContainer>
    );
};
