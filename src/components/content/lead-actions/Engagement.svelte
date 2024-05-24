<script lang="ts">
  import { Calendar, Camera, PhoneCall } from 'lucide-svelte';
  import type { Lead } from '../../../lib/types';
  import { apiUrl } from '../../../lib/utils';
  import EmailLink from './EmailLink.svelte';

  export let lead = null as Lead | null;

  $: loading = false;
  $: error = null as string | null;
  $: message = null as string | null;

  const postCallResult = async (status: string) => {
    if (!lead) return;

    loading = true;

    fetch(`${apiUrl}/status-update`, {
      method: 'POST',
      body: JSON.stringify({
        status,
        lead_id: lead.lead_id,
        contact_id: lead.contact_id,
        email: lead?.email,
        name: lead.name,
        responsible_user_id: lead.responsible_user_id,
        responsible_user_name: lead.responsible_user_name,
      }),
    })
      .then(async res => {
        console.log('Call updated', res);
        message = 'Call result updated';
      })
      .catch(err => {
        error = err.message;
      })
      .finally(() => {
        loading = false;
        setTimeout(() => {
          error = null;
          message = null;
        }, 2000);
      });
  };

  $: {
    console.log({ message });
  }
</script>

{#if lead && !loading}
  <p class="text-xl font-semibold text-black">Ready for the meeting?</p>
  <p class="text-sm text-black">Let's move this lead to the "Meeting" stage.</p>

  <div
    class="flex flex-wrap -mx-2 space-x-2 space-y-2 w-full text-xs font-medium"
  >
    <div />
    <EmailLink {lead} />
    <button
      on:click={() => {
        postCallResult('to_meeting');
      }}
      class="flex items-center px-2 py-1 font-semibold text-white bg-blue-600 rounded border shadow"
    >
      <Calendar class="inline-block mr-1 w-3 h-3" />
      Move to "Meeting"
    </button>
  </div>
{/if}

{#if loading}
  <div
    class="flex justify-center items-center mt-2 w-full h-full text-lg font-semibold animate-pulse"
  >
    Doing the magic 🪄
  </div>
{/if}

{#if error}
  <div class="w-[90%] p-4 mt-2 bg-red-500 border rounded shadow-md">
    <p class="text-lg font-semibold text-white">Error: {error}</p>
  </div>
{/if}

{#if message}
  <div class="w-[90%] p-4 mt-2 bg-green-500 border rounded shadow-md">
    <p class="text-lg font-semibold text-white">Success: {message}</p>
  </div>
{/if}
