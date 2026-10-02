/* Session state shared across scenes (what the manager did this morning). */
export const state={
  edits:new Map(),         // productId → manager's quantity
  reviewed:new Set(),      // productIds opened in the approval sheet
  rejected:new Set(),
  sim:null,                // {pop} while the what-if slider is away from the forecast
  approved:false,
  approvedAt:null,
  revisedByChat:false,
  sessionStart:Date.now(),   // when the film started
  morningStart:null,         // when the approval sheet opened
  sound:false,
  reset(){
    this.edits.clear();this.reviewed.clear();this.rejected.clear();
    this.sim=null;this.approved=false;this.approvedAt=null;this.revisedByChat=false;this.sessionStart=Date.now();this.morningStart=null;
  },
};
