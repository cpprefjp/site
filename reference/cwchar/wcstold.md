# wcstold
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long double wcstold(const wchar_t* nptr, wchar_t** endptr);
}
```

## 概要
ワイド文字列`nptr`を`long double`型の浮動小数点数に変換する。

解釈の規則は、マルチバイト文字列版の[`std::strtold()`](/reference/cstdlib/strtold.md)と同じであり、10進数の浮動小数点数のほか、`0x`で始まる16進浮動小数点数、`INF`、`NAN`を解釈できる。


## 戻り値
- 変換可能ならば変換後の数値を返す
- 変換後の数値の絶対値が大きすぎて表現できない場合、`HUGE_VAL`系の値を返し、[`errno`](/reference/cerrno/errno.md)に`ERANGE`を設定する
- 変換不可能ならば`0`を返す


## 備考
- 小数点を表す文字は、現在のCロケールに依存する


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t* end = nullptr;

  long double a = std::wcstold(L"3.14abc", &end);
  std::wcout << static_cast<double>(a) << std::endl;
  std::wcout << end << std::endl;
}
```
* std::wcstold[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
3.14
abc
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]


## 関連項目
- [`wcstod`](wcstod.md)
- [`wcstof`](wcstof.md)
- [`std::strtold()`](/reference/cstdlib/strtold.md): マルチバイト文字列版
