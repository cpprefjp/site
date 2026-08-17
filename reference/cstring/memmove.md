# memmove
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void* memmove(void* s1, const void* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータをコピーする。コピー元とコピー先の領域が重なっていてもよい。


## 効果
`s2`が指すオブジェクトから`s1`が指すオブジェクトへ、先頭`n`バイトをコピーする。

コピーは、`s2`が指す`n`バイトをまず一時オブジェクトへコピーし、その一時オブジェクトから`s1`へコピーしたかのように行われる。そのため、コピー元とコピー先の領域が重なっていても正しくコピーされる。


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
  char s[] = "abcdef";

  // 領域が重複した状態で、1文字後ろへずらしてコピーする
  std::memmove(s + 1, s, 5);

  std::cout << s << std::endl;
}
```
* std::memmove[color ff0000]

### 出力
```
aabcde
```


## バージョン
### 言語
- C++98


## 関連項目
- [`memcpy`](memcpy.md): メモリデータをコピーする
- [`memccpy`](memccpy.md): メモリデータを指定した文字が現れるまでコピーする


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
