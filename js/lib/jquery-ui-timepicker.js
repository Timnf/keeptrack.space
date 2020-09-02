/*! jQuery Timepicker Addon - v1.6.3 - 2016-04-20
 * http://trentrichardson.com/examples/timepicker
 * Copyright (c) 2016 Trent Richardson; Licensed MIT */
!(function (a) {
  'function' == typeof define && define.amd
    ? define(['jquery', 'jquery-ui'], a)
    : a(jQuery)
})(function ($) {
  if ((($.ui.timepicker = $.ui.timepicker || {}), !$.ui.timepicker.version)) {
    $.extend($.ui, { timepicker: { version: '1.6.3' } })
    var Timepicker = function () {
      ;(this.regional = []),
        (this.regional[''] = {
          currentText: 'Now',
          closeText: 'Done',
          amNames: ['AM', 'A'],
          pmNames: ['PM', 'P'],
          timeFormat: 'HH:mm',
          timeSuffix: '',
          timeOnlyTitle: 'Choose Time',
          timeText: 'Time',
          hourText: 'Hour',
          minuteText: 'Minute',
          secondText: 'Second',
          millisecText: 'Millisecond',
          microsecText: 'Microsecond',
          timezoneText: 'Time Zone',
          isRTL: !1,
        }),
        (this._defaults = {
          showButtonPanel: !0,
          timeOnly: !1,
          timeOnlyShowDate: !1,
          showHour: null,
          showMinute: null,
          showSecond: null,
          showMillisec: null,
          showMicrosec: null,
          showTimezone: null,
          showTime: !0,
          stepHour: 1,
          stepMinute: 1,
          stepSecond: 1,
          stepMillisec: 1,
          stepMicrosec: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millisec: 0,
          microsec: 0,
          timezone: null,
          hourMin: 0,
          minuteMin: 0,
          secondMin: 0,
          millisecMin: 0,
          microsecMin: 0,
          hourMax: 23,
          minuteMax: 59,
          secondMax: 59,
          millisecMax: 999,
          microsecMax: 999,
          minDateTime: null,
          maxDateTime: null,
          maxTime: null,
          minTime: null,
          onSelect: null,
          hourGrid: 0,
          minuteGrid: 0,
          secondGrid: 0,
          millisecGrid: 0,
          microsecGrid: 0,
          alwaysSetTime: !0,
          separator: ' ',
          altFieldTimeOnly: !0,
          altTimeFormat: null,
          altSeparator: null,
          altTimeSuffix: null,
          altRedirectFocus: !0,
          pickerTimeFormat: null,
          pickerTimeSuffix: null,
          showTimepicker: !0,
          timezoneList: null,
          addSliderAccess: !1,
          sliderAccessArgs: null,
          controlType: 'slider',
          oneLine: !1,
          defaultValue: null,
          parse: 'strict',
          afterInject: null,
        }),
        $.extend(this._defaults, this.regional[''])
    }
    $.extend(Timepicker.prototype, {
      $input: null,
      $altInput: null,
      $timeObj: null,
      inst: null,
      hour_slider: null,
      minute_slider: null,
      second_slider: null,
      millisec_slider: null,
      microsec_slider: null,
      timezone_select: null,
      maxTime: null,
      minTime: null,
      hour: 0,
      minute: 0,
      second: 0,
      millisec: 0,
      microsec: 0,
      timezone: null,
      hourMinOriginal: null,
      minuteMinOriginal: null,
      secondMinOriginal: null,
      millisecMinOriginal: null,
      microsecMinOriginal: null,
      hourMaxOriginal: null,
      minuteMaxOriginal: null,
      secondMaxOriginal: null,
      millisecMaxOriginal: null,
      microsecMaxOriginal: null,
      ampm: '',
      formattedDate: '',
      formattedTime: '',
      formattedDateTime: '',
      timezoneList: null,
      units: ['hour', 'minute', 'second', 'millisec', 'microsec'],
      support: {},
      control: null,
      setDefaults: function (a) {
        return extendRemove(this._defaults, a || {}), this
      },
      _newInst: function ($input, opts) {
        var tp_inst = new Timepicker(),
          inlineSettings = {},
          fns = {},
          overrides,
          i
        for (var attrName in this._defaults)
          if (this._defaults.hasOwnProperty(attrName)) {
            var attrValue = $input.attr('time:' + attrName)
            if (attrValue)
              try {
                inlineSettings[attrName] = eval(attrValue)
              } catch (a) {
                inlineSettings[attrName] = attrValue
              }
          }
        overrides = {
          beforeShow: function (a, b) {
            if ($.isFunction(tp_inst._defaults.evnts.beforeShow))
              return tp_inst._defaults.evnts.beforeShow.call(
                $input[0],
                a,
                b,
                tp_inst,
              )
          },
          onChangeMonthYear: function (a, b, c) {
            $.isFunction(tp_inst._defaults.evnts.onChangeMonthYear) &&
              tp_inst._defaults.evnts.onChangeMonthYear.call(
                $input[0],
                a,
                b,
                c,
                tp_inst,
              )
          },
          onClose: function (a, b) {
            tp_inst.timeDefined === !0 &&
              '' !== $input.val() &&
              tp_inst._updateDateTime(b),
              $.isFunction(tp_inst._defaults.evnts.onClose) &&
                tp_inst._defaults.evnts.onClose.call($input[0], a, b, tp_inst)
          },
        }
        for (i in overrides)
          overrides.hasOwnProperty(i) &&
            (fns[i] = opts[i] || this._defaults[i] || null)
        ;(tp_inst._defaults = $.extend(
          {},
          this._defaults,
          inlineSettings,
          opts,
          overrides,
          { evnts: fns, timepicker: tp_inst },
        )),
          (tp_inst.amNames = $.map(tp_inst._defaults.amNames, function (a) {
            return a.toUpperCase()
          })),
          (tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function (a) {
            return a.toUpperCase()
          })),
          (tp_inst.support = detectSupport(
            tp_inst._defaults.timeFormat +
              (tp_inst._defaults.pickerTimeFormat
                ? tp_inst._defaults.pickerTimeFormat
                : '') +
              (tp_inst._defaults.altTimeFormat
                ? tp_inst._defaults.altTimeFormat
                : ''),
          )),
          'string' == typeof tp_inst._defaults.controlType
            ? ('slider' === tp_inst._defaults.controlType &&
                'undefined' == typeof $.ui.slider &&
                (tp_inst._defaults.controlType = 'select'),
              (tp_inst.control =
                tp_inst._controls[tp_inst._defaults.controlType]))
            : (tp_inst.control = tp_inst._defaults.controlType)
        var timezoneList = [
          -720,
          -660,
          -600,
          -570,
          -540,
          -480,
          -420,
          -360,
          -300,
          -270,
          -240,
          -210,
          -180,
          -120,
          -60,
          0,
          60,
          120,
          180,
          210,
          240,
          270,
          300,
          330,
          345,
          360,
          390,
          420,
          480,
          525,
          540,
          570,
          600,
          630,
          660,
          690,
          720,
          765,
          780,
          840,
        ]
        null !== tp_inst._defaults.timezoneList &&
          (timezoneList = tp_inst._defaults.timezoneList)
        var tzl = timezoneList.length,
          tzi = 0,
          tzv = null
        if (tzl > 0 && 'object' != typeof timezoneList[0])
          for (; tzi < tzl; tzi++)
            (tzv = timezoneList[tzi]),
              (timezoneList[tzi] = {
                value: tzv,
                label: $.timepicker.timezoneOffsetString(
                  tzv,
                  tp_inst.support.iso8601,
                ),
              })
        return (
          (tp_inst._defaults.timezoneList = timezoneList),
          (tp_inst.timezone =
            null !== tp_inst._defaults.timezone
              ? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone)
              : new Date().getTimezoneOffset() * -1),
          (tp_inst.hour =
            tp_inst._defaults.hour < tp_inst._defaults.hourMin
              ? tp_inst._defaults.hourMin
              : tp_inst._defaults.hour > tp_inst._defaults.hourMax
              ? tp_inst._defaults.hourMax
              : tp_inst._defaults.hour),
          (tp_inst.minute =
            tp_inst._defaults.minute < tp_inst._defaults.minuteMin
              ? tp_inst._defaults.minuteMin
              : tp_inst._defaults.minute > tp_inst._defaults.minuteMax
              ? tp_inst._defaults.minuteMax
              : tp_inst._defaults.minute),
          (tp_inst.second =
            tp_inst._defaults.second < tp_inst._defaults.secondMin
              ? tp_inst._defaults.secondMin
              : tp_inst._defaults.second > tp_inst._defaults.secondMax
              ? tp_inst._defaults.secondMax
              : tp_inst._defaults.second),
          (tp_inst.millisec =
            tp_inst._defaults.millisec < tp_inst._defaults.millisecMin
              ? tp_inst._defaults.millisecMin
              : tp_inst._defaults.millisec > tp_inst._defaults.millisecMax
              ? tp_inst._defaults.millisecMax
              : tp_inst._defaults.millisec),
          (tp_inst.microsec =
            tp_inst._defaults.microsec < tp_inst._defaults.microsecMin
              ? tp_inst._defaults.microsecMin
              : tp_inst._defaults.microsec > tp_inst._defaults.microsecMax
              ? tp_inst._defaults.microsecMax
              : tp_inst._defaults.microsec),
          (tp_inst.ampm = ''),
          (tp_inst.$input = $input),
          tp_inst._defaults.altField &&
            ((tp_inst.$altInput = $(tp_inst._defaults.altField)),
            tp_inst._defaults.altRedirectFocus === !0 &&
              tp_inst.$altInput.css({ cursor: 'pointer' }).focus(function () {
                $input.trigger('focus')
              })),
          (0 !== tp_inst._defaults.minDate &&
            0 !== tp_inst._defaults.minDateTime) ||
            (tp_inst._defaults.minDate = new Date()),
          (0 !== tp_inst._defaults.maxDate &&
            0 !== tp_inst._defaults.maxDateTime) ||
            (tp_inst._defaults.maxDate = new Date()),
          void 0 !== tp_inst._defaults.minDate &&
            tp_inst._defaults.minDate instanceof Date &&
            (tp_inst._defaults.minDateTime = new Date(
              tp_inst._defaults.minDate.getTime(),
            )),
          void 0 !== tp_inst._defaults.minDateTime &&
            tp_inst._defaults.minDateTime instanceof Date &&
            (tp_inst._defaults.minDate = new Date(
              tp_inst._defaults.minDateTime.getTime(),
            )),
          void 0 !== tp_inst._defaults.maxDate &&
            tp_inst._defaults.maxDate instanceof Date &&
            (tp_inst._defaults.maxDateTime = new Date(
              tp_inst._defaults.maxDate.getTime(),
            )),
          void 0 !== tp_inst._defaults.maxDateTime &&
            tp_inst._defaults.maxDateTime instanceof Date &&
            (tp_inst._defaults.maxDate = new Date(
              tp_inst._defaults.maxDateTime.getTime(),
            )),
          tp_inst.$input.bind('focus', function () {
            tp_inst._onFocus()
          }),
          tp_inst
        )
      },
      _addTimePicker: function (a) {
        var b = $.trim(
          this.$altInput && this._defaults.altFieldTimeOnly
            ? this.$input.val() + ' ' + this.$altInput.val()
            : this.$input.val(),
        )
        ;(this.timeDefined = this._parseTime(b)),
          this._limitMinMaxDateTime(a, !1),
          this._injectTimePicker(),
          this._afterInject()
      },
      _parseTime: function (a, b) {
        if (
          (this.inst || (this.inst = $.datepicker._getInst(this.$input[0])),
          b || !this._defaults.timeOnly)
        ) {
          var c = $.datepicker._get(this.inst, 'dateFormat')
          try {
            var d = parseDateTimeInternal(
              c,
              this._defaults.timeFormat,
              a,
              $.datepicker._getFormatConfig(this.inst),
              this._defaults,
            )
            if (!d.timeObj) return !1
            $.extend(this, d.timeObj)
          } catch (b) {
            return (
              $.timepicker.log(
                'Error parsing the date/time string: ' +
                  b +
                  '\ndate/time string = ' +
                  a +
                  '\ntimeFormat = ' +
                  this._defaults.timeFormat +
                  '\ndateFormat = ' +
                  c,
              ),
              !1
            )
          }
          return !0
        }
        var e = $.datepicker.parseTime(
          this._defaults.timeFormat,
          a,
          this._defaults,
        )
        return !!e && ($.extend(this, e), !0)
      },
      _afterInject: function () {
        var a = this.inst.settings
        $.isFunction(a.afterInject) && a.afterInject.call(this)
      },
      _injectTimePicker: function () {
        var a = this.inst.dpDiv,
          b = this.inst.settings,
          c = this,
          d = '',
          e = '',
          f = null,
          g = {},
          h = {},
          i = null,
          j = 0,
          k = 0
        if (0 === a.find('div.ui-timepicker-div').length && b.showTimepicker) {
          var l = ' ui_tpicker_unit_hide',
            m =
              '<div class="ui-timepicker-div' +
              (b.isRTL ? ' ui-timepicker-rtl' : '') +
              (b.oneLine && 'select' === b.controlType
                ? ' ui-timepicker-oneLine'
                : '') +
              '"><dl><dt class="ui_tpicker_time_label' +
              (b.showTime ? '' : l) +
              '">' +
              b.timeText +
              '</dt><dd class="ui_tpicker_time ' +
              (b.showTime ? '' : l) +
              '"><input class="ui_tpicker_time_input" ' +
              (b.timeInput ? '' : 'disabled') +
              '/></dd>'
          for (j = 0, k = this.units.length; j < k; j++) {
            if (
              ((d = this.units[j]),
              (e = d.substr(0, 1).toUpperCase() + d.substr(1)),
              (f = null !== b['show' + e] ? b['show' + e] : this.support[d]),
              (g[d] = parseInt(
                b[d + 'Max'] - ((b[d + 'Max'] - b[d + 'Min']) % b['step' + e]),
                10,
              )),
              (h[d] = 0),
              (m +=
                '<dt class="ui_tpicker_' +
                d +
                '_label' +
                (f ? '' : l) +
                '">' +
                b[d + 'Text'] +
                '</dt><dd class="ui_tpicker_' +
                d +
                (f ? '' : l) +
                '"><div class="ui_tpicker_' +
                d +
                '_slider' +
                (f ? '' : l) +
                '"></div>'),
              f && b[d + 'Grid'] > 0)
            ) {
              if (
                ((m +=
                  '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>'),
                'hour' === d)
              )
                for (
                  var n = b[d + 'Min'];
                  n <= g[d];
                  n += parseInt(b[d + 'Grid'], 10)
                ) {
                  h[d]++
                  var o = $.datepicker.formatTime(
                    this.support.ampm ? 'hht' : 'HH',
                    { hour: n },
                    b,
                  )
                  m += '<td data-for="' + d + '">' + o + '</td>'
                }
              else
                for (
                  var p = b[d + 'Min'];
                  p <= g[d];
                  p += parseInt(b[d + 'Grid'], 10)
                )
                  h[d]++,
                    (m +=
                      '<td data-for="' +
                      d +
                      '">' +
                      (p < 10 ? '0' : '') +
                      p +
                      '</td>')
              m += '</tr></table></div>'
            }
            m += '</dd>'
          }
          var q =
            null !== b.showTimezone ? b.showTimezone : this.support.timezone
          ;(m +=
            '<dt class="ui_tpicker_timezone_label' +
            (q ? '' : l) +
            '">' +
            b.timezoneText +
            '</dt>'),
            (m += '<dd class="ui_tpicker_timezone' + (q ? '' : l) + '"></dd>'),
            (m += '</dl></div>')
          var r = $(m)
          for (
            b.timeOnly === !0 &&
              (r.prepend(
                '<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' +
                  b.timeOnlyTitle +
                  '</div></div>',
              ),
              a.find('.ui-datepicker-header, .ui-datepicker-calendar').hide()),
              j = 0,
              k = c.units.length;
            j < k;
            j++
          )
            (d = c.units[j]),
              (e = d.substr(0, 1).toUpperCase() + d.substr(1)),
              (f = null !== b['show' + e] ? b['show' + e] : this.support[d]),
              (c[d + '_slider'] = c.control.create(
                c,
                r.find('.ui_tpicker_' + d + '_slider'),
                d,
                c[d],
                b[d + 'Min'],
                g[d],
                b['step' + e],
              )),
              f &&
                b[d + 'Grid'] > 0 &&
                ((i = (100 * h[d] * b[d + 'Grid']) / (g[d] - b[d + 'Min'])),
                r
                  .find('.ui_tpicker_' + d + ' table')
                  .css({
                    width: i + '%',
                    marginLeft: b.isRTL ? '0' : i / (-2 * h[d]) + '%',
                    marginRight: b.isRTL ? i / (-2 * h[d]) + '%' : '0',
                    borderCollapse: 'collapse',
                  })
                  .find('td')
                  .on('click', function (a) {
                    var b = $(this),
                      e = b.html(),
                      f = parseInt(e.replace(/[^0-9]/g), 10),
                      g = e.replace(/[^apm]/gi),
                      h = b.data('for')
                    'hour' === h &&
                      (g.indexOf('p') !== -1 && f < 12
                        ? (f += 12)
                        : g.indexOf('a') !== -1 && 12 === f && (f = 0)),
                      c.control.value(c, c[h + '_slider'], d, f),
                      c._onTimeChange(),
                      c._onSelectHandler()
                  })
                  .css({
                    cursor: 'pointer',
                    width: 100 / h[d] + '%',
                    textAlign: 'center',
                    overflow: 'hidden',
                  }))
          if (
            ((this.timezone_select = r
              .find('.ui_tpicker_timezone')
              .append('<select></select>')
              .find('select')),
            $.fn.append.apply(
              this.timezone_select,
              $.map(b.timezoneList, function (a, b) {
                return $('<option />')
                  .val('object' == typeof a ? a.value : a)
                  .text('object' == typeof a ? a.label : a)
              }),
            ),
            'undefined' != typeof this.timezone &&
              null !== this.timezone &&
              '' !== this.timezone)
          ) {
            var s =
              new Date(
                this.inst.selectedYear,
                this.inst.selectedMonth,
                this.inst.selectedDay,
                12,
              ).getTimezoneOffset() * -1
            s === this.timezone
              ? selectLocalTimezone(c)
              : this.timezone_select.val(this.timezone)
          } else
            'undefined' != typeof this.hour &&
            null !== this.hour &&
            '' !== this.hour
              ? this.timezone_select.val(b.timezone)
              : selectLocalTimezone(c)
          this.timezone_select.change(function () {
            c._onTimeChange(), c._onSelectHandler(), c._afterInject()
          })
          var t = a.find('.ui-datepicker-buttonpane')
          if (
            (t.length ? t.before(r) : a.append(r),
            (this.$timeObj = r.find('.ui_tpicker_time_input')),
            this.$timeObj.change(function () {
              var a = c.inst.settings.timeFormat,
                b = $.datepicker.parseTime(a, this.value),
                d = new Date()
              b
                ? (d.setHours(b.hour),
                  d.setMinutes(b.minute),
                  d.setSeconds(b.second),
                  $.datepicker._setTime(c.inst, d))
                : ((this.value = c.formattedTime), this.on('blur'))
            }),
            null !== this.inst)
          ) {
            var u = this.timeDefined
            this._onTimeChange(), (this.timeDefined = u)
          }
          if (this._defaults.addSliderAccess) {
            var v = this._defaults.sliderAccessArgs,
              w = this._defaults.isRTL
            ;(v.isRTL = w),
              setTimeout(function () {
                if (0 === r.find('.ui-slider-access').length) {
                  r.find('.ui-slider:visible').sliderAccess(v)
                  var a = r.find('.ui-slider-access:eq(0)').outerWidth(!0)
                  a &&
                    r.find('table:visible').each(function () {
                      var b = $(this),
                        c = b.outerWidth(),
                        d = b
                          .css(w ? 'marginRight' : 'marginLeft')
                          .toString()
                          .replace('%', ''),
                        e = c - a,
                        f = (d * e) / c + '%',
                        g = { width: e, marginRight: 0, marginLeft: 0 }
                      ;(g[w ? 'marginRight' : 'marginLeft'] = f), b.css(g)
                    })
                }
              }, 10)
          }
          c._limitMinMaxDateTime(this.inst, !0)
        }
      },
      _limitMinMaxDateTime: function (a, b) {
        var c = this._defaults,
          d = new Date(a.selectedYear, a.selectedMonth, a.selectedDay)
        if (this._defaults.showTimepicker) {
          if (
            null !== $.datepicker._get(a, 'minDateTime') &&
            void 0 !== $.datepicker._get(a, 'minDateTime') &&
            d
          ) {
            var e = $.datepicker._get(a, 'minDateTime'),
              f = new Date(
                e.getFullYear(),
                e.getMonth(),
                e.getDate(),
                0,
                0,
                0,
                0,
              )
            ;(null !== this.hourMinOriginal &&
              null !== this.minuteMinOriginal &&
              null !== this.secondMinOriginal &&
              null !== this.millisecMinOriginal &&
              null !== this.microsecMinOriginal) ||
              ((this.hourMinOriginal = c.hourMin),
              (this.minuteMinOriginal = c.minuteMin),
              (this.secondMinOriginal = c.secondMin),
              (this.millisecMinOriginal = c.millisecMin),
              (this.microsecMinOriginal = c.microsecMin)),
              a.settings.timeOnly || f.getTime() === d.getTime()
                ? ((this._defaults.hourMin = e.getHours()),
                  this.hour <= this._defaults.hourMin
                    ? ((this.hour = this._defaults.hourMin),
                      (this._defaults.minuteMin = e.getMinutes()),
                      this.minute <= this._defaults.minuteMin
                        ? ((this.minute = this._defaults.minuteMin),
                          (this._defaults.secondMin = e.getSeconds()),
                          this.second <= this._defaults.secondMin
                            ? ((this.second = this._defaults.secondMin),
                              (this._defaults.millisecMin = e.getMilliseconds()),
                              this.millisec <= this._defaults.millisecMin
                                ? ((this.millisec = this._defaults.millisecMin),
                                  (this._defaults.microsecMin = e.getMicroseconds()))
                                : (this.microsec < this._defaults.microsecMin &&
                                    (this.microsec = this._defaults.microsecMin),
                                  (this._defaults.microsecMin = this.microsecMinOriginal)))
                            : ((this._defaults.millisecMin = this.millisecMinOriginal),
                              (this._defaults.microsecMin = this.microsecMinOriginal)))
                        : ((this._defaults.secondMin = this.secondMinOriginal),
                          (this._defaults.millisecMin = this.millisecMinOriginal),
                          (this._defaults.microsecMin = this.microsecMinOriginal)))
                    : ((this._defaults.minuteMin = this.minuteMinOriginal),
                      (this._defaults.secondMin = this.secondMinOriginal),
                      (this._defaults.millisecMin = this.millisecMinOriginal),
                      (this._defaults.microsecMin = this.microsecMinOriginal)))
                : ((this._defaults.hourMin = this.hourMinOriginal),
                  (this._defaults.minuteMin = this.minuteMinOriginal),
                  (this._defaults.secondMin = this.secondMinOriginal),
                  (this._defaults.millisecMin = this.millisecMinOriginal),
                  (this._defaults.microsecMin = this.microsecMinOriginal))
          }
          if (
            null !== $.datepicker._get(a, 'maxDateTime') &&
            void 0 !== $.datepicker._get(a, 'maxDateTime') &&
            d
          ) {
            var g = $.datepicker._get(a, 'maxDateTime'),
              h = new Date(
                g.getFullYear(),
                g.getMonth(),
                g.getDate(),
                0,
                0,
                0,
                0,
              )
            ;(null !== this.hourMaxOriginal &&
              null !== this.minuteMaxOriginal &&
              null !== this.secondMaxOriginal &&
              null !== this.millisecMaxOriginal) ||
              ((this.hourMaxOriginal = c.hourMax),
              (this.minuteMaxOriginal = c.minuteMax),
              (this.secondMaxOriginal = c.secondMax),
              (this.millisecMaxOriginal = c.millisecMax),
              (this.microsecMaxOriginal = c.microsecMax)),
              a.settings.timeOnly || h.getTime() === d.getTime()
                ? ((this._defaults.hourMax = g.getHours()),
                  this.hour >= this._defaults.hourMax
                    ? ((this.hour = this._defaults.hourMax),
                      (this._defaults.minuteMax = g.getMinutes()),
                      this.minute >= this._defaults.minuteMax
                        ? ((this.minute = this._defaults.minuteMax),
                          (this._defaults.secondMax = g.getSeconds()),
                          this.second >= this._defaults.secondMax
                            ? ((this.second = this._defaults.secondMax),
                              (this._defaults.millisecMax = g.getMilliseconds()),
                              this.millisec >= this._defaults.millisecMax
                                ? ((this.millisec = this._defaults.millisecMax),
                                  (this._defaults.microsecMax = g.getMicroseconds()))
                                : (this.microsec > this._defaults.microsecMax &&
                                    (this.microsec = this._defaults.microsecMax),
                                  (this._defaults.microsecMax = this.microsecMaxOriginal)))
                            : ((this._defaults.millisecMax = this.millisecMaxOriginal),
                              (this._defaults.microsecMax = this.microsecMaxOriginal)))
                        : ((this._defaults.secondMax = this.secondMaxOriginal),
                          (this._defaults.millisecMax = this.millisecMaxOriginal),
                          (this._defaults.microsecMax = this.microsecMaxOriginal)))
                    : ((this._defaults.minuteMax = this.minuteMaxOriginal),
                      (this._defaults.secondMax = this.secondMaxOriginal),
                      (this._defaults.millisecMax = this.millisecMaxOriginal),
                      (this._defaults.microsecMax = this.microsecMaxOriginal)))
                : ((this._defaults.hourMax = this.hourMaxOriginal),
                  (this._defaults.minuteMax = this.minuteMaxOriginal),
                  (this._defaults.secondMax = this.secondMaxOriginal),
                  (this._defaults.millisecMax = this.millisecMaxOriginal),
                  (this._defaults.microsecMax = this.microsecMaxOriginal))
          }
          if (null !== a.settings.minTime) {
            var i = new Date('01/01/1970 ' + a.settings.minTime)
            this.hour < i.getHours()
              ? ((this.hour = this._defaults.hourMin = i.getHours()),
                (this.minute = this._defaults.minuteMin = i.getMinutes()))
              : this.hour === i.getHours() && this.minute < i.getMinutes()
              ? (this.minute = this._defaults.minuteMin = i.getMinutes())
              : this._defaults.hourMin < i.getHours()
              ? ((this._defaults.hourMin = i.getHours()),
                (this._defaults.minuteMin = i.getMinutes()))
              : (this._defaults.hourMin === i.getHours()) === this.hour &&
                this._defaults.minuteMin < i.getMinutes()
              ? (this._defaults.minuteMin = i.getMinutes())
              : (this._defaults.minuteMin = 0)
          }
          if (null !== a.settings.maxTime) {
            var j = new Date('01/01/1970 ' + a.settings.maxTime)
            this.hour > j.getHours()
              ? ((this.hour = this._defaults.hourMax = j.getHours()),
                (this.minute = this._defaults.minuteMax = j.getMinutes()))
              : this.hour === j.getHours() && this.minute > j.getMinutes()
              ? (this.minute = this._defaults.minuteMax = j.getMinutes())
              : this._defaults.hourMax > j.getHours()
              ? ((this._defaults.hourMax = j.getHours()),
                (this._defaults.minuteMax = j.getMinutes()))
              : (this._defaults.hourMax === j.getHours()) === this.hour &&
                this._defaults.minuteMax > j.getMinutes()
              ? (this._defaults.minuteMax = j.getMinutes())
              : (this._defaults.minuteMax = 59)
          }
          if (void 0 !== b && b === !0) {
            var k = parseInt(
                this._defaults.hourMax -
                  ((this._defaults.hourMax - this._defaults.hourMin) %
                    this._defaults.stepHour),
                10,
              ),
              l = parseInt(
                this._defaults.minuteMax -
                  ((this._defaults.minuteMax - this._defaults.minuteMin) %
                    this._defaults.stepMinute),
                10,
              ),
              m = parseInt(
                this._defaults.secondMax -
                  ((this._defaults.secondMax - this._defaults.secondMin) %
                    this._defaults.stepSecond),
                10,
              ),
              n = parseInt(
                this._defaults.millisecMax -
                  ((this._defaults.millisecMax - this._defaults.millisecMin) %
                    this._defaults.stepMillisec),
                10,
              ),
              o = parseInt(
                this._defaults.microsecMax -
                  ((this._defaults.microsecMax - this._defaults.microsecMin) %
                    this._defaults.stepMicrosec),
                10,
              )
            this.hour_slider &&
              (this.control.options(this, this.hour_slider, 'hour', {
                min: this._defaults.hourMin,
                max: k,
                step: this._defaults.stepHour,
              }),
              this.control.value(
                this,
                this.hour_slider,
                'hour',
                this.hour - (this.hour % this._defaults.stepHour),
              )),
              this.minute_slider &&
                (this.control.options(this, this.minute_slider, 'minute', {
                  min: this._defaults.minuteMin,
                  max: l,
                  step: this._defaults.stepMinute,
                }),
                this.control.value(
                  this,
                  this.minute_slider,
                  'minute',
                  this.minute - (this.minute % this._defaults.stepMinute),
                )),
              this.second_slider &&
                (this.control.options(this, this.second_slider, 'second', {
                  min: this._defaults.secondMin,
                  max: m,
                  step: this._defaults.stepSecond,
                }),
                this.control.value(
                  this,
                  this.second_slider,
                  'second',
                  this.second - (this.second % this._defaults.stepSecond),
                )),
              this.millisec_slider &&
                (this.control.options(this, this.millisec_slider, 'millisec', {
                  min: this._defaults.millisecMin,
                  max: n,
                  step: this._defaults.stepMillisec,
                }),
                this.control.value(
                  this,
                  this.millisec_slider,
                  'millisec',
                  this.millisec - (this.millisec % this._defaults.stepMillisec),
                )),
              this.microsec_slider &&
                (this.control.options(this, this.microsec_slider, 'microsec', {
                  min: this._defaults.microsecMin,
                  max: o,
                  step: this._defaults.stepMicrosec,
                }),
                this.control.value(
                  this,
                  this.microsec_slider,
                  'microsec',
                  this.microsec - (this.microsec % this._defaults.stepMicrosec),
                ))
          }
        }
      },
      _onTimeChange: function () {
        if (this._defaults.showTimepicker) {
          var a =
              !!this.hour_slider &&
              this.control.value(this, this.hour_slider, 'hour'),
            b =
              !!this.minute_slider &&
              this.control.value(this, this.minute_slider, 'minute'),
            c =
              !!this.second_slider &&
              this.control.value(this, this.second_slider, 'second'),
            d =
              !!this.millisec_slider &&
              this.control.value(this, this.millisec_slider, 'millisec'),
            e =
              !!this.microsec_slider &&
              this.control.value(this, this.microsec_slider, 'microsec'),
            f = !!this.timezone_select && this.timezone_select.val(),
            g = this._defaults,
            h = g.pickerTimeFormat || g.timeFormat,
            i = g.pickerTimeSuffix || g.timeSuffix
          'object' == typeof a && (a = !1),
            'object' == typeof b && (b = !1),
            'object' == typeof c && (c = !1),
            'object' == typeof d && (d = !1),
            'object' == typeof e && (e = !1),
            'object' == typeof f && (f = !1),
            a !== !1 && (a = parseInt(a, 10)),
            b !== !1 && (b = parseInt(b, 10)),
            c !== !1 && (c = parseInt(c, 10)),
            d !== !1 && (d = parseInt(d, 10)),
            e !== !1 && (e = parseInt(e, 10)),
            f !== !1 && (f = f.toString())
          var j = g[a < 12 ? 'amNames' : 'pmNames'][0],
            k =
              a !== parseInt(this.hour, 10) ||
              b !== parseInt(this.minute, 10) ||
              c !== parseInt(this.second, 10) ||
              d !== parseInt(this.millisec, 10) ||
              e !== parseInt(this.microsec, 10) ||
              (this.ampm.length > 0 &&
                a < 12 !=
                  ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) ||
              (null !== this.timezone && f !== this.timezone.toString())
          if (
            (k &&
              (a !== !1 && (this.hour = a),
              b !== !1 && (this.minute = b),
              c !== !1 && (this.second = c),
              d !== !1 && (this.millisec = d),
              e !== !1 && (this.microsec = e),
              f !== !1 && (this.timezone = f),
              this.inst || (this.inst = $.datepicker._getInst(this.$input[0])),
              this._limitMinMaxDateTime(this.inst, !0)),
            this.support.ampm && (this.ampm = j),
            (this.formattedTime = $.datepicker.formatTime(
              g.timeFormat,
              this,
              g,
            )),
            this.$timeObj &&
              (h === g.timeFormat
                ? this.$timeObj.val(this.formattedTime + i)
                : this.$timeObj.val($.datepicker.formatTime(h, this, g) + i),
              this.$timeObj[0].setSelectionRange))
          ) {
            var l = this.$timeObj[0].selectionStart,
              m = this.$timeObj[0].selectionEnd
            this.$timeObj[0].setSelectionRange(l, m)
          }
          ;(this.timeDefined = !0), k && this._updateDateTime()
        }
      },
      _onSelectHandler: function () {
        var a = this._defaults.onSelect || this.inst.settings.onSelect,
          b = this.$input ? this.$input[0] : null
        a && b && a.apply(b, [this.formattedDateTime, this])
      },
      _updateDateTime: function (a) {
        a = this.inst || a
        var b =
            a.currentYear > 0
              ? new Date(a.currentYear, a.currentMonth, a.currentDay)
              : new Date(a.selectedYear, a.selectedMonth, a.selectedDay),
          c = $.datepicker._daylightSavingAdjust(b),
          d = $.datepicker._get(a, 'dateFormat'),
          e = $.datepicker._getFormatConfig(a),
          f = null !== c && this.timeDefined
        this.formattedDate = $.datepicker.formatDate(
          d,
          null === c ? new Date() : c,
          e,
        )
        var g = this.formattedDate
        if (
          ('' === a.lastVal &&
            ((a.currentYear = a.selectedYear),
            (a.currentMonth = a.selectedMonth),
            (a.currentDay = a.selectedDay)),
          this._defaults.timeOnly === !0 &&
          this._defaults.timeOnlyShowDate === !1
            ? (g = this.formattedTime)
            : ((this._defaults.timeOnly !== !0 &&
                (this._defaults.alwaysSetTime || f)) ||
                (this._defaults.timeOnly === !0 &&
                  this._defaults.timeOnlyShowDate === !0)) &&
              (g +=
                this._defaults.separator +
                this.formattedTime +
                this._defaults.timeSuffix),
          (this.formattedDateTime = g),
          this._defaults.showTimepicker)
        )
          if (
            this.$altInput &&
            this._defaults.timeOnly === !1 &&
            this._defaults.altFieldTimeOnly === !0
          )
            this.$altInput.val(this.formattedTime),
              this.$input.val(this.formattedDate)
          else if (this.$altInput) {
            this.$input.val(g)
            var h = '',
              i =
                null !== this._defaults.altSeparator
                  ? this._defaults.altSeparator
                  : this._defaults.separator,
              j =
                null !== this._defaults.altTimeSuffix
                  ? this._defaults.altTimeSuffix
                  : this._defaults.timeSuffix
            this._defaults.timeOnly ||
              ((h = this._defaults.altFormat
                ? $.datepicker.formatDate(
                    this._defaults.altFormat,
                    null === c ? new Date() : c,
                    e,
                  )
                : this.formattedDate),
              h && (h += i)),
              (h +=
                null !== this._defaults.altTimeFormat
                  ? $.datepicker.formatTime(
                      this._defaults.altTimeFormat,
                      this,
                      this._defaults,
                    ) + j
                  : this.formattedTime + j),
              this.$altInput.val(h)
          } else this.$input.val(g)
        else this.$input.val(this.formattedDate)
        this.$input.trigger('change')
      },
      _onFocus: function () {
        if (!this.$input.val() && this._defaults.defaultValue) {
          this.$input.val(this._defaults.defaultValue)
          var a = $.datepicker._getInst(this.$input.get(0)),
            b = $.datepicker._get(a, 'timepicker')
          if (b && b._defaults.timeOnly && a.input.val() !== a.lastVal)
            try {
              $.datepicker._updateDatepicker(a)
            } catch (a) {
              $.timepicker.log(a)
            }
        }
      },
      _controls: {
        slider: {
          create: function (a, b, c, d, e, f, g) {
            var h = a._defaults.isRTL
            return b.prop('slide', null).slider({
              orientation: 'horizontal',
              value: h ? d * -1 : d,
              min: h ? f * -1 : e,
              max: h ? e * -1 : f,
              step: g,
              slide: function (b, d) {
                a.control.value(a, $(this), c, h ? d.value * -1 : d.value),
                  a._onTimeChange()
              },
              stop: function (b, c) {
                a._onSelectHandler()
              },
            })
          },
          options: function (a, b, c, d, e) {
            if (a._defaults.isRTL) {
              if ('string' == typeof d)
                return 'min' === d || 'max' === d
                  ? void 0 !== e
                    ? b.slider(d, e * -1)
                    : Math.abs(b.slider(d))
                  : b.slider(d)
              var f = d.min,
                g = d.max
              return (
                (d.min = d.max = null),
                void 0 !== f && (d.max = f * -1),
                void 0 !== g && (d.min = g * -1),
                b.slider(d)
              )
            }
            return 'string' == typeof d && void 0 !== e
              ? b.slider(d, e)
              : b.slider(d)
          },
          value: function (a, b, c, d) {
            return a._defaults.isRTL
              ? void 0 !== d
                ? b.slider('value', d * -1)
                : Math.abs(b.slider('value'))
              : void 0 !== d
              ? b.slider('value', d)
              : b.slider('value')
          },
        },
        select: {
          create: function (a, b, c, d, e, f, g) {
            for (
              var h =
                  '<select class="ui-timepicker-select ui-state-default ui-corner-all" data-unit="' +
                  c +
                  '" data-min="' +
                  e +
                  '" data-max="' +
                  f +
                  '" data-step="' +
                  g +
                  '">',
                i = a._defaults.pickerTimeFormat || a._defaults.timeFormat,
                j = e;
              j <= f;
              j += g
            )
              (h +=
                '<option value="' +
                j +
                '"' +
                (j === d ? ' selected' : '') +
                '>'),
                (h +=
                  'hour' === c
                    ? $.datepicker.formatTime(
                        $.trim(i.replace(/[^ht ]/gi, '')),
                        { hour: j },
                        a._defaults,
                      )
                    : 'millisec' === c || 'microsec' === c || j >= 10
                    ? j
                    : '0' + j.toString()),
                (h += '</option>')
            return (
              (h += '</select>'),
              b.children('select').remove(),
              $(h)
                .appendTo(b)
                .change(function (b) {
                  a._onTimeChange(), a._onSelectHandler(), a._afterInject()
                }),
              b
            )
          },
          options: function (a, b, c, d, e) {
            var f = {},
              g = b.children('select')
            if ('string' == typeof d) {
              if (void 0 === e) return g.data(d)
              f[d] = e
            } else f = d
            return a.control.create(
              a,
              b,
              g.data('unit'),
              g.val(),
              f.min >= 0 ? f.min : g.data('min'),
              f.max || g.data('max'),
              f.step || g.data('step'),
            )
          },
          value: function (a, b, c, d) {
            var e = b.children('select')
            return void 0 !== d ? e.val(d) : e.val()
          },
        },
      },
    }),
      $.fn.extend({
        timepicker: function (a) {
          a = a || {}
          var b = Array.prototype.slice.call(arguments)
          return (
            'object' == typeof a && (b[0] = $.extend(a, { timeOnly: !0 })),
            $(this).each(function () {
              $.fn.datetimepicker.apply($(this), b)
            })
          )
        },
        datetimepicker: function (a) {
          a = a || {}
          var b = arguments
          return 'string' == typeof a
            ? 'getDate' === a ||
              ('option' === a && 2 === b.length && 'string' == typeof b[1])
              ? $.fn.datepicker.apply($(this[0]), b)
              : this.each(function () {
                  var a = $(this)
                  a.datepicker.apply(a, b)
                })
            : this.each(function () {
                var b = $(this)
                b.datepicker($.timepicker._newInst(b, a)._defaults)
              })
        },
      }),
      ($.datepicker.parseDateTime = function (a, b, c, d, e) {
        var f = parseDateTimeInternal(a, b, c, d, e)
        if (f.timeObj) {
          var g = f.timeObj
          f.date.setHours(g.hour, g.minute, g.second, g.millisec),
            f.date.setMicroseconds(g.microsec)
        }
        return f.date
      }),
      ($.datepicker.parseTime = function (a, b, c) {
        var d = extendRemove(extendRemove({}, $.timepicker._defaults), c || {}),
          f =
            (a.replace(/\'.*?\'/g, '').indexOf('Z') !== -1,
            function (a, b, c) {
              var i,
                d = function (a, b) {
                  var c = []
                  return (
                    a && $.merge(c, a),
                    b && $.merge(c, b),
                    (c = $.map(c, function (a) {
                      return a.replace(/[.*+?|()\[\]{}\\]/g, '\\$&')
                    })),
                    '(' + c.join('|') + ')?'
                  )
                },
                e = function (a) {
                  var b = a
                      .toLowerCase()
                      .match(
                        /(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g,
                      ),
                    c = { h: -1, m: -1, s: -1, l: -1, c: -1, t: -1, z: -1 }
                  if (b)
                    for (var d = 0; d < b.length; d++)
                      c[b[d].toString().charAt(0)] === -1 &&
                        (c[b[d].toString().charAt(0)] = d + 1)
                  return c
                },
                f =
                  '^' +
                  a
                    .toString()
                    .replace(
                      /([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,
                      function (a) {
                        var b = a.length
                        switch (a.charAt(0).toLowerCase()) {
                          case 'h':
                            return 1 === b ? '(\\d?\\d)' : '(\\d{' + b + '})'
                          case 'm':
                            return 1 === b ? '(\\d?\\d)' : '(\\d{' + b + '})'
                          case 's':
                            return 1 === b ? '(\\d?\\d)' : '(\\d{' + b + '})'
                          case 'l':
                            return '(\\d?\\d?\\d)'
                          case 'c':
                            return '(\\d?\\d?\\d)'
                          case 'z':
                            return '(z|[-+]\\d\\d:?\\d\\d|\\S+)?'
                          case 't':
                            return d(c.amNames, c.pmNames)
                          default:
                            return (
                              '(' +
                              a
                                .replace(/\'/g, '')
                                .replace(
                                  /(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,
                                  function (a) {
                                    return '\\' + a
                                  },
                                ) +
                              ')?'
                            )
                        }
                      },
                    )
                    .replace(/\s/g, '\\s?') +
                  c.timeSuffix +
                  '$',
                g = e(a),
                h = ''
              i = b.match(new RegExp(f, 'i'))
              var j = {
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                microsec: 0,
              }
              return (
                !!i &&
                (g.t !== -1 &&
                  (void 0 === i[g.t] || 0 === i[g.t].length
                    ? ((h = ''), (j.ampm = ''))
                    : ((h =
                        $.inArray(
                          i[g.t].toUpperCase(),
                          $.map(c.amNames, function (a, b) {
                            return a.toUpperCase()
                          }),
                        ) !== -1
                          ? 'AM'
                          : 'PM'),
                      (j.ampm = c['AM' === h ? 'amNames' : 'pmNames'][0]))),
                g.h !== -1 &&
                  ('AM' === h && '12' === i[g.h]
                    ? (j.hour = 0)
                    : 'PM' === h && '12' !== i[g.h]
                    ? (j.hour = parseInt(i[g.h], 10) + 12)
                    : (j.hour = Number(i[g.h]))),
                g.m !== -1 && (j.minute = Number(i[g.m])),
                g.s !== -1 && (j.second = Number(i[g.s])),
                g.l !== -1 && (j.millisec = Number(i[g.l])),
                g.c !== -1 && (j.microsec = Number(i[g.c])),
                g.z !== -1 &&
                  void 0 !== i[g.z] &&
                  (j.timezone = $.timepicker.timezoneOffsetNumber(i[g.z])),
                j)
              )
            }),
          g = function (a, b, c) {
            try {
              var d = new Date('2012-01-01 ' + b)
              if (
                isNaN(d.getTime()) &&
                ((d = new Date('2012-01-01T' + b)),
                isNaN(d.getTime()) &&
                  ((d = new Date('01/01/2012 ' + b)), isNaN(d.getTime())))
              )
                throw 'Unable to parse time with native Date: ' + b
              return {
                hour: d.getHours(),
                minute: d.getMinutes(),
                second: d.getSeconds(),
                millisec: d.getMilliseconds(),
                microsec: d.getMicroseconds(),
                timezone: d.getTimezoneOffset() * -1,
              }
            } catch (d) {
              try {
                return f(a, b, c)
              } catch (c) {
                $.timepicker.log(
                  'Unable to parse \ntimeString: ' + b + '\ntimeFormat: ' + a,
                )
              }
            }
            return !1
          }
        return 'function' == typeof d.parse
          ? d.parse(a, b, d)
          : 'loose' === d.parse
          ? g(a, b, d)
          : f(a, b, d)
      }),
      ($.datepicker.formatTime = function (a, b, c) {
        ;(c = c || {}),
          (c = $.extend({}, $.timepicker._defaults, c)),
          (b = $.extend(
            {
              hour: 0,
              minute: 0,
              second: 0,
              millisec: 0,
              microsec: 0,
              timezone: null,
            },
            b,
          ))
        var d = a,
          e = c.amNames[0],
          f = parseInt(b.hour, 10)
        return (
          f > 11 && (e = c.pmNames[0]),
          (d = d.replace(
            /(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,
            function (a) {
              switch (a) {
                case 'HH':
                  return ('0' + f).slice(-2)
                case 'H':
                  return f
                case 'hh':
                  return ('0' + convert24to12(f)).slice(-2)
                case 'h':
                  return convert24to12(f)
                case 'mm':
                  return ('0' + b.minute).slice(-2)
                case 'm':
                  return b.minute
                case 'ss':
                  return ('0' + b.second).slice(-2)
                case 's':
                  return b.second
                case 'l':
                  return ('00' + b.millisec).slice(-3)
                case 'c':
                  return ('00' + b.microsec).slice(-3)
                case 'z':
                  return $.timepicker.timezoneOffsetString(
                    null === b.timezone ? c.timezone : b.timezone,
                    !1,
                  )
                case 'Z':
                  return $.timepicker.timezoneOffsetString(
                    null === b.timezone ? c.timezone : b.timezone,
                    !0,
                  )
                case 'T':
                  return e.charAt(0).toUpperCase()
                case 'TT':
                  return e.toUpperCase()
                case 't':
                  return e.charAt(0).toLowerCase()
                case 'tt':
                  return e.toLowerCase()
                default:
                  return a.replace(/'/g, '')
              }
            },
          ))
        )
      }),
      ($.datepicker._base_selectDate = $.datepicker._selectDate),
      ($.datepicker._selectDate = function (a, b) {
        var e,
          c = this._getInst($(a)[0]),
          d = this._get(c, 'timepicker')
        d && c.settings.showTimepicker
          ? (d._limitMinMaxDateTime(c, !0),
            (e = c.inline),
            (c.inline = c.stay_open = !0),
            this._base_selectDate(a, b),
            (c.inline = e),
            (c.stay_open = !1),
            this._notifyChange(c),
            this._updateDatepicker(c))
          : this._base_selectDate(a, b)
      }),
      ($.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker),
      ($.datepicker._updateDatepicker = function (a) {
        var b = a.input[0]
        if (
          !(
            ($.datepicker._curInst &&
              $.datepicker._curInst !== a &&
              $.datepicker._datepickerShowing &&
              $.datepicker._lastInput !== b) ||
            ('boolean' == typeof a.stay_open && a.stay_open !== !1)
          )
        ) {
          this._base_updateDatepicker(a)
          var c = this._get(a, 'timepicker')
          c && c._addTimePicker(a)
        }
      }),
      ($.datepicker._base_doKeyPress = $.datepicker._doKeyPress),
      ($.datepicker._doKeyPress = function (a) {
        var b = $.datepicker._getInst(a.target),
          c = $.datepicker._get(b, 'timepicker')
        if (c && $.datepicker._get(b, 'constrainInput')) {
          var d = c.support.ampm,
            e =
              null !== c._defaults.showTimezone
                ? c._defaults.showTimezone
                : c.support.timezone,
            f = $.datepicker._possibleChars($.datepicker._get(b, 'dateFormat')),
            g =
              c._defaults.timeFormat
                .toString()
                .replace(/[hms]/g, '')
                .replace(/TT/g, d ? 'APM' : '')
                .replace(/Tt/g, d ? 'AaPpMm' : '')
                .replace(/tT/g, d ? 'AaPpMm' : '')
                .replace(/T/g, d ? 'AP' : '')
                .replace(/tt/g, d ? 'apm' : '')
                .replace(/t/g, d ? 'ap' : '') +
              ' ' +
              c._defaults.separator +
              c._defaults.timeSuffix +
              (e ? c._defaults.timezoneList.join('') : '') +
              c._defaults.amNames.join('') +
              c._defaults.pmNames.join('') +
              f,
            h = String.fromCharCode(
              void 0 === a.charCode ? a.keyCode : a.charCode,
            )
          return a.ctrlKey || h < ' ' || !f || g.indexOf(h) > -1
        }
        return $.datepicker._base_doKeyPress(a)
      }),
      ($.datepicker._base_updateAlternate = $.datepicker._updateAlternate),
      ($.datepicker._updateAlternate = function (a) {
        var b = this._get(a, 'timepicker')
        if (b) {
          var c = b._defaults.altField
          if (c) {
            var e =
                (b._defaults.altFormat || b._defaults.dateFormat,
                this._getDate(a)),
              f = $.datepicker._getFormatConfig(a),
              g = '',
              h = b._defaults.altSeparator
                ? b._defaults.altSeparator
                : b._defaults.separator,
              i = b._defaults.altTimeSuffix
                ? b._defaults.altTimeSuffix
                : b._defaults.timeSuffix,
              j =
                null !== b._defaults.altTimeFormat
                  ? b._defaults.altTimeFormat
                  : b._defaults.timeFormat
            ;(g += $.datepicker.formatTime(j, b, b._defaults) + i),
              b._defaults.timeOnly ||
                b._defaults.altFieldTimeOnly ||
                null === e ||
                (g = b._defaults.altFormat
                  ? $.datepicker.formatDate(b._defaults.altFormat, e, f) + h + g
                  : b.formattedDate + h + g),
              $(c).val(a.input.val() ? g : '')
          }
        } else $.datepicker._base_updateAlternate(a)
      }),
      ($.datepicker._base_doKeyUp = $.datepicker._doKeyUp),
      ($.datepicker._doKeyUp = function (a) {
        var b = $.datepicker._getInst(a.target),
          c = $.datepicker._get(b, 'timepicker')
        if (c && c._defaults.timeOnly && b.input.val() !== b.lastVal)
          try {
            $.datepicker._updateDatepicker(b)
          } catch (a) {
            $.timepicker.log(a)
          }
        return $.datepicker._base_doKeyUp(a)
      }),
      ($.datepicker._base_gotoToday = $.datepicker._gotoToday),
      ($.datepicker._gotoToday = function (a) {
        var b = this._getInst($(a)[0])
        this._base_gotoToday(a)
        var c = this._get(b, 'timepicker')
        if (c) {
          var d = $.timepicker.timezoneOffsetNumber(c.timezone),
            e = new Date()
          e.setMinutes(
            e.getMinutes() + e.getTimezoneOffset() + parseInt(d, 10),
          ),
            this._setTime(b, e),
            this._setDate(b, e),
            c._onSelectHandler()
        }
      }),
      ($.datepicker._disableTimepickerDatepicker = function (a) {
        var b = this._getInst(a)
        if (b) {
          var c = this._get(b, 'timepicker')
          $(a).datepicker('getDate'),
            c &&
              ((b.settings.showTimepicker = !1),
              (c._defaults.showTimepicker = !1),
              c._updateDateTime(b))
        }
      }),
      ($.datepicker._enableTimepickerDatepicker = function (a) {
        var b = this._getInst(a)
        if (b) {
          var c = this._get(b, 'timepicker')
          $(a).datepicker('getDate'),
            c &&
              ((b.settings.showTimepicker = !0),
              (c._defaults.showTimepicker = !0),
              c._addTimePicker(b),
              c._updateDateTime(b))
        }
      }),
      ($.datepicker._setTime = function (a, b) {
        var c = this._get(a, 'timepicker')
        if (c) {
          var d = c._defaults
          ;(c.hour = b ? b.getHours() : d.hour),
            (c.minute = b ? b.getMinutes() : d.minute),
            (c.second = b ? b.getSeconds() : d.second),
            (c.millisec = b ? b.getMilliseconds() : d.millisec),
            (c.microsec = b ? b.getMicroseconds() : d.microsec),
            c._limitMinMaxDateTime(a, !0),
            c._onTimeChange(),
            c._updateDateTime(a)
        }
      }),
      ($.datepicker._setTimeDatepicker = function (a, b, c) {
        var d = this._getInst(a)
        if (d) {
          var e = this._get(d, 'timepicker')
          if (e) {
            this._setDateFromField(d)
            var f
            b &&
              ('string' == typeof b
                ? (e._parseTime(b, c),
                  (f = new Date()),
                  f.setHours(e.hour, e.minute, e.second, e.millisec),
                  f.setMicroseconds(e.microsec))
                : ((f = new Date(b.getTime())),
                  f.setMicroseconds(b.getMicroseconds())),
              'Invalid Date' === f.toString() && (f = void 0),
              this._setTime(d, f))
          }
        }
      }),
      ($.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker),
      ($.datepicker._setDateDatepicker = function (a, b) {
        var c = this._getInst(a),
          d = b
        if (c) {
          'string' == typeof b &&
            ((d = new Date(b)),
            d.getTime() ||
              (this._base_setDateDatepicker.apply(this, arguments),
              (d = $(a).datepicker('getDate'))))
          var f,
            e = this._get(c, 'timepicker')
          d instanceof Date
            ? ((f = new Date(d.getTime())),
              f.setMicroseconds(d.getMicroseconds()))
            : (f = d),
            e &&
              f &&
              (e.support.timezone ||
                null !== e._defaults.timezone ||
                (e.timezone = f.getTimezoneOffset() * -1),
              (d = $.timepicker.timezoneAdjust(
                d,
                $.timepicker.timezoneOffsetString(-d.getTimezoneOffset()),
                e.timezone,
              )),
              (f = $.timepicker.timezoneAdjust(
                f,
                $.timepicker.timezoneOffsetString(-f.getTimezoneOffset()),
                e.timezone,
              ))),
            this._updateDatepicker(c),
            this._base_setDateDatepicker.apply(this, arguments),
            this._setTimeDatepicker(a, f, !0)
        }
      }),
      ($.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker),
      ($.datepicker._getDateDatepicker = function (a, b) {
        var c = this._getInst(a)
        if (c) {
          var d = this._get(c, 'timepicker')
          if (d) {
            void 0 === c.lastVal && this._setDateFromField(c, b)
            var e = this._getDate(c),
              f = null
            return (
              (f =
                d.$altInput && d._defaults.altFieldTimeOnly
                  ? d.$input.val() + ' ' + d.$altInput.val()
                  : 'INPUT' !== d.$input.get(0).tagName && d.$altInput
                  ? d.$altInput.val()
                  : d.$input.val()),
              e &&
                d._parseTime(f, !c.settings.timeOnly) &&
                (e.setHours(d.hour, d.minute, d.second, d.millisec),
                e.setMicroseconds(d.microsec),
                null != d.timezone &&
                  (d.support.timezone ||
                    null !== d._defaults.timezone ||
                    (d.timezone = e.getTimezoneOffset() * -1),
                  (e = $.timepicker.timezoneAdjust(
                    e,
                    d.timezone,
                    $.timepicker.timezoneOffsetString(-e.getTimezoneOffset()),
                  )))),
              e
            )
          }
          return this._base_getDateDatepicker(a, b)
        }
      }),
      ($.datepicker._base_parseDate = $.datepicker.parseDate),
      ($.datepicker.parseDate = function (a, b, c) {
        var d
        try {
          d = this._base_parseDate(a, b, c)
        } catch (e) {
          if (!(e.indexOf(':') >= 0)) throw e
          ;(d = this._base_parseDate(
            a,
            b.substring(0, b.length - (e.length - e.indexOf(':') - 2)),
            c,
          )),
            $.timepicker.log(
              'Error parsing the date string: ' +
                e +
                '\ndate string = ' +
                b +
                '\ndate format = ' +
                a,
            )
        }
        return d
      }),
      ($.datepicker._base_formatDate = $.datepicker._formatDate),
      ($.datepicker._formatDate = function (a, b, c, d) {
        var e = this._get(a, 'timepicker')
        return e
          ? (e._updateDateTime(a), e.$input.val())
          : this._base_formatDate(a)
      }),
      ($.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker),
      ($.datepicker._optionDatepicker = function (a, b, c) {
        var e,
          d = this._getInst(a)
        if (!d) return null
        var f = this._get(d, 'timepicker')
        if (f) {
          var l,
            m,
            n,
            o,
            g = null,
            h = null,
            i = null,
            j = f._defaults.evnts,
            k = {}
          if ('string' == typeof b) {
            if ('minDate' === b || 'minDateTime' === b) g = c
            else if ('maxDate' === b || 'maxDateTime' === b) h = c
            else if ('onSelect' === b) i = c
            else if (j.hasOwnProperty(b)) {
              if ('undefined' == typeof c) return j[b]
              ;(k[b] = c), (e = {})
            }
          } else if ('object' == typeof b) {
            b.minDate
              ? (g = b.minDate)
              : b.minDateTime
              ? (g = b.minDateTime)
              : b.maxDate
              ? (h = b.maxDate)
              : b.maxDateTime && (h = b.maxDateTime)
            for (l in j) j.hasOwnProperty(l) && b[l] && (k[l] = b[l])
          }
          for (l in k)
            k.hasOwnProperty(l) &&
              ((j[l] = k[l]), e || (e = $.extend({}, b)), delete e[l])
          if (e && isEmptyObject(e)) return
          if (
            (g
              ? ((g = 0 === g ? new Date() : new Date(g)),
                (f._defaults.minDate = g),
                (f._defaults.minDateTime = g))
              : h
              ? ((h = 0 === h ? new Date() : new Date(h)),
                (f._defaults.maxDate = h),
                (f._defaults.maxDateTime = h))
              : i && (f._defaults.onSelect = i),
            g || h)
          )
            return (
              (o = $(a)),
              (n = o.datetimepicker('getDate')),
              (m = this._base_optionDatepicker.call(
                $.datepicker,
                a,
                e || b,
                c,
              )),
              o.datetimepicker('setDate', n),
              m
            )
        }
        return void 0 === c
          ? this._base_optionDatepicker.call($.datepicker, a, b)
          : this._base_optionDatepicker.call($.datepicker, a, e || b, c)
      })
    var isEmptyObject = function (a) {
        var b
        for (b in a) if (a.hasOwnProperty(b)) return !1
        return !0
      },
      extendRemove = function (a, b) {
        $.extend(a, b)
        for (var c in b) (null !== b[c] && void 0 !== b[c]) || (a[c] = b[c])
        return a
      },
      detectSupport = function (a) {
        var b = a.replace(/'.*?'/g, '').toLowerCase(),
          c = function (a, b) {
            return a.indexOf(b) !== -1
          }
        return {
          hour: c(b, 'h'),
          minute: c(b, 'm'),
          second: c(b, 's'),
          millisec: c(b, 'l'),
          microsec: c(b, 'c'),
          timezone: c(b, 'z'),
          ampm: c(b, 't') && c(a, 'h'),
          iso8601: c(a, 'Z'),
        }
      },
      convert24to12 = function (a) {
        return (a %= 12), 0 === a && (a = 12), String(a)
      },
      computeEffectiveSetting = function (a, b) {
        return a && a[b] ? a[b] : $.timepicker._defaults[b]
      },
      splitDateTime = function (a, b) {
        var c = computeEffectiveSetting(b, 'separator'),
          d = computeEffectiveSetting(b, 'timeFormat'),
          e = d.split(c),
          f = e.length,
          g = a.split(c),
          h = g.length
        return h > 1
          ? {
              dateString: g.splice(0, h - f).join(c),
              timeString: g.splice(0, f).join(c),
            }
          : { dateString: a, timeString: '' }
      },
      parseDateTimeInternal = function (a, b, c, d, e) {
        var f, g, h
        if (
          ((g = splitDateTime(c, e)),
          (f = $.datepicker._base_parseDate(a, g.dateString, d)),
          '' === g.timeString)
        )
          return { date: f }
        if (((h = $.datepicker.parseTime(b, g.timeString, e)), !h))
          throw 'Wrong time format'
        return { date: f, timeObj: h }
      },
      selectLocalTimezone = function (a, b) {
        if (a && a.timezone_select) {
          var c = b || new Date()
          a.timezone_select.val(-c.getTimezoneOffset())
        }
      }
    ;($.timepicker = new Timepicker()),
      ($.timepicker.timezoneOffsetString = function (a, b) {
        if (isNaN(a) || a > 840 || a < -720) return a
        var c = a,
          d = c % 60,
          e = (c - d) / 60,
          f = b ? ':' : '',
          g =
            (c >= 0 ? '+' : '-') +
            ('0' + Math.abs(e)).slice(-2) +
            f +
            ('0' + Math.abs(d)).slice(-2)
        return '+00:00' === g ? 'Z' : g
      }),
      ($.timepicker.timezoneOffsetNumber = function (a) {
        var b = a.toString().replace(':', '')
        return 'Z' === b.toUpperCase()
          ? 0
          : /^(\-|\+)\d{4}$/.test(b)
          ? ('-' === b.substr(0, 1) ? -1 : 1) *
            (60 * parseInt(b.substr(1, 2), 10) + parseInt(b.substr(3, 2), 10))
          : parseInt(a, 10)
      }),
      ($.timepicker.timezoneAdjust = function (a, b, c) {
        var d = $.timepicker.timezoneOffsetNumber(b),
          e = $.timepicker.timezoneOffsetNumber(c)
        return isNaN(e) || a.setMinutes(a.getMinutes() + -d - -e), a
      }),
      ($.timepicker.timeRange = function (a, b, c) {
        return $.timepicker.handleRange('timepicker', a, b, c)
      }),
      ($.timepicker.datetimeRange = function (a, b, c) {
        $.timepicker.handleRange('datetimepicker', a, b, c)
      }),
      ($.timepicker.dateRange = function (a, b, c) {
        $.timepicker.handleRange('datepicker', a, b, c)
      }),
      ($.timepicker.handleRange = function (a, b, c, d) {
        function f(e, f) {
          var g = b[a]('getDate'),
            h = c[a]('getDate'),
            i = e[a]('getDate')
          if (null !== g) {
            var j = new Date(g.getTime()),
              k = new Date(g.getTime())
            j.setMilliseconds(j.getMilliseconds() + d.minInterval),
              k.setMilliseconds(k.getMilliseconds() + d.maxInterval),
              d.minInterval > 0 && j > h
                ? c[a]('setDate', j)
                : d.maxInterval > 0 && k < h
                ? c[a]('setDate', k)
                : g > h && f[a]('setDate', i)
          }
        }
        function g(b, c, e) {
          if (b.val()) {
            var f = b[a].call(b, 'getDate')
            null !== f &&
              d.minInterval > 0 &&
              ('minDate' === e &&
                f.setMilliseconds(f.getMilliseconds() + d.minInterval),
              'maxDate' === e &&
                f.setMilliseconds(f.getMilliseconds() - d.minInterval)),
              f.getTime && c[a].call(c, 'option', e, f)
          }
        }
        d = $.extend(
          {},
          { minInterval: 0, maxInterval: 0, start: {}, end: {} },
          d,
        )
        var e = !1
        return (
          'timepicker' === a && ((e = !0), (a = 'datetimepicker')),
          $.fn[a].call(
            b,
            $.extend(
              {
                timeOnly: e,
                onClose: function (a, b) {
                  f($(this), c)
                },
                onSelect: function (a) {
                  g($(this), c, 'minDate')
                },
              },
              d,
              d.start,
            ),
          ),
          $.fn[a].call(
            c,
            $.extend(
              {
                timeOnly: e,
                onClose: function (a, c) {
                  f($(this), b)
                },
                onSelect: function (a) {
                  g($(this), b, 'maxDate')
                },
              },
              d,
              d.end,
            ),
          ),
          f(b, c),
          g(b, c, 'minDate'),
          g(c, b, 'maxDate'),
          $([b.get(0), c.get(0)])
        )
      }),
      ($.timepicker.log = function () {
        window.console &&
          window.console.log &&
          window.console.log.apply &&
          window.console.log.apply(
            window.console,
            Array.prototype.slice.call(arguments),
          )
      }),
      ($.timepicker._util = {
        _extendRemove: extendRemove,
        _isEmptyObject: isEmptyObject,
        _convert24to12: convert24to12,
        _detectSupport: detectSupport,
        _selectLocalTimezone: selectLocalTimezone,
        _computeEffectiveSetting: computeEffectiveSetting,
        _splitDateTime: splitDateTime,
        _parseDateTimeInternal: parseDateTimeInternal,
      }),
      Date.prototype.getMicroseconds ||
        ((Date.prototype.microseconds = 0),
        (Date.prototype.getMicroseconds = function () {
          return this.microseconds
        }),
        (Date.prototype.setMicroseconds = function (a) {
          return (
            this.setMilliseconds(this.getMilliseconds() + Math.floor(a / 1e3)),
            (this.microseconds = a % 1e3),
            this
          )
        })),
      ($.timepicker.version = '1.6.3')
  }
})
