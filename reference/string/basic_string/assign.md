# assign
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& assign(const basic_string& str);                  // (1) C++03
constexpr basic_string& assign(const basic_string& str);        // (1) C++20

basic_string& assign(basic_string&& str) noexcept;              // (2) C++11
constexpr basic_string& assign(basic_string&& str) noexcept;    // (2) C++20

basic_string&
  assign(const basic_string& str,
         size_type pos,
         size_type n);             // (3) C++03
basic_string&
  assign(const basic_string& str,
         size_type pos,
         size_type n = npos);      // (3) C++14
constexpr basic_string&
  assign(const basic_string& str,
         size_type pos,
         size_type n = npos);      // (3) C++20

basic_string& assign(const charT* s, size_type n);              // (4) C++03
constexpr basic_string& assign(const charT* s, size_type n);    // (4) C++20

basic_string& assign(const charT* s);                           // (5) C++03
constexpr basic_string& assign(const charT* s);                 // (5) C++20

basic_string& assign(size_type n, charT c);                     // (6) C++03
constexpr basic_string& assign(size_type n, charT c);           // (6) C++20

template <class InputIterator>
basic_string&
  assign(InputIterator first,
         InputIterator last);  // (7) C++03
template <class InputIterator>
constexpr basic_string&
  assign(InputIterator first,
         InputIterator last);  // (7) C++20

basic_string& assign(initializer_list<charT> il);           // (8) C++11
constexpr basic_string& assign(initializer_list<charT> il); // (8) C++20

// string_viewを引数に取るオーバーロード
template<class T>
basic_string& assign(const T& t);           // (9) C++17
template<class T>
constexpr basic_string& assign(const T& t); // (9) C++20

template<class T>
basic_string&
  assign(const T& t,
         size_type pos,
         size_type n = npos);   // (10) C++17
template<class T>
constexpr basic_string&
  assign(const T& t,
         size_type pos,
         size_type n = npos);   // (10) C++20
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
文字列の再代入を行う。

この関数は、アロケータを除き、`basic_string`クラスのコンストラクタと同様のパラメータを受け取り、再代入を行う。代入演算子が一つのパラメータしか扱えないため、複数パラメータによる代入として使用する。

## テンプレートパラメータ制約

- (9), (10) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&,` [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`

## 要件
- (3) : `pos <= str.`[`size()`](size.md)であること。
- (4) : `s` は少なくとも `n` の長さを持つ `charT` 型の配列を指していること。
- (5) : `s` は少なくとも `traits_type::length(s) + 1` の長さを持つ `charT` 型の配列を指していること。


## 効果
- (1) : コピー代入。`str`オブジェクトと同じ文字列を構築する。
    - `assign(str, 0, npos)`と等価。
- (2) : ムーブ代入。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (3) : `str`オブジェクトの部分文字列のコピーから構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。
    - 文字列の長さ `rlen` は、`n` と `str.`[`size`](size.md)`() - pos` の小さい方である。 `n == npos` の場合は、 `str.`[`size`](size.md)`() - pos` が使用される。
    - `assign(str.data() + pos, rlen)`を呼び出す。
- (4) : 文字配列`s`の先頭`n`文字からなる部分文字列のコピーから構築する。
- (5) : 文字配列`s`のコピーから構築する。
    - `assign(s,` [`traits::length`](/reference/string/char_traits/length.md)`(s))`を呼び出す。
- (6) : 文字`c`の`n`回繰り返した文字列からなる`basic_string`オブジェクトを構築する。
    - `assign(basic_string(n, c))`と等価。
- (7) : 文字列のイテレータ範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
    - `assign(basic_string(first, last))`と等価。
- (8) : 文字の初期化子リストから`basic_string`オブジェクトを構築する。
    - `assign(il.begin(), il.end())`を呼び出す。
- (9) : [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>`に変換可能な`t`が参照する範囲をコピーして、`basic_string`オブジェクトを構築する。  
以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return assign(sv.data(), sv.size());
    ```

- (10) : [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>`に変換可能な`t`が参照する文字列を範囲指定でコピーして、`basic_string`オブジェクトを構築する。  
以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return assign(sv.substr(pos, n));
    ```
    * substr[link /reference/string_view/basic_string_view/substr.md]


## 戻り値
`*this`


## 例外
- (3) : `pos > str.`[`size()`](size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する
- (4) : `n >` [`max_size()`](max_size.md)である場合、[`length_error`](/reference/stdexcept.md)例外を送出する
- (10) : `pos >` [`sv.size()`](/reference/string_view/basic_string_view/size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する



## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // (1) コピー代入
  std::string s1;
  std::string s1_tmp = "hello";
  s1.assign(s1_tmp);
  std::cout << "s1 : " << s1 << std::endl;

  // (2) ムーブ代入
  std::string s2;
  s2.assign(std::string("hello"));
  std::cout << "s2 : " << s2 << std::endl;

  // (3) 部分文字列のコピーを代入
  // s2文字列オブジェクトの1番目の文字から3文字
  std::string s3;
  s3.assign(s2, 1, 3);
  std::cout << "s3 : " << s3 << std::endl;

  // (4) 文字配列の先頭N文字を代入
  std::string s4;
  s4.assign("hello", 3);
  std::cout << "s4 : " << s4 << std::endl;

  // (5) 文字配列を代入
  std::string s5;
  s5.assign("hello");
  std::cout << "s5 : " << s5 << std::endl;

  // (6) 文字をN回繰り返して代入
  std::string s6;
  s6.assign(3, 'a');
  std::cout << "s6 : " << s6 << std::endl;

  // (7) 文字列の範囲を代入
  std::string s7;
  s7.assign(s1.begin(), s1.end());
  std::cout << "s7 : " << s7 << std::endl;

  // (8) 文字の初期化子リストを代入
  std::string s8;
  s8.assign({'h', 'e', 'l', 'l', 'o'});
  std::cout << "s8 : " << s8 << std::endl;

  // (9) std::basic_string_viewオブジェクトを代入
  std::string s9;
  s9.assign(std::string_view{"Hello World"}.substr(0, 5));
  std::cout << "s9 : " << s9 << std::endl;

  // (10) std::basic_string_viewオブジェクトを範囲指定して代入
  std::string s10;
  s10.assign(std::string_view{"Hello World"}, 0, 5);
  std::cout << "s10 : " << s10 << std::endl;
}
```
* assign[color ff0000]

### 出力
```
s1 : hello
s2 : hello
s3 : ell
s4 : hel
s5 : hello
s6 : aaa
s7 : hello
s8 : hello
s9 : Hello
s10 : Hello
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (7)の経緯となる提案文書
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(3)のオーバーロードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [LWG Issue 2758. `std::string{}.assign("ABCDE", 0, 1)` is ambiguous](https://wg21.cmeerw.net/lwg/issue2758)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(9), (10)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
