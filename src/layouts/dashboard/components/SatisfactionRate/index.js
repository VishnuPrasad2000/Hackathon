import React from 'react';

import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoHappy } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { Margin } from '@mui/icons-material';

const SatisfactionRate = () => {
	const { info, gradients } = colors;
	const { cardContent } = gradients;

	return (
		<Card sx={{ height: '375px' }}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='4px'>
					Evaluation Rate
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='20px'>
					From all Calls
				</VuiTypography>
				<VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
					<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress variant='determinate' value={60} size={150} color='info' />
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox
								sx={{
									background: info.main,
									transform: 'translateY(-5%)',
									width: '50px',
									height: '50px',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<IoHappy size='30px' color='#fff' />
							</VuiBox>
						</VuiBox>
					</VuiBox>
				</VuiBox>
				<VuiBox
				 mt={10}
					sx={({ breakpoints }) => ({
						width: '90%',
						padding: '18px 22px',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						height: '82px',
						mx: 'auto',
						borderRadius: '20px',
						background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
						transform: 'translateY(-90%)',
						zIndex: '1000'
					})}>
					<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						0%
					</VuiTypography>
					<VuiBox
						flexDirection='column'
						display='flex'
						justifyContent='center'
						alignItems='center'
						sx={{ minWidth: '50px'}}>
						<VuiTypography color='white' variant='h3'>
							95%
						</VuiTypography>
						<VuiTypography color='text' variant='caption' fontWeight='regular'>
							Based on responses
						</VuiTypography>
					</VuiBox>
					<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						100%
					</VuiTypography>
				</VuiBox>
			</VuiBox>
		</Card>
	);
};

export default SatisfactionRate;
