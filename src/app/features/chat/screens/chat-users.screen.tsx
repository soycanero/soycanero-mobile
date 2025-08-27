import ChatUsersList from '../components/chat-users-list';
import Layout from '@/features/shared/layout';
import React from 'react';

export default function ChatUsersScreen() {
  return (
    <Layout mode="view">
      <ChatUsersList />
    </Layout>
  );
}
