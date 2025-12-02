# mblen
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int mblen(const char* str, size_t n);
}
```

## 概要
マルチバイト文字列の先頭の文字が占めるバイト数を返す。

この関数は現在のロケールに依存してマルチバイト文字を解釈する。
n は解析に使用する最大バイト数を指定する。

## 戻り値
- 正常に動作する場合、文字の占めるバイト数を返す。
- `str`が`nullptr`の時、内部状態を初期化し`0`を返す。
- 無効な文字列、または`n`が不足している場合、`-1`を返す。

## 例
```cpp example
#include <iostream>
#include <cstdlib>
#include <clocale>

int main() {
  std::setlocale(LC_ALL, "ja_JP.UTF-8");
  const char *str = "こんにちは";
  int result = std::mblen(str, MB_CUR_MAX);
  std::cout << result << std::endl;
  return 0;
}
```

### 出力例
```
3
```
