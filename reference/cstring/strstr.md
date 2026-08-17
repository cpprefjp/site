# strstr
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const char* strstr(const char* s1, const char* s2); // (1)
  char* strstr(char* s1, const char* s2);             // (2)
}
```

## 概要
文字列から部分文字列を検索する。

- (1) : 引数`s1`が`const`修飾されている場合に、`const`修飾を保持して結果を返すオーバーロード。
- (2) : 引数`s1`が`const`修飾されていない場合に、非`const`のポインタを返すオーバーロード。


## 効果
`s1`が指す文字列から、`s2`が指す文字列 (終端のヌル文字を含まない) が部分文字列として最初に現れる位置を検索する。


## 戻り値
見つかった場合、その位置を指すポインタを返す。見つからなかった場合、ヌルポインタを返す。`s2`が空文字列を指す場合は`s1`を返す。

- (1) : `const char*`を返す。
- (2) : `char*`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- C言語の`strstr`は`char*`を返す単一の関数だが、C++では`const`修飾を保持するために2つのオーバーロードが提供される。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const char s[] = "hello world";

  const char* p = std::strstr(s, "world");

  std::cout << (p != nullptr ? p - s : -1) << std::endl;
}
```
* std::strstr[color ff0000]

### 出力
```
6
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strchr`](strchr.md): 文字を検索する
- [`strrchr`](strrchr.md): 文字を後ろから検索する


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
