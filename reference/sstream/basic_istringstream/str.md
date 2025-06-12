# str
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
* function[meta id-type]

```cpp
basic_string<CharT, Traits, Allocator> str() const;                // (1) C++03
basic_string<CharT, Traits, Allocator> str() const &;              // (1) C++20

template <class SAlloc>
basic_string<CharT, Traits, SAlloc> str(const SAlloc& sa) const &; // (2) C++20

basic_string<CharT, Traits, Allocator> str() const &&;             // (3) C++20

void str(const basic_string<CharT, Traits, Allocator>& s);  // (4) C++03

template <class SAlloc>
void str(const basic_string<CharT, Traits, SAlloc>& s);     // (5) C++20
void str(const basic_string<CharT, Traits, Allocator>&& s); // (6) C++20

template<class T>
void str(const T& t);                                   // (7) C++26
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列オブジェクトを取得または設定する。

- (1) : 文字列オブジェクトを取得する
- (2) : 文字列オブジェクトを取得して、`SAlloc`型のアロケータ`sa`によって確保する
- (3) : 保持する文字列オブジェクトをムーブして取得する
- (4) : 文字列オブジェクト`s`を設定する
- (5) : `Allocator`に変換可能な`SAlloc`型のアロケータによって確保されているデータをコピーして、文字列オブジェクト`s`を設定する
- (6) : 与えられた文字列オブジェクト`s`をムーブして設定する
- (7) : [`std::basic_string_view`](/reference/string_view/basic_string_view.md)に変換可能な文字列を設定する


## テンプレートパラメータ制約
- (7) : `is_convertible_v<const T&, basic_string_view<CharT, Traits>>`が`true`であること

## 効果
- (1) : `return rdbuf()->str()` と等価
- (2) : `return rdbuf()->str(sa)` と等価
- (3) : `return std::move(*rdbuf()).str()` と等価
- (4) : `rdbuf()->str(s)` と等価
- (5) : `rdbuf()->str(s)` と等価
- (6) : `rdbuf()->str(std::move(s))` と等価
- (7) : `rdbuf()->str(t)` と等価

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  // 文字列の取得
  std::istringstream iss("Hello World 123 45.67");
  std::cout << "Content: " << iss.str() << std::endl;
  
  // 一部を読み取っても、str()は全体を返す
  std::string word;
  iss >> word;
  std::cout << "Read word: " << word << std::endl;
  std::cout << "Full content: " << iss.str() << std::endl;
  
  // 新しい文字列を設定
  iss.str("New content 999");
  iss.clear();  // エラーフラグをクリア
  
  // 新しい内容から読み取り
  std::string s1, s2;
  int num;
  iss >> s1 >> s2 >> num;
  std::cout << "New read: " << s1 << " " << s2 << " " << num << std::endl;
  
  // 空文字列を設定してリセット
  iss.str("");
  std::cout << "Empty? " << (iss.str().empty() ? "yes" : "no") << std::endl;
}
```

#### 出力
```
Content: Hello World 123 45.67
Read word: Hello
Full content: Hello World 123 45.67
New read: New content 999
Empty? yes
```

#### ムーブを使用する例 (C++20)
```cpp example
#include <iostream>
#include <sstream>

int main() {
  std::istringstream ss;

  // ムーブして文字列を設定
  std::string s = "Move string";
  ss.str(std::move(s));
  std::cout << ss.str() << std::endl;

  // ムーブで文字列を取得
  std::string r = std::move(ss).str();
  std::cout << r << std::endl;
}
```

#### 出力
```
Move string
Move string
```


### string_viewからの設定 (C++26)
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main() {
  std::istringstream ss;

  // 文字列リテラルを設定
  ss.str("set from string literal");
  std::cout << ss.str() << std::endl;

  // string_viewを設定
  std::string_view sv = "set from string_view";
  ss.str(sv);
  std::cout << ss.str() << std::endl;
}
```

#### 出力
```
set from string literal
set from string_view
```


## 関連項目
- [`basic_stringbuf::str`](../basic_stringbuf/str.md)


## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した