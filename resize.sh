#!/usr/bin/env bash

FILES=()

echo "image resize + uploading"
echo "i hope you configured s3cmd and have imagemagick installed"
echo ""
for var in "$@"
do
    echo "> resizing ${var}.jpg"
    convert ${var}.jpg -resize 640x640\> ${var}_640.jpg
    echo ">> 640x done"
    convert ${var}.jpg -resize 1600x1600\> ${var}_1600.jpg
    echo ">> 1600x done"

    FILES+=("${var}.jpg" "${var}_640.jpg" "${var}_1600.jpg")
done

echo ""
echo "uploading to s3"
s3cmd put "${FILES[@]}" s3://cao-st-photos/
