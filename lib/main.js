// ==========================================================================
// Project:   sproutcore-live-tutorial
// Copyright: ©2011 My Company Inc. All rights reserved.
// ==========================================================================

// TODO: Your app code goes here

require("sproutcore");

window.Tutorial = SC.Application.create();

Tutorial.outputController = SC.Object.create({
  outputShowing: false,

  title: function() {
    return this.get('outputShowing') ? 'Hide output' : 'Show output';
  }.property('outputShowing'),

  toggle: function() {
    this.set('outputShowing', !this.get('outputShowing'));
  }
});

Tutorial.Root = SC.View.extend({
});

Tutorial.Editor = SC.View.extend({
  editor: null,
  editorMode: null,

  didInsertElement: function() {
    var editor = ace.edit(this.get('elementId'));
    this.set('editor', editor);
    var mode = window.require('ace/mode/' + this.get('editorMode')).Mode;
    editor.getSession().setMode(new mode());
  }
});

Tutorial.Tabs = SC.ContainerView.extend({
  elementId: 'tabs',
  childViews: ['html'],

  html: Tutorial.Editor.extend({
    elementId: 'html',
    classNames: ['scratch', 'top'],
    editorMode: 'html'
  })
});

Tutorial.WorkArea = SC.ContainerView.extend({
  elementId: 'work-area',
  childViews: ['tabs', 'javascript', 'output'],
  tabs: Tutorial.Tabs,
  javascript: Tutorial.Editor.extend({
    elementId: 'javascript',
    classNames: ['scratch', 'bottom'],
    editorMode: 'javascript'
  }),
  output: SC.View.extend({
    elementId: 'output',
    classNames: ['scratch']
  })
});

