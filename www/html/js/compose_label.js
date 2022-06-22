const C = (function () {
    'use strict'

    const canvas_width_px = 807
    const canvas_height_px = 432
    const qr_code_width_height_px = 175
    const margin = 10
    const upper_line_len = 27
    const lower_line_len = 36
    const text_max_len = Math.floor((4 * upper_line_len) + (3.6 * lower_line_len))
    const line_spacing = 50

    console.log(text_max_len)

    function stringDivider(str, width, spaceReplacer) {
        if (str.length > width) {
            var p = width
            for (; p > 0 && str[p] != ' '; p--) {
            }
            if (p > 0) {
                var left = str.substring(0, p);
                var right = str.substring(p + 1);
                return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
            }
        }
        return str;
    }

    let text =
        'vnibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur felis sedis uta'

    function wipeLabel() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas_width_px, canvas_height_px)
        ctx.fillStyle = 'black';
        updateQRLabel($('#album-name').val())
    }

    function updateQRLabel(text) {
        qrcode.makeCode('https://photoslibrary.googleapis.com/v1/albums/'
            + encodeURI(text))
        let qr_canvas = document.getElementById('qrcode').firstElementChild
        let qr_ctx = qr_canvas.getContext('2d')
        let imageData = qr_ctx.getImageData(0, 0, 175, 175)
        ctx.putImageData(imageData, 4 * margin, 4 * margin)
        updateQRFormData()
    }

    function setType(text) {
        let line_y_axis = 60
        ctx.beginPath()

        if (text.length < text_max_len) {
            text.padEnd(text_max_len - text.length, ' ')
        }

        if (text.length > text_max_len) {
            text = text.substring(0, text_max_len)
            text = text.substring(0, text.lastIndexOf(' '))
            $('#label-text').val(text)
        }

        text = text + ' '
        const upper_lower_split = text.substr(0, 4 * upper_line_len).lastIndexOf(' ')
        let upper_rows_str = stringDivider(text.substr(0, upper_lower_split),
            upper_line_len,
            String.fromCharCode(12))
        let upper_rows = upper_rows_str.split(String.fromCharCode(12))
        upper_rows.forEach((row) => {
            ctx.fillText(row.trim(),
                24 * margin, line_y_axis,
                canvas_width_px - margin)
            line_y_axis += line_spacing
        })
        let lower_rows_str = stringDivider(text.substr(upper_lower_split + 1, text.length),
            lower_line_len,
            String.fromCharCode(12))
        let lower_rows = lower_rows_str.split(String.fromCharCode(12))
        lower_rows.forEach((row) => {
            ctx.fillText(row.trim(),
                4 * margin, line_y_axis,
                canvas_width_px - margin)
            line_y_axis += line_spacing
        })
    }

    function updateQRFormData() {
        let img = canvas.toDataURL()
        img = img.substring(img.indexOf(',') + 1, img.length)
        $('#qr-data').val(img)
    }

    return {
        initApp: function () {
            ctx.font = '48px serif'
            ctx.fillStyle = 'black'

            wipeLabel()

            $('#album-name').on('keyup', function (e) {
                updateQRLabel(e.currentTarget.value)
            })

            $('#label-text').on('keyup', function (e) {
                wipeLabel()
                setType(e.currentTarget.value)
                updateQRFormData()
            })

        },
    }
})()