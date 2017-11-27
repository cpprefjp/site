# operator=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& operator=(const basic_string& str);     // (1)
basic_string& operator=(basic_string&& str) noexcept; // (2) C++11
basic_string& operator=(const charT* s);              // (3)
basic_string& operator=(charT c);                     // (4)
basic_string& operator=(initializer_list<charT> il);  // (5) C++11
```
* initializer_list[link /reference/initializer_list.md]

## 概要
- (1) : `str` を `*this` へコピーする。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- (2) : `str` から `*this` へデータの所有権を移動する。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- (3) : `*this = basic_string(s);` と等価。
- (4) : `*this = basic_string(1, c);` と等価。
- (5) : `*this = basic_string(il);` と等価。


## 効果
コピーを行った場合と、ムーブ代入を行った場合で効果が異なる

| メンバ関数                    | コピーの場合                                | ムーブ代入の場合  |
|-------------------------------|---------------------------------------------|------------------------------|
| `data()`                      | `str.data()` をコピーした領域の先頭ポインタ | `str.data()` |
| [`size()`](size.md)         | `str.`[`size()`](size.md) と同じ値        | `str.`[`size()`](size.md)と同じ値 |
| [`capacity()`](capacity.md) | [`size()`](size.md) 以上の値              | [`size()`](size.md) 以上の値 |


## 戻り値
`*this`


## 例外
ムーブ代入の場合は例外を投げない。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s;

  // (1) basic_string左辺値の代入
  {
    std::string r = "hello";
    s = r;
  }

  // (2) basic_string右辺値の代入
  {
    s = std::string("hello");
  }

  // (3) 文字配列の代入
  {
    s = "hello";
  }

  // (4) 文字の代入
  {
    s = 'a';
  }

  // (5) 文字の初期化子リストを代入
  {
    s = {'h', 'e', 'l', 'l', 'o'};
  }

  std::cout << s << std::endl;
}
```

### 出力
```
hello
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
