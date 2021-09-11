function configureDropDownLists(inputProvince, inputDistrict) {
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var NorthWestern = ['Puttalam', 'Kurunegala'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var Nothern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var shapes = ['Square', 'Circle', 'Triangle'];
    var names = ['John', 'David', 'Sarah'];
  
    switch (inputProvince.value) {
      case 'Nothern':
        inputDistrict.options.length = 0;
        for (i = 0; i < Nothern.length; i++) {
          createOption(inputDistrict, Nothern[i], Nothern[i]);
        }
        break;
      case 'North Western':
        inputDistrict.options.length = 0;
        for (i = 0; i < shapes.length; i++) {
          createOption(inputDistrict, shapes[i], shapes[i]);
        }
        break;
      case 'Names':
        inputDistrict.options.length = 0;
        for (i = 0; i < names.length; i++) {
          createOption(inputDistrict, names[i], names[i]);
        }
        break;
      default:
        inputDistrict.options.length = 0;
        break;
    }
  
  }
  
  function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
  }