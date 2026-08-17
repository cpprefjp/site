# strchr
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const char* strchr(const char* s, int c); // (1)
  char* strchr(char* s, int c);             // (2)
}
```

## 概要
文字列から文字を検索する。

- (1) : 引数`s`が`const`修飾されている場合に、`const`修飾を保持して結果を返すオーバーロード。
- (2) : 引数`s`が`const`修飾されていない場合に、非`const`のポインタを返すオーバーロード。


## 効果
`s`が指す文字列から、`char`に変換した文字`c`が最初に現れる位置を検索する。終端のヌル文字も文字列の一部として検索対象に含まれる。


## 戻り値
見つかった場合、その位置を指すポインタを返す。見つからなかった場合、ヌルポインタを返す。

- (1) : `const char*`を返す。
- (2) : `char*`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- C言語の`strchr`は`char*`を返す単一の関数だが、C++では`const`修飾を保持するために2つのオーバーロードが提供される。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const char s[] = "hello";

  const char* p = std::strchr(s, 'l');

  std::cout << (p != nullptr ? p - s : -1) << std::endl;
}
```
* std::strchr[color ff0000]

### 出力
```
2
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strrchr`](strrchr.md): 文字を後ろから検索する
- [`strstr`](strstr.md): 文字列を検索する
- [`memchr`](memchr.md): メモリデータを検索する


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
