<script lang="ts">
  import { onMount } from 'svelte';
  import LeadActions from './lead-actions/LeadActions.svelte';
  import type { User } from '@supabase/supabase-js';
  import type { Lead } from '../../lib/types';
  import { apiUrl } from '../../lib/utils';

  export let callback: () => void;
  // $: user = null as User | null;
  $: lead = null as Lead | null;

  const loadLead = async () => {
    const leadId = window.location.href.split('/').pop()?.split('?')[0];

    lead = (await (
      await fetch(`${apiUrl}/lead/${leadId}`)
    ).json()) as unknown as Lead;

    callback();
  };

  onMount(async () => {
    chrome.storage.sync.get(['user'], result => {
      console.log('Value currently is ', result.user?.email);
      // user = result.user;
    });

    // watch for changes
    // chrome.storage.onChanged.addListener((changes, namespace) => {
    //   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     if (key === 'user') {
    //       user = newValue;
    //     }
    //   }
    // });
  });

  $: {
    // if (user) {
    loadLead();
    // }
  }
</script>

<div id="bta-integration" class="w-full">
  {#if lead}
    <LeadActions {lead} />
  {/if}
</div>
