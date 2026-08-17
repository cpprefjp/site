# memcmp
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int memcmp(const void* s1, const void* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータを比較する。


## 効果
`s1`が指すオブジェクトと`s2`が指すオブジェクトの先頭`n`バイトを比較する。各バイトは`unsigned char`として比較される。


## 戻り値
2つのオブジェクトで最初に異なるバイトについて、`s1`側のバイトが`s2`側のバイトより大きい場合は正の整数、小さい場合は負の整数を返す。先頭`n`バイトがすべて等しい場合は`0`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const unsigned char a[] = {0x01, 0x02, 0x03};
  const unsigned char b[] = {0x01, 0x02, 0x04};

  int r = std::memcmp(a, b, 3);

  std::cout << (r < 0 ? "less" : r > 0 ? "greater" : "equal") << std::endl;
}
```
* std::memcmp[color ff0000]

### 出力
```
less
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcmp`](strcmp.md): 文字列を比較する
- [`strncmp`](strncmp.md): 文字列を比較する（上限サイズ指定）


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
