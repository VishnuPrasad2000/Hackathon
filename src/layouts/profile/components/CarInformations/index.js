import React from 'react';
import { Card, Stack, Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import GreenLightning from 'assets/images/shapes/green-lightning.svg';
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import carProfile from 'assets/images/shapes/car-profile.svg';
import CircularProgress from '@mui/material/CircularProgress';
const CarInformations = () => {
	const { gradients, info } = colors;
	const { cardContent } = gradients;
	return (
		<Card
			sx={({ breakpoints }) => ({
				[breakpoints.up('xxl')]: {
					maxHeight: '400px'
				}
			})}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='6px'>
					Your Activity Informations
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
					Hello, Adminstrator!.
				</VuiTypography>
				<Stack
					spacing='24px'
					background='#fff'
					sx={({ breakpoints }) => ({
						[breakpoints.up('sm')]: {
							flexDirection: 'column'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row'
						},
						[breakpoints.only('xl')]: {
							flexDirection: 'column'
						}
					})}>
					<VuiBox
						display='flex'
						flexDirection='column'
						justifyContent='center'
						sx={({ breakpoints }) => ({
							[breakpoints.only('sm')]: {
								alignItems: 'center'
							}
						})}
						alignItems='center'>
						<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
							<CircularProgress variant='determinate' value={60} size={170} color='info' />
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiBox component='img' src={GreenLightning} />
								<VuiTypography color='white' variant='h2' mt='6px' fontWeight='bold' mb='4px'>
									68%
								</VuiTypography>
								<VuiTypography color='text' variant='caption'>
									Time Spend
								</VuiTypography>
							</VuiBox>
						</VuiBox>
						<VuiBox
							display='flex'
							justifyContent='center'
							flexDirection='column'
							sx={{ textAlign: 'center' }}>
							<VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
								0h 58 min
							</VuiTypography>
							<VuiTypography color='text' variant='button' fontWeight='regular'>
								Remaining Time of the day
							</VuiTypography>
						</VuiBox>
					</VuiBox>
					<Grid
						container
						sx={({ breakpoints }) => ({
							spacing: '24px',
							[breakpoints.only('sm')]: {
								columnGap: '0px',
								rowGap: '24px'
							},
							[breakpoints.up('md')]: {
								gap: '24px',
								ml: '50px !important'
							},
							[breakpoints.only('xl')]: {
								gap: '12px',
								mx: 'auto !important'
							}
						})}>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									minHeight: '110px',
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Target Achievement
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										76%
									</VuiTypography>
								</VuiBox>
								<VuiBox
									display='flex'
									justifyContent='center'
									alignItems='center'
									sx={{
										background: info.main,
										borderRadius: '12px',
										width: '56px',
										height: '56px'
									}}>
									<VuiBox component='img' src={carProfile} />
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Efficiency
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										+20%
									</VuiTypography>
								</VuiBox>
								{/* <VuiBox sx={{ maxHeight: '75px' }}>
									<LineChart
										lineChartData={lineChartDataProfile1}
										lineChartOptions={lineChartOptionsProfile1}
									/>
								</VuiBox> */}
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									minHeight: '110px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Consumption
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										101%
									</VuiTypography>
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										This Week
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										1.3425
									</VuiTypography>
								</VuiBox>
								{/* <VuiBox sx={{ maxHeight: '75px' }}>
									<LineChart
										lineChartData={lineChartDataProfile2}
										lineChartOptions={lineChartOptionsProfile2}
									/>
								</VuiBox> */}
							</VuiBox>
						</Grid>
					</Grid>
				</Stack>
			</VuiBox>
		</Card>
	);
};

export default CarInformations;
