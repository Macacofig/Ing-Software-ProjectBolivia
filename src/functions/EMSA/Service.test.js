import {register_day} from "./Service.js";

  describe("Service", () => {
    
    it("It should register a day of service", () => {
      expect(register_day("monday")).toEqual("Successfully registered");
    });
  
    it("It should register day with district", () => {
      expect(register_day("monday", "9", "Pucara")).toEqual("Successfully registered");
    });

});

