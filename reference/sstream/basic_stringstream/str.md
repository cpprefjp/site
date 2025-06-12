# str
* sstream[meta header]
* std[meta namespace]
* basic_stringstream[meta class]
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
void str(const T& t);                                       // (7) C++26
```
* basic_string[link /reference/string/basic_string.md]

## 概要
文字列オブジェクトを取得または設定する。

書き込み位置としては先頭にリセットされるため注意すること。

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
  std::stringstream ss;
  
  // 文字列を設定
  ss.str("initial content");
  std::cout << "1: " << ss.str() << std::endl;
  
  // ストリームに追記
  ss << " + added";
  std::cout << "2: " << ss.str() << std::endl;
  
  // 新しい文字列で置き換え
  ss.str("new content");
  std::cout << "3: " << ss.str() << std::endl;
  
  // 読み取り位置に注意
  std::string word;
  ss >> word;  // "new"を読む
  std::cout << "Read: " << word << std::endl;
  std::cout << "4: " << ss.str() << std::endl;  // 全体は変わらない
  
  // 空文字列でクリア
  ss.str("");
  std::cout << "5: Empty? " << (ss.str().empty() ? "yes" : "no") << std::endl;
}
```

#### 出力
```
1: initial content
2: initial content + added
3: new content
Read: new
4: new content
5: Empty? yes
```

#### ムーブを使用する例 (C++20)
```cpp example
#include <iostream>
#include <sstream>

int main() {
  std::stringstream ss;

  // ムーブして文字列を設定
  std::string s = "Move string";
  ss.str(std::move(s));
  ss.seekp(0, std::ios_base::end); // 書き込み位置を末尾に移動
  ss << " more";
  std::cout << ss.str() << std::endl;

  // ムーブで文字列を取得
  std::string r = std::move(ss).str();
  std::cout << r << std::endl;
}
```

#### 出力
```
Move string more
Move string more
```


### string_viewからの設定 (C++26)
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main() {
  std::stringstream ss;

  // 文字列リテラルを設定
  ss.str("set from string literal");
  ss.seekp(0, std::ios_base::end); // 書き込み位置を末尾に移動
  ss << " test";
  std::cout << ss.str() << std::endl;

  // string_viewを設定
  std::string_view sv = "set from string_view";
  ss.str(sv);
  ss.seekp(0, std::ios_base::end); // 書き込み位置を末尾に移動
  ss << " test";
  std::cout << ss.str() << std::endl;
}
```

#### 出力
```
set from string literal test
set from string_view test
```

## 関連項目
- [`basic_stringbuf::str`](../basic_stringbuf/str.md)

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
- [P2495R3 Interfacing stringstreams with `string_view`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2495r3.pdf)
    - C++26で[`std::string_view`](/reference/string_view/basic_string_view.md)に対応した
