import { useState, useEffect } from 'react';
import { Paper, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Simulator } from 'components/simulator/Simulator';
import { getUserRole } from 'context/role';
import {
  COLLECTION_SEARCH_QUERY_VARIABLES,
  DEFAULT_CONTACT_LIMIT,
  DEFAULT_MESSAGE_LIMIT,
  SEARCH_QUERY_VARIABLES,
} from 'common/constants';
import ChatConversations from 'containers/Chat/ChatConversations/ChatConversations';
import ChatMessages from 'containers/Chat/ChatMessages/ChatMessages';
import SimulatorIcon from 'assets/images/icons/Simulator.svg?react';
import CollectionConversations from 'containers/Chat/CollectionConversations/CollectionConversations';
import styles from './GroupChatInterface.module.css';
import { groupSearchQuery } from 'mocks/Groups';

const tabs = [
  {
    label: 'Contacts',
    link: '/group/chat',
  },
  {
    label: 'Collections',
    link: '/group/chat/collection/',
  },
];
export interface GroupChatInterfaceProps {
  collections?: boolean;
}

export const GroupChatInterface = ({ collections }: GroupChatInterfaceProps) => {
  const navigate = useNavigate();
  const [simulatorAccess, setSimulatorAccess] = useState(true);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorId, setSimulatorId] = useState(0);
  const { t } = useTranslation();
  const [value, setValue] = useState(tabs[0].link);
  const params = useParams();
  const MOCK_PHONENUMBERS = [
    { label: '918657048983', value: '918657048983' },
    { label: '918439201748', value: '918439201748' },
    { label: '918781934028', value: '918781934028' },
  ];

  const [phonenumber, setPhonenumber] = useState<string>(MOCK_PHONENUMBERS[0].value);
  let selectedContactId = params.contactId;
  let selectedCollectionId: any = params.collectionId;

  // default query variables
  let queryVariables = SEARCH_QUERY_VARIABLES;

  // contact id === collection when the collection id is not passed in the url
  let selectedTab = 'contacts';
  if (selectedCollectionId || collections) {
    queryVariables = COLLECTION_SEARCH_QUERY_VARIABLES;
    selectedTab = 'collections';
  }

  const data = groupSearchQuery({ limit: DEFAULT_MESSAGE_LIMIT }, DEFAULT_CONTACT_LIMIT, {})?.result
    ?.data;

  useEffect(() => {
    if (getUserRole().includes('Staff')) {
      setSimulatorAccess(false);
    }
  }, []);

  // let's handle the case when the type is collection  then we set the first collection
  // as the selected collection
  if (!selectedContactId && collections && data && data.search.length !== 0) {
    if (data.search[0].collections) {
      selectedCollectionId = data.search[0].collections[0].id;
      selectedContactId = '';
    }
  }

  // let's handle the case when contact id and collection id is not passed in the url then we set the
  // first record as selected contact
  if (!selectedContactId && !selectedCollectionId && data && data.search.length !== 0) {
    if (data.search[0].group) {
      selectedContactId = data.search[0].group.id;
    }
  }

  const noConversations = (
    <Typography variant="h5" className={styles.NoConversations}>
      {t('There are no chat conversations to display.')}
    </Typography>
  );

  let groupChatInterface: any;
  let listingContent;

  const getSimulatorId = (id: any) => {
    setSimulatorId(id);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  if (data && data.search.length === 0) {
    groupChatInterface = noConversations;
  } else {
    let heading = '';

    if (selectedCollectionId || selectedTab === 'collections') {
      listingContent = <CollectionConversations groups collectionId={selectedCollectionId} />;
      heading = 'Group Collections';
    } else if (selectedContactId) {
      // let's enable simulator only when contact tab is shown

      listingContent = (
        <ChatConversations
          setPhonenumber={setPhonenumber}
          phonenumber={phonenumber}
          groups
          contactId={simulatorId > 0 ? simulatorId : selectedContactId}
        />
      );

      heading = 'Groups';
    }

    groupChatInterface = (
      <>
        <div className={`${styles.ChatMessages} chatMessages`}>
          <ChatMessages
            phonenumber={phonenumber}
            groups
            contactId={simulatorId > 0 ? simulatorId : selectedContactId}
            collectionId={selectedCollectionId}
            bspId={data.search[0].group.bspId}
          />
        </div>

        <div className={`${styles.ChatConversations} ChatConversations`}>
          <div className={styles.Title}>
            <div className={styles.Heading}> {heading}</div>
          </div>

          <div className={styles.TabContainer}>
            <Tabs value={value} onChange={handleTabChange} aria-label="chat tabs">
              {tabs.map((tab) => (
                <Tab
                  key={tab.label}
                  classes={{ selected: styles.TabSelected }}
                  className={styles.Tab}
                  label={tab.label}
                  value={tab.link}
                  disableRipple
                />
              ))}
            </Tabs>
          </div>

          <div>{listingContent}</div>
        </div>
      </>
    );
  }

  const handleCloseSimulator = (value: boolean) => {
    setShowSimulator(value);
    setSimulatorId(0);
  };

  return (
    <Paper>
      <div className={styles.Chat} data-testid="chatContainer">
        {groupChatInterface}
      </div>
      {selectedTab === 'contacts' && (
        <SimulatorIcon
          data-testid="simulatorIcon"
          className={styles.SimulatorIcon}
          onClick={() => {
            setShowSimulator(!showSimulator);
            if (showSimulator) {
              setSimulatorId(0);
            }
          }}
        />
      )}
      {simulatorAccess && !selectedCollectionId && showSimulator ? (
        <Simulator setShowSimulator={handleCloseSimulator} getSimulatorId={getSimulatorId} />
      ) : null}
    </Paper>
  );
};

export default GroupChatInterface;
