<script>
  import { Mail } from 'lucide-svelte';

  export let lead;
</script>

<a
  href={`https://admin.berlintech.ai/sales/emails?leadId=${lead.lead_id}`}
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center px-2 py-1 font-semibold text-white bg-gray-600 rounded border shadow"
>
  <Mail class="inline-block mr-1 w-3 h-3" />
  Email
</a>
