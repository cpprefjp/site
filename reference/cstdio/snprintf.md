# snprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int snprintf(char* buffer, size_t n, const char* format, ...);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
書式を指定して、文字数の上限つきで文字列領域に出力する。

出力される文字数は、ヌル文字を含めて`n`文字以下に制限される。`n`が`0`より大きい場合、出力の末尾には必ずヌル文字が書き込まれる。


## 戻り値
`n`が十分に大きければ書き込まれたはずの文字数（ヌル文字を含まない）を返す。出力エラーが発生した場合は負の値を返す。

つまり、戻り値が`n`以上である場合は、出力が切り詰められたことを意味する。


## 備考
- [`sprintf()`](sprintf.md)と違って書き込む文字数の上限を指定できるため、バッファオーバーランを避けられる
- `n`が`0`の場合、`buffer`はヌルポインタでもよく、なにも書き込まれない。この性質を利用して、必要なバッファサイズを事前に求められる
- C++の文字列フォーマットには、型安全な[`std::format()`](/reference/format/format.md)（C++20）も使用できる


## 例
```cpp example
#include <cstdio>

int main()
{
  char buffer[8];

  // バッファに収まる場合
  int len = std::snprintf(buffer, sizeof(buffer), "%d-%d", 12, 34);
  std::printf("%s (%d)\n", buffer, len);

  // バッファに収まらない場合は切り詰められる。
  // 戻り値は、収まったとしたら必要だった文字数
  len = std::snprintf(buffer, sizeof(buffer), "%d-%d", 123456, 789);
  std::printf("%s (%d)\n", buffer, len);
}
```
* std::snprintf[color ff0000]
* std::printf[link printf.md]

### 出力
```
12-34 (5)
123456- (10)
```


## 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- 動作確認した範囲での最小バージョンを記載している。Clangは3.4（Compiler Explorerで利用できる最古のバージョン）、Visual C++は2019（同左）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`sprintf`](sprintf.md)
- [`vsnprintf`](vsnprintf.md)
- [`printf`](printf.md)
- [`std::format()`](/reference/format/format.md)
