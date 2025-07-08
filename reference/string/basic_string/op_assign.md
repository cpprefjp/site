# operator=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& operator=(const basic_string& str);                  // (1) C++03
constexpr basic_string& operator=(const basic_string& str);        // (1) C++20

basic_string& operator=(basic_string&& str) noexcept;              // (2) C++11
basic_string& operator=(basic_string&& str) noexcept
  (allocator_traits<Allocator>::propagate_on_container_move_assignment::value
    || allocator_traits<Allocator>::is_always_equal::value);       // (2) C++17
constexpr basic_string& operator=(basic_string&& str) noexcept
  (allocator_traits<Allocator>::propagate_on_container_move_assignment::value
    || allocator_traits<Allocator>::is_always_equal::value);       // (2) C++20

basic_string& operator=(const charT* s);                           // (3) C++03
constexpr basic_string& operator=(const charT* s);                 // (3) C++20

basic_string& operator=(charT c);                                  // (4) C++03
constexpr basic_string& operator=(charT c);                        // (4) C++20

basic_string& operator=(initializer_list<charT> il);               // (5) C++11
constexpr basic_string& operator=(initializer_list<charT> il);     // (5) C++20

// string_viewを引数に取るオーバーロード
template<class T>
basic_string& operator=(const T& t);                               // (6) C++17
template<class T>
constexpr basic_string& operator=(const T& t);                     // (6) C++20

basic_string& operator=(nullptr_t) = delete;                       // (7) C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : `str` を `*this` へコピーする。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- (2) : `str` から `*this` へデータの所有権を移動する。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- (3) : `*this = basic_string(s);` と等価。
- (4) : `*this = basic_string(1, c);` と等価。
- (5) : `*this = basic_string(il);` と等価。
- (6) : [`std::basic_string_view`](/reference/string_view/basic_string_view.md)オブジェクトからの変換。以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return assign(sv);
    ```
    * assign[link assign.md]


## テンプレートパラメータ制約

- (6) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`

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

  // (6) std::basic_string_viewを代入
  {
    s = std::string_view{"Hello World"}.substr(0, 5);
  }

  std::cout << s << std::endl;
}
```

### 出力
```
Hello
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(6)の引数型を`const T&`に変更
- [P2166R1 A Proposal to Prohibit std::basic_string and std::basic_string_view construction from nullptr.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2166r1.html)
    - C++23での、`nullptr_t`をとる代入演算子のdelete宣言追加
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
