# memcpy
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void* memcpy(void* s1, const void* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータをコピーする。


## 効果
`s2`が指すオブジェクトから`s1`が指すオブジェクトへ、先頭`n`バイトをコピーする。

コピー元とコピー先の領域が重なっている場合、動作は未定義である。領域が重なりうる場合は[`memmove`](memmove.md)を使用する。


## 戻り値
`s1`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const char src[] = "hello";
  char dst[6] = {};

  // 終端ヌル文字を含めてコピーする
  std::memcpy(dst, src, sizeof(src));

  std::cout << dst << std::endl;
}
```
* std::memcpy[color ff0000]

### 出力
```
hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`memmove`](memmove.md): メモリデータをコピーする（領域重複可）
- [`memccpy`](memccpy.md): メモリデータを指定した文字が現れるまでコピーする
- [`memset`](memset.md): メモリデータを指定した値で埋める


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
