export function grayscaleFilter(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        // 흑백값을 더 밝게 만들기 위해 0.6을 더해준다.
        // 조금 밝은색의 흑백
        var v = 0.2126 * r + 0.7152 * g + 0.0722 * b; // 보정값 변경
        d[i] = d[i + 1] = d[i + 2] = v + 10; // RBG 색을 같게 맞추고, 적절한 값을 더하여 회색 느낌을 살려준다.
    }
    return pixels;
}

export function brightnessFilter(pixels, value = 50) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] += value; // R
        d[i + 1] += value; // G
        d[i + 2] += value; // B
    }
    return pixels;
}