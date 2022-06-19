#!/bin/bash

echo "#### CGI START ####"

echo "ARGS: " "$@"
echo

# The text embedded in the QR Code
QR_TEXT=$( sed -n 's/^qr_text=(.+)$/\1/p' )

# The image src data of the QR code.
#   EX: 'data:image/png;base64,<base-64-encoded-data>'
QR_DATA=$( sed -n 's/^qr_data=(.+)$/\1/p' )


echo "QR_TEXT: $QR_TEXT"
echo
echo "QR_DATA: $QR_DATA"
echo

# TODO: Generate output image and print

echo "#### CGI END ####"

exit 200