#コンストラクタ
```cpp
explicit basic_string(const Allocator& a = Allocator()); // (1)
basic_string(const basic_string& str);                   // (2)
basic_string(basic_string&& str) noexcept;               // (3) C++11

basic_string(const basic_string& str,
             size_type pos,
             size_type n = npos,
             const Allocator& a = Allocator());          // (4)

basic_string(const charT* s,
             size_type n,
             const Allocator& a = Allocator());          // (5)

basic_string(const charT* s,
             const Allocator& a = Allocator());          // (6)

basic_string(size_type n,
             charT c,
             const Allocator& a = Allocator());          // (7)

template <class InputIterator>
basic_string(InputIterator begin, InputIterator end,
             const Allocator& a = Allocator());          // (8)

basic_string(initializer_list<charT> init,
             const Allocator& = Allocator());            // (9) C++11

basic_string(const basic_string& str, const Allocator&); // (10) C++11
basic_string(basic_string&& str, const Allocator&);      // (11) C++11
```
* initializer_list[link /reference/initializer_list.md]

##概要
- (1) : デフォルトコンストラクタ。空の`basic_string`オブジェクトを構築する。
- (2) : コピーコンストラクタ。`str`オブジェクトと同じ文字列を構築する。
- (3) : ムーブコンストラクタ。`str`オブジェクトが指すデータの所有権を自身に移動する。`str`は未規定の値になる。
- (4) : `str`オブジェクトの部分文字列のコピーから`basic_string`オブジェクトを構築する。`str`オブジェクトの`pos`番目から`n`文字の部分文字列がコピーされる。
- (5) : 文字配列`s`の先頭`n`文字からなる部分文字列のコピーから`basic_string`オブジェクトを構築する。
- (6) : 文字配列`s`のコピーから`basic_string`オブジェクトを構築する。
- (7) : 文字`c`の`n`回繰り返した文字列からなる`basic_string`オブジェクトを構築する。
- (8) : 文字列の範囲`[begin, end)`から`basic_string`オブジェクトを構築する。
- (9) : 文字の初期化子リストから`basic_string`オブジェクトを構築する。
- (10) : アロケータを受け取るコピーコンストラクタ。
- (11) : アロケータを受け取るムーブコンストラクタ。


##例
```cpp
#include <iostream>
#include <string>
#include <utility>

int main()
{
  // デフォルト構築
  std::string s1;
  std::cout << "s1 : " << s1 << std::endl;

  // 文字配列からの構築
  std::string s2 = "hello";
  std::cout << "s2 : " << s2 << std::endl;

  // コピー構築
  std::string s3 = s2;
  std::cout << "s3 : " << s3 << std::endl;

  // ムーブ構築
  std::string s4 = std::move(s3);
  std::cout << "s4 : " << s4 << std::endl;

  // 部分文字列のコピーから構築
  // s4文字列オブジェクトの1番目の文字から3文字
  std::string s5(s4, 1, 3);
  std::cout << "s5 : " << s5 << std::endl;

  // 文字配列の先頭N文字から構築
  std::string s6("hello", 3);
  std::cout << "s6 : " << s6 << std::endl;

  // 文字をN回繰り返して構築
  std::string s7(3, 'a');
  std::cout << "s7 : " << s7 << std::endl;

  // 文字列の範囲から構築
  std::string s8(s4.begin(), s4.end());
  std::cout << "s8 : " << s8 << std::endl;

  // 文字の初期化子リストから構築
  std::string s9 = {'h', 'e', 'l', 'l', 'o'};
  std::cout << "s9 : " << s9 << std::endl;
}
```

###出力
```
s1 : 
s2 : hello
s3 : hello
s4 : hello
s5 : ell
s6 : hel
s7 : aaa
s8 : hello
s9 : hello
```

##参照


