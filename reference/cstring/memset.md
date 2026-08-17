# memset
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void* memset(void* s, int c, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータを指定した値で埋める。


## 効果
`s`が指すオブジェクトの先頭`n`バイトのそれぞれに、`unsigned char`に変換した値`c`を書き込む。


## 戻り値
`s`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- 機密情報をメモリ上から確実に消去する用途では、書き込みが最適化によって除去されることがあるため、[`memset_explicit`](memset_explicit.md)を使用する。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  char buf[6];

  // 先頭5バイトを'A'で埋める
  std::memset(buf, 'A', 5);
  buf[5] = '\0';

  std::cout << buf << std::endl;
}
```
* std::memset[color ff0000]

### 出力
```
AAAAA
```


## バージョン
### 言語
- C++98


## 関連項目
- [`memset_explicit`](memset_explicit.md): メモリデータを指定した値で埋める（最適化によって除去されない）
- [`memcpy`](memcpy.md): メモリデータをコピーする


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
