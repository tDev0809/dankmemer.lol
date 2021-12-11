export const hot = {
	$divide: [
		{
			$round: [
				{
					$multiply: [
						{
							$add: [
								{
									$ln: {
										$divide: [
											{
												$add: ["$upvotes", 1],
											},
											2.302585092994046,
										],
									},
								},
								{
									$divide: [
										{
											$subtract: [
												{
													$divide: [
														"$createdAt",
														1000,
													],
												},
												1631640684,
											],
										},
										45000,
									],
								},
							],
						},
						10000000,
					],
				},
				7,
			],
		},
		10000000,
	],
};
