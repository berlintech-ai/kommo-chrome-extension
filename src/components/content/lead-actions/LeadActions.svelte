<script lang="ts">
  import { onMount } from 'svelte';
  import InitialCall from './InitialCall.svelte';
  import type { Lead } from '../../../lib/types';
  import NewLead from './NewLead.svelte';
  import Signing from './Signing.svelte';
  import Engagement from './Engagement.svelte';
  import Angebot from './Angebot.svelte';
  import Email from './Email.svelte';

  export let lead: Lead | null = null;

  $: stage = 'New Leads';

  onMount(async () => {
    // https://subscriptionberlintechai.kommo.com/leads/detail/9781682?tab_id=statistic
    // lead id is 9781682

    const stageNode = document.querySelector(
      '.pipeline-select__dropdown__item_selected',
    );
    if (stageNode) {
      // @ts-expect-error - innerText is not defined on Element
      stage = stageNode.innerText;
    }
  });
</script>

{#if stage === 'New Leads'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <NewLead {lead} />
  </div>
{/if}

{#if stage === 'Initial Call'}
  <div
    class="w-[96%] p-4 pt-2 border border-black rounded shadow-md shadow-black bg-slate-50"
  >
    <InitialCall {lead} />
  </div>
{/if}

{#if stage === 'Contract Signing'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Signing {lead} />
  </div>
{/if}

{#if stage === 'Angebot Issuing'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Angebot {lead} />
  </div>
{/if}

{#if stage === 'Engagement'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Engagement {lead} />
  </div>
{/if}

{#if stage === 'Contract Preparation'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}

{#if stage === 'Payment'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}

{#if stage === 'Meeting'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}
{#if stage === 'Angebot Preparation'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}

{#if stage === 'Gutschein Issuing'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}

{#if stage === 'Closed - won'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}
{#if stage === 'Closed - lost'}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <Email {lead} />
  </div>
{/if}

<!-- 
 -->
