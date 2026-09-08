# wcstoul
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unsigned long int wcstoul(const wchar_t* nptr, wchar_t** endptr, int base);
}
```

## 概要
ワイド文字列`nptr`を`unsigned long`型の整数に変換する。文字列は`base`で指定された基数に従って解釈される。

解釈の規則は、マルチバイト文字列版の[`std::strtoul()`](/reference/cstdlib/strtoul.md)と同じである。

- `endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される
- 基数`base`は2〜36、または0の値をとる。`0`の場合は、`0x`／`0X`で始まれば16進数、`0`で始まれば8進数、それ以外は10進数として解釈される


## 戻り値
- 変換可能ならば変換後の数値を返す
- 変換後の数値が`unsigned long`の範囲外の場合、その型の最大値または最小値を返し、[`errno`](/reference/cerrno/errno.md)に`ERANGE`を設定する
- 変換不可能ならば`0`を返す


## 備考
- 変換できたかどうかは、戻り値ではなく`endptr`が`nptr`から進んだかどうかで判定する


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t* end = nullptr;

  // 16進数として変換する
  unsigned long a = std::wcstoul(L"ff", &end, 16);
  std::wcout << a << std::endl;

  // 変換が終了した位置以降の文字列
  std::wcout << std::wcstoul(L"12abc", &end, 10) << std::endl;
  std::wcout << end << std::endl;
}
```
* std::wcstoul[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
255
12
abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcstol`](wcstol.md)
- [`wcstoll`](wcstoll.md)
- [`wcstoull`](wcstoull.md)
- [`std::strtoul()`](/reference/cstdlib/strtoul.md): マルチバイト文字列版
