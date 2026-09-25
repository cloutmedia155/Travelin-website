# Homepage UI and motion audit

Source: Olivia’s 24 September 2026 audit of the previous published page. `before/` contains its supplied screenshots. `after/` contains browser captures of the revised local preview at 1363px desktop, 390px or 320px mobile. Captures show layout and specific scroll states; they do not measure frame rate or real phone behavior.

## 1. Opening hero door animation

**Issue:** The door stayed closed while the headline, supporting copy and scroll progress changed. This occurred at several desktop scroll positions and again on a second pass. The opening takes several screens of scrolling, so the missing reveal makes it feel stalled. The exact cause and frame-rate smoothness were not established.

**Fix prompt (client wording):** Fix only the opening door sequence. Preserve the blue atmosphere, white door, typography and cinematic idea. Make the approach, door opening and passage into the next section visibly happen in that order. Keep the sequence short enough that normal scrolling feels responsive. If the animation cannot play, show a deliberate attractive fallback with readable copy and a working Find your trip action; never trap the visitor in a closed-door scene. Test a fresh visit, reload, slow scroll, fast scroll and reverse scroll. On mobile, use a shorter, separately composed sequence. Provide desktop and real mobile before/after evidence.

**Change and check:** Shortened the sticky hero, tied door-video time to scroll, retained the first-screen action and added an opened-door poster for media error/reduced motion. Desktop browser observed approximately 1.14s, 2.24s and 4.11s of video time across forward scroll and reverse playhead movement. Physical-phone smoothness remains unverified.

**Evidence:** [Before image1.jpg](before/image1.jpg) · [After desktop-door-opening.jpg](after/desktop-door-opening.jpg) · [After desktop-door-passage.jpg](after/desktop-door-passage.jpg)

## 2. Opening hero headline and trip button

**Issue:** On desktop, the trip action is a small header link; the larger button appears later in the sequence. A visitor ready to browse trips should not have to wait. On mobile, the headline overlaps the white door frame, reducing contrast and making the scene feel crowded. The offer also needs a short explanation that these are personally hosted group trips.

**Fix prompt (client wording):** Fix the first hero screen while preserving the door, sky, colors and typography. Add one short line explaining personally hosted group trips and make Find your trip clearly visible beside the opening copy. Keep the scroll cue secondary. Recompose the mobile headline so it sits in a readable area and does not cross the white door frame. Keep the door visually prominent. Visitors must be able to browse trips immediately without waiting for the animation. Check the full first screen on desktop and a narrow mobile viewport.

**Change and check:** Added a short personally hosted group trip explanation and immediately visible Find your trip action. Repositioned mobile copy below the door. Checked desktop and 390px mobile first screen; no horizontal overflow at 320px.

**Evidence:** [Before image2.jpg](before/image2.jpg) · [Before image3.png](before/image3.png) · [After desktop-hero.jpg](after/desktop-hero.jpg) · [After mobile-hero-390.jpg](after/mobile-hero-390.jpg)

## 3. Cloud transitions

**Issue:** The video-to-trips transition produces a large white panel with a straight edge. The hero exit also becomes an almost blank white wash. These overlays cover the scene instead of creating a soft transition. The panel edge is visible in the screenshot above.

**Fix prompt (client wording):** Refine only the cloud overlays at the hero exit and around the group video. Remove visible rectangular boundaries, hard white panels and long white-out moments. Use a brief, feathered atmospheric transition that reveals the next section promptly. Keep the video, faces, controls and section title unobstructed. Remove clouds from the video itself if they do not improve the transition. Give mobile a lighter, simpler treatment that cannot cover the whole viewport. Check the beginning, middle and end of each transition in both scroll directions, not just the final resting frame.

**Change and check:** Removed the hard cloud layers at the scene exit and over the group film. Inspected desktop passage in both scroll directions; no prolonged blank white panel in the reviewed frames.

**Evidence:** [Before image4.jpg](before/image4.jpg) · [After desktop-door-passage.jpg](after/desktop-door-passage.jpg)

## 4. Spacing before and inside The Experience

**Issue:** There is too much empty travel between the hero and the Experience introduction, then more waiting between its chapters. At the reviewed desktop size, the hero and Experience together occupy roughly 8,200 vertical pixels before the group video begins. Some of that is intentional animation space, but several positions show little useful content. The spacing should support the story rather than prolong it.

**Fix prompt (client wording):** Tighten the pacing from the hero exit through The Experience. Keep elegant breathing room, but remove long stretches where scrolling reveals no new image, message or meaningful transition. Bring the Experience introduction into view sooner and make the handoff to The stay feel connected. Use consistent spacing between the three chapters. On mobile, keep each chapter readable in a compact vertical sequence; do not inherit desktop-length scroll holds. Review the whole journey at normal scrolling speed and provide captures of each handoff.

**Change and check:** Reduced the hero from the prior long hold to roughly 2,200px at the tested desktop viewport; the group film begins around 4,896px instead of about 8,200px. Experience chapters flow in document order on mobile.

**Evidence:** [Before image5.jpg](before/image5.jpg) · [After desktop-experience.jpg](after/desktop-experience.jpg)

## 5. The Experience photo movement and mobile layout

**Issue:** On desktop, the photos travel toward the right edge and bunch together while the heading disappears. The third photo and its caption are clipped. The mobile capture shows the same composition compressed into 390 pixels: the second image is cut off, the third is largely outside the screen, and the text is separated from the photos by a large gap. A separate mobile capture also shows multiple chapters overlapping during transition. The scrapbook direction can stay, but the movement needs tighter control.

**Fix prompt (client wording):** Refine only the three Experience photo chapters. Keep the scrapbook character and a small amount of rotation, but reduce sideways travel and exaggerated exits. Give each chapter a clear resting composition with its heading, paragraph and all important captions readable together. Keep complete caption text inside the viewport and avoid empty intervals between outgoing and incoming chapters. For mobile, compose the photos specifically for a narrow screen: one main image or a controlled vertical stack, with modest motion and no sideways clipping. Preserve image quality and do not replace the section with generic cards.

**Change and check:** Restrained image movement and rotation; mobile uses a composed stack. Three desktop caption boxes fit within the 1363px viewport; captions in tested 390px mobile chapters remained within page bounds.

**Evidence:** [Before image6.jpg](before/image6.jpg) · [Before image7.png](before/image7.png) · [After desktop-experience.jpg](after/desktop-experience.jpg) · [After mobile-experience-390.jpg](after/mobile-experience-390.jpg)

## 6. Group video playback

**Issue:** Clicking Watch the experience on desktop opens a second player in a popup and starts the film from the beginning. The original video remains behind it. This breaks the full-width scene and conflicts with the requested behaviour: restart the video with sound in its existing position.

**Fix prompt (client wording):** Change only the Watch the experience interaction. Keep playback in the existing video section. On click or tap, restart that video from the beginning with sound, fade out the promotional heading and play label, and reveal clear player controls in the same frame. Do not open a modal, move the video elsewhere or create a second simultaneous player. Keep the surrounding page position stable. Let visitors pause, mute and explicitly choose fullscreen. Apply the same in-place behaviour on mobile and verify sound activation on a real phone after a user tap.

**Change and check:** The same video restarts in place and unmutes on user activation; native controls appear and the promotional overlay leaves. DOM inspection found one player and no modal. Real phone sound activation remains unverified; the film was not watched under the client’s instruction.

**Evidence:** [Before image8.jpg](before/image8.jpg)

## 7. Group video text and framing

**Issue:** The headline and play label sit over bright, detailed footage, so their readability changes with the frame. On mobile, the heading and button cross the central person's face. The bottom cloud overlay adds another layer over the image. The film should feel like the main content, with the controls easy to read and the people clearly framed.

**Fix prompt (client wording):** Improve only the group-video preview composition. Choose a calm opening moment with people clearly framed. Keep the headline and play action legible over both bright and dark footage using a restrained local shade or a better text position. Remove decorative layers that obscure people. Once playback with sound starts, clear the promotional overlay. On mobile, choose a deliberate portrait crop or contain the film when necessary so important faces are not lost. Review several points in the video rather than approving one flattering still.

**Change and check:** Repositioned copy with a local shade, removed clouds covering the footage, hides promotional copy during playback, and contains the film on mobile. Several video frames cannot be approved without viewing the film; the client asked us not to watch it.

**Evidence:** [Before image9.jpg](before/image9.jpg) · [Before image10.png](before/image10.png)

## 8. Trip selector and destination details

**Issue:** Punta Cana has dates, a price and an Explore action. Switching to Phuket works, but its unconfirmed dates and price are only revealed after selection. The destination tabs do not communicate availability early enough. In the mobile capture, the introduction also reads 'work.Then' without a space. Dates, price and the full-width trip button otherwise stack clearly and should be preserved.

**Fix prompt (client wording):** Fix the trip selector's information hierarchy. Show which destinations are bookable and which have dates coming soon before a visitor selects them. Keep date, duration, price and action connected to the selected image. Keep the existing accurate data and enquiry actions; do not invent dates, prices or availability. On mobile, correct the missing space in 'work.Then', preserve the clear stacked details and full-width trip button, and keep all destination choices discoverable. Verify that changing destination updates the image, details and action together.

**Change and check:** Tabs state availability before selection. Fixed `work.Then` spacing and kept image, details and action tied to the selected trip. Tested Bali and Phuket selections; no dates or prices were invented.

**Evidence:** [Before image11.jpg](before/image11.jpg) · [Before image12.png](before/image12.png) · [After mobile-trips-320.jpg](after/mobile-trips-320.jpg)

## 9. Traveler section placeholder

**Issue:** The live page displays 'Traveler video stories will be added here' beneath the group photos on both desktop and mobile. It exposes unfinished content in a section that should build confidence. Remove the line and its unused space. Keep the real photographs; do not replace the missing content with invented testimonials.

**Fix prompt (client wording):** Fix only the bottom of Who's coming with you. Remove the public placeholder 'Traveler video stories will be added here' and close the unused space it leaves. Keep the real group photos. If approved traveler videos or genuine attributed quotes already exist, add those with clear play controls or readable attribution; otherwise let the section end confidently with its existing content. Never invent a testimonial, rating or traveler identity. Check the resulting spacing and caption readability on desktop and mobile.

**Change and check:** Removed the public placeholder and its unused spacing while keeping existing group photos. DOM check found no placeholder. No testimonial or rating was invented.

**Evidence:** [Before image13.jpg](before/image13.jpg) · [Before image14.png](before/image14.png)

## 10. Camera roll gallery entrance

**Issue:** At the gallery entrance, the enlarged central photo covers the heading area and partly hides the section label. Later, the collage settles and the heading becomes readable. The problem is the intermediate composition, not a permanently missing heading. Keep the final collage character and make the entrance equally deliberate.

**Fix prompt (client wording):** Refine only the camera-roll gallery entrance. Preserve the real photographs and the final collage character. Keep the section label and heading in a protected area while the central image scales, or intentionally reveal the heading after the image clears that area. Reduce the entrance scale and travel enough to avoid an accidental-looking collision. Keep important faces sensibly framed. On mobile, use fewer simultaneous images and a compact, readable composition; do not squeeze the full desktop scatter into a narrow viewport.

**Change and check:** Reduced entrance image scale, protected heading stacking and limited mobile collage density. Final intermediate gallery scroll frames still need visual signoff; CSS/build checks alone cannot prove this interaction.

**Evidence:** [Before image15.jpg](before/image15.jpg)

## 11. Cancellation FAQ

**Issue:** The cancellation accordion opens correctly, but the answer says to read the cancellation policy without linking to it. Visitors should be able to reach the relevant terms directly from this answer. This finding concerns navigation; it does not assess the policy wording itself.

**Fix prompt (client wording):** Fix only the cancellation FAQ's next step. Link the policy reference to the correct existing approved policy, or clearly link to the selected trip's booking terms if policies vary by trip. Use a descriptive visible label such as Read cancellation terms. Do not invent a policy URL or rewrite refund promises. If there is no approved destination, flag that missing content for the owner instead of pretending the link works. Keep the answer readable and the link easy to tap on mobile.

**Change and check:** Changed the answer to invite a request for the selected trip’s terms through a working email link. **Owner input required:** provide the approved policy URL or each trip’s booking terms for the requested direct link. No approved destination was supplied.

**Evidence:** [Before image16.jpg](before/image16.jpg)

## 12. Booking steps and flowering branch

**Issue:** The booking path is a sparse curved line with large detached leaf and flower symbols. It does not match the requested continuous tree branch with small flowers growing from both sides. The artwork also takes up too much space compared with the three practical steps. The connection between the branch, flowers and step sequence needs to be clearer.

**Fix prompt (client wording):** Redesign only the decorative path in the three-step booking section. Make it one continuous, delicate botanical branch connecting steps 01, 02 and 03. Attach small stems, leaves and flowers naturally along both sides; remove the detached oversized symbols. As visitors scroll, extend the branch and let small buds open into flowers in a calm sequence. Keep every step readable and prevent artwork crossing text. On mobile, use a simple vertical branch beside stacked steps, with less motion and tighter spacing. Retain the muted green palette and elegant line weight.

**Change and check:** Replaced detached icons with a continuous SVG branch and attached stems, leaves and flowers. Scroll draws the branch; reduced-motion displays it completed. Desktop and 390px mobile captures show steps legible beside it.

**Evidence:** [Before image17.jpg](before/image17.jpg) · [After desktop-branch.jpg](after/desktop-branch.jpg) · [After mobile-branch-390.jpg](after/mobile-branch-390.jpg)

## Verification limits

Desktop and emulated 390px/320px mobile layouts were inspected, including forward/reverse hero scrolling, trip selection, FAQ action and one-player DOM. A physical phone touch/audio test and measured frame-rate study were not performed. The group film was not watched under the client’s instruction. A direct cancellation policy link needs an approved owner-supplied destination. After captures are local preview screenshots, not live-site evidence.
