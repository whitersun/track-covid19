export var HeaderClass = {
  type: String,
  required: false,
}


export var HeaderTranslucent = {
  type: Boolean,
  required: false,
  default: true,
}

export var HeaderStyle = {
  type: String,
  required: false,
}

export var HeaderToolbarColor = {
  type: String,
  required: false,
  default: 'light',

  validator: (value) => {
    var _HeaderToolbarColor = ["primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark"]

    return (_HeaderToolbarColor).includes(value);
  }
}

export var HeaderToolbarClass = {
  type: String,
  required: false,
}

export var HeaderToolbarStyle = {
  type: String,
  required: false,
}

export var HeaderTitleSize = {
  type: String,
  required: false,
  default: 'large',

  validator: (value) => {
    var _HeaderTitleSize = ['small', 'large', 'default'];
    return (_HeaderTitleSize).includes(value);
  }
}

export var HeaderTitleClass = {
  type: String,
  required: false,
}

export var HeaderTitleStyle = {
  type: String,
  required: false,
}

export var HeaderTitle = {
  type: String,
  required: false,
}

export var HeaderCollapse = {
  type: String,
  required: false,
  default: 'condense',
}

export var ContentFullScreen = {
  type: Boolean,
  required: false,
  default: true
}
