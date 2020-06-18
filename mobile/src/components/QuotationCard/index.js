import React from 'react';

import { TouchableOpacity, View } from 'react-native';

import { withTheme } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import {
  Content,
  Container,
  Navbar,
  Typography,
  Row,
  Button,
  Input,
} from '../../styles/global';

function QuotaionCard({ theme, quotation, removeFromQuotions }) {
  return (
    <View style={{ flex: 1, width: 250, marginHorizontal: 10 }}>
      <Row justify='space-between'>
        <Typography
          color={theme.colors.secondary}
          fontWeight='bold'
          uppercase
          fontSize={25}
        >
          {quotation.index + 1}
        </Typography>

        <TouchableOpacity onPress={() => removeFromQuotions(quotation.index)}>
          <AntDesign size={30} color={theme.colors.error} name={'delete'} />
        </TouchableOpacity>
      </Row>
      <Input
        disabled
        dense
        mb={10}
        mt={10}
        mode='outlined'
        value={quotation.item.site}
        label='Site'
      />
      <Input
        disabled
        dense
        mode='outlined'
        value={quotation.item.value}
        keyboardType={'number-pad'}
        label='Valor'
      />
    </View>
  );
}

export default withTheme(QuotaionCard);
