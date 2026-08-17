# memchr
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const void* memchr(const void* s, int c, size_t n); // (1)
  void* memchr(void* s, int c, size_t n);             // (2)
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータから文字を検索する。

- (1) : 引数`s`が`const`修飾されている場合に、`const`修飾を保持して結果を返すオーバーロード。
- (2) : 引数`s`が`const`修飾されていない場合に、非`const`のポインタを返すオーバーロード。


## 効果
`s`が指すオブジェクトの先頭`n`バイトから、`unsigned char`に変換した文字`c`が最初に現れる位置を検索する。


## 戻り値
見つかった場合、その位置を指すポインタを返す。見つからなかった場合、ヌルポインタを返す。

- (1) : `const void*`を返す。
- (2) : `void*`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- C言語の`memchr`は`void*`を返す単一の関数だが、C++では`const`修飾を保持するために2つのオーバーロードが提供される。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const char data[] = {'a', 'b', 'c', 'd'};

  auto p = static_cast<const char*>(std::memchr(data, 'c', sizeof(data)));

  std::cout << (p != nullptr ? p - data : -1) << std::endl;
}
```
* std::memchr[color ff0000]

### 出力
```
2
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strchr`](strchr.md): 文字を検索する
- [`memcmp`](memcmp.md): メモリデータを比較する


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
