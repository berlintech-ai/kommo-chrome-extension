<script lang="ts">
  import { onMount } from 'svelte';
  import type { Lead } from '../../../lib/types';
  import { apiUrl } from '../../../lib/utils';

  export let lead: Lead | null = null;

  $: stage = 'New Leads';
  $: stage_actions =
    lead?.settings?.actions[stage] || lead?.settings?.actions['default'];
  $: actions = stage_actions?.actions || [];
  $: loading = false;
  $: error = null as string | null;
  $: showMessage = false;

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

  const postCallResult = async (status: string, inputId?: string) => {
    if (!lead) return;

    let inputValue = '';
    if (inputId) {
      const inputNode = document.querySelector(`#${inputId}`);
      if (inputNode) {
        // @ts-expect-error - value is not defined on Element
        inputValue = inputNode.value;
      }
    }

    loading = true;

    fetch(`${apiUrl}/status-update`, {
      method: 'POST',
      body: JSON.stringify({
        status,
        input: inputValue,
        lead_id: lead.lead_id,
        contact_id: lead.contact_id,
        email: lead?.email,
        name: lead.name,
        responsible_user_id: lead.responsible_user_id,
        responsible_user_name: lead.responsible_user_name,
      }),
    })
      .then(() => {
        showMessage = true;
      })
      .catch(err => {
        error = err.message;
      })
      .finally(() => {
        loading = false;
        setTimeout(() => {
          error = null;
          showMessage = true;
        }, 2000);
      });
  };
</script>

{#if stage_actions}
  <div class="p-4 pt-2 w-full rounded border shadow-md bg-slate-50">
    <p class="text-xl font-semibold text-black">
      {stage_actions?.title ?? `"${stage}" stage actions`}
    </p>
    {#if stage_actions?.description}
      <p class="text-sm text-black">{stage_actions?.description}</p>
    {/if}

    <div />
    <div class="flex flex-wrap gap-2 mt-2 w-full text-xs font-medium">
      {#if !loading && !showMessage}
        {#each actions as action}
          {#if action.href}
            <a href={action.href} target="_blank">
              <button
                class="flex items-center px-2 py-1 font-semibold text-white bg-blue-600 rounded border shadow transition cursor-pointer hover:opacity-80"
              >
                <img
                  alt={action.name}
                  src={`https://unpkg.com/lucide-static@latest/icons/${action.icon}.svg`}
                  class="p-1 -mx-2 -my-1 mr-2 w-4 h-4 text-current rounded-sm border border-black bg-slate-200"
                />

                {action.name}</button
              >
            </a>
          {:else if action.action === 'META:GAP'}
            <div class="flex w-full"></div>
          {:else if action.action}
            <button
              class="flex items-center px-2 py-1 font-semibold text-white bg-blue-600 rounded border shadow transition cursor-pointer hover:opacity-80"
              on:click={() => postCallResult(action.action ?? '')}
            >
              <img
                alt={action.name}
                src={`https://unpkg.com/lucide-static@latest/icons/${action.icon}.svg`}
                class="p-1 -mx-2 -my-1 mr-2 w-4 h-4 text-current rounded-sm border border-black bg-slate-200"
              />

              {action.name}</button
            >
          {:else if action.input}
            <div class="flex items-center space-x-2">
              <label class="font-semibold" for={action.input.name}
                >{action.input.label}</label
              >
              <input
                id={action.input.name}
                type={action.input.type}
                placeholder={action.input.placeholder}
                class="px-2 py-1 rounded border shadow w-[200px] transition cursor-pointer hover:opacity-80"
              />
              <button
                on:click={() =>
                  // @ts-expect-error - input is not defined on Element
                  postCallResult(action.input.name, action.input.name)}
                class="px-2 py-1 font-semibold text-white bg-blue-600 rounded border shadow transition cursor-pointer hover:opacity-80"
              >
                Submit
              </button>
            </div>
          {/if}
        {/each}
      {/if}

      {#if loading}
        <div
          class="flex mt-2 w-full h-full text-base font-medium animate-pulse"
        >
          🪄 Doing the magic... 🪄
        </div>
      {/if}
    </div>
    {#if error}
      <div class="px-4 py-2 mt-2 bg-red-500 rounded border shadow-md">
        <p class="text-base font-medium text-white">Error: {error}</p>
      </div>
    {/if}
    {#if showMessage}
      <div class="px-4 py-2 mt-2 bg-green-500 rounded border shadow-md">
        <p class="text-base font-semibold text-white">Success</p>
      </div>
    {/if}
  </div>
{/if}
