import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const RuleBookModal = ({ ruleVisible, setRuleVisible, rulBookCriteria }) => {
  const { t } = useTranslation(); //i18n instance

  return (
    <Modal visible={ruleVisible} transparent>
      <View style={styles.modalMainView}>
        <View style={styles.modalsubview}>
          <View style={styles.modaltopview}>
            <Text style={styles.modalheadtext}>{t('rulebook')}</Text>
            <TouchableOpacity onPress={() => setRuleVisible(false)}>
              <Image
                source={require('../../../assets/images/cancel.png')}
                style={styles.modalcancelimage}
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            {rulBookCriteria && rulBookCriteria.length > 0 ? (
              <ScrollView>
                {rulBookCriteria.map((res, i) => (
                  <View key={i} style={styles.modallistview}>
                    <View style={styles.modalsublistview}>
                      <View style={styles.modallistleftview}>
                        <Text
                          style={styles.modallistlefttext}
                          numberOfLines={2}
                        >
                          {res.description}
                        </Text>
                      </View>
                      <View style={styles.modallistrightview}>
                        <View style={styles.modallistbutton}>
                          <Text style={styles.modalpointstext}>
                            {`${res.points} pts`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.loadingView}>
                <Text>{t('nodata')}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RuleBookModal;
