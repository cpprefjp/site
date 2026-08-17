# strtok
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* strtok(char* s1, const char* s2);
}
```

## 概要
文字列を、区切り文字を使ってトークンに分割する。


## 効果
一連の`strtok`呼び出しによって、`s1`が指す文字列を、`s2`が指す文字列に含まれる文字を区切りとしたトークンに分割する。

- 最初の呼び出しでは、`s1`に分割対象の文字列を渡す。この関数は、分割対象文字列の先頭からたどって最初のトークンを検索し、そのトークンの直後にある区切り文字をヌル文字で上書きしてトークンを終端したうえで、トークンの先頭を指すポインタを返す。
- 2回目以降の呼び出しでは、`s1`にヌルポインタを渡す。この関数は、内部に保持した位置から続きのトークンを検索する。

`s2`が指す区切り文字集合は、呼び出しごとに異なってもよい。


## 戻り値
トークンが見つかった場合、そのトークンの先頭を指すポインタを返す。トークンが残っていない場合、ヌルポインタを返す。


## 備考
- この関数は内部に状態を保持するため、フリースタンディング処理系では提供されない。
- この関数は内部の静的な状態を使用するため、スレッドセーフではない。
- この関数は引数の文字列を書き換える。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  char s[] = "a,b,c";

  // ','を区切り文字としてトークンに分割する
  for (char* t = std::strtok(s, ","); t != nullptr; t = std::strtok(nullptr, ",")) {
    std::cout << t << std::endl;
  }
}
```
* std::strtok[color ff0000]

### 出力
```
a
b
c
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcspn`](strcspn.md): 指定した文字が現れるまでの長さを求める
- [`strpbrk`](strpbrk.md): 指定した文字が現れる位置を求める


## 参照
- [P2937R0 Freestanding: Remove `strtok`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2937r0.html)
    - C++26で、内部状態を持つ`strtok`はフリースタンディング処理系では提供されないことが整理された
