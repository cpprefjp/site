#operator=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& operator=(const basic_string& str);
basic_string& operator=(basic_string&& str) noexcept; // C++11から
basic_string& operator=(const charT* s);
basic_string& operator=(charT c);
basic_string& operator=(initializer_list<charT> il); // C++11から
```
* initializer_list[link /reference/initializer_list.md]

##概要
- `basic_string& operator=(const basic_string& str);`

`str` を `*this` へコピーする。`*this` と `str` が同一オブジェクトである場合は何も行わない。

- `basic_string& operator=(basic_string&& str) noexcept;`

`str` から `*this` へデータの所有権を移動する。`*this` と `str` が同一オブジェクトである場合は何も行わない。

- `basic_string& operator=(const charT* s);`

`*this = basic_string(s);` と等価。

- `basic_string& operator=(charT c);`

`*this = basic_string(1, c);` と等価。

- `basic_string& operator=(`[`initializer_list`](/reference/initializer_list.md)`<charT> il);`

`*this = basic_string(il);` と等価。


##効果
コピーを行った場合と、ムーブ代入を行った場合で効果が異なる

| メンバ関数                    | コピーの場合                                | ムーブ代入の場合  |
|-------------------------------|---------------------------------------------|------------------------------|
| `data()`                      | `str.data()` をコピーした領域の先頭ポインタ | `str.data()` |
| [`size()`](./size.md)         | `str.`[`size()`](./size.md) と同じ値        | `str.`[`size()`](./size.md)と同じ値 |
| [`capacity()`](./capacity.md) | [`size()`](./size.md) 以上の値              | [`size()`](./size.md) 以上の値 |


##戻り値
`*this`


##例外
ムーブ代入の場合は例外を投げない。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s;

  // basic_string左辺値の代入
  {
    std::string r = "hello";
    s = r;
  }

  // basic_string右辺値の代入
  {
    s = std::string("hello");
  }

  // 文字配列の代入
  {
    s = "hello";
  }

  // 文字の代入
  {
    s = 'a';
  }

  // 文字の初期化子リストを代入
  {
    s = {'h', 'e', 'l', 'l', 'o'};
  }

  std::cout << s << std::endl;
}
```

###出力
```
hello
```

##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
