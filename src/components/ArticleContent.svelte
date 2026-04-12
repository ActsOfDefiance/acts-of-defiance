<script lang="ts">
  // Svelte 5 island — article content tab switcher.
  // "The Story" (TLDR) is the default; "Deep Dive" (Research) is the full article.
  // Both sections are pre-rendered server-side and passed as HTML strings.
  let { storyHtml, deepHtml }: { storyHtml: string; deepHtml: string } = $props();
  let active = $state<'story' | 'deep'>('story');
</script>

<!-- Tab selector -->
<div class="flex gap-sm mt-xl border-t border-outline-variant pt-lg">
  <!-- The Story tab -->
  <button
    type="button"
    onclick={() => active = 'story'}
    style="flex:1; text-align:left; padding: var(--spacing-md); cursor:pointer; background:{active !== 'story' ? 'white' : 'var(--color-surface-container)'}; {active !== 'story' ? 'border-bottom:4px solid var(--color-primary-container); box-shadow:0 4px 8px -2px rgba(0,0,0,0.12)' : ''}"
  >
    <div
      style="font-family:var(--font-headline); font-size:var(--text-caption); text-transform:uppercase; font-weight:700; letter-spacing:0.1em; margin-bottom:var(--spacing-2xs); color:{active === 'story' ? 'var(--color-primary-md)' : 'inherit'}; opacity:{active === 'story' ? '1' : '0.6'}"
    >
      Short Read
    </div>
    <div style="font-family:var(--font-headline); font-size:var(--text-body-lg); font-weight:700; line-height:1.2">
      The Story
    </div>
    <div
      style="height:4px; margin-top:var(--spacing-sm); background:var(--color-primary-container); transition:width var(--duration-arrive) var(--ease-manifesto); width:{active === 'story' ? '100%' : '0'}"
    ></div>
  </button>

  <!-- Deep Dive tab -->
  <button
    type="button"
    onclick={() => active = 'deep'}
    style="flex:1; text-align:left; padding: var(--spacing-md); cursor:pointer; background:{active !== 'deep' ? 'white' : 'var(--color-surface-container)'}; {active !== 'deep' ? 'border-bottom:4px solid var(--color-primary-container); box-shadow:0 4px 8px -2px rgba(0,0,0,0.12)' : ''}"
  >
    <div
      style="font-family:var(--font-headline); font-size:var(--text-caption); text-transform:uppercase; font-weight:700; letter-spacing:0.1em; margin-bottom:var(--spacing-2xs); color:{active === 'deep' ? 'var(--color-primary-md)' : 'inherit'}; opacity:{active === 'deep' ? '1' : '0.6'}"
    >
      Full Research
    </div>
    <div style="font-family:var(--font-headline); font-size:var(--text-body-lg); font-weight:700; line-height:1.2">
      Deep Dive
    </div>
    <div
      style="height:4px; margin-top:var(--spacing-sm); background:var(--color-primary-container); transition:width var(--duration-arrive) var(--ease-manifesto); width:{active === 'deep' ? '100%' : '0'}"
    ></div>
  </button>
</div>

<!-- Content -->
<article style="background:var(--color-parchment); padding: var(--spacing-2xl) var(--spacing-container-x)">
  <div class="prose mx-auto max-w-reading">
    {@html active === 'story' ? storyHtml : deepHtml}
  </div>
</article>
