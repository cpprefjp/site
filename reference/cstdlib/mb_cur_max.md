# MB_CUR_MAX
* cstdlib[meta header]
* macro[meta id-type]

```cpp
#define MB_CUR_MAX implementation-defined
```

## 概要
現在のロケールのマルチバイト文字の最大バイト数を示すマクロ。

この定数はコンパイル時定数ではなく、実行時に変化する可能性がある。

この値が`MB_LEN_MAX`を超えることはない。

## 結果型
`size_t`型の正の整数値。

## 例
```cpp example
#include <iostream>
#include <clocale>
#include <cstdlib>

int main() {
  //C ロケール(標準ASCII)
  std::cout << "Locale: standard, MB_CUR_MAX: " << MB_CUR_MAX << std::endl;
  
  //ロケールを日本(UTF-8)に変更
  if (std::setlocale(LC_CTYPE, "ja_JP.UTF-8") == nullptr) {
    std::cout << "Failed to set locale to ja_JP.UTF-8"  << std::endl;
  } else {
    std::cout << "Locale: ja_JP.UTF-8, MB_CUR_MAX: " << MB_CUR_MAX << std::endl;
  }
}
```

### 出力例
```
Locale: standard, MB_CUR_MAX: 1
Locale: ja_JP.UTF-8, MB_CUR_MAX: 6
```

## 関連項目
- [`MB_LEN_MAX`](/reference/climits/mb_len_max.md): 全ロケールでのマルチバイト文字の最大バイト数
- `setlocale`: ロケールを変更する

## 参照
- [mb_cur_max(3) - Linux man page](https://linux.die.net/man/3/mb_cur_max)
