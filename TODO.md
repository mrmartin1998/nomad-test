# TODO List

## Current Tasks

### High Priority
- [ ] Add center card with exact Figma pose
- [ ] Add left card with exact Figma pose
- [ ] Verify all three cards align perfectly with Figma comp
- [ ] Test expansion animation from collapsed to expanded state

### Medium Priority
- [ ] Optimize image loading performance
- [ ] Add loading states for card images
- [ ] Implement error handling for missing assets

### Low Priority
- [ ] Add accessibility attributes
- [ ] Add keyboard navigation support
- [ ] Optimize for mobile devices

## Completed Tasks ✅

### Component Development
- [x] Create new FigmaFolderStack component in the components directory
- [x] Add necessary image assets to the public directory
- [x] Implement the component with the provided code and make necessary adjustments
- [x] Update component to use local image assets instead of placeholder URLs
- [x] Fix root cause of stretched card appearance by implementing square card boxes
- [x] Add ghost overlay system for pixel-perfect validation
- [x] Implement sprite-based solution for collapsed state
- [x] Implement calibration version with pixel-perfect checks
- [x] Implement snap-to-integer positioning fix
- [x] Fix hook ordering to follow React rules
- [x] Add proper effect dependencies
- [x] Implement non-uniform scaling for pixel-perfect match
- [x] Add visual debug outline for target box
- [x] Add temporary visual outline helper
- [x] Adjust right card position by 1px
- [x] Fine-tune folder position to 51.5%
- [x] Restore right card to exact Figma coordinates
- [x] Remove debug outline
- [x] Add CSS variable for easy crop tuning
- [x] Create script for generating 360x208 folder asset
- [x] Simplify component to use pre-processed asset
- [x] Remove object-fit and position tricks
- [x] Create CommonJS version of Sharp script
- [x] Add width/height attributes to folder img for harder raster lock
- [x] Update component to use folder-360x208-v2.png
- [x] Add loading='eager' and fetchPriority='high' for performance
- [x] Add interactive tuning controls for right card
- [x] Add dev HUD with current values
- [x] Set height: 'auto' to preserve card aspect ratio
- [x] Switch back to original folder-white-blur.png
- [x] Add vertical bleed space for cards
- [x] Remove overflow:hidden constraint
- [x] Bottom-align folder in comp box
- [x] Hide HUD by default but keep hotkeys enabled
- [x] Add willChange: transform for better performance
- [x] Clean up hotkey code organization
- [x] Update RIGHT_DEFAULT with exact Figma comp measurements
- [x] Add detailed comments explaining card positioning
- [x] Add temporary bring-to-front flag for tuning
- [x] Add debug stroke to card when in front
- [x] Add error handling for card image loading
- [x] Add coordinate math comments
- [x] Turn off bring-to-front flag
- [x] Remove debug stroke from card
- [x] Restore natural z-index stacking
- [x] Update card position for original folder-white-blur.png
- [x] Adjust x offset to +109px for proper peek-out
- [x] Move card up with y: -7px
- [x] Add coordinate math comments showing final positions
- [x] Update RIGHT_DEFAULT with pixel-perfect measurements
- [x] Adjust x offset to +128px for exact Figma match
- [x] Fine-tune y offset to -6px
- [x] Update coordinate math comments
- [x] Update RIGHT_DEFAULT with final pixel-perfect measurements
- [x] Adjust x offset to +136px for final position
- [x] Fine-tune y offset to -12px for final position
- [x] Update coordinate math comments with final values
- [x] Remove unused BRING_CARD_TO_FRONT_WHILE_TUNING flag
- [x] Clean up component structure and comments

### Asset Management
- [x] Create make-visa-assets.cjs script
- [x] Add npm script for asset generation
- [x] Update package.json with sharp dependency

### Testing & Validation
- [x] Verify pixel-perfect match and smooth expansion
- [x] Verify pixel-lock with debug overlay and fix any warnings
- [x] Verify no console warnings and pixel-perfect alignment
- [x] Verify frame1-stack.png exists at /public/assets/visa-folder/frame1-stack.png
- [x] Verify folder-white-blur.png exists at /public/assets/visa-folder/folder-white-blur.png
- [x] Check console for any remaining pixel-lock warnings
- [x] Export individual card PNGs from Figma (373×373 with border+shadow)
- [x] Place pyramids.png in /public/assets/visa-folder/cards/
- [x] Verify Pyramids card alignment with folder lip/horizon
- [x] Fine-tune CENTER_TOP if needed (integer values only)
- [x] Verify folder centers correctly at natural aspect ratio
- [x] Check right card position with new scaling math
- [x] Add middle and left cards once base is solid
- [x] Verify console shows pixel-perfect 360×208
- [x] Check if non-uniform scaling looks better than natural aspect
- [x] Verify no more hook-related console errors
- [x] Check if folder-white-blur.png loads correctly
- [x] Verify folder maintains proper aspect ratio
- [x] Check if crop position needs adjustment
- [x] Fine-tune FOLDER_POS_Y for lip alignment
- [x] Verify right card position in 360×208 space
- [x] Verify console shows correct 360×208 size
- [x] Check if folder lip aligns with Figma at 51.5%
- [x] Verify final visual match with Figma
- [x] Run asset generation script
- [x] Verify folder-360x208.png matches Figma exactly
- [x] Install sharp dependency
- [x] Run make:visa script and verify output
- [x] Check Network tab for successful 200 response
- [x] Verify console shows correct 360×208 size
- [x] Fine-tune right card position using hotkeys
- [x] Update RIGHT_DEFAULT with final values
- [x] Turn off DEBUG when satisfied
- [x] Fine-tune BLEED_TOP if needed
- [x] Verify cards can extend above folder
- [x] Verify HUD toggle with 'g' key works
- [x] Test card adjustments with hotkeys while HUD is hidden
- [x] Update RIGHT_DEFAULT once position is finalized
- [x] Verify card position matches Figma comp exactly
- [x] Check for any 1px drift at different DPR/zoom levels
- [x] Verify card is visible and adjustable
- [x] Test final stacking by setting BRING_CARD_TO_FRONT_WHILE_TUNING to false
- [x] Verify card sits behind folder (z=6 vs z=10)
- [x] Confirm HUD toggle still works without affecting stacking
- [x] Verify card peeks out ~32px past folder edge
- [x] Check card sits ~7-8px above folder top
- [x] Test hard refresh to verify layout
- [x] Verify final position (left: 205px, top: -13px)
- [x] Check for 1px drift on different DPRs
- [x] Verify final position (left: 213px, top: -19px)
- [x] Confirm pixel-perfect match with Figma comp

## Notes

### Current Status
- Right card is positioned at pixel-perfect coordinates matching Figma comp
- Component uses original folder-white-blur.png with proper stacking
- Hotkeys enabled for micro-adjustments if needed
- HUD hidden by default but accessible with 'g' key

### Final Measurements
- **Right Card**: size=206, x=136, y=-12, rotate=13.6°, z=6
- **Final Position**: left=213px, top=-19px
- **Stacking**: Card behind folder (z=6 vs z=10)

### Next Steps
1. Add center card with exact Figma measurements
2. Add left card with exact Figma measurements  
3. Verify all three cards align perfectly
4. Test expansion animation
