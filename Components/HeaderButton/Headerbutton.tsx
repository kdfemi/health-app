import React, {FC} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {HeaderButton, HeaderButtonProps
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton: FC<HeaderButtonProps> = (props) => (
  <HeaderButton IconComponent={Ionicons} iconSize={32}  {...props} />
);

export default IoniconsHeaderButton