import React from 'react';

import { Theme } from '../../styles/theme';

import { Container } from './styles';

import { Row } from '../../styles/global';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import CalendarPicker from 'react-native-calendar-picker';

export default function Calendar({ setModalVisibility, setDate, date }) {
  return (
    <Container>
      <Row justify='flex-end' padding={4}>
        <MaterialCommunityIcons
          size={30}
          color={Theme.colors.error}
          name={'close-circle'}
          onPress={() => setModalVisibility(false)}
        />
      </Row>

      <CalendarPicker
        width={350}
        startFromMonday={true}
        weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
        previousTitle='Anterior'
        nextTitle='Próximo'
        selectedStartDate={date}
        onDateChange={(day) => {
          setDate(day);
          setModalVisibility(false);
        }}
        minDate={new Date()}
        todayBackgroundColor={'transparent'}
        selectedDayColor={Theme.colors.primary}
        todayBackgroundColor={'#c5c5c5'}
        todayTextStyle={'black'}
        selectedDayTextColor={'white'}
        previousTitleStyle={{ color: Theme.colors.primary }}
        nextTitleStyle={{ color: Theme.colors.primary }}
      />
    </Container>
  );
}
